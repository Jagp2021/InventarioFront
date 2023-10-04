import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VALOR_MAXIMO_CARACTERES_CLASIFICADOR, VALOR_MAXIMO_CARACTERES_NIVEL_CLASIFICADOR } from 'src/app/core/constant/adm/constants';
import { SOLO_NUMEROS } from 'src/app/core/utils/Pattern';
import { NON_WHITE_SPACE_REG_EXP, SIN_ESPACIOS_CARACTERES_ESPECIALES } from 'src/app/core/utils/Patterns';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';

@Component({
  selector: 'app-nivel-clasificador',
  templateUrl: './nivel-clasificador.component.html',
  styleUrls: ['./nivel-clasificador.component.scss']
})
export class NivelClasificadorComponent implements OnInit {
  valorMaximoTope = Number(localStorage.getItem(VALOR_MAXIMO_CARACTERES_NIVEL_CLASIFICADOR));
  valorMaximo = Number(localStorage.getItem(VALOR_MAXIMO_CARACTERES_CLASIFICADOR));
  cantidadNiveles = 1;
  selectedTipoDato: any = null;
  listaTipoDato: any[] = [];
  index = 0;
  constructor(
      public config: DynamicDialogConfig,
      public ref: DynamicDialogRef,
      private _dominioStateService: ListaSeccionStateService) { }

  formNivelClasificador = new FormGroup({
    id: new FormControl('0',[]),	
    idClasificador: new FormControl({disabled: false, value: '0'},[]),
    orden: new FormControl({disabled: true, value: '1'},[ 
          Validators.required,
          Validators.pattern(SOLO_NUMEROS),
          Validators.max(1)]),
    nombre: new FormControl({disabled: false, value: ''},
          [Validators.required,
            Validators.pattern(SIN_ESPACIOS_CARACTERES_ESPECIALES),
            Validators.pattern(NON_WHITE_SPACE_REG_EXP),
            Validators.maxLength(100),
            ValorNombreNivelExiste(0, [])
          ]),
    tipoDato: new FormControl({disabled: false, value: ''},[Validators.required]),
    longitud: new FormControl({disabled: false, value: ''},[
            Validators.required,
            Validators.pattern(SOLO_NUMEROS),
            Validators.min(1),
            Validators.max(this.valorMaximoTope),
            ValorLongitudNivel(0,[],this.valorMaximo)
          ])
  });

  ngOnInit(): void {
    this.consultarTipoDato();

    if(this.config.data.nivel !== undefined){
      this.index = this.config.data.index;
      setTimeout(()=> {
        this.cargaInicial();
      },200);
    } else {
      if(this.config.data.niveles.length > 0){
        this.formControls['orden'].setValue(this.config.data.niveles.length + 1);
        this.formControls['nombre'].setValidators([ValorNombreNivelExiste(this.config.data.niveles.length, this.config.data.niveles),
          Validators.required,Validators.pattern(SIN_ESPACIOS_CARACTERES_ESPECIALES),Validators.pattern(NON_WHITE_SPACE_REG_EXP),Validators.maxLength(100)
        ]);
        this.formControls['longitud'].setValidators([ValorLongitudNivel(this.config.data.niveles.length+1, this.config.data.niveles, this.valorMaximo)
          ,Validators.required,Validators.pattern(SOLO_NUMEROS),Validators.min(1),Validators.max(this.valorMaximoTope)
        ]);
      }
    }
  }

  /**
   * Descripción: Consulta los campos del formulario de clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  get formControls(): FormGroup['controls'] {
    return this.formNivelClasificador.controls;
  }

  /**
   * Descripción: Lista de errores sobre un control del formulrio de niveles de clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   * @param nombreCampo 
   * @param posicion 
   * @returns 
   */
  listaErroresMensajesNivel(nombreCampo: string): string { 
    const errors = this.formNivelClasificador.get(nombreCampo)?.errors;
    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength']) return 'No puede superar los 100 caracteres.';
    if (errors?.['min'] && nombreCampo === 'longitud') return `La cantidad de caracteres debe ser un número natural mayor que 0 y menor que ${VALOR_MAXIMO_CARACTERES_NIVEL_CLASIFICADOR}`;
    if (errors?.['max'] && nombreCampo === 'longitud') return `La cantidad de caracteres debe ser un número natural mayor que 0 y menor que ${VALOR_MAXIMO_CARACTERES_NIVEL_CLASIFICADOR}`;
    if (errors?.['min'] && nombreCampo === 'orden') return `La cantidad de caracteres debe ser un número natural mayor que 0 y menor o igual que ${this.cantidadNiveles}`;
    if (errors?.['max'] && nombreCampo === 'orden') return `La cantidad de caracteres debe ser un número natural mayor que 0 y menor o igual que ${this.cantidadNiveles}`;
    if (errors?.['pattern'] && nombreCampo === 'nombre') return 'No se permiten espacios ni caracteres especiales.';
    if (errors?.['pattern'] && nombreCampo === 'longitud') return 'Solo se permiten valores numéricos.';
    if (errors?.['pattern'] && nombreCampo === 'orden') return 'Solo se permiten valores numéricos.';
    if(errors?.['nivelNombreExiste']) return 'El nombre de nivel que intenta registrar ya fue agregado';
    if(errors?.['longitudNivel']) return 'El número de caracteres registrado para el nivel supera el tope máximo establecido';
    
    return '';
  }

