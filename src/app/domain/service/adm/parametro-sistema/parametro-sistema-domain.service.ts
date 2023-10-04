import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { State } from 'src/app/core/store/State';
import { ParametroSistemaService } from 'src/app/data/remote/adm/parametro-sistema/parametro-sistema.service';
import { IParametrosSistema } from 'src/app/domain/interface/adm/parametros-sistema/parametros-sistema.interface';


export interface StateGlobal {
}

const initialState: StateGlobal = {
};

@Injectable({
  providedIn: 'root'
})
export class ParametroSistemaDomainService extends State<StateGlobal> {
  constructor(private _parametroSistemaService: ParametroSistemaService) {
    super(initialState);
  } 

  public fnConsultarParametroSistema<T>(oModel: IParametrosSistema): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._parametroSistemaService.fnConsultarParametroSistema(oModel)
    );
  }
}
