import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, of } from 'rxjs';

import { ApiRequestService } from 'src/app/core/services/api-request.service';

import { environment } from 'src/environments/environment';
import { URLCONTROLADOR, URLACCION } from 'src/app/core/constant/url-api';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

@Injectable({
  providedIn: 'root',
})
export class FiltrosGenericosService {
  /** URLs Base */
  private _urlBaseFG: string = environment.apiTransFiltros;
  private _urlBaseDM: string = environment.apiAdmDominio;
  private _urlBasePR: string = environment.apiAdmProcesos;
  private _urlBaseSG: string = environment.apiSegProcesos;

  /** URLs Controladores */
  private _controladorFG: string = URLCONTROLADOR.apiFiltros;
  private _controladorUB: string = URLCONTROLADOR.apiUbicacion;
  private _controladorDM: string = URLCONTROLADOR.apiDominio;
  private _controladorTR: string = URLCONTROLADOR.apiTransaccion;
  private _controladorEP: string = URLCONTROLADOR.apiEntidadesPci;
  private _controladorPE: string = URLCONTROLADOR.apiPerfil;

  /** URLs Acciones Filtros */
  private _obtenerPerfiles: string = URLACCION.obtenerFGPerfiles;
  private _obtenerTransacciones: string = URLACCION.obtenerFGTransacciones;
  private _obtenerUsuarios: string = URLACCION.obtenerFGUsuarios;
  private _obtenerPosiciones: string = URLACCION.obtenerFGPosiciones;
  private _obtenerPosicionesArbol: string = URLACCION.obtenerFGPosicionesArbol;
  private _obtenerEntidades: string = URLACCION.obtenerFGEntidades;

  /** URLs Acciones Generales */
  private _obtenerDominio: string = URLACCION.obtenerDominio;
  private _obtenerTransaccion: string = URLACCION.obtenerTransacciones;
  private _obtenerFGUbicacionGeo: string = URLACCION.obtenerFGUbicacionGeo;
  private _obtenerPaises: string = URLACCION.obtenerFGPaises;
  private _obtenerRegiones: string = URLACCION.obtenerFGRegiones;
  private _obtenerCiudades: string = URLACCION.obtenerFGCiudades;
  private _obtenerCatalogos: string = URLACCION.obtenerFGCatalogos;
  private _obtenerPerfilSEG: string = URLACCION.obtenerFGPerfil;

  constructor(private _apiRequestService: ApiRequestService) {}

  public consultarFGPerfiles(oModel?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.post<IRespuestaApi>(
        `${this._urlBaseFG}/${this._controladorFG}/${this._obtenerPerfiles}`,
        oModel
      )
    );
  }

  public consultarFGTransacciones(oModel?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.post<IRespuestaApi>(
        `${this._urlBaseFG}/${this._controladorFG}/${this._obtenerTransacciones}`,
        oModel
      )
    );
  }

  public consultarFGUsuarios(oModel?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.post<IRespuestaApi>(
        `${this._urlBaseFG}/${this._controladorFG}/${this._obtenerUsuarios}`,
        oModel
      )
    );
  }

  public consultarFGPosicionesCatalago(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.post<IRespuestaApi>(
      `${this._urlBaseFG}/${this._controladorFG}/${this._obtenerPosiciones}`,
      model
    );
  }

  public consultarFGPosicionArbol(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.post<any>(
        `${this._urlBaseFG}/${this._controladorFG}/${this._obtenerPosicionesArbol}`,
        model
      )
    );
  }

  public consultarFGListaSeleccion(oModel?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.get<IRespuestaApi>(
        `${this._urlBaseDM}/${this._controladorDM}/${this._obtenerDominio}`,
        oModel
      )
    );
  }

  public consultarFGTransaccion(oModel?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.get<IRespuestaApi>(
        `${this._urlBasePR}/${this._controladorTR}/${this._obtenerTransaccion}`,
        oModel
      )
    );
  }

  public consultarFGUbicacionGeografica(oModel?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.get<IRespuestaApi>(
        `${this._urlBaseDM}/${this._controladorUB}/${this._obtenerFGUbicacionGeo}`,
        oModel
      )
    );
  }

  public consultarFGPaises(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBaseDM}/${this._controladorUB}/${this._obtenerPaises}`,
      model
    );
  }

  public consultarFGRegiones(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBaseDM}/${this._controladorUB}/${this._obtenerRegiones}`,
      model
    );
  }

  public consultarFGCiudades(model?: any): Observable<IRespuestaApi> {
    return this._apiRequestService.get<IRespuestaApi>(
      `${this._urlBaseDM}/${this._controladorUB}/${this._obtenerCiudades}`,
      model
    );
  }

  public consultarFGCatalogos(model?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.get<IRespuestaApi>(
        `${this._urlBaseSG}/${this._controladorEP}/${this._obtenerCatalogos}`,
        model
      )
    );
  }

  public consultarFGPerfilesSEG(oModel?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.get<IRespuestaApi>(
        `${this._urlBaseSG}/${this._controladorPE}/${this._obtenerPerfilSEG}`,
        oModel
      )
    );
  }

  public consultarFGBancos(oModel?: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._apiRequestService.post<IRespuestaApi>(
        `${this._urlBaseFG}/${this._controladorFG}/${this._obtenerEntidades}`,
        oModel
      )
    );
  }
}
