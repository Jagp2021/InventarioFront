import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { State } from 'src/app/core/store/State';
import { TercerosService } from 'src/app/data/remote/adm/terceros/terceros.service';
import { TransaccionesService } from 'src/app/data/remote/adm/transacciones/transacciones.service';
import {
  IDatosBasicos,
  IParticipantes,
} from 'src/app/domain/interface/adm/terceros/datos-basicos.interface';
import { IActividadesEconomicas } from 'src/app/domain/interface/adm/terceros/informacion-tributaria.interface';
export interface StateGlobal {}

const initialState: StateGlobal = {};
@Injectable({
  providedIn: 'root',
})
export class TerceroStateService extends State<StateGlobal> {
  public estadoCoincidenciaExtranjera: EventEmitter<any> =
    new EventEmitter<any>();
  constructor(
    private _tercerosService: TercerosService,
    private _transaccionesService: TransaccionesService
  ) {
    super(initialState);
  }

  /**
   *
   * @param model
   * @returns
   */
  public consultarTransacciones(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._transaccionesService.consultarTransacciones(model)
    );
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerCiudadPaisRegion(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(this._tercerosService.obtenerCiudadPaisRegion(model));
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerTercerosIdentificacion(
    model?: IDatosBasicos
  ): Promise<IRespuestaApi> {
    return firstValueFrom(this._tercerosService.obtenerTerceros(model));
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerInformacionTributaria(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.obtenerInformacionTributaria(model)
    );
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerUbicacionesGeograficas(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.obtenerUbicacionesGeograficas(model)
    );
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerActividadesEconomicasCiiu(
    model?: IActividadesEconomicas
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.obtenerActividadesEconomicasCiiu(model)
    );
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerResponsabilidadesTributariasPersonas(
    model?: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.obtenerResponsabilidadesTributariasPersonas(model)
    );
  }

  /**
   *
   * @param model
   * @returns
   */
  public obtenerParticipantesColaboracion(
    model?: IParticipantes
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.obtenerParticipantesColaboracion(model)
    );
  }

  public crearPersonaInformacionBasica<T>(
    idUsuario: number,
    model: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.crearPersonaInformacionBasica(idUsuario, model)
    );
  }

  public crearInformacionTributaria<T>(
    idUsuario: number,
    model: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.crearInformacionTributaria(idUsuario, model)
    );
  }

  public crearUbicacionGeograficaPersona<T>(
    idUsuario: number,
    model: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.crearUbicacionGeograficaPersona(idUsuario, model)
    );
  }

  public crearDireccion<T>(
    idUsuario: number,
    model: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.crearDireccion(idUsuario, model)
    );
  }

  public actualizarPersonaInformacionBasica<T>(
    idUsuario: number,
    model: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.actualizarPersonaInformacionBasica(idUsuario, model)
    );
  }

  public actualizarInformacionTributaria<T>(
    idUsuario: number,
    model: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.actualizarInformacionTributaria(idUsuario, model)
    );
  }

  public actualzarUbicacionGeograficaPersona<T>(
    idUsuario: number,
    model: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.actualzarUbicacionGeograficaPersona(
        idUsuario,
        model
      )
    );
  }

  public ActualzarDireccionUbicacionGeograficaPersona<T>(
    idUsuario: number,
    model: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._tercerosService.ActualzarDireccionUbicacionGeograficaPersona(
        idUsuario,
        model
      )
    );
  }
}
