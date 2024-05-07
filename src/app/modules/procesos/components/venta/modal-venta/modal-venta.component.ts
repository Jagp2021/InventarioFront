import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IDetalleVenta } from 'src/app/domain/interface/procesos/detalle-venta.interface';
import { PruductoStateService } from 'src/app/domain/service/parametrizacion/producto-state.service';

@Component({
  selector: 'app-modal-venta',
  templateUrl: './modal-venta.component.html',
  styleUrls: ['./modal-venta.component.scss']
})
export class ModalVentaComponent implements OnInit {
  messages: Message[] = [];
  disabledGuardar = true;
  listaProducto: any[] = [];
  listaDetalleventa: IDetalleVenta[] = [];
  selectedProducto: any = null;
  constructor(private _utilsService: UtilsService,
    private _formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private productoService: PruductoStateService) { }
  
    frmProducto: FormGroup = this._formBuilder.group({
      idProducto: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      valor: ['', [Validators.required, Validators.min(1)]],
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
      this.listaDetalleventa = this.config.data.lista;
    }
  }

  fnConsultarProductos(): void {
    this.productoService.fnListarProductos({}).then((data) => {
      this.listaProducto = data.data;
    });
  }

  fnCargaInicial(){
    this.selectedProducto = this.listaProducto.find(x => x.id === this.config.data.model.idProducto);
    this.frmProducto.controls['idProducto'].setValue(this.selectedProducto);
    this.frmProducto.controls['idProducto'].disable();
    this.frmProducto.controls['cantidad'].setValue(this.config.data.model.cantidad);
    this.frmProducto.controls['valor'].setValue(this.config.data.model.valorUnitario);
    this.frmProducto.controls['valor'].disable();
    this.disabledGuardar = false;
  }

  fnAceptar(): void {
    if(this.validarProductoExistente() && this.config.data.model === undefined){
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Ya se agregó el producto. Si desea puede actualizar la cantidad y el valor en el producto existente' }];
      return;
    }

    if(!this.validarDisponible()){
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'El producto no cuenta con la cantidad solicitada' }];
      return;
    }

    const detalle: IDetalleVenta = {
      idFactura: 0,
      idProducto: this.selectedProducto.id,
      cantidad: this.frmProducto.value.cantidad,
      valorUnitario: this.selectedProducto.precio,
      valorTotal: this.frmProducto.value.cantidad * this.selectedProducto.precio,
      nombreProducto: this.selectedProducto.nombre
    };
    this.ref.close({objeto :detalle});
  }

  validarProductoExistente():boolean{
    return this.listaDetalleventa.filter(x => x.idProducto === this.selectedProducto.id).length > 0;
  }

  validarDisponible():boolean{
    return Number(this.selectedProducto.cantidadDisponible) >=Number(this.frmProducto.value.cantidad);
  }

  fnCancelar(): void {
    this.ref.close();
  }

  fnProductoSeleccionado(event: any): void {
    if(event.value !== null){
      if(event.value.cantidadDisponible === 0){
        this.frmProducto.controls['cantidad'].setValue(null);
        this.frmProducto.controls['cantidad'].disable();
        this.frmProducto.controls['valor'].disable();
        this.disabledGuardar = true;
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'El producto no cuenta con Stock disponible' }];
      }else {
        this.frmProducto.controls['cantidad'].enable();
        this.frmProducto.controls['valor'].disable();
        this.frmProducto.controls['valor'].setValue(this.selectedProducto.precio);
        this.disabledGuardar = false;
      }
    }
  }

}
