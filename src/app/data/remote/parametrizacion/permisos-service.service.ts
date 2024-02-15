import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisosServiceService {
  private _urlBase: string = environment.apiBack;
  private _controlador: string = URLCONTROLADOR.permisos;
  constructor(
    private _apiRequestService: ApiRequestService
  ) { }

  public validarIngreso<T>(
    model?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/ValidarLogin`,
      model
    );
  }

  public consultarMenu<T>(
    model?: any
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/CargarMenu`,
      model
    );
  }
}
