import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { IUsuario } from 'src/app/domain/interface/parametrizacion/usuario.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _urlBase: string = environment.apiBack;
  private _controlador: string = URLCONTROLADOR.usuario;
  constructor(
    private _apiRequestService: ApiRequestService
  ) { }

  public listarUsuarios<T>(
    model?: IUsuario
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/ObtenerUsuarios`, model
    );
  }

  public consultarUsuario<T>(
    model?: IUsuario
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/ObtenerUsuario`, model
    );
  }

  public saveUsuario<T>(
    model?: IUsuario
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/GuardarUsuario`, model
    );
  }

  public updateUsuario<T>(
    model?: IUsuario
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.put<T>(
      `${this._urlBase}/${this._controlador}/ActualizarUsuario`, model
    );
  }
}
