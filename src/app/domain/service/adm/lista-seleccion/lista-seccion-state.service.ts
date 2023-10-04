import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { ListaSeleccionService } from '../../../../data/remote/adm/lista-seleccion/lista-seleccion.service';
import {
  IListaSeleccion,
  IValoresDominio,
} from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { firstValueFrom } from 'rxjs';
import {
  NATURALEZA,
  TERCERO_JURIDICO,
  TIPO_DIRECCION,
  TIPO_DOCUMENTO,
  TIPO_RESPONSABILIDAD_TRIBUTARIA,
} from 'src/app/core/constant/adm/constants';

export interface StateGlobal {
  oListaTipoDato: any;
  oListaSeleccion: any;
  oListasSeleccion: any;
  oValoresDominio: any;
  bListaSeleccionExiste: boolean;
  bEliminarLista?: boolean;
  bEditarLista?: boolean;
  bCrearLista?: boolean;
  bEditarValorLista?: boolean;
  bCrearValorLista?: boolean;
  tipoDatoDominio: any[];
  funcionCatalogoDominio: any[];
  oListaDocuentoSoporte: any[];
  oListaExpedidor: any[];
  aCategoriaDominio: any[];
  aTipoTransaccionDominio: any[];
  aFuncionNegocioDominio: any[];
  aReqSeguridadDominio: any[];
  bEliminarValor?: boolean;
  oValoresDominioxPerfil: any[];
  oDocumentosDelimitar: any[];
}

const initialState: StateGlobal = {
  oListaTipoDato: [],
  oListaSeleccion: {},
  oListasSeleccion: {},
  oValoresDominio: {},
  bListaSeleccionExiste: false,
  bEliminarLista: undefined,
  bEditarLista: undefined,
  bCrearLista: undefined,
  bEditarValorLista: undefined,
  bCrearValorLista: undefined,
  bEliminarValor: undefined,
  tipoDatoDominio: [],
  funcionCatalogoDominio: [],
  oListaDocuentoSoporte: [],
  oListaExpedidor: [],
  aCategoriaDominio: [],
  aTipoTransaccionDominio: [],
  aFuncionNegocioDominio: [],
  aReqSeguridadDominio: [],
  oValoresDominioxPerfil: [],
  oDocumentosDelimitar: [],
};

export const selectListaServicio = (state: StateGlobal) =>
  state.oListaSeleccion;

@Injectable({
  providedIn: 'root',
})
export class ListaSeccionStateService extends State<StateGlobal> {
  constructor(private _listaSeleccionService: ListaSeleccionService) {
    super(initialState);
  }

  /**
   * @description consulta los paises
   * @returns lista de paises
   */
  public obtenerListadoPaises(): Promise<IRespuestaApi> {
    return firstValueFrom(this._listaSeleccionService.obtenerListadoPaises());
  }

  /**
   * @description consulta las regiones
   * @returns lista de regiones
   */
  public obtenerRegionPorId(id: any): Promise<IRespuestaApi> {
    return firstValueFrom(this._listaSeleccionService.obtenerRegionPorId(id));
  }

  /**
   * @description consulta las ciudades
   * @returns lista de ciudades
   */
  public obtenerCiudadPorId(id: any): Promise<IRespuestaApi> {
    return firstValueFrom(this._listaSeleccionService.obtenerCiudadPorId(id));
  }