  /**
   * Descripción: Validación de campo de niveles de clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   * @param campo 
   * @param posicion 
   * @returns 
   */
  campoNoValidoNivel(campo: string) {
    return (
      this.formNivelClasificador.get(campo)?.invalid &&
      this.formNivelClasificador.get(campo)?.touched
    );
  }

  /**
   * Descripción: Consulta los Tipos de Datos
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  consultarTipoDato(){
    let filtroDominio = {Dominio1 : 'TIPODATO'}
    this._dominioStateService.consultatTipoDato(filtroDominio)
    this._dominioStateService.select(e => e.tipoDatoDominio)
     .subscribe({
      next:(resp: any[])=> {
        this.listaTipoDato = resp.filter(x => x.sigla !== 'LOGI');
      }
     }
    );
  }

  /**
   * Descripción: Carga inicial del formulario cuando es acción de edición
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  cargaInicial(){
    const tipoDato = this.listaTipoDato.filter(e => e.sigla === this.config.data.nivel.tipoDato)[0];
    this.formControls['id'].setValue(this.config.data.nivel.id);
    this.formControls['idClasificador'].setValue(this.config.data.nivel.idClasificador);
    this.formControls['nombre'].setValue(this.config.data.nivel.nombre);
    this.selectedTipoDato = tipoDato;
    this.formControls['tipoDato'].setValue(tipoDato);
    this.formControls['longitud'].setValue(this.config.data.nivel.longitud);
    this.formControls['orden'].setValue(this.config.data.nivel.orden);
    this.formControls['orden'].setValidators([Validators.max(this.config.data.niveles.length),Validators.required,Validators.pattern(SOLO_NUMEROS)])
    this.formControls['orden'].enable();
    this.cantidadNiveles = this.config.data.niveles.length;
    this.formControls['nombre'].setValidators([ValorNombreNivelExiste(this.index, this.config.data.niveles),
      Validators.required,Validators.pattern(SIN_ESPACIOS_CARACTERES_ESPECIALES),Validators.pattern(NON_WHITE_SPACE_REG_EXP),Validators.maxLength(100)
    ]);
    this.formControls['longitud'].setValidators([ValorLongitudNivel(this.index, this.config.data.niveles, this.valorMaximo)
      ,Validators.required,Validators.pattern(SOLO_NUMEROS),Validators.min(1),Validators.max(this.valorMaximoTope)
    ]);
    this.filtrarTipoDato();
  }

  /**
   * Descripción: Filtrar lista de tipos de datos de acuerdo a la carga inicial
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 27/03/2023
   */
  filtrarTipoDato(){
    switch(this.selectedTipoDato.sigla){
      case 'CARA':
        this.listaTipoDato = this.listaTipoDato.filter(e => e.sigla !== 'NUME');
        break;
      case 'NUME':
        this.listaTipoDato = this.listaTipoDato.filter(e => e.sigla !== 'CARA');
        break;
      case 'ALFN':
        this.listaTipoDato = this.listaTipoDato.filter(e => e.sigla === 'ALFN');
        break;
    }
  }

  /**
   * Descripción: Acción de Aceptar los cambios del formulario
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 27/03/2023
   */
  aceptar(){
    const model = {
      id: this.formControls['id'].value,
      idClasificador: this.formControls['idClasificador'].value,
      nombre: this.formControls['nombre'].value,
      tipoDato: this.selectedTipoDato.sigla,
      longitud: this.formControls['longitud'].value,
      orden: Number(this.formControls['orden'].value),
    }
    this.ref.close(model);
  }

  /**
   * Descripción: Acción de Cancelar los cambios del formulario
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 27/03/2023
   */
  cancelar() {
    this.ref.close();
  }

}


/**
 * Validación de existencia de nombre del nivel
 * @param index Posición del nivel en el array
 * @param niveles Array de niveles
 * @returns 
 */
export function ValorNombreNivelExiste(index: number, niveles: any[]): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null;
    }

    let coincidencias: any[] = [];
    for (let i = 0; i < niveles.length; i++) {
        if(niveles[i].nombre.toLowerCase() === value.toLowerCase() 
            && index !== i){
              coincidencias.push({});
         }  
      }
      return coincidencias.length > 0 ? {nivelNombreExiste:true}: null;
  }
}

/**
 * Validación de Longitud de Carácteres del Nivel del Clasificador
 * @param indice Posición del nivel en el array
 * @param niveles Array de niveles
 * @param tope Valor máximo que puede tener la sumatoria de longitud de carácteres del nivel
 * @returns 
 */
export function ValorLongitudNivel(indice: number, niveles: any[], tope: number): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      
      if (!value) {
          return null;
      }

      let sumatoria: number = 0;
      for (let index = 0; index < niveles.length; index++) {
        if(indice !== index){
          sumatoria = sumatoria + Number(niveles[index].longitud);     
        } else {
          sumatoria = sumatoria + Number(value);
        }
      }
      
      if(indice > niveles.length) {
        sumatoria = sumatoria + Number(value);
      }
      return sumatoria > tope ? {longitudNivel:true}: null;
  }

 
}
