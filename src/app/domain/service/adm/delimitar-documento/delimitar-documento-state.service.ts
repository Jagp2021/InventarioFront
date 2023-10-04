import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { firstValueFrom } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DelimitarDocumentoService } from 'src/app/data/remote/adm/delimitar-documento/delimitar-documento.service';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

export interface StateGlobal {
  oDocumentosDelimitados: any[];
  oHMovimientosDocumentos: any[];
  bDocumentoCreado: boolean | undefined;
  bDocumentoEditado: boolean | undefined;
  bExisteDoc: boolean | undefined;
}

const initialState: StateGlobal = {
  oDocumentosDelimitados: [],
  oHMovimientosDocumentos: [],
  bDocumentoCreado: undefined,
  bDocumentoEditado: undefined,
  bExisteDoc: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class DelimitarDocumentoStateService extends State<StateGlobal> {
  constructor(private _delimitarDocumentoService: DelimitarDocumentoService) {
    super(initialState);
  }

  public obtenerDocumentosSoportexFuncionalidad(oModel: any) {
    this._delimitarDocumentoService
      .obtenerDocumentosSoportexFuncionalidad<IRespuestaApi>(oModel)
      .subscribe({
        next: (resp: any) => {
          this.setState({ oDocumentosDelimitados: resp?.data });
          this.setState({ bExisteDoc: resp?.estado });
        },
      });
  }

  public obtenerDocumentosSoportexFuncionalidadLS(oModel: any) {
    return this._delimitarDocumentoService.obtenerDocumentosSoportexFuncionalidad<IRespuestaApi>(
      oModel
    );
  }

  public crearDocumentosSoportexFuncionalidad(oModel: any) {
    this._delimitarDocumentoService
      .crearDocumentosSoportexFuncionalidad<IRespuestaApi>(oModel)
      .subscribe({
        next: (resp: any) => {
          this.setState({ bDocumentoCreado: resp?.estado });
        },
      });
  }

  public obtenerHMovimientosDocumentosSoporte(oModel: any) {
    this._delimitarDocumentoService
      .obtenerHMovimientosDocumentosSoporte<IRespuestaApi>(oModel)
      .subscribe({
        next: (resp: any) => {
          this.setState({ oHMovimientosDocumentos: resp?.data });
        },
      });
  }

  public obtenerHMovimientosDocumentosSoporteLS(oModel: any) {
    return this._delimitarDocumentoService
      .obtenerHMovimientosDocumentosSoporte<IRespuestaApi>(oModel)
      .pipe(
        delay(800),
        map((oResp) => {
          return oResp.data;
        })
      );
  }

  public editarDocumentosSoportexFuncionalidad(oModel: any) {
    this._delimitarDocumentoService
      .editarDocumentosSoportexFuncionalidad<IRespuestaApi>(oModel)
      .subscribe({
        next: (resp: any) => {
          this.setState({ bDocumentoEditado: resp?.estado });
        },
      });
  }

  /** State con Promise */

  /**
   * @description State que consulta los documentos soporte según la Funcionalidad
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Promise} Promise<IRespuestaApi> devuelve con rxjs el primer resultados obtenido
   */
  public fnObtenerDocumentosSoportexFuncionalidad(
    oModel: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._delimitarDocumentoService.fnObtenerDocumentosSoportexFuncionalidad(
        oModel
      )
    );
  }

  /**
   * @description State que permite crear los documentos a una transacción
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Promise} Promise<IRespuestaApi> devuelve con rxjs el primer resultados obtenido
   */
  public fnCrearDocumentoSoportexFuncionalidad(
    oModel: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._delimitarDocumentoService.fnCrearDocumentoSoportexFuncionalidad(
        oModel
      )
    );
  }

  /**
   * @description State que permite editar los documentos a una transacción
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Promise} Promise<IRespuestaApi> devuelve con rxjs el primer resultados obtenido
   */
  public fnEditarDocumentoSoportexFuncionalidad(
    oModel: any
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._delimitarDocumentoService.fnEditarDocumentoSoportexFuncionalidad(
        oModel
      )
    );
  }
}
