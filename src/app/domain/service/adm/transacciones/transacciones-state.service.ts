import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { TransaccionesService } from 'src/app/data/remote/adm/transacciones/transacciones.service';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ListaSeleccionService } from 'src/app/data/remote/adm/lista-seleccion/lista-seleccion.service';
import { ITransacciones } from 'src/app/domain/interface/adm/transacciones/transacciones.interface';
import { Privilegios } from 'src/app/domain/interface/adm/transacciones/privilegios.interface';
import { firstValueFrom } from 'rxjs';

export interface StateGlobal {
  oTransacciones: ITransacciones[];
  bEliminarTransaccion: boolean | undefined;
  bEditarTransaccion: boolean | undefined;
  bCrearTransaccion: boolean | undefined;
}

const initialState: StateGlobal = {
  oTransacciones: [],
  bEliminarTransaccion: undefined,
  bEditarTransaccion: undefined,
  bCrearTransaccion: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class TransaccionesStateService extends State<StateGlobal> {
  constructor(private _transaccionesService: TransaccionesService) {
    super(initialState);
  }

  /**
   * Descripción: Consulta las transacciones del sistema
   */
  public consultarTransacciones(filtro?: ITransacciones) {
    this._transaccionesService.consultarTransacciones(filtro).subscribe({
      next: (respuesta: IRespuestaApi) => {
        this.setState({ oTransacciones: <ITransacciones[]>respuesta?.data });
      },
    });
  }

  /**
   * Descripción: Crea una Transacción del sistema
   */
  public crearTransaccion(model: ITransacciones) {
    this._transaccionesService.crearTransaccion(model).subscribe({
      next: (respuesta: IRespuestaApi) => {
        respuesta.estado && Object.keys(respuesta.data).length > 0
          ? this.setState({ bCrearTransaccion: true })
          : this.setState({ bCrearTransaccion: false });
      },
    });
  }

  /**
   * Descripción: Edita una Transacción del sistema
   */
  public editarTransaccion(model: ITransacciones) {
    this._transaccionesService.editarTransaccion(model).subscribe({
      next: (respuesta: IRespuestaApi) => {
        respuesta.estado && Object.keys(respuesta.data).length > 0
          ? this.setState({ bEditarTransaccion: true })
          : this.setState({ bEditarTransaccion: false });
      },
    });
  }

  /**
   * Fecha: 14/04/2023
   * @description Cambiar el estado de las transacciones cuando cambia su estado
   * @author Javier Gonzalez
   * @param model
   */
  public cambiarEstadoPrivilegios(model?: Privilegios) {
    this._transaccionesService.cambiarEstadoPrivilegios(model).subscribe({
      next: (respuesta: IRespuestaApi) => {
        return respuesta;
      },
    });
  }

  /**
   * Descripción: Consulta las transacciones del sistema
   */
  public consultarTransaccionTipoDoc(filtro?: ITransacciones) {
    return this._transaccionesService.consultarTransacciones(filtro);
  }

  /** State con Promise */

  /**
   * @description State que consulta las transacciones o funcionalidades
   * @param {any} oModel objeto que contiene los parámetros de búsqueda
   * @return {Promise} Promise<IRespuestaApi> devuelve con rxjs el primer resultados obtenido
   */
  public fnConsultarTransaccion(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._transaccionesService.consultarTransaccion(oModel)
    );
  }

  public consultarTransaccion<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._transaccionesService.consultarTransaccion(oModel)
    );
  }
}
