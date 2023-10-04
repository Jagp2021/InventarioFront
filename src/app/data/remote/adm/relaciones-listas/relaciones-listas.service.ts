import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from 'src/app/core/services/api-request.service';

import { URLACCION, URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { environment } from 'src/environments/environment';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

@Injectable({
  providedIn: 'root',
})
export class RelacionesListasService {
  private _urlBase: string = environment.apiAdmDominio;
  private _controlador: string = URLCONTROLADOR.apiRelacionesCrud;
  private _obtenerFuenteExterna: string = URLACCION.obtenerRelacionesCRUD;
  private _obtenerDominiosRelacionados: string =
    URLACCION.obtenerDominiosRelacionados;
  private _crearListaValoresRelacionados: string =
    URLACCION.crearListaValoresRelacionados;
  private _obtenerValoresRelacionadosH: string =
    URLACCION.obtenerValoresRelacionadosH;
  private _eliminarValoresRelacionados: string =
    URLACCION.eliminarValoresRelacionados;

  constructor(private _apiRequestService: ApiRequestService) {}

  public consultarRelacionesCrud(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerFuenteExterna}`,
      model
    );
  }

  public consultarDominioRelacionados(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerDominiosRelacionados}`,
      model
    );
  }

  public consultarValoresRelacionados(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerValoresRelacionadosH}`,
      model
    );
  }

  public crearListaValoresRelacionados(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.post<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._crearListaValoresRelacionados}`,
      model
    );
  }

  public eliminarValoresRelacionados(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.delete<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._eliminarValoresRelacionados}`,
      model
    );
  }
}
