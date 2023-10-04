import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from 'src/app/core/services/api-request.service';

import { URLACCION, URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { environment } from 'src/environments/environment';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

@Injectable({
  providedIn: 'root',
})
export class CuentasBancariasService {
  private _urlBase: string = environment.apiAdmProcesos;
  private _controlador: string = URLCONTROLADOR.apiCuentasBancarias;
  private _controladorTerceros: string = URLCONTROLADOR.apiTerceros;
  private _obtenerTerceros: string = URLACCION.obtenerTerceros;
  private _obtenerCuentasBancarias: string = URLACCION.obtenerCuentasBancarias;
  private _obtenerConfiguracionCuenta: string =
    URLACCION.obtenerConfiguracionCuenta;
  private _guardarCuentasBancarias: string = URLACCION.guardarCuentasBancarias;
  private _actualizarCuentasBancarias: string =
    URLACCION.actualizarCuentasBancarias;

  constructor(private _apiRequestService: ApiRequestService) {}

  public fnConsultarTercero(oModel?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controladorTerceros}/${this._obtenerTerceros}`,
      oModel
    );
  }

  public fnConsultarCuentaBancaria(oModel?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerCuentasBancarias}`,
      oModel
    );
  }

  public fnConsultarConfiguracionCuenta(
    oModel?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerConfiguracionCuenta}`,
      oModel
    );
  }

  public fnGuardarCuentasBancarias(oModel?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.post<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._guardarCuentasBancarias}?usuarioAuditoria=1`,
      oModel
    );
  }

  public fnActualizarCuentaBancaria(oModel?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.put<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._actualizarCuentasBancarias}?usuarioAuditoria=1`,
      oModel
    );
  }
}
