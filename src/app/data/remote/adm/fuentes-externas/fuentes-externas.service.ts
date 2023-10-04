import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from 'src/app/core/services/api-request.service';

import { URLACCION, URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { environment } from 'src/environments/environment';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

@Injectable({
  providedIn: 'root',
})
export class FuentesExternasService {
  private _urlBase: string = environment.apiAdmDominio;
  private _controlador: string = URLCONTROLADOR.apiFuentesExternas;
  private _obtenerFuenteExterna: string = URLACCION.obtenerFuenteExterna;
  private _editarFuenteExterna: string = URLACCION.editarFuenteExterna;
  private _editarListaFuenteExterna: string =
    URLACCION.editarListaFuenteExterna;
  private _eliminarListaFuenteExterna: string =
    URLACCION.eliminarListaFuenteExterna;

  constructor(private _apiRequestService: ApiRequestService) {}

  public consultarFuentesExternas(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerFuenteExterna}`,
      model
    );
  }

  public editarFuentesExternas(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.put<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._editarFuenteExterna}`,
      model
    );
  }
}
