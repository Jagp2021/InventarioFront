import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { IVenta } from 'src/app/domain/interface/procesos/venta.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private _urlBase: string = environment.apiBack;
  private _controlador: string = URLCONTROLADOR.garantia;
  constructor(private _apiRequestService: ApiRequestService) { }

  public listarVentas<T>(model?: IVenta): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(`${this._urlBase}/${this._controlador}`, model);
  }

  public guardarVenta<T>(model?: IVenta): Observable<IRespuestaApi> {
    return this._apiRequestService.post<T>(`${this._urlBase}/${this._controlador}`, model);
  }
}
