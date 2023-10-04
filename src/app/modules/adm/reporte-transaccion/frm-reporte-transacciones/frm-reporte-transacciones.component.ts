import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { ReporteTransaccionesStateService } from 'src/app/domain/service/adm/reporte-transacciones/reporte-transacciones-state.service';
import { TransaccionesStateService } from 'src/app/domain/service/adm/transacciones/transacciones-state.service';

import { REPORTE_TRANSACCIONES } from 'src/app/core/constant/adm/reporte-transacciones.constants';
import { IListaSeleccion } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { IEstadoGeneral } from 'src/app/domain/interface/adm/reporte-transacciones/reporte-transacciones.interface';
import { ITransacciones } from 'src/app/domain/interface/adm/transacciones/transacciones.interface';
import { ADM } from 'src/app/core/constant/adm.constants';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-frm-reporte-transacciones',
  templateUrl: './frm-reporte-transacciones.component.html',
  styleUrls: ['./frm-reporte-transacciones.component.scss'],
})
export class FrmReporteTransaccionesComponent implements OnInit {
  public aTipoTransaccion: IListaSeleccion[] = [];
  public aFuncionNegocio: IListaSeleccion[] = [];
  public aTransacciones: ITransacciones[] = [];
  public aCodigosCategorias: IListaSeleccion[] = [];
  public aTransaccionesFiltradas: string[] = [];
  public aEstados: IEstadoGeneral[] = [];
  public aAtributos: IEstadoGeneral[] = [];

  frmGenerarReporte: FormGroup = this._formBuilder.group({
    TipoFuncionalidad: null,
    FuncionNegocio: null,
    CodigoTransaccion: null,
    NombreTransaccion: null,
    Categoria: null,
    EstadoFuncionalidad: null,
    RequiereLogAuditoria: null,
    NivelSeguridadAlto: null,
    RequiereDatosAdministrativos: null,
    id_usuario_solicitante: localStorage.getItem('idUsuario'),
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _reporteTransacciones: ReporteTransaccionesStateService,
    private _listaSeccionStateService: ListaSeccionStateService,
    private _transaccionesStateService: TransaccionesStateService,
    private _confirmationService: ConfirmationService,
    private _router: Router,
    private _utilsService: UtilsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fnCargarTipoTransaccion();
    await this.fnCargarFuncionNegocio();
    await this.fnCargarTransacciones();
    await this.fnCargarCodigosCategorias();

    this.aEstados = REPORTE_TRANSACCIONES.ESTADOS;
    this.aAtributos = REPORTE_TRANSACCIONES.ATRIBUTOS;
  }

  /**
   * @description Carga los tipos de transacciones por Listas
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTipoTransaccion(): Promise<void> {
    this.aTipoTransaccion = (
      await this._listaSeccionStateService.consultarDominio({
        dominio1: REPORTE_TRANSACCIONES.TIPO_TRANSACCION,
      })
    ).data[0]?.valoresDominios;
  }

  /**
   * @description Carga las funciones de negocios por Listas
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarFuncionNegocio(): Promise<void> {
    this.aFuncionNegocio = (
      await this._listaSeccionStateService.consultarDominio({
        dominio1: REPORTE_TRANSACCIONES.FUNCION_NEGOCIO,
      })
    ).data[0]?.valoresDominios;

    this.aFuncionNegocio = this._utilsService.fnOrdenarListas(
      this.aFuncionNegocio,
      'sAcentuado',
      'descripcion'
    );
  }

  /**
   * @description Carga las transacciones del sistema
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTransacciones(): Promise<void> {
    this.aTransacciones = (
      await this._transaccionesStateService.consultarTransaccion({})
    ).data;
  }

  /**
   * @description Carga los código de las categorías por Listas
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarCodigosCategorias(): Promise<void> {
    this.aCodigosCategorias = (
      await this._listaSeccionStateService.consultarDominio({
        dominio1: REPORTE_TRANSACCIONES.CATEGORIA,
      })
    ).data[0]?.valoresDominios;

    this.fnModificarLista();
  }

  fnModificarLista(): void {
    this.aCodigosCategorias = this.aCodigosCategorias.map((valor: any) => {
      return {
        ...valor,
        sOpcionConcatenada: valor.sigla + ' - ' + valor.descripcion,
      };
    });
  }

  /**
   * @description Permite a los autocomplete de Categorías generar la información según lo que se escriba
   * @param {any} query Desestructura query de los parámetros enviados, lo que se escribe
   * @param {string} sTipo Es el tipo de dato que se necesita para realizar el filtro
   * @return {void} No retorna datos
   */
  fnFiltrarTransacciones({ query }: any, sTipo: string): void {
    let aFiltrados: any[] = [];

    for (let i = 0; i < this.aTransacciones.length; i++) {
      let aTransaccion = this.aTransacciones[i];
      switch (sTipo) {
        case 'codigo':
          if (
            aTransaccion.codigo?.toLowerCase().indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aTransaccion.codigo);
          }
          break;

        case 'nombre':
          if (
            aTransaccion.nombre?.toLowerCase().indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aTransaccion.nombre);
          }
          break;
      }
    }

    this.aTransaccionesFiltradas = aFiltrados;
  }

  /**
   * @description Envía la data recogida del formulario para generar el reporte
   * @return {void} No retorna datos
   */
  fnGenerarReporte(): void {
    this._reporteTransacciones.generarReporteTransacciones(
      this.frmGenerarReporte.getRawValue()
    );

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
}
