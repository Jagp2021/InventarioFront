import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { ReporteDisponibilidadService } from 'src/app/data/remote/adm/reporte-disponibilidad/reporte-disponibilidad.service';

export interface StateGlobal {
  oReporteDisponibilidad: any;
}

const initialState: StateGlobal = {
  oReporteDisponibilidad: [],
};

@Injectable({
  providedIn: 'root',
})
export class ReporteDisponibilidadStateService extends State<StateGlobal> {
  constructor(
    private _reporteDisponibilidadService: ReporteDisponibilidadService
  ) {
    super(initialState);
  }

  public generarReporteTransacciones(oModel?: any) {
    this._reporteDisponibilidadService.generarReporteDisponibilidad(oModel);
  }
}
