import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { DominioService } from 'src/app/data/remote/parametrizacion/dominio.service';
import { IDominio } from '../../interface/parametrizacion/dominio.interface';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { firstValueFrom } from 'rxjs';

export interface StateGlobal {
}

const initialState: StateGlobal = {
};

@Injectable({
  providedIn: 'root'
})
export class DominioStateService extends State<StateGlobal> {
  constructor(
    private _dominioService: DominioService
  ) {
    super(initialState);
  }

  public fnConsultarDominios<T>(oModel: IDominio): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._dominioService.listarDominios(oModel)
    );
  }

  public fnConsultarPerfiles<T>(): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._dominioService.consultarPerfiles()
    );
  }
}
