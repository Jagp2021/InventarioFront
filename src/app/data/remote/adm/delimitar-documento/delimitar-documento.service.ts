import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from 'src/app/core/services/api-request.service';

import { URLACCION, URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { environment } from 'src/environments/environment';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

@Injectable({
  providedIn: 'root',
})
export class DelimitarDocumentoService {
  private _urlBase: string = environment.apiAdmProcesos;
  private _controlador: string = URLCONTROLADOR.apiTransaccion;
  private _obtenerDocumentosSoportexFuncionalidad: string =
    URLACCION.obtenerDocumentosSoportexFuncionalidad;
  private _crearDocumentosSoportexFuncionalidad: string =
    URLACCION.crearDocumentosSoportexFuncionalidad;
  private _obtenerHMovimientosDocumentosSoporte: string =
    URLACCION.obtenerHMovimientosDocumentosSoporte;
  private _editarDocumentosSoportexFuncionalidad: string =
    URLACCION.editarDocumentosSoportexFuncionalidad;

  constructor(private _apiRequestService: ApiRequestService) {}

  public obtenerDocumentosSoportexFuncionalidad<T>(
    oModel?: any
  ): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/${this._obtenerDocumentosSoportexFuncionalidad}`,
      oModel
    );
  }

  /**
   * @description Consultar los documentos ya relacionados de un transacción
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Observable} Observable<T> devuelve un observable
   */
  public crearDocumentosSoportexFuncionalidad<T>(oModel?: any): Observable<T> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/${this._crearDocumentosSoportexFuncionalidad}`,
      oModel
    );
  }

  /**
   * @description Consultar los documentos ya relacionados de un transacción
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Observable} Observable<T> devuelve un observable
   */
  public obtenerHMovimientosDocumentosSoporte<T>(oModel?: any): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/${this._obtenerHMovimientosDocumentosSoporte}`,
      oModel
    );
  }

  /**
   * @description Consultar los documentos ya relacionados de un transacción
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Observable} Observable<T> devuelve un observable
   */
  public editarDocumentosSoportexFuncionalidad<T>(oModel?: any): Observable<T> {
    return this._apiRequestService.put<T>(
      `${this._urlBase}/${this._controlador}/${this._editarDocumentosSoportexFuncionalidad}`,
      oModel
    );
  }

  /** Service con Promise */

  /**
   * @description Consultar los documentos soporte según la Funcionalidad
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Observable<IRespuestaApi>} Observable<IRespuestaApi> devuelve un observable
   */
  public fnObtenerDocumentosSoportexFuncionalidad(
    oModel?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerDocumentosSoportexFuncionalidad}`,
      oModel
    );
  }

  /**
   * @description Crear los documentos que se relacionan a una transacción
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Observable<IRespuestaApi>} Observable<IRespuestaApi> devuelve un observable
   */
  public fnCrearDocumentoSoportexFuncionalidad<T>(
    oModel?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.post<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._crearDocumentosSoportexFuncionalidad}`,
      oModel
    );
  }

  /**
   * @description Editar los documentos ya relacionados de un transacción
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Observable<IRespuestaApi>} Observable<IRespuestaApi> devuelve un observable
   */
  public fnEditarDocumentoSoportexFuncionalidad<T>(
    oModel?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.put<T>(
      `${this._urlBase}/${this._controlador}/${this._editarDocumentosSoportexFuncionalidad}`,
      oModel
    );
  }
}
