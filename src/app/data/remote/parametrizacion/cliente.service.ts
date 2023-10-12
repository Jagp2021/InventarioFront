import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { ICliente } from 'src/app/domain/interface/parametrizacion/cliente.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private _urlBase: string = environment.apiBack;
  private _controlador: string = URLCONTROLADOR.cliente;
  constructor(
    private _apiRequestService: ApiRequestService
  ) { }

  public listarClientes<T>(
    model?: ICliente
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/ListCliente`,
      model
    );
  }

  public consultarCliente<T>(
    model?: ICliente
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/GetCliente`,
      model
    );
  }

  public saveCliente<T>(
    model?: ICliente
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/SaveCliente`,
      model
    );
  }

  public updateCliente<T>(
    model?: ICliente
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.put<T>(
      `${this._urlBase}/${this._controlador}/UpdateCliente`,
      model
    );
  }

  public deleteCliente<T>(
    model?: ICliente
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.delete<T>(
      `${this._urlBase}/${this._controlador}/DeleteCliente`,
      model
    );
  }
}
