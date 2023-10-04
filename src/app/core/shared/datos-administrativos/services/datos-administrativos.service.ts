import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { URLACCION, URLCONTROLADOR } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { environment } from 'src/environments/environment';
import { IDatosAdministrativos } from '../interfaces/datos-administrativos.interface';

@Injectable({
  providedIn: 'root',
})
export class DatosAdministrativosService {
  /** URLs Base */
  private _urlBaseDM: string = environment.apiAdmDominio;
  private _urlBasePR: string = environment.apiAdmProcesos;

  /** URLs Controladores */
  private _controladorDA: string = URLCONTROLADOR.datosAdministrativos;
  private _controladorDM: string = URLCONTROLADOR.apiDominio;

  /** URLs Acciones Filtros */
  private _obtenerDominio: string = URLACCION.obtenerDominio;

  /** URLs Acciones datos administrativos */
  private _crearDatosAdministrativos: string =
    URLACCION.crearDatosAdministrativos;
  private _obtenerDatosAdministrativos: string =
    URLACCION.obtenerDatosAdministrativos;
  private _editarDatosAdministrativos: string =
    URLACCION.editarDatosAdministrativos;

  constructor(private _apiRequestService: ApiRequestService) {}

  /**
   * Servicio que permite consultar las listas de seleccion
   */
  public consultarListaSeleccion(oModel?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.get<IRespuestaApi>(
        `${this._urlBaseDM}/${this._controladorDM}/${this._obtenerDominio}`,
        oModel
      )
    );
  }

  /**
   * Servicio que permite consultar los datos administrativos
   * @return {Observable<T>}
   */
  public consultarDatosAdministrativos(oModel?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.get<IRespuestaApi>(
        `${this._urlBasePR}/${this._controladorDA}/${this._obtenerDatosAdministrativos}`,
        oModel
      )
    );
  }

  /**
   * Servicio que permite crear los datos administrativos
   * @param oDatosAdministrativos objeto que contiene los datos a guardar
   */
  public crearDatosAdministrativos(
    oDatosAdministrativos: IDatosAdministrativos
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.post<IRespuestaApi>(
        `${this._urlBasePR}/${this._controladorDA}/${this._crearDatosAdministrativos}`,
        oDatosAdministrativos
      )
    );
  }

  /**
   * Servicio que permite actualizar los datos administrativos
   * @param {object} oDatosAdministrativos Lista de Selección
   */
  public editarDatosAdministrativos(
    oDatosAdministrativos: IDatosAdministrativos
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.put<IRespuestaApi>(
        `${this._urlBasePR}/${this._controladorDA}/${this._editarDatosAdministrativos}`,
        oDatosAdministrativos
      )
    );
  }
}
