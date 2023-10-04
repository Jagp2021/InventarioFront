import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { CuentasBancariasService } from 'src/app/data/remote/adm/cuentas-bancarias/cuentas-bancarias.service';
import { firstValueFrom } from 'rxjs';

export interface StateGlobal {
  oCuentasBancarias: any[];
  bCuentaCreada: boolean | undefined;
  bCuentaEditada: boolean | undefined;
}

const initialState: StateGlobal = {
  oCuentasBancarias: [],
  bCuentaCreada: undefined,
  bCuentaEditada: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class CuentasBancariasStateService extends State<StateGlobal> {
  constructor(private _cuentasBancariasService: CuentasBancariasService) {
    super(initialState);
  }

  // TODO: LLAMAR TERCERO DE CU19-20
  public fnConsultarTercero<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._cuentasBancariasService.fnConsultarTercero(oModel)
    );
  }

  public fnConsultarCuentaBancaria<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._cuentasBancariasService.fnConsultarCuentaBancaria(oModel)
    );
  }

  public fnConsultarConfiguracionCuenta<T>(
    oModel: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._cuentasBancariasService.fnConsultarConfiguracionCuenta(oModel)
    );
  }

  public fnGuardarCuentasBancarias<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._cuentasBancariasService.fnGuardarCuentasBancarias(oModel)
    );
  }

  public fnActualizarCuentaBancaria<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._cuentasBancariasService.fnActualizarCuentaBancaria(oModel)
    );
  }
}
