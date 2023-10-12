import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { IGarantia } from 'src/app/domain/interface/procesos/garantia.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GarantiaService {
  private _urlBase: string = environment.apiBack;
  private _controlador: string = URLCONTROLADOR.garantia;
  constructor(private _apiRequestService: ApiRequestService) { }

  public listarGarantias<T>(model?: IGarantia): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(`${this._urlBase}/${this._controlador}`, model);
  }

  public guardarGarantia<T>(model?: IGarantia): Observable<IRespuestaApi> {
    return this._apiRequestService.post<T>(`${this._urlBase}/${this._controlador}`, model);
  }

  public actualizarGarantia<T>(model?: IGarantia): Observable<IRespuestaApi> {
    return this._apiRequestService.put<T>(`${this._urlBase}/${this._controlador}`, model);
  }
}
