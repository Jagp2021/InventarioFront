import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { State } from 'src/app/core/store/State';
import { IngresoService } from 'src/app/data/remote/procesos/ingreso.service';

export interface StateGlobal {
}

const initialState: StateGlobal = {
};

@Injectable({
  providedIn: 'root'
})
export class IngresoStateService extends State<StateGlobal> {

  constructor(
    private _ingresoService: IngresoService
  ) {
    super(initialState);
  }

  public fnListarIngresos<T>(oModel: any): Promise<any> {
    return  firstValueFrom(this._ingresoService.listarIngresos(oModel));
  }

  public fnGuardarIngreso<T>(oModel: any): Promise<any> {
    return  firstValueFrom(this._ingresoService.guardarIngreso(oModel));
  }
}