  /**
   * @description consulta los valores para el tipo de documento tanto natural y juridica
   * @param model parametros de consulta deppendiendo el tipo de persona y su naturaleza
   * @returns lista de valores
   */
  public consultarListaTipoDocumentoNatJuri(
    model: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._listaSeleccionService.consultarListaTipoDocumentoNatJuri(model)
    );
  }

  /**
   * @description consulta los valores para el dominio tipo de direccion
   * @returns lista de tipos de direccion
   */
  public consultarTipoDireccion(): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._listaSeleccionService.consultarListaSeleccion(TIPO_DIRECCION)
    );
  }

  /**
   * @description consulta los valores para el dominio tipo documento de la persona
   * @returns lista de tipos de documento
   */
  public consultarTipoDocumento(): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._listaSeleccionService.consultarListaSeleccion(TIPO_DOCUMENTO)
    );
  }

  /**
   * @description consulta los valores para el dominio naturaleza de la persona
   * @returns lista de naturaleza del tercero
   */
  public consultarNaturaleza(): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._listaSeleccionService.consultarListaSeleccion(NATURALEZA)
    );
  }

  /**
   * @description consulta los valores para tipo de responsabilidad tributaria
   * @returns lista de tipos responsabilidades tributarias
   */
  public consultarTipoResponsabilidadTributaria(): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._listaSeleccionService.consultarListaSeleccion(
        TIPO_RESPONSABILIDAD_TRIBUTARIA
      )
    );
  }

  /**
   * @description consulta los valores para el dominio tipo tercero juridico
   * @returns lista de tipo tercero juridico
   */
  public consultarTipoTerceroJuridico(): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._listaSeleccionService.consultarListaSeleccion(TERCERO_JURIDICO)
    );
  }

  /**
   * @description Consulta los valores para el dominio año
   * @param model
   */
  public consultarListaAnio<T>(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._listaSeleccionService.consultarListaSeleccion(model)
    );
  }

  /**
   * @description Consulta los valores para el dominio tipo dia
   * @param model
   */
  public consultarListaTipoDia<T>(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._listaSeleccionService.consultarListaSeleccion(model)
    );
  }

  /**
   * @description Consulta los valores para el dominio tipo dato
   * @param model
   */
  public consultarListaTipoDato(model?: any) {
    this._listaSeleccionService.consultarListaSeleccion(model).subscribe({
      next: (resp: any) => {
        this.setState({ oListaTipoDato: resp?.data[0]?.valoresDominios });
      },
    });
  }

  /**
   * @description Consulta los valores para el tipo documento
   * @param model
   */
  public consultarListaDocumentoSoporte(model?: any) {
    this._listaSeleccionService.consultarListaSeleccion(model).subscribe({
      next: (resp: any) => {
        this.setState({
          oListaDocuentoSoporte: resp?.data[0]?.valoresDominios,
        });
      },
    });
  }

  /**
   * @description Consulta los valores para expedidor
   * @param model
   */
  public consultarListaExpedidor(model?: any) {
    this._listaSeleccionService.consultarListaSeleccion(model).subscribe({
      next: (resp: any) => {
        this.setState({
          oListaExpedidor: resp?.data[0]?.valoresDominios,
        });
      },
    });
  }

  /**
   * @description Consulta los valores para el tipo documento soporte
   * @param model tipo de documento a consultar
   */
  public consultarTipoDocumentoSoporte<T>(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._listaSeleccionService.obtenerValoresDominiosxPerfil(model)
    );
  }

  public consultarListaSeleccion(model: any) {
    this._listaSeleccionService.consultarListaSeleccion(model).subscribe({
      next: (resp: any) => {
        this.setState({ oListaSeleccion: resp?.data });
      },
    });
  }

  public obtenerValoresDominiosxPerfil(model: any) {
    this._listaSeleccionService
      .obtenerValoresDominiosxPerfil<IRespuestaApi>(model)
      .subscribe({
        next: (resp: any) => {
          this.setState({ oValoresDominioxPerfil: resp?.data });
        },
      });
  }

  /**
   * Descripción: Consulta los valores de dominio de una Lista de Selección
   * @param {string} sListaSeleccion Nombre de la lista de selección
   */
  public consultarValoresDominio(sListaSeleccion: string | undefined) {
    var filtro = { dominio1: sListaSeleccion };
    this._listaSeleccionService.consultarListaSeleccion(filtro).subscribe({
      next: (resp: any) => {
        this.setState({ oListaSeleccion: resp?.data[0] });
        this.setState({ oValoresDominio: resp?.data[0]?.valoresDominios });
      },
    });
  }

  public consultarListasSeleccion() {
    this._listaSeleccionService
      .consultarListasSeleccion<IRespuestaApi>()
      .subscribe({
        next: (respuesta) => {
          respuesta.estado && Object.keys(respuesta.data).length > 0
            ? this.setState({ oListasSeleccion: respuesta.data })
            : this.setState({ oListasSeleccion: [] });
        },
      });
  }

  /**
   * @description Crea una Lista de Selección
   * @param {ListaSeleccion} oListaSeleccion Objeto con la información de la lista de selección
   * @return {void} No retorna datos
   */
  public crearListaSeleccion(oListaSeleccion: IListaSeleccion): void {
    this._listaSeleccionService
      .crearListaSeleccion<IRespuestaApi>(oListaSeleccion)
      .subscribe({
        next: (respuesta) => {
          respuesta.estado && Object.keys(respuesta.data).length > 0
            ? this.setState({ bCrearLista: true })
            : this.setState({ bCrearLista: false });
        },
      });
  }

  /**
   * @description Guarda el valor de la lista de dominio dependiendo de la acción (Guardar / Editar)
   * @param {ValoresDominio} oValoresDominio Recibe el objeto de los valores de dominio
   * @return {void} No retorna datos
   */
  public crearValoresListaSeleccion(oValoresDominio: IValoresDominio): void {
    this._listaSeleccionService
      .crearValoresListaSeleccion<IRespuestaApi>(oValoresDominio)
      .subscribe({
        next: (respuesta) => {
          this.setState({ bCrearValorLista: respuesta.estado });
        },
      });
  }

  /**
   * @description Edita la los valores de la lista de dominio
   * @param {ValoresDominio} oValoresDominio Recibe el objeto de los valores de dominio
   * @return {void} No retorna datos
   */
  public editarValoresListaSeleccion(oValoresDominio: IValoresDominio) {
    this._listaSeleccionService
      .editarValorLista<IRespuestaApi>(oValoresDominio)
      .subscribe({
        next: (respuesta) => {
          this.setState({ bEditarValorLista: respuesta.estado });
        },
      });
  }

  /**
   * @description Elimina un valor de lista de dominio
   * @param {ValoresDominio} oValoresDominio Recibe el objeto de los valores de dominio
   * @return {void} No retorna datos
   */
  public eliminarValorDominio(oValoresDominio: IValoresDominio): void {
    this._listaSeleccionService
      .eliminarValorDominio<IRespuestaApi>(oValoresDominio)
      .subscribe({
        next: (respuesta) => {
          this.setState({ bEliminarValor: respuesta.estado });
        },
      });
  }

  /**
   * Descripción: Edita una Lista de Selección y sus valores de dominio
   * @param {ListaSeleccion} oListaSeleccion Objeto con la información de la lista de selección
   */
  public editarListaSeleccion(oListaSeleccion: IListaSeleccion) {
    this._listaSeleccionService
      .editarListaSeleccion<IRespuestaApi>(oListaSeleccion)
      .subscribe({
        next: (respuesta) => {
          respuesta.estado && Object.keys(respuesta.data).length > 0
            ? this.setState({ bEditarLista: true })
            : this.setState({ bEditarLista: false });
        },
      });
  }

  /**
   * Descripción: Consulta los valores para el dominio tipo de dato
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   * @param model
   */
  public consultatTipoDato(model?: any) {
    this._listaSeleccionService.consultarListaSeleccion(model).subscribe({
      next: (resp: any) => {
        this.setState({ tipoDatoDominio: resp?.data[0]?.valoresDominios });
      },
    });
  }

  /**
   * Descripción: Consulta los valores para el dominio Función de Catálogo
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   * @param model
   */
  public consultatFuncionCatalogo(model?: any) {
    this._listaSeleccionService.consultarListaSeleccion(model).subscribe({
      next: (resp: any) => {
        this.setState({
          funcionCatalogoDominio: resp?.data[0]?.valoresDominios,
        });
      },
    });
  }

  /**
   * Descripción: Consulta los valores para el dominio Categoria
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 11/04/2023
   * @param model
   */
  public consultarCategoria(model?: any) {
    this._listaSeleccionService.consultarListaSeleccion(model).subscribe({
      next: (resp: any) => {
        this.setState({
          aCategoriaDominio: resp?.data[0]?.valoresDominios,
        });
      },
    });
  }

  /**
   * Descripción: Consulta los valores para el dominio Tipo de Transacción
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 11/04/2023
   * @param model
   */
  public consultarTipoTransaccion(model?: any) {
    this._listaSeleccionService.consultarListaSeleccion(model).subscribe({
      next: (resp: any) => {
        this.setState({
          aTipoTransaccionDominio: resp?.data[0]?.valoresDominios,
        });
      },
    });
  }

  /**
   * Descripción: Consulta los valores para el dominio Función de Negocio
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 11/04/2023
   * @param model
   */
  public consultarFuncionNegocio(model?: any) {
    this._listaSeleccionService.consultarListaSeleccion(model).subscribe({
      next: (resp: any) => {
        this.setState({
          aFuncionNegocioDominio: resp?.data[0]?.valoresDominios,
        });
      },
    });
  }

  /**
   * Descripción: Consulta los valores para el dominio Alto Requerimiento de Seguridad
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 11/04/2023
   * @param model
   */
  public consultarAltoReqSeguridad(model?: any) {
    this._listaSeleccionService.consultarListaSeleccion(model).subscribe({
      next: (resp: any) => {
        this.setState({
          aReqSeguridadDominio: resp?.data[0]?.valoresDominios,
        });
      },
    });
  }

  public consultarTipoDocumentoSoporteLS(oModel?: any) {
    return this._listaSeleccionService.consultarListaSeleccion<IRespuestaApi>(
      oModel
    );
  }

  /** State con Promise */

  /**
   * @description State que consulta los dominios del sistema
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Promise} Promise<IRespuestaApi> devuelve con rxjs el primer resultados obtenido
   */
  public fnConsultarDominio<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._listaSeleccionService.fnConsultarDominio(oModel)
    );
  }

  public consultarDominio<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(this._listaSeleccionService.consultarDominio(oModel));
  }
}
