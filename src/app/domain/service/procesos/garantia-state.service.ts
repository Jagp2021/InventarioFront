import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { State } from 'src/app/core/store/State';
import { GarantiaService } from 'src/app/data/remote/procesos/garantia.service';


export interface StateGlobal {
}

const initialState: StateGlobal = {
};
@Injectable({
  providedIn: 'root'
})
export class GarantiaStateService extends State<StateGlobal> {

  constructor(
    private _ganratiaService: GarantiaService
  ) {
    super(initialState);
  }

  public fnListarGarantias<T>(oModel: any): Promise<any> {
    return  firstValueFrom(this._ganratiaService.listarGarantias(oModel));
  }

  public fnGuardarGarantia<T>(oModel: any): Promise<any> {
    return  firstValueFrom(this._ganratiaService.guardarGarantia(oModel));
  }

  public fnActualizarGarantia<T>(oModel: any): Promise<any> {
    return  firstValueFrom(this._ganratiaService.actualizarGarantia(oModel));
  }


}
