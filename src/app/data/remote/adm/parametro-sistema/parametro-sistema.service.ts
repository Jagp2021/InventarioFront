import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLACCION, URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametroSistemaService {
  private _urlBase: string = environment.apiAdmDominio;
  private _controlador: string = URLCONTROLADOR.apiParametrosSistema;
  private _obtenerParametroSistema: string = URLACCION.obtenerParametroSistema;
  
  constructor(private _apiRequestService: ApiRequestService) { }

  public fnConsultarParametroSistema(oModel?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBase}/${this._controlador}/${this._obtenerParametroSistema}`,
      oModel
    );
  }
}
