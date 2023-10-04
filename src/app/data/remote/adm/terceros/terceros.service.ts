import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as api from 'src/app/core/constant/url-api';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TercerosService {
  constructor(private _apiRequest: ApiRequestService) {}

  /**
   *
   * @param model
   * @returns
   */
  public obtenerCiudadPaisRegion<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.apiUbicacion}/${api.URLACCION.obtenerJerarquiaCiudadTercero}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerTerceros<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.obtenerPersonas}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerInformacionTributaria<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.obtenerInformacionTributaria}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerUbicacionesGeograficas<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.obtenerUbicacionesGeograficasPersonas}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerActividadesEconomicasCiiu<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.obtenerActividadesEconomicasCIIU}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerResponsabilidadesTributariasPersonas<T>(
    model: any
  ): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.obtenerResponsabilidadesTributariasPersonas}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerParticipantesColaboracion<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.obtenerParticipantesColaboracion}`;
    return this._apiRequest.get<T>(route, model);
  }

  public crearPersonaInformacionBasica<T>(
    id: number,
    model: any
  ): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.crearPersonaInformacionBasica}?usuario=${id}`;
    return this._apiRequest.post<T>(route, model);
  }

  public crearInformacionTributaria<T>(id: number, model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.crearInformacionTributaria}?usuario=${id}`;
    return this._apiRequest.post<T>(route, model);
  }

  public crearUbicacionGeograficaPersona<T>(
    id: number,
    model: any
  ): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.crearUbicacionGeograficaPersona}?usuario=${id}`;
    return this._apiRequest.post<T>(route, model);
  }

  public crearDireccion<T>(id: number, model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.crearDireccionUbicacionGeograficaPersona}?usuario=${id}`;
    return this._apiRequest.post<T>(route, model);
  }

  public actualizarPersonaInformacionBasica<T>(
    id: number,
    model: any
  ): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.actualizarPersonaInformacionBasica}?usuario=${id}`;
    return this._apiRequest.post<T>(route, model);
  }

  public actualizarInformacionTributaria<T>(
    id: number,
    model: any
  ): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.actualizarInformacionTributaria}?usuario=${id}`;
    return this._apiRequest.post<T>(route, model);
  }

  public actualzarUbicacionGeograficaPersona<T>(
    id: number,
    model: any
  ): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.actualzarUbicacionGeograficaPersona}?usuario=${id}`;
    return this._apiRequest.post<T>(route, model);
  }

  public ActualzarDireccionUbicacionGeograficaPersona<T>(
    id: number,
    model: any
  ): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.tercero}/${api.URLACCION.actualzarDireccionUbicacionGeograficaPersona}?usuario=${id}`;
    return this._apiRequest.post<T>(route, model);
  }
}
