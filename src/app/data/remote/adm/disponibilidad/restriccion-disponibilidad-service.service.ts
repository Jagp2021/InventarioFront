import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as api from 'src/app/core/constant/url-api';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestriccionDisponibilidadServiceService {
  constructor(private _apiRequest: ApiRequestService) {}

  /**
   * Descripción: Servicio que obtiene las restricciones de disponibilidad
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 8/5/2023
   * @param model
   * @returns
   */
  public obtenerRestriccion<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.obtenerRestriccion}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite crear una restriccion de disponibilidad
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 8/5/2023
   * @param model
   * @returns
   */
  public crearRestriccion<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.crearRestriccion}`;
    return this._apiRequest.post<T>(route, model);
  }

  /**
   * Descripción: Servicio que permite editar una restriccion de disponibilidad
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 8/05/2023
   * @param model
   * @returns
   */
  public editarRestriccion<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.editarRestriccion}`;
    return this._apiRequest.put<T>(route, model);
  }

  // /**
  //  * Descripción: Servicio que valida la existencia de una funcionalidad
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 8/5/2023
  //  * @param model
  //  * @returns
  //  */
  // public validarExistenciaFuncionalidad<T>(model: any): Observable<T> {
  //   let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.validarExistenciaFuncionalidad}`;
  //   return this._apiRequest.get<T>(route, model);
  // }

  // /**
  //  * Descripción: Servicio que valida la existencia de una restriccion de horario
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 8/5/2023
  //  * @param model
  //  * @returns
  //  */
  // public validarExistenciaRestriccionHorario<T>(model: any): Observable<T> {
  //   let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.validarExistenciaRestriccionHorario}`;
  //   return this._apiRequest.get<T>(route, model);
  // }

  // /**
  //  * Descripción: Servicio que valida la existencia de una restriccion por periodo
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 8/5/2023
  //  * @param model
  //  * @returns
  //  */
  // public validarExistenciaPeriodo<T>(model: any): Observable<T> {
  //   let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.validarExistenciaPedido}`;
  //   return this._apiRequest.get<T>(route, model);
  // }

  // /**
  //  * Descripción: Servicio que valida la existencia de una restriccion por perfil
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 8/5/2023
  //  * @param model
  //  * @returns
  //  */
  // public validarExistenciaPerfil<T>(model: any): Observable<T> {
  //   let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.validarExistenciaPerfil}`;
  //   return this._apiRequest.get<T>(route, model);
  // }

  // /**
  //  * Descripción: Servicio que elimina una restriccion de funcionalidad
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 10/05/2023
  //  * @param model
  //  * @returns
  //  */
  // public eliminarRestriccionFuncionalidad<T>(model: any): Observable<T> {
  //   let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.eliminarRestriccionFuncionalidad}`;
  //   return this._apiRequest.post<T>(route, model);
  // }

  // /**
  //  * Descripción: Servicio que elimina una restriccion entidad Pci
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 10/05/2023
  //  * @param model
  //  * @returns
  //  */
  // public eliminarRestriccionEntidadPci<T>(model: any): Observable<T> {
  //   let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.eliminarRestriccionEntidadPci}`;
  //   return this._apiRequest.post<T>(route, model);
  // }

  // /**
  //  * Descripción: Servicio que elimina una restriccion de horarios
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 10/05/2023
  //  * @param model
  //  * @returns
  //  */
  // public eliminarRestriccionHorario<T>(model: any): Observable<T> {
  //   let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.eliminarRestriccionHorarios}`;
  //   return this._apiRequest.post<T>(route, model);
  // }

  // /**
  //  * Descripción: Servicio que elimina una restriccion de perfil
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 10/05/2023
  //  * @param model
  //  * @returns
  //  */
  // public eliminarRestriccionPerfil<T>(model: any): Observable<T> {
  //   let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.eliminarRestriccionPerfil}`;
  //   return this._apiRequest.post<T>(route, model);
  // }

  // /**
  //  * Descripción: Servicio que elimina una restriccion de periodo
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 10/05/2023
  //  * @param model
  //  * @returns
  //  */
  // public eliminarRestriccionPeriodo<T>(model: any): Observable<T> {
  //   let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.eliminarRestriccionPeriodo}`;
  //   return this._apiRequest.post<T>(route, model);
  // }

  // /**
  //  * Descripción: Servicio que elimina una restriccion de periodo
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 10/05/2023
  //  * @param model
  //  * @returns
  //  */
  // public eliminarRestriccionUsuario<T>(model: any): Observable<T> {
  //   let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.restriccionDisponibilidad}/${api.URLACCION.eliminarRestriccionUsuario}`;
  //   return this._apiRequest.post<T>(route, model);
  // }
}
