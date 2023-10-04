import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as api from 'src/app/core/constant/url-api';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  constructor(private _apiRequest: ApiRequestService) {}

  /**
   * Descripción: Servicio que obtiene las coincidencias de la marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   * @param model
   * @returns
   */
  public obtenerCoincidenciaMarca<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.marca}/${api.URLACCION.obtenerCoincidenciaMarca}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   * Descripción: Servicio que obtiene los valores de las marcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   * @param model
   * @returns
   */
  public listarValoresMarcaFuncion<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.marca}/${api.URLACCION.listarValoresMarcasFuncion}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite obtener una marca por cualquier parametro
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   * @param model
   * @returns
   */
  public obtenerMarca<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.marca}/${api.URLACCION.obtenerMarca}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite crear las marcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   * @param model
   * @returns
   */
  public crearMarca<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.marca}/${api.URLACCION.crearMarca}`;
    return this._apiRequest.post<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite editar una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   * @param model
   * @returns
   */
  public editarMarca<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.marca}/${api.URLACCION.editarMarca}`;
    return this._apiRequest.put<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite eliminar marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   * @param model
   * @returns
   */
  public eliminarMarca<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.marca}/${api.URLACCION.eliminarMarca}`;
    return this._apiRequest.post<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite obtener los valores de la marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   * @param model
   * @returns
   */
  public obtenerValorMarca<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.marca}/${api.URLACCION.obtenerValorMarca}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite crear un valor a una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   * @param model
   * @returns
   */
  public crearValorMarca<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.marca}/${api.URLACCION.crearValorMarca}`;
    return this._apiRequest.post<T>(route, model);
  }

  /**
   * Descripción: Servicio que elimina un valor de la marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   * @param model
   * @returns
   */
  public eliminarValorMarca<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.marca}/${api.URLACCION.eliminarValorMarca}`;
    return this._apiRequest.post<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite editar valor de la marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   * @param model
   * @returns
   */
  public editarValorMarca<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmDominio}/${api.URLCONTROLADOR.marca}/${api.URLACCION.editarValorMarca}`;
    return this._apiRequest.post<T>(route, model);
  }
}
