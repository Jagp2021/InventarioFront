import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IDetalleVenta } from 'src/app/domain/interface/procesos/detalle-venta.interface';
import { PruductoStateService } from 'src/app/domain/service/parametrizacion/producto-state.service';

@Component({
  selector: 'app-modal-garantia',
  templateUrl: './modal-garantia.component.html',
  styleUrls: ['./modal-garantia.component.scss']
})
export class ModalGarantiaComponent implements OnInit {

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
  }

  fnConsultarProductos(): void {
    this.listaProducto = this.config.data.detalleFactura;
  }

  fnAceptar(): void {
    const detalle: IDetalleVenta = {
      idFactura: 0,
      idProducto: this.selectedProducto.id,
      cantidad: this.frmProducto.value.cantidad,
      valorUnitario: this.frmProducto.value.valor,
      valorTotal: this.frmProducto.value.cantidad * this.frmProducto.value.valor,
      nombreProducto: this.selectedProducto.nombre
    };
    this.ref.close(detalle);
  }

  fnCancelar(): void {
    this.ref.close();
  }

  fnCargaInicial(){
    this._utilsService.fnCambiarIdiomaCalendario();
  }

}
