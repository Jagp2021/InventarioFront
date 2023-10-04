import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { ReporteListasSeleccionService } from 'src/app/data/remote/adm/reporte-listas-seleccion/reporte-listas-seleccion.service';

export interface StateGlobal {
  oReporteTransaccion: any;
}

const initialState: StateGlobal = {
  oReporteTransaccion: [],
};

@Injectable({
  providedIn: 'root',
})
export class ReporteListasSeleccionStateService extends State<StateGlobal> {
  constructor(
    private _reporteListasSeleccionService: ReporteListasSeleccionService
  ) {
    super(initialState);
  }

  public generarReporteListasSeleccion(oModel?: any) {
    this._reporteListasSeleccionService.generarReporteListasSeleccion(oModel);
  }
}
