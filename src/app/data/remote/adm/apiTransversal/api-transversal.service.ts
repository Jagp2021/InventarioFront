import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as api from 'src/app/core/constant/url-api';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiTransversalService {
  constructor(private _apiRequest: ApiRequestService) {}

  /**
   * @description consulta en el servicio de la dian una persona juridica
   * @param model datos de consulta
   * @returns lista de valores de una persona juridica
   */
  public obtenerPersonaJuridica<T>(model: any): Observable<T> {
    let route = `${environment.apiTransversal}/${api.URLCONTROLADOR.dian}/${api.URLACCION.obtenerPersonaJuridica}`;
    return this._apiRequest.get<T>(route, model);
  }

  /**
   * @description consulta en el servicio de bonos una persona natural
   * @param model datos de consulta
   * @returns
   */
  public obtenerPersona<T>(model: any): Observable<T> {
    let route = `${environment.apiTransversal2}/${api.URLCONTROLADOR.bonosPensionales}/${api.URLACCION.obtenerPersona}`;
    return this._apiRequest.get<T>(route, model);
  }
}
