import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLACCION, URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { IConsecutivoTipoDocumento } from 'src/app/domain/interface/adm/consecutivo/consecutivo-tipo-documento.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionConsecutivoService {
  private _urlBase: string = environment.apiAdmProcesos;
  private _controlador: string = URLCONTROLADOR.secuenciaDocumentoSoporte;
  private _obtenerSecuenciaDocumentoSoporte: string =
    URLACCION.obtenerSecuenciaDocumentoSoporte;
  private _validarActualizacionConsecutivoSecuenciaDocumentoSoporte: string =
    URLACCION.validarActualizacionConsecutivoSecuenciaDocumentoSoporte;

  constructor(private _apiRequestService: ApiRequestService) {}

  /**
   * Descripción: Servicio que obtiene la secuencia de los documentos soporte
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 15/04/2023
   * @returns
   */
  public consultarSecuenciaDocumentoSoporte<T>(
    tipoDocumentoSoporte: IConsecutivoTipoDocumento
  ): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/${this._obtenerSecuenciaDocumentoSoporte}`,
      tipoDocumentoSoporte
    );
  }

  /**
   * Descripción: Servicio que obtiene la secuencia de los documentos soporte
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 15/04/2023
   * @returns
   */
  public validarActualizacionConsecutivoSecuenciaDocumentoSoporte<T>(
    tipoDocumentoSoporte: IConsecutivoTipoDocumento
  ): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/${this._validarActualizacionConsecutivoSecuenciaDocumentoSoporte}`,
      tipoDocumentoSoporte
    );
  }
}
