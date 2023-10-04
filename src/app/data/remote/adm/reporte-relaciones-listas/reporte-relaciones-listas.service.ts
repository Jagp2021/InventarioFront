import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/core/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class ReporteRelacionesListasService {
  private _urlBaseReporting: string = environment.urlBaseSSRS;
  private _urlReportingName: string = environment.reportingName;
  private _reportingCommand: string = environment.reportingCommand;

  constructor(private _utilsService: UtilsService) {}

  public generarReporteRelacionListas<T>(oModel: any): void {
    let queryParameters = '';
    if (oModel !== undefined) {
      queryParameters = this._utilsService.fnModificarObject(oModel);

      window.open(
        `${this._urlBaseReporting}${this._urlReportingName}0011&${this._reportingCommand}${queryParameters}`
      );
    }
  }
}
