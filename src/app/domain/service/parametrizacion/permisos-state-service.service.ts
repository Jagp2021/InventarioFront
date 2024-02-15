import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { State } from 'src/app/core/store/State';
import { PermisosServiceService } from 'src/app/data/remote/parametrizacion/permisos-service.service';


export interface StateGlobal {
}

const initialState: StateGlobal = {
};

@Injectable({
  providedIn: 'root'
})
export class PermisosStateServiceService extends State<StateGlobal> {

  constructor(
    private _permisosService: PermisosServiceService
  ) {
    super(initialState);
  }

  public fnValidarIngreso<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
     this._permisosService.validarIngreso(oModel)
    );
  }

  public fnCargarmenu<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
     this._permisosService.consultarMenu(oModel)
    );
  }


}
