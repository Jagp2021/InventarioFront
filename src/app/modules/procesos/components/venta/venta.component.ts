import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { UtilsService } from 'src/app/core/services/utils.service';
import { DominioStateService } from 'src/app/domain/service/parametrizacion/dominio-state.service';
import { UsuarioStateService } from 'src/app/domain/service/parametrizacion/usuario-state.service';
import { VentaStateService } from 'src/app/domain/service/procesos/venta-state.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  lista: any[] = [];
  listaTipoPago: any[] = [];
  selectedTipoPago: any = null;
  listaUsuario: any[] = [];
  selectedUsuario: any = null;
  loadingTabla = false;
  selectedItem: any = {};
  @ViewChild('dt') dt: Table | undefined;

  frmVentas: FormGroup = this._formBuilder.group({
    cliente: null,
    fechaInicio: null,
    fechaFin: null,
    id: null,
    numeroFactura: null,
    tipoPago: null,
    usuarioRegistro: null,
    id_usuario_solicitante: localStorage.getItem('idUsuario'),
  });
  
  constructor(
    private _formBuilder: FormBuilder,
    private _utilsService: UtilsService,
    private ventaService: VentaStateService,
    private usuarioService: UsuarioStateService,
    private dominioService: DominioStateService,
    private router: Router) { }

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();
    this.fnCargarUsuarios();
    this.fnCargarTipoPago();
  }

  fnConsultarVentas(){
    console.log(this.selectedTipoPago);
    let model = this.frmVentas.getRawValue();
    if(this.selectedUsuario !== undefined && this.selectedUsuario !== null){
      model.usuarioRegistro = this.selectedUsuario.id;
    } 
    if(this.selectedTipoPago !== undefined && this.selectedTipoPago !== null){
      model.tipoPago = this.selectedTipoPago.sigla;
    }
    this.ventaService.fnListarVentas(model).then((response => {
      if (response.estado) {
        this.lista = response.data;
      }
      this.loadingTabla = false;
    }));
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  fnCargarUsuarios(){
    this.usuarioService.fnConsultarUsuarios({}).then(response => {
      if (response.estado) {
        this.listaUsuario = response.data;
      }
    }
    );
  }

  fnCargarTipoPago(){
    this.dominioService.fnConsultarDominios({dominio1: 'TIPOPAGO'}).then(response => {
      if (response.estado) {
        this.listaTipoPago = response.data;
      }
    }
    );

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

  fnLimpiarFiltros(){
    this.frmVentas.reset();
    this.selectedUsuario = null;
    this.selectedTipoPago = null;
  }

  crear(){
    this.router.navigate(['/procesos/venta/crearVenta', 0]);
  }

  fnVerVenta(venta: any){
    this.router.navigate(['/procesos/venta/crearVenta', venta.id]);
  }
}
