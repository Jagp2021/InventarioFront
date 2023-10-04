import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as api from 'src/app/core/constant/url-api';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarioPaisService {
  constructor(private _apiRequest: ApiRequestService) {}

  /**
   * Descripción: Servicio que obtiene el calendario pais
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 26/5/2023
   * @param model
   * @returns
   */
  public obtenerCalendario<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.calendarioSistema}/${api.URLACCION.obtenerCalendarioSistema}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite crear un calenario pais
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 26/5/2023
   * @param model
   * @returns
   */
  public crearCalendario<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.calendarioSistema}/${api.URLACCION.guardarCalendarioSistema}`;
    return this._apiRequest.post<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite editar calendario pais
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 26/05/2023
   * @param model
   * @returns
   */
  public editarCalendario<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.calendarioSistema}/${api.URLACCION.ActualizarListaCalendarioSistema}`;
    return this._apiRequest.put<T>(route, model);
  }

  /**
   * Descripción: Servicio que elimina un registro del calendario pais
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 26/05/2023
   * @param model
   * @returns
   */
  public eliminarcalendarioDia<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.calendarioSistema}/${api.URLACCION.eliminarCalendarioPais}`;
    return this._apiRequest.delete<T>(route, model);
  }
}
