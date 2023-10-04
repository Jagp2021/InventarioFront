import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { firstValueFrom } from 'rxjs';
import { DependenciaAfectacionService } from 'src/app/data/remote/adm/dependencia-afectacion/dependencia-afectacion.service';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

export interface StateGlobal {
}

const initialState: StateGlobal = {
};

@Injectable({
  providedIn: 'root',
})
export class DependenciaAfectacionStateService extends State<StateGlobal> {
  constructor(
    private _dependenciaAfectacionService: DependenciaAfectacionService
  ) {
    super(initialState);
  }

  public fnConsultarDependencias<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._dependenciaAfectacionService.fnConsultarDependencias(oModel)
    );
  }

  public fnGuardarDependeciaAfectacion<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._dependenciaAfectacionService.fnGuardarDependeciaAfectacion(oModel)
    );
  }

  public fnActualizarDependeciaAfectacion<T>(
    oModel: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._dependenciaAfectacionService.fnActualizarDependeciaAfectacion(
        oModel
      )
    );
  }

  public fnVincularDependeciaAfectacion<T>(
    oModel: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._dependenciaAfectacionService.fnVincularDependeciaAfectacion(oModel)
    );
  }

  public fnDesvincularDependeciaAfectacion<T>(
    oModel: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._dependenciaAfectacionService.fnDesvincularDependeciaAfectacion(
        oModel
      )
    );
  }

  public fnEliminarDependeciaAfectacion<T>(
    oModel: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._dependenciaAfectacionService.fnEliminarDependeciaAfectacion(oModel)
    );
  }

  // public fnConsultarCuentaBancaria<T>(oModel: any): Promise<IRespuestaApi> {
  //   return firstValueFrom(
  //     this._cuentasBancariasService.fnConsultarCuentaBancaria(oModel)
  //   );
  // }

  // public fnConsultarConfiguracionCuenta<T>(
  //   oModel: any
  // ): Promise<IRespuestaApi> {
  //   return firstValueFrom(
  //     this._cuentasBancariasService.fnConsultarConfiguracionCuenta(oModel)
  //   );
  // }

  // public fnActualizarCuentaBancaria<T>(oModel: any): Promise<IRespuestaApi> {
  //   return firstValueFrom(
  //     this._cuentasBancariasService.fnActualizarCuentaBancaria(oModel)
  //   );
  // }
}
