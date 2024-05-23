import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Clasificador } from 'src/app/domain/interface/adm/clasificador/clasificador.interface';
import { ClienteStateService } from 'src/app/domain/service/parametrizacion/cliente-state.service';
import { DominioStateService } from 'src/app/domain/service/parametrizacion/dominio-state.service';
import { ProveedorStateService } from 'src/app/domain/service/parametrizacion/proveedor-state.service';
import { GarantiaStateService } from 'src/app/domain/service/procesos/garantia-state.service';

@Component({
  selector: 'app-garantia',
  templateUrl: './garantia.component.html',
  styleUrls: ['./garantia.component.scss'],
  providers: [MessageService]
})
export class GarantiaComponent implements OnInit {
  @Input() listaClasificadoresObservable!: Observable<Clasificador[]>;
  lista: any[] = [];
  listaCliente: any[] = [];
  selectedCliente: any = null;
  listaProveedor: any[] = [];
  selectedProveedor: any = null;
  listaEstado: any[] = [];
  selectedEstado: any = null;
  listaTipoGarantia: any[] = [];
  selectedTipoGarantia: any = null;
  loadingTabla = false;
  @ViewChild('dt') dt: Table | undefined;
  constructor(private _utilsService: UtilsService,
    private _formBuilder: FormBuilder,
    private _garantiaService: GarantiaStateService,
    private dominioService: DominioStateService,
    private clienteService: ClienteStateService,
    private proveedorService : ProveedorStateService,
    private router: Router) { }

  frmGarantia: FormGroup = this._formBuilder.group({
    id: null,
    idFactura: null,
    idCliente: null, 
    idProveedor: null,
    fechaInicio: null, 
    fechaFin: null,
    fechaInicioFactura: null,
    fechaFinFactura: null,
    estadoGarantia: null,
    tipoGarantia: null,
  });

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();
    this.fnConsultarTipoGarantia();
    this.fnConsultarEstados();
    this.fnConsultarClientes();
    this.fnConsultarProveedores();
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
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

  async fnConsultarGarantias(): Promise<void> {
    this.loadingTabla = true;

    let model = this.frmGarantia.getRawValue();
    model.idCliente = this.selectedCliente !== undefined && this.selectedCliente !== null ? this.selectedCliente?.id : null;
    model.tipoGarantia = this.selectedTipoGarantia !== undefined && this.selectedTipoGarantia !== null ? this.selectedTipoGarantia?.sigla : null;
    model.estadoGarantia = this.selectedEstado !== undefined && this.selectedEstado !== null ? this.selectedEstado?.sigla : null;
    model.idProveedor = this.selectedProveedor !== undefined && this.selectedProveedor !== null ? this.selectedEstado?.id : null;
    const response = await this._garantiaService.fnListarGarantias(model);
    if (response.estado) {
      this.lista = response.data;
    }
    this.loadingTabla = false;
  }

  fnConsultarEstados(){
    this.dominioService.fnConsultarDominios({ dominio1: 'ESTADOGARANTIA'}).then((resp: any) => {
      this.listaEstado = resp.data;
    });
  }

  fnConsultarTipoGarantia(){
    this.dominioService.fnConsultarDominios({ dominio1: 'TIPOGARANTIA'}).then((resp: any) => {
      this.listaTipoGarantia = resp.data;
    });
  }

  fnConsultarClientes(){
    this.clienteService.fnConsultarClientes({}).then((resp: any) => {
      this.listaCliente = resp.data;
    });
  }

  fnConsultarProveedores(){
    this.proveedorService.fnConsultarProveedores({}).then((resp: any) => {
      this.listaProveedor = resp.data;
    });
  }

  fnLimpiarFiltros() {
    this.frmGarantia.reset();
    this.selectedCliente = null;
    this.selectedEstado = null;
    this.selectedTipoGarantia = null;
    this.selectedProveedor = null;
  }

  fnCrear(){
    this.router.navigate(['/procesos/garantia/crearGarantia/',  0, 'Crear']);
  }

  fnVerGarantia(garantia: any){
    this.router.navigate(['/procesos/garantia/crearGarantia/',garantia.id, 'Ver']);
  }

  fnGestionarGarantia(garantia: any){
    this.router.navigate(['/procesos/garantia/crearGarantia/',garantia.id, 'Gestion']);
  }

}
