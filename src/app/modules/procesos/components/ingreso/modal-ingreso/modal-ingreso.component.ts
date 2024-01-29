import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilsService } from 'src/app/core/services/utils.service';
import { PruductoStateService } from 'src/app/domain/service/parametrizacion/producto-state.service';
import { IDetalleIngreso } from 'src/app/domain/interface/procesos/detalle-ingreso.interface'; // Replace 'path/to/IDetalleIngreso' with the actual path to the IDetalleIngreso interface

@Component({
  selector: 'app-modal-ingreso',
  templateUrl: './modal-ingreso.component.html',
  styleUrls: ['./modal-ingreso.component.scss']
})
export class ModalIngresoComponent implements OnInit {
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
    this.productoService.fnListarProductos({}).then((data) => {
      this.listaProducto = data.data;
    });
  }

  fnAceptar(): void {
    const detalle: IDetalleIngreso = {
      idProducto: this.selectedProducto.id,
      cantidad: this.frmProducto.value.cantidad,
      valor: this.frmProducto.value.valor,
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
