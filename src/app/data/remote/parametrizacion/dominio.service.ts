import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { IDominio } from 'src/app/domain/interface/parametrizacion/dominio.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DominioService {
  private _urlBase: string = environment.apiBack;
  private _controlador: string = URLCONTROLADOR.dominio;
  constructor(
    private _apiRequestService: ApiRequestService
  ) { }

  public listarDominios<T>(
    model?: IDominio
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/ObtenerDominios`,
      model
    );
  }

  public consultarPerfiles<T>(
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/ObtenerPerfiles`
    );
  }
}
