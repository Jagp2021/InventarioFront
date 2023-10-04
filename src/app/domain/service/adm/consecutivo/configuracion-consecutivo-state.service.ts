import { EventEmitter, Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { IConsecutivoTipoDocumento } from 'src/app/domain/interface/adm/consecutivo/consecutivo-tipo-documento.interface';
import { ConfiguracionConsecutivoService } from 'src/app/data/remote/adm/consecutivos/configuracion-consecutivo.service';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { firstValueFrom } from 'rxjs';

export interface StateGlobal {}

const initialState: StateGlobal = {};

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionConsecutivoStateService extends State<StateGlobal> {
  public mensajeFormularioConsecutivo: EventEmitter<any> =
    new EventEmitter<any>();
  constructor(
    private _configuracionConsecutivoService: ConfiguracionConsecutivoService
  ) {
    super(initialState);
  }

  /**
   * Descripción: Servicio que obtiene la secuencia de los documentos soporte
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 15/04/2023
   */
  public consultarSecuenciaDocumentoSoporte<T>(
    model: IConsecutivoTipoDocumento
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._configuracionConsecutivoService.consultarSecuenciaDocumentoSoporte(
        model
      )
    );
  }

  /**
   * Descripción: Servicio que valida la actualizacion consecutivos secuencia documento soporte
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 15/04/2023
   */
  public validarActualizacionConsecutivoSecuenciaDocumentoSoporte<T>(
    model: IConsecutivoTipoDocumento
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._configuracionConsecutivoService.validarActualizacionConsecutivoSecuenciaDocumentoSoporte(
        model
      )
    );
  }
}
