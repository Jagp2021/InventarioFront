import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { environment } from 'src/environments/environment';
import { URLCONTROLADOR, URLACCION } from 'src/app/core/constant/url-api';
import { ITransacciones } from 'src/app/domain/interface/adm/transacciones/transacciones.interface';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { Privilegios } from 'src/app/domain/interface/adm/transacciones/privilegios.interface';

@Injectable({
  providedIn: 'root',
})
export class TransaccionesService {
  private _urlBase: string = environment.apiAdmProcesos;
  private _urlBaseSeg: string = environment.apiSegProcesos;
  private _controlador: string = URLCONTROLADOR.apiTransaccion;
  private _controladorPrivilegios: string = URLCONTROLADOR.privilegios;
  private _obtenerTransacciones: string = URLACCION.obtenerTransacciones;
  private _crearTransaccion: string = URLACCION.crearTransaccion;
  private _editarTransaccion: string = URLACCION.editarTransaccion;
  private _cambiarEstadoPrivilegios: string =
    URLACCION.cambiarEstadoPrivilegios;

  constructor(private _apiRequestService: ApiRequestService) {}

  /**
   * Descripción: Consultar las transacciones del sistema
   * @param {any} Modelo de datos necesario para el cargue de información
   * @return {Observable<T>} Regresa observable de información
   */
  public consultarTransacciones<T>(
    model?: ITransacciones
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/${this._obtenerTransacciones}`,
      model
    );
  }

  /**
   * Descripción: Crear las transacciones del sistema
   * @param {any} Modelo de datos necesario para el cargue de información
   * @return {Observable<T>} Regresa observable de información
   */
  public crearTransaccion<T>(
    model?: ITransacciones
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/${this._crearTransaccion}`,
      model
    );
  }

  /**
   * Descripción: Crear las transacciones del sistema
   * @param {any} Modelo de datos necesario para el cargue de información
   * @return {Observable<T>} Regresa observable de información
   */
  public editarTransaccion<T>(
    model?: ITransacciones
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.put<T>(
      `${this._urlBase}/${this._controlador}/${this._editarTransaccion}`,
      model
    );
  }

  /**
   * Fecha: 14/04/2023
   * @description Cambiar el estado de las transacciones cuando cambia su estado
   * @author Javier Gonzalez
   * @param privilegios
   * @returns
   */
  public cambiarEstadoPrivilegios<T>(
    privilegios?: Privilegios
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.put<T>(
      `${this._urlBaseSeg}/${this._controladorPrivilegios}/${this._cambiarEstadoPrivilegios}`,
      privilegios
    );
  }

  /** Service con Promise */

  /**
   * @description Consulta las transacciones o funcionalidades del sistema
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Observable} Observable<IRespuestaApi> devuelve un observable
   */
  public fnConsultarTransaccion(oModel?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerTransacciones}`,
      oModel
    );
  }

  public consultarTransaccion(oModel?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerTransacciones}`,
      oModel
    );
  }
}
