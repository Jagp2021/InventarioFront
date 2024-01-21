import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { UtilsService } from 'src/app/core/services/utils.service';
import { PruductoStateService } from 'src/app/domain/service/parametrizacion/producto-state.service';
import { ProveedorStateService } from 'src/app/domain/service/parametrizacion/proveedor-state.service';
import { IngresoStateService } from 'src/app/domain/service/procesos/ingreso-state.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {
  lista: any[] = [];
  listaProveedor: any[] = [];
  selectedProveedor: any = null;
  listaProducto: any[] = [];
  selectedProducto: any = null;
  loadingTabla = false;
  selectedItem: any = {};
  @ViewChild('dt') dt: Table | undefined;

  frmIngreso: FormGroup = this._formBuilder.group({
    fechaInicio: null,
    fechaFin: null,
    id: null,
    idProducto: null,
    idProveedor: null,
  });
  
  constructor(
    private _formBuilder: FormBuilder,
    private _utilsService: UtilsService,
    private ingresoService: IngresoStateService,
    private proveedorService: ProveedorStateService,
    private productoService: PruductoStateService,
    private router: Router) { }

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();
    this.fnConsultarProveedor();
    this.fnConsultarProducto();
  }

  fnConsultarIngresos(){
    this.loadingTabla = true;
    let model = this.frmIngreso.getRawValue();
    model.idProducto = this.selectedProducto !== undefined && this.selectedProducto !== null ? this.selectedProducto.id : null;
    model.idProveedor = this.selectedProveedor !== undefined && this.selectedProveedor !== null ? this.selectedProveedor.id : null;
    this.ingresoService.fnListarIngresos(model).then((response => {
      if (response.estado) {
        this.lista = response.data;
      }
      this.loadingTabla = false;
    }));
  }


  fnMostrarOcultarBotones(
    oEvento: any,
    nIndice: number,
    bMostrar: boolean,
    sId?: string
  ): void {
    this._utilsService.fnMostrarOcultarBotonesPrimario(
      oEvento,
      nIndice,
      bMostrar,
      sId
    );
  }

  fnConsultarProveedor(){
    this.proveedorService.fnConsultarProveedores({}).then(response => {
      if (response.estado) {
        this.listaProveedor = response.data;
      }
    });
  }

  fnConsultarProducto(){
    this.productoService.fnListarProductos({}).then(response => {
      if (response.estado) {
        this.listaProducto = response.data;
      }
    });
  }

  fnLimpiarFiltros(){
    this.frmIngreso.reset();
    this.selectedProducto = null;
    this.selectedProveedor = null;
  }

  fnCrear(){
    this.router.navigate(['/procesos/ingreso/crearIngreso', 0]);
  }

  fnVerIngreso(ingreso: any){
    this.router.navigate(['/procesos/ingreso/crearIngreso', ingreso.id]);
  }
}
