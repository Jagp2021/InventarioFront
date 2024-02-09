import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { SOLO_NUMEROS, SIN_ESPACIOS_CARACTERES_ESPECIALES, NON_WHITE_SPACE_REG_EXP } from 'src/app/core/utils/Patterns';
import { IDominio } from 'src/app/domain/interface/parametrizacion/dominio.interface';
import { DominioStateService } from 'src/app/domain/service/parametrizacion/dominio-state.service';
import { PruductoStateService } from 'src/app/domain/service/parametrizacion/producto-state.service';

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.scss']
})
export class ProductoCrearComponent implements OnInit {
  listaTipoDato: IDominio[] = [];
  selectedTipoDato: any = null;
  index = 0;

  constructor(
      public config: DynamicDialogConfig,
      public ref: DynamicDialogRef,
      private service: PruductoStateService,
      private dominioService: DominioStateService
  ) { }

  formProducto = new FormGroup({
    id: new FormControl('0',[]),	
    codigo: new FormControl({disabled: false, value: ''},[]),
    nombre: new FormControl({disabled: false, value: ''},
          [Validators.required,
            Validators.pattern(SIN_ESPACIOS_CARACTERES_ESPECIALES),
            Validators.pattern(NON_WHITE_SPACE_REG_EXP),
            Validators.maxLength(100)
          ]),
    descripcion: new FormControl({disabled: false, value: ''},
          [Validators.required,
            Validators.pattern(SIN_ESPACIOS_CARACTERES_ESPECIALES),
            Validators.pattern(NON_WHITE_SPACE_REG_EXP),
            Validators.maxLength(200)
          ]),      
    cantidadDisponible: new FormControl({disabled: true, value: '0'},[ 
          Validators.required,
          Validators.pattern(SOLO_NUMEROS)]),
    tipoProducto: new FormControl({disabled: false, value: ''},[Validators.required]),
    estado: new FormControl({disabled: false, value: true},[Validators.required]),
  });

  ngOnInit(): void {
    this.fnConsultarTipoDato();
    if(this.config.data.producto !== undefined){
      this.index = this.config.data.index;
      setTimeout(()=> {
        this.cargaInicial();
      },200);
    }
  }

  cancelar(): void {
    this.ref.close();
  }

  fnConsultarTipoDato(){
    this.dominioService.fnConsultarDominios({dominio1: 'TIPOPRODUCTO'}).then((res => {
      this.listaTipoDato = res.data;
    }));
  }

  /**
   * Descripción: Consulta los campos del formulario de clasificador
   * Autor:  Javier Gonzalez
   * Fecha: 12/03/2023
   */
  get formControls(): FormGroup['controls'] {
    return this.formProducto.controls;
  }

  /**
   * Descripción: Lista de errores sobre un control del formulrio de niveles de clasificador
   * Autor:  Javier Gonzalez
   * Fecha: 12/03/2023
   * @param nombreCampo 
   * @param posicion 
   * @returns 
   */
  listaErroresMensajesNivel(nombreCampo: string): string { 
    const errors = this.formProducto.get(nombreCampo)?.errors;
    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['min'] && nombreCampo === 'longitud') return `La cantidad de caracteres debe ser un número natural mayor que 0 y menor que `;
    if (errors?.['max'] && nombreCampo === 'longitud') return `La cantidad de caracteres debe ser un número natural mayor que 0 y menor que`;
    if (errors?.['min'] && nombreCampo === 'orden') return `La cantidad de caracteres debe ser un número natural mayor que 0 y menor o igual que `;
    if (errors?.['max'] && nombreCampo === 'orden') return `La cantidad de caracteres debe ser un número natural mayor que 0 y menor o igual que`;
    if (errors?.['pattern'] && nombreCampo === 'nombre') return 'No se permiten espacios ni caracteres especiales.';
    if (errors?.['pattern'] && nombreCampo === 'longitud') return 'Solo se permiten valores numéricos.';
    if (errors?.['pattern'] && nombreCampo === 'orden') return 'Solo se permiten valores numéricos.';
    
    return '';
  }

  aceptar(): void {
    const response: IRespuestaApi = {  estado: true, codigo: 200, mensaje: '', data: null};
    let model= this.formProducto.getRawValue();
    model.tipoProducto = this.selectedTipoDato.sigla;
    if(this.formControls['id'].value ==='0'){
      this.guardar(model);
    } else {
      this.editar(model);
    }
    
    this.ref.close(response);
  }

    async editar(model: any): Promise<void>{
      let response = await this.service.fnActualizarProducto(model);
      this.ref.close(response);
    }

    async guardar(model: any) : Promise<void>{
     let response = await this.service.fnGuardarProducto(model);
     this.ref.close(response);
    }


  cargaInicial(){
    const tipoDato = this.listaTipoDato.filter(e => e.sigla === this.config.data.producto.tipoProducto)[0];
    this.selectedTipoDato = tipoDato;
    this.formControls['id'].setValue(this.config.data.producto.id);
    this.formControls['codigo'].setValue(this.config.data.producto.codigo);
    this.formControls['nombre'].setValue(this.config.data.producto.nombre);
    this.formControls['descripcion'].setValue(this.config.data.producto.descripcion);
    this.formControls['tipoProducto'].setValue(tipoDato);
    this.formControls['cantidadDisponible'].setValue(this.config.data.producto.cantidadDisponible);
    this.formControls['estado'].setValue(this.config.data.producto.estado);
  }

  /**
   * Descripción: Validación de campo de niveles de clasificador
   * Autor:  Javier Gonzalez
   * Fecha: 12/03/2023
   * @param campo 
   * @param posicion 
   * @returns 
   */
  campoNoValido(campo: string) {
    return (
      this.formProducto.get(campo)?.invalid &&
      this.formProducto.get(campo)?.touched
    );
  }

}
