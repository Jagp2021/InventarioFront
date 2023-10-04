import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiTransversalService } from 'src/app/data/remote/adm/apiTransversal/api-transversal.service';

@Injectable({
  providedIn: 'root',
})
export class ApiTransversalStateService {
  constructor(private _apiTransversal: ApiTransversalService) {}

  /**
   * @description permite obtener los datos de una persona juridica
   * @param model datos de consulta
   * @returns lista de valores de una persona juridica
   */
  public obtenerPersonaJuridica(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(this._apiTransversal.obtenerPersonaJuridica(model));
  }

  /**
   * @description consulta en el servicio de bonos una persona natural
   * @param model datos de consulta
   * @returns
   */
  public obtenerPersona(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(this._apiTransversal.obtenerPersona(model));
  }
}
