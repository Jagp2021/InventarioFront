import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

import { ReporteListasSeleccionStateService } from 'src/app/domain/service/adm/reporte-listas-seleccion/reporte-listas-seleccion-state.service';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { ADM } from 'src/app/core/constant/adm.constants';
import { IListaSeleccion } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { IFormPosicionesFG } from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';
import { REPORTE_LISTAS } from 'src/app/core/constant/adm/reporte-listas-seleccion.constants';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-frm-reporte-listas-seleccion',
  templateUrl: './frm-reporte-listas-seleccion.component.html',
  styleUrls: ['./frm-reporte-listas-seleccion.component.scss'],
})
export class FrmReporteListasSeleccionComponent implements OnInit {
  public aListasSeleccion: IListaSeleccion[] = [];
  public sTipoUsuario: string = localStorage.getItem('tipoUsuario') as string;
  public bAbrirFiltro: boolean = false;
  public aCatalogos: any[] = [];
  public bForzarCierre: boolean = false;

  public oCamposFormulario: IFormPosicionesFG[] = [
    {
      funcionCatalogo: 'INST',
      idCatalogo: null,
      codigoEntidadPci: null,
      descripcion: null,
    },
  ];

  frmGenerarReporte: FormGroup = this._formBuilder.group({
    Dominio: null,
    Pcis: null,
    id_usuario_solicitante: localStorage.getItem('idUsuario'),
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _reporteListasSeleccion: ReporteListasSeleccionStateService,
    private _listaSeccionStateService: ListaSeccionStateService,
    private _confirmationService: ConfirmationService,
    private _router: Router,
    private _utilsService: UtilsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.frmGenerarReporte.get('Pcis')?.disable();
    this.bForzarCierre = true;

    await this.fnCargarTipoTransaccion();
  }

  /**
   * @description Carga los tipos de transacciones por Listas
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTipoTransaccion(): Promise<void> {
    this.aListasSeleccion = (
      await this._listaSeccionStateService.consultarDominio({})
    ).data;

    this.aListasSeleccion = this._utilsService.fnOrdenarListas(
      this.aListasSeleccion,
      'sAcentuado',
      'descripcion'
    );
  }

  /**
   * @description Envía la data recogida del formulario para generar el reporte
   * @return {void} No retorna datos
   */
  fnGenerarReporte(): void {
    const sValoresListas: string[] = [];

    if (this.frmGenerarReporte.get('Dominio')?.value === null) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: REPORTE_LISTAS.ME1,
      });

      return;
    }

    if (this.bForzarCierre === false && this.aCatalogos.length === 0) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: REPORTE_LISTAS.ME2,
      });

      return;
    }

    for (const iterator of this.aCatalogos) {
      sValoresListas.push(iterator.data.id);
    }

    const oListas = [
      {
        Dominio: this.frmGenerarReporte.get('Dominio')?.value,
        Pcis: sValoresListas.length > 0 ? sValoresListas.toString() : null,
        id_usuario_solicitante: localStorage.getItem('idUsuario'),
      },
    ];

    this._reporteListasSeleccion.generarReporteListasSeleccion(oListas[0]);
    this.fnLimpiarFormulario();
  }

  /**
   * @description Limpia el formulario, los campos que se haya ingresado
   * @return {void} No retorna datos
   */
  fnLimpiarFormulario(): void {
    this.frmGenerarReporte.reset({
      id_usuario_solicitante: localStorage.getItem('idUsuario'),
    });

    this.frmGenerarReporte.get('Pcis')?.disable();
    this.bForzarCierre = true;
    this.aCatalogos = [];
  }

  async fnValidarDatos({ value }: any) {
    const listaSeleccion = (
      await this._listaSeccionStateService.consultarDominio({ dominio1: value })
    ).data[0];

    if (!listaSeleccion.universal) {
      if (this.sTipoUsuario === REPORTE_LISTAS.USUARIO_DIRE) {
        this.frmGenerarReporte.get('Pcis')?.enable();
        this.bForzarCierre = false;
      }
    } else {
      this.frmGenerarReporte.get('Pcis')?.disable();
      this.bForzarCierre = true;
    }
  }

  /**
   * @description Cancela el proceso y redirige a Home
   * @return {void} No retorna datos
   */
  fnCancelarProceso(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._router.navigateByUrl('/home');
      },
    });
  }

  /** *********************
   *  FILTROS GENÉRICOS  **
   * **********************/

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnAbrirFiltroTransaccion(): void {
    this.bAbrirFiltro = this.bForzarCierre ? false : true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltro(bCerrarFiltro: boolean): void {
    this.bAbrirFiltro = bCerrarFiltro;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltro(aCatalogos: any): void {
    this.aCatalogos = aCatalogos;
  }

  fnEliminarPosicion(aPosicion: any, nIndice: number) {
    this.aCatalogos.splice(nIndice, 1);
  }
}
