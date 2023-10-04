import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from 'src/app/core/services/api-request.service';

import { URLACCION, URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { environment } from 'src/environments/environment';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

@Injectable({
  providedIn: 'root',
})
export class DependenciaAfectacionService {
  private _urlBase: string = environment.apiAdmProcesos;
  private _controlador: string = URLCONTROLADOR.apiDependenciaAfectacion;
  private _obtenerVinculacionDependencias: string =
    URLACCION.obtenerVinculacionDependencias;
  private _guardarDependenciaAfectacion: string =
    URLACCION.guardarDependenciaAfectacion;
  private _actualizarDependenciaAfectacion: string =
    URLACCION.actualizarDependenciaAfectacion;
  private _vincularDependenciasAfectacion: string =
    URLACCION.vincularDependenciasAfectacion;
  private _desvincularDependenciasAfectacion: string =
    URLACCION.desvincularDependenciasAfectacion;
  private _eliminarDependenciaAfectacion: string =
    URLACCION.eliminarDependenciaAfectacion;

  constructor(private _apiRequestService: ApiRequestService) {}

  public fnConsultarDependencias(oModel?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerVinculacionDependencias}`,
      oModel
    );
  }

  public fnGuardarDependeciaAfectacion(
    oModel?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.post<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._guardarDependenciaAfectacion}?usuarioAuditoria=1`,
      oModel
    );
  }

  public fnActualizarDependeciaAfectacion(
    oModel?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.put<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._actualizarDependenciaAfectacion}?usuarioAuditoria=1`,
      oModel
    );
  }

  public fnVincularDependeciaAfectacion(
    oModel?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.post<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._vincularDependenciasAfectacion}?usuarioAuditoria=1`,
      oModel
    );
  }

  public fnDesvincularDependeciaAfectacion(
    oModel?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.post<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._desvincularDependenciasAfectacion}?usuarioAuditoria=1`,
      oModel
    );
  }

  public fnEliminarDependeciaAfectacion(
    oModel?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.delete<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._eliminarDependenciaAfectacion}?usuarioAuditoria=1`,
      oModel
    );
  }

  // public fnConsultarCuentaBancaria(oModel?: any): Observable<IRespuestaApi> {
  //   return this._apiRequestService.get<IRespuestaApi>(
  //     `${this._urlBase}/${this._controlador}/${this._obtenerCuentasBancarias}`,
  //     oModel
  //   );
  // }

  // public fnConsultarConfiguracionCuenta(
  //   oModel?: any
  // ): Observable<IRespuestaApi> {
  //   return this._apiRequestService.get<IRespuestaApi>(
  //     `${this._urlBase}/${this._controlador}/${this._obtenerConfiguracionCuenta}`,
  //     oModel
  //   );
  // }

  // public fnActualizarCuentaBancaria(oModel?: any): Observable<IRespuestaApi> {
  //   return this._apiRequestService.put<IRespuestaApi>(
  //     `${this._urlBase}/${this._controlador}/${this._actualizarCuentasBancarias}?usuarioAuditoria=1`,
  //     oModel
  //   );
  // }
}
