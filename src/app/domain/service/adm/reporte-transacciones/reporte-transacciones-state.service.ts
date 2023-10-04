import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { ReporteTransaccionesService } from 'src/app/data/remote/adm/reporte-transacciones/reporte-transacciones.service';

export interface StateGlobal {
  oReporteTransaccion: any;
}

const initialState: StateGlobal = {
  oReporteTransaccion: [],
};

@Injectable({
  providedIn: 'root',
})
export class ReporteTransaccionesStateService extends State<StateGlobal> {
  constructor(private _reporteTransaccioService: ReporteTransaccionesService) {
    super(initialState);
  }

  public generarReporteTransacciones(oModel?: any) {
    this._reporteTransaccioService.generarReporteTransacciones(oModel);
  }
}
