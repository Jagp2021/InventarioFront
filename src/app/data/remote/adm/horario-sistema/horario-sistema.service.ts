import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as api from 'src/app/core/constant/url-api';
import { URLACCION, URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { IHorarioSistema } from 'src/app/domain/interface/adm/horario-sistema/horario-sistema.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HorarioSistemaService {
  private _urlBase: string = environment.apiAdmProcesos;
  private _controlador: string = URLCONTROLADOR.horarioSistema;
  private _crearHorariosSistema: string = URLACCION.crearHorarioSistema;
  private _obtenerHorarioSistema: string = URLACCION.obtenerHorarioSistema;
  private _editarHorarioSistema: string = URLACCION.editarHorarioSistema;

  constructor(private _apiRequestService: ApiRequestService) {}

  /**
   * Servicio que permite consultar los horarios del sistema
   * @param {}
   * @return {Observable<T>}
   */
  public consultarHorariosSistema<T>(model?: any): Observable<T> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/${this._obtenerHorarioSistema}`,
      model
    );
  }

  /**
   * Descripción: Servicio que permite crear los horarios del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   * @param oDatosAdministrativos objeto que contiene los datos a guardar
   * @returns
   */
  public crearHorarioSistema<T>(
    oHorariosSistema: IHorarioSistema
  ): Observable<T> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/${this._crearHorariosSistema}`,
      oHorariosSistema
    );
  }

  /**
   * Descripción: Servicio que permite validar si existe un horarios del sistema o esta dentro de un rango
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   * @param oDatosAdministrativos objeto que contiene los datos a validar
   * @returns
   */
  public validarHorarioSistema<T>(
    oHorariosSistema: IHorarioSistema
  ): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.horarioSistema}/${api.URLACCION.validarExistenciaHorarioSistema}`;
    return this._apiRequestService.post<T>(route, oHorariosSistema);
  }

  public editarListaSeleccion<T>(
    oHorarioSistema: IHorarioSistema
  ): Observable<T> {
    return this._apiRequestService.put<T>(
      `${this._urlBase}/${this._controlador}/${this._editarHorarioSistema}`,
      oHorarioSistema
    );
  }

  /**
   * Descripción: Servicio que elimina un horario del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   * @param model
   * @returns
   */
  public eliminarHorarioSistema<T>(model: any): Observable<T> {
    let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.horarioSistema}/${api.URLACCION.eliminarHorarioSistema}`;
    return this._apiRequestService.delete<T>(route, model);
  }
}
