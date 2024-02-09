import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SIN_CARACTERES_ESPECIALES, SOLO_NUMEROS } from 'src/app/core/utils/Patterns';
import { IDominio } from 'src/app/domain/interface/parametrizacion/dominio.interface';
import { DominioStateService } from 'src/app/domain/service/parametrizacion/dominio-state.service';
import { ProveedorStateService } from 'src/app/domain/service/parametrizacion/proveedor-state.service';
import { UsuarioStateService } from 'src/app/domain/service/parametrizacion/usuario-state.service';

@Component({
  selector: 'app-proveedor-crear',
  templateUrl: './proveedor-crear.component.html',
  styleUrls: ['./proveedor-crear.component.scss']
})
export class ProveedorCrearComponent implements OnInit {
  listaTipoDocumento: IDominio[] = [];
  selectedTipoDocumento: any = null;

  constructor(
      public config: DynamicDialogConfig,
      public ref: DynamicDialogRef,
      private service: ProveedorStateService,
      private dominioService: DominioStateService
  ) { }

  formUsuario = new FormGroup({
    id: new FormControl('0',[]),
    nombre: new FormControl('',[Validators.required,Validators.pattern(SIN_CARACTERES_ESPECIALES),Validators.maxLength(200)]),
    tipoDocumento: new FormControl('',[Validators.required]),
    numeroDocumento: new FormControl('',[Validators.required, Validators.pattern(SOLO_NUMEROS),Validators.maxLength(50)]),
    telefono: new FormControl('',[Validators.required, Validators.pattern(SOLO_NUMEROS),Validators.maxLength(50)]),
    email: new FormControl('',[Validators.required, Validators.email,Validators.maxLength(200)])
  });

  ngOnInit(): void {
    this.cargarListas();
    if(this.config.data.usuario !== undefined){
      setTimeout(()=> {
        this.cargaInicial();
      },200);
    }
  }

  cargarListas(){
    this.fnConsultarTipoDocumento();
  }

  fnConsultarTipoDocumento(){
    this.dominioService.fnConsultarDominios({dominio1: 'TIPODOCUMENTO'}).then((res => {
      this.listaTipoDocumento = res.data;
    }));
  }

  /**
   * Descripción: Consulta los campos del formulario
   * Autor:  Javier Gonzalez
   * Fecha: 12/03/2023
   */
  get formControls(): FormGroup['controls'] {
    return this.formUsuario.controls;
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
    const errors = this.formUsuario.get(nombreCampo)?.errors;
    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['maxlength']) return 'Excede el máximo valor de caracteres (' + errors?.['maxlength'].requiredLength + ').';
    if (errors?.['pattern'] && nombreCampo === 'nombre') return 'No se permiten espacios ni caracteres especiales.';
    if (errors?.['pattern'] && nombreCampo === 'telefono') return 'Solo se permiten valores numéricos.';
    if (errors?.['pattern'] && nombreCampo === 'numeroDocumento') return 'Solo se permiten valores numéricos.';
    if (errors?.['email']) return 'No es un formato valido de correo electrónico.';
    return '';
  }

  aceptar(): void {
    let model= this.formUsuario.getRawValue();
    model.tipoDocumento = this.selectedTipoDocumento.sigla;
    if(Number(model.id) <= 0){
      this.guardar(model);
    } else {
      this.editar(model);
    }
  }

  async editar(model: any): Promise<void>{
    let response = await this.service.fnActualizarProveedor(model);
     this.ref.close(response);
  }

   async guardar(model: any) : Promise<void>{
     let response = await this.service.fnGuardarProveedor(model);
     this.ref.close(response);
    }

  
    cargaInicial(){
      const tipoDocumento = this.listaTipoDocumento.filter(e => e.sigla === this.config.data.usuario.tipoDocumento)[0];
      this.selectedTipoDocumento = tipoDocumento;
      this.formControls['id'].setValue(this.config.data.usuario.id);
      this.formControls['nombre'].setValue(this.config.data.usuario.nombre);
      this.formControls['numeroDocumento'].setValue(this.config.data.usuario.numeroDocumento);
      this.formControls['telefono'].setValue(this.config.data.usuario.telefono);
      this.formControls['tipoDocumento'].setValue(tipoDocumento);
      this.formControls['email'].setValue(this.config.data.usuario.email);
    }
  
    /**
     * Descripción: Validación de campos
     * Autor:  Javier Gonzalez
     * Fecha: 12/03/2023
     * @param campo 
     * @param posicion 
     * @returns 
     */
    campoNoValido(campo: string) {
      return (
        this.formUsuario.get(campo)?.invalid &&
        this.formUsuario.get(campo)?.touched
      );
    }

  cancelar(): void {
    this.ref.close();
  }

}
