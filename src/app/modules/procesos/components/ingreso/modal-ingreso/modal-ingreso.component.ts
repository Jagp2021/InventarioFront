import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilsService } from 'src/app/core/services/utils.service';
import { PruductoStateService } from 'src/app/domain/service/parametrizacion/producto-state.service';
import { IDetalleIngreso } from 'src/app/domain/interface/procesos/detalle-ingreso.interface'; // Replace 'path/to/IDetalleIngreso' with the actual path to the IDetalleIngreso interface
import { IProducto } from 'src/app/domain/interface/parametrizacion/producto.interface';

@Component({
  selector: 'app-modal-ingreso',
  templateUrl: './modal-ingreso.component.html',
  styleUrls: ['./modal-ingreso.component.scss']
})
export class ModalIngresoComponent implements OnInit {
  listaProducto: IProducto[] = [];
  listaDetalleingreso: IDetalleIngreso[] = [];
  selectedProducto: any = null;
  constructor(private _utilsService: UtilsService,
    private _formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private productoService: PruductoStateService) { }
  
    frmProducto: FormGroup = this._formBuilder.group({
      idProducto: [null, [Validators.required]],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      valor: [null, [Validators.required, Validators.min(1)]],
    });
    
  ngOnInit(): void {
    this.fnConsultarProductos();
    this._utilsService.fnCambiarIdiomaCalendario();
    if(this.config.data.model !== undefined){    
      setTimeout(()=> {
        this.fnCargaInicial();
      },200);
    }

    if(this.config.data.lista !== undefined){
      this.listaDetalleingreso = this.config.data.lista;
    }
  }

  fnConsultarProductos(): void {
    this.productoService.fnListarProductos({}).then((data) => {
      this.listaProducto = data.data;
    });
  }

  fnAceptar(): void {
    if(this.validar() && this.config.data.model === undefined){
      this.ref.close({
        mensaje:'Ya se agregó el producto. Si desea puede actualizar la cantidad y el valor en el producto existente'});
      return;
    }
    const detalle: IDetalleIngreso = {
      idProducto: this.selectedProducto.id,
      cantidad: this.frmProducto.value.cantidad,
      valor: this.frmProducto.value.valor,
      nombreProducto: this.selectedProducto.nombre
    };
    this.ref.close({objeto :detalle});
  }

  validar():boolean{
    return this.listaDetalleingreso.filter(x => x.idProducto === this.selectedProducto.id).length > 0;
  }

  fnCancelar(): void {
    this.ref.close();
  }

  fnCargaInicial(){
    this.selectedProducto = this.listaProducto.find(x => x.id === this.config.data.model.idProducto);
    this.frmProducto.controls['idProducto'].setValue(this.selectedProducto);
    this.frmProducto.controls['idProducto'].disable();
    this.frmProducto.controls['cantidad'].setValue(this.config.data.model.cantidad);
    this.frmProducto.controls['valor'].setValue(this.config.data.model.valor);
  }

  get controlsForm(): FormGroup['controls'] {
    return this.frmProducto.controls;
  }


   campoNoValido(sCampo: string): boolean | undefined {
    return (
      this.controlsForm[sCampo].invalid && this.controlsForm[sCampo]?.touched
    );
  }

  listaErroresMensajes(sCampo: string): string {
    const errors = this.controlsForm[sCampo].errors;
    if (errors?.['required']) return 'Campo requerido';
    if (errors?.['min']) return 'Valor debe ser mayor a 0';
    return '';
  }

}
