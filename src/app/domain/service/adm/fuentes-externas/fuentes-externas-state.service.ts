import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { FuentesExternasService } from 'src/app/data/remote/adm/fuentes-externas/fuentes-externas.service';
import { firstValueFrom } from 'rxjs';

export interface StateGlobal {
  oFuentesExternas: any[];
  bFuenteCreada: boolean | undefined;
  bFuenteEditada: boolean | undefined;
  bExisteDoc: boolean | undefined;
}

const initialState: StateGlobal = {
  oFuentesExternas: [],
  bFuenteCreada: undefined,
  bFuenteEditada: undefined,
  bExisteDoc: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class FuentesExternasStateService extends State<StateGlobal> {
  constructor(private _fuentesExternasService: FuentesExternasService) {
    super(initialState);
  }

  public consultarFuentesExternas<T>(model: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._fuentesExternasService.consultarFuentesExternas(model)
    );
  }

  public editarFuentesExternas<T>(model: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._fuentesExternasService.editarFuentesExternas(model)
    );
  }
}
