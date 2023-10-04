import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { ReporteRelacionesListasService } from 'src/app/data/remote/adm/reporte-relaciones-listas/reporte-relaciones-listas.service';

export interface StateGlobal {
  oReporteListas: any;
}

const initialState: StateGlobal = {
  oReporteListas: [],
};

@Injectable({
  providedIn: 'root',
})
export class ReporteRelacionesListasStateService extends State<StateGlobal> {
  constructor(
    private _reporteRelacionesListasService: ReporteRelacionesListasService
  ) {
    super(initialState);
  }

  public generarReporteRelacionListas(oModel?: any) {
    this._reporteRelacionesListasService.generarReporteRelacionListas(oModel);
  }
}
