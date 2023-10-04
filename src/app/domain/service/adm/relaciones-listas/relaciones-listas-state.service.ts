import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { firstValueFrom } from 'rxjs';
import { RelacionesListasService } from 'src/app/data/remote/adm/relaciones-listas/relaciones-listas.service';

export interface StateGlobal {
  oRelacionesCrud: any[];
  bRelacionCreada: boolean | undefined;
  bRelacionEditada: boolean | undefined;
  bExisteDoc: boolean | undefined;
}

const initialState: StateGlobal = {
  oRelacionesCrud: [],
  bRelacionCreada: undefined,
  bRelacionEditada: undefined,
  bExisteDoc: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class RelacionesListasStateService extends State<StateGlobal> {
  constructor(private _relacionesListasService: RelacionesListasService) {
    super(initialState);
  }

  public consultarRelacionesCrud<T>(model: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._relacionesListasService.consultarRelacionesCrud(model)
    );
  }

  public consultarDominioRelacionados<T>(model: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._relacionesListasService.consultarDominioRelacionados(model)
    );
  }

  public consultarValoresRelacionados<T>(model: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._relacionesListasService.consultarValoresRelacionados(model)
    );
  }

  public crearListaValoresRelacionados<T>(model: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._relacionesListasService.crearListaValoresRelacionados(model)
    );
  }

  public eliminarValoresRelacionados<T>(model: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._relacionesListasService.eliminarValoresRelacionados(model)
    );
  }
}
