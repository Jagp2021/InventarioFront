import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReporteDisponibilidadService {
  private _urlBaseReporting: string = environment.urlBaseSSRS;
  private _urlReportingName: string = environment.reportingName;
  private _reportingCommand: string = environment.reportingCommand;

  constructor(private _utilsService: UtilsService) {}

  public generarReporteDisponibilidad<T>(oModel: any): void {
    let queryParameters = '';

    if (oModel !== undefined) {
      queryParameters = this._utilsService.fnModificarObject(oModel);

      window.open(
        `${this._urlBaseReporting}${this._urlReportingName}0012&${this._reportingCommand}${queryParameters}`
      );
    }
  }
}
