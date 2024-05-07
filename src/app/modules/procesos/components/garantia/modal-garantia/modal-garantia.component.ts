import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IDetalleGarantia } from 'src/app/domain/interface/procesos/detalle-garantia.interface';
import { PruductoStateService } from 'src/app/domain/service/parametrizacion/producto-state.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-modal-garantia',
  templateUrl: './modal-garantia.component.html',
  styleUrls: ['./modal-garantia.component.scss']
})
export class ModalGarantiaComponent implements OnInit {
  disabledGuardar = true;
  messages: Message[] = [];
  listaDetalleGarantia: IDetalleGarantia[] = [];
  listaProducto: any[] = [];
  selectedProducto: any = null;
  constructor(private _utilsService: UtilsService,
    private _formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private productoService: PruductoStateService) { }
  
    frmProducto: FormGroup = this._formBuilder.group({
      idProducto: [null, [Validators.required]],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      valor: [0, [Validators.required, Validators.min(1)]],
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
      this.listaDetalleGarantia = this.config.data.lista;
    }
  }

  fnConsultarProductos(): void {
    this.listaProducto = this.config.data.productos;
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

    console.log(this.frmProducto.getRawValue());
    const detalle: IDetalleGarantia = {
      idGarantia: 0,
      idProducto: this.selectedProducto.idProducto,
      cantidad: this.frmProducto.getRawValue().cantidad,
      valorProducto: this.frmProducto.getRawValue().valor,
      valorTotal: this.frmProducto.getRawValue().cantidad * this.frmProducto.getRawValue().valor,
      nombreProducto: this.selectedProducto.nombreProducto
    };
    console.log(detalle);
    this.ref.close(detalle);
  }

  fnCancelar(): void {
    this.ref.close();
  }

  fnCargaInicial(){
    this.selectedProducto = this.listaProducto.find(x => x.idProducto === this.config.data.model.idProducto);
    this.frmProducto.controls['idProducto'].setValue(this.selectedProducto);
    this.frmProducto.controls['idProducto'].disable();
    this.frmProducto.controls['cantidad'].setValue(this.config.data.model.cantidad);
    this.frmProducto.controls['valor'].setValue(this.config.data.model.valorProducto);
    this.frmProducto.controls['valor'].disable();
    this.disabledGuardar = false;
  }

  validarProductoExistente():boolean{
    return this.listaDetalleGarantia.filter(x => x.idProducto === this.selectedProducto.idProducto).length > 0;
  }

  validarDisponible():boolean{
    return Number(this.selectedProducto.cantidad) >=Number(this.frmProducto.value.cantidad);
  }

  fnProductoSeleccionado(event: any): void {
    if(event.value !== null){
      if(event.value.cantidad === 0){
        this.frmProducto.controls['cantidad'].setValue(null);
        this.frmProducto.controls['cantidad'].disable();
        this.frmProducto.controls['valor'].disable();
        this.disabledGuardar = true;
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'El producto no cuenta con Stock disponible' }];
      }else {
        this.frmProducto.controls['cantidad'].enable();
        this.frmProducto.controls['valor'].disable();
        this.frmProducto.controls['valor'].setValue(this.selectedProducto.valor !== undefined ? this.selectedProducto.valor : this.selectedProducto.valorUnitario);
        this.disabledGuardar = false;
      }
    }
  }

}
