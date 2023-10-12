import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { IProveedor } from 'src/app/domain/interface/parametrizacion/proveedor.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private _urlBase: string = environment.apiBack;
  private _controlador: string = URLCONTROLADOR.proveedor;
  constructor(
    private _apiRequestService: ApiRequestService
  ) { }

  public listarProveedores<T>(
    model?: IProveedor
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/ListProveedor`, model
    );
  }

  public consultarProveedor<T>(
    model?: IProveedor
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.get<T>(
      `${this._urlBase}/${this._controlador}/GetProveedor`, model
    );
  }

  public saveProveedor<T>(
    model?: IProveedor
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.post<T>(
      `${this._urlBase}/${this._controlador}/SaveProveedor`, model
    );
  }

  public updateProveedor<T>(
    model?: IProveedor
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.put<T>(
      `${this._urlBase}/${this._controlador}/UpdateProveedor`, model
    );
  }

  public deleteProveedor<T>(
    model?: IProveedor
  ): Observable<IRespuestaApi> {
    return this._apiRequestService.delete<T>(
      `${this._urlBase}/${this._controlador}/DeleteProveedor`, model
    );
  }
}
