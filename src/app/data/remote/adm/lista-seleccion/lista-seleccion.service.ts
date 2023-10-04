import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiRequestService } from 'src/app/core/services/api-request.service';

import { environment } from '../../../../../environments/environment';
import { URLCONTROLADOR, URLACCION } from '../../../../core/constant/url-api';
import {
  IListaSeleccion,
  IValoresDominio,
} from '../../../../domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

@Injectable({
  providedIn: 'root',
})
export class ListaSeleccionService {
  private _urlBase: string = environment.apiAdmDominio;
  private _controlador: string = URLCONTROLADOR.apiDominio;
  private _apiUbicacion: string = URLCONTROLADOR.apiUbicacion;
  private _obtenerDominio: string = URLACCION.obtenerDominio;
  private _crearDominio: string = URLACCION.crearDominio;
  private _obtenerDominiosExistentes: string =
    URLACCION.obtenerDominiosExistentes;
  private _crearValoresDominio: string = URLACCION.crearValoresDominio;
  private _editarDominio: string = URLACCION.editarDominio;
  private _editarValoresDominio: string = URLACCION.editarValoresDominio;
  private _eliminarValorDominio: string = URLACCION.eliminarValorDominio;
  private _obtenerValoresDominio: string = URLACCION.obtenerValoresDominio;
  private _obtenerFGUbicacionGeo: string = URLACCION.obtenerFGUbicacionGeo;
  private _relacionesCrud: string = URLCONTROLADOR.apiRelacionesCrud;
  private _ObtenerValoresDominiosRelacionadosSegundoCriterio: string =
    URLACCION.obtenerValoresDominiosRelacionadosSegundoCriterio;

  constructor(private _apiRequestService: ApiRequestService) {}

  public obtenerListadoPaises<T>(): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._apiUbicacion}/${this._obtenerFGUbicacionGeo}?TipoUbicacion=PAIS`
    );
  }

  public obtenerRegionPorId<T>(id: any): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._apiUbicacion}/${this._obtenerFGUbicacionGeo}?TipoUbicacion=REGI&IdUbicacionPadre=${id}`
    );
  }

  public obtenerCiudadPorId<T>(id: number): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._apiUbicacion}/${this._obtenerFGUbicacionGeo}?TipoUbicacion=CIUD&IdUbicacionPadre=${id}`
    );
  }

  /**
   * @description consulta la lista de tipo de documento tanto para persona natural y juridica
   * @param model dependiendo del tipo de persona se envia si es extranjero o nacional
   * @returns retorna una lista con los valores del tipo de documento
   */
  public consultarListaTipoDocumentoNatJuri<T>(model?: any): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._relacionesCrud}/${this._ObtenerValoresDominiosRelacionadosSegundoCriterio}`,
      model
    );
  }

  /**
   * Consultar la Lista de Selección
   * @param {sNombreLista: string}
   * @return {Observable<T>}
   */
  public consultarListaSeleccion<T>(model?: any): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/${this._obtenerDominio}`,
      model
    );
  }

  public obtenerValoresDominiosxPerfil<T>(oModel?: any): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/${this._obtenerValoresDominio}`,
      oModel
    );
  }

  /**
   * Consultar todas las Listas de Selección
   * @param {}
   * @return {Observable<T>}
   */
  public consultarListasSeleccion<T>(): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/${this._obtenerDominiosExistentes}`
    );
  }

  /**
   * Crear la Lista de Selección
   * @param {object} oListaSeleccion Data de la lista de selección
   * @return {Observable<T>} Observer<T>
   */
  public crearListaSeleccion<T>(
    oListaSeleccion: IListaSeleccion
  ): Observable<T> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/${this._crearDominio}`,
      oListaSeleccion
    );
  }

  /**
   * Crear los valores de la Lista de Selección
   * @param {object} oValoresDominio Lista de valores de dominio
   * @return {Observable<T>} Observer<T>
   */
  public crearValoresListaSeleccion<T>(
    oValoresDominio: IValoresDominio
  ): Observable<T> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/${this._crearValoresDominio}`,
      oValoresDominio
    );
  }

  /**
   * Editar la Lista de Selección
   * @param {object} oListaSeleccion Lista de Selección
   * @return {Observable<T>} Observer<T>
   */
  public editarListaSeleccion<T>(
    oListaSeleccion: IListaSeleccion
  ): Observable<T> {
    return this._apiRequestService.put<T>(
      `${this._urlBase}/${this._controlador}/${this._editarDominio}`,
      oListaSeleccion
    );
  }

  public eliminarValorDominio<T>(
    oValoresDominio: IValoresDominio
  ): Observable<T> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/${this._eliminarValorDominio}`,
      oValoresDominio
    );
  }

  /**
   * Editar valores de dominio
   * @param oValorDominio
   * @returns
   */
  public editarValorLista<T>(oValorDominio: IValoresDominio): Observable<T> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/${this._editarValoresDominio}`,
      oValorDominio
    );
  }

  /** Service con Promise */

  /**
   * @description Consulta las transacciones o funcionalidades del sistema
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Observable} Observable<IRespuestaApi> devuelve un observable
   */
  public fnConsultarDominio(oModel?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerDominio}`,
      oModel
    );
  }

  public consultarDominio(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerDominio}`,
      model
    );
  }
}
