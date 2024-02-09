import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  listaProducto: any[] = [];
  listaDetalleventa: IDetalleVenta[] = [];
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
  }

  fnAceptar(): void {
    if(this.validar() && this.config.data.model === undefined){
      this.ref.close({
        mensaje:'Ya se agregó el producto. Si desea puede actualizar la cantidad y el valor en el producto existente'});
      return;
    }
    const detalle: IDetalleVenta = {
      idFactura: 0,
      idProducto: this.selectedProducto.id,
      cantidad: this.frmProducto.value.cantidad,
      valorUnitario: this.frmProducto.value.valor,
      valorTotal: this.frmProducto.value.cantidad * this.frmProducto.value.valor,
      nombreProducto: this.selectedProducto.nombre
    };
    this.ref.close({objeto :detalle});
  }

  validar():boolean{
    return this.listaDetalleventa.filter(x => x.idProducto === this.selectedProducto.id).length > 0;
  }

  fnCancelar(): void {
    this.ref.close();
  }

}
