import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TRANSACCIONES } from 'src/app/core/constant/adm/transacciones.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IValoresDominio } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import {
  ITransacciones,
  IEstadosTransaccion,
} from 'src/app/domain/interface/adm/transacciones/transacciones.interface';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { TransaccionesStateService } from 'src/app/domain/service/adm/transacciones/transacciones-state.service';

@Component({
  selector: 'app-com-tabla-transacciones',
  templateUrl: './com-tabla-transacciones.component.html',
  styleUrls: ['./com-tabla-transacciones.component.scss'],
})
export class ComTablaTransaccionesComponent implements OnInit {
  public bMostrarLoading: boolean = false;
  public oTransacciones: ITransacciones[] = [];
  public aTipoTransaccion: IValoresDominio[] = [];
  public aFuncionNegocio: IValoresDominio[] = [];
  public aCategoria: IValoresDominio[] = [];
  public aReqSeguridad: IValoresDominio[] = [];
  public aEstados: IEstadosTransaccion[] = [];

  constructor(
    private router: Router,
    private _dominioService: ListaSeccionStateService,
    private _transaccionService: TransaccionesStateService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.aEstados = TRANSACCIONES.ESTADOS_VALORES;

    // this.oTransacciones = [
    //   {
    //     tipoTransaccion: 'Reporte',
    //     funcionNegocio: 'PAC',
    //     codigoTransaccion: 'Activo',
    //     nombreTransaccion: 'Activo',
    //     codigoCategoria: 'Activo',
    //     nombreCategoria: 'Activo',
    //     estadoTransaccion: 'Activo',
    //   },
    //   {
    //     tipoTransaccion: 'Transacción',
    //     funcionNegocio: 'PAC',
    //     codigoTransaccion: 'Activo',
    //     nombreTransaccion: 'Activo',
    //     codigoCategoria: 'Activo',
    //     nombreCategoria: 'Activo',
    //     estadoTransaccion: 'Activo',
    //   },
    // ];

    this.cargarListas();
    this.consultarTransacciones();
  }

  editarFila(e?: ITransacciones, nIndice?: number) {
    this.router.navigate([
      'adm/transacciones/detalleTransaccion',
      e?.codigo,
      e?.categoria,
    ]);
  }

  cargarListas() {
    this.cargarCategorias();
    this.cargarTipoTransaccion();
    this.cargarAltoReqSeguridad();
    this.cargarFuncionNegocio();
  }

  /**
   *
   */
  cargarCategorias() {
    this._dominioService.consultarCategoria({
      dominio1: TRANSACCIONES.NOMBRE_LISTA_CATEGORIA,
    });
    this._dominioService
      .select((e) => e.aCategoriaDominio)
      .subscribe({
        next: (resp) => {
          this.aCategoria = resp;
          this.aCategoria = this.ordenarLista(this.aCategoria);
        },
      });
  }

  cargarTipoTransaccion() {
    this._dominioService
      .select((e) => e.aTipoTransaccionDominio)
      .subscribe({
        next: (resp) => {
          this.aTipoTransaccion = resp;
          this.aTipoTransaccion = this.ordenarLista(this.aTipoTransaccion);
        },
      });
  }

  cargarFuncionNegocio() {
    this._dominioService
      .select((e) => e.aFuncionNegocioDominio)
      .subscribe({
        next: (resp) => {
          this.aFuncionNegocio = resp;
          this.aFuncionNegocio = this.ordenarLista(this.aFuncionNegocio);
        },
      });
  }

  cargarAltoReqSeguridad() {
    this._dominioService
      .select((e) => e.aReqSeguridadDominio)
      .subscribe({
        next: (resp) => {
          this.aReqSeguridad = resp;
          this.aReqSeguridad = this.ordenarLista(this.aReqSeguridad);
        },
      });
  }

  consultarTransacciones() {
    this._transaccionService.consultarTransacciones({
      estadoFuncionalidad: TRANSACCIONES.ESTADO_ACTUALIZADO_TRANSACCION,
    });
    this._transaccionService
      .select((e) => e.oTransacciones)
      .subscribe({
        next: (resp) => {
          this.oTransacciones = resp;
        },
      });
  }

  obtenerDescripcionCampo(codigo: string, tipoDominio: string): any {
    let retorno: any;
    var lista: any[] = [];
    switch (tipoDominio) {
      case TRANSACCIONES.NOMBRE_LISTA_CATEGORIA:
        lista = this.aCategoria.filter(
          (e) => e.dominio === tipoDominio && e.sigla === codigo
        );
        retorno = lista.length > 0 ? lista[0].descripcion : '';
        break;
      case TRANSACCIONES.NOMBRE_LISTA_FUNCION_NEGOCIO:
        lista = this.aFuncionNegocio.filter(
          (e) => e.dominio === tipoDominio && e.sigla === codigo
        );
        retorno = lista.length > 0 ? lista[0].descripcion : '';
        break;
      case TRANSACCIONES.NOMBRE_LISTA_TIPO_TRANSACCION:
        lista = this.aTipoTransaccion.filter(
          (e) => e.dominio === tipoDominio && e.sigla === codigo
        );
        retorno = lista.length > 0 ? lista[0].descripcion : '';
        break;
    }

    return retorno;
  }

  /**
   * Fecha: 13/04/2023
   * @description Ordena las listas por la descripción
   * @author Asesoftware - Javier Gonzalez
   * @param alista
   * @returns
   */
  ordenarLista(alista: any): IValoresDominio[] {
    return alista.sort(
      (a: { descripcion: string }, b: { descripcion: string }) =>
        a.descripcion.localeCompare(b.descripcion)
    );
  }

  /**
   * @description Configura el hover del table para mostrar u ocultar los botones de acción
   * @param {any} e Evento disparado del table
   * @param {number} nIndice Número del indice para mostrar en el Row
   * @param {boolean} bMostrar Determina si se muestra u oculta la acción
   * @return {void} No retorna datos
   */
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
}
