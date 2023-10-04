import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { ITransacciones } from 'src/app/domain/interface/adm/transacciones/transacciones.interface';
import { IProducto } from 'src/app/domain/interface/parametrizacion/producto.interface';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProductoService {
    private _urlBase: string = environment.apiBack;
    private _controlador: string = URLCONTROLADOR.producto;
    constructor(
        private _apiRequestService: ApiRequestService
    ) {
       
     }

     public listarProductos<T>(
        model?: IProducto
      ): Observable<IRespuestaApi> {
        return this._apiRequestService.get<T>(
          `${this._urlBase}/${this._controlador}/ListProducto`,
          model
        );
      }

     public consultarProductos<T>(
        model?: IProducto
      ): Observable<IRespuestaApi> {
        return this._apiRequestService.get<T>(
          `${this._urlBase}/${this._controlador}/GetProducto`,
          model
        );
      }

      public saveProductos<T>(
        model?: IProducto
      ): Observable<IRespuestaApi> {
        return this._apiRequestService.post<T>(
          `${this._urlBase}/${this._controlador}/SaveProducto`,
          model
        );
      }

      public updateProductos<T>(
        model?: IProducto
      ): Observable<IRespuestaApi> {
        return this._apiRequestService.put<T>(
          `${this._urlBase}/${this._controlador}/UpdateProducto`,
          model
        );
      }
    
}