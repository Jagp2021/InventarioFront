import { EventEmitter, Injectable } from '@angular/core';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { State } from 'src/app/core/store/State';
import { MarcasService } from 'src/app/data/remote/adm/marcas/marcas.service';
import { IMarca } from 'src/app/domain/interface/adm/marcas/marca.interface';
import { UserStateService } from '../../configuration/user-state.service';
import { firstValueFrom } from 'rxjs';
import { IValoresMarca } from 'src/app/domain/interface/adm/marcas/valores-marca.interface';

export interface StateGlobal {
  marcas: IMarca[];
  marcaRow: IRespuestaApi | [];
  oValoresMarca: any;
}

const initialState: StateGlobal = {
  marcas: [],
  marcaRow: [],
  oValoresMarca: {},
};

export const oValoresDominio = () => (state: StateGlobal) =>
  state.marcas.map((row: any) => console.log(row));

@Injectable({
  providedIn: 'root',
})
export class MarcasStateService extends State<StateGlobal> {
  public mensajeFormularioMarca: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _marcasService: MarcasService,
    private _user: UserStateService
  ) {
    super(initialState);
  }

  /**
   * Descripción: Servicio que consulta las marcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public obtenerCoincidenciaMarca(model?: IMarca): void {
    this._marcasService
      .obtenerCoincidenciaMarca<IRespuestaApi>(model)
      .subscribe({
        next: (res) => {
          this.setState({ marcas: <IMarca[]>res.data });
        },
      });
  }

  /**
   * Descripción: Servicio que consulta las marcas por funcion de catalogo
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public listarValoresMarcaFuncion(model?: IMarca): void {
    this._marcasService
      .listarValoresMarcaFuncion<IRespuestaApi>(model)
      .subscribe({
        next: (res: any) => {
          this.setState({ marcas: <IMarca[]>res.data });
          this.setState({ oValoresMarca: res?.data[0]?.valoresPosiblesMarcas });
        },
      });
  }

  /**
   * Descripción: Servicio que Crea las marcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public crearMarca<T>(model: IMarca): Promise<T> {
    return firstValueFrom(this._marcasService.crearMarca(model));
  }

  /**
   * Descripción: Servicio que permite editar una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public editarMarca<T>(model: IMarca): Promise<T> {
    return firstValueFrom(this._marcasService.editarMarca(model));
  }

  /**
   * Descripción: Servicio que Crea las marcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public eliminarMarca<T>(model: IMarca): Promise<T> {
    return firstValueFrom(this._marcasService.eliminarMarca(model));
  }

  /**
   * Descripción: Servicio que obtiene una marca por cualquier valor
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public obtenerMarca<T>(model: IMarca): Promise<T> {
    return firstValueFrom(this._marcasService.obtenerMarca(model));
  }

  /**
   * Descripción: Servicio que permite obtener los valores de una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public obtenerValoresMarca<T>(model: IValoresMarca): Promise<T> {
    return firstValueFrom(this._marcasService.obtenerValorMarca(model));
  }

  /**
   * Descripción: Servicio que permite crear el valor a una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public crearValorMarca<T>(model: IValoresMarca): Promise<T> {
    return firstValueFrom(this._marcasService.crearValorMarca(model));
  }

  /**
   * Descripción: Servicio que permite eliminar el valor a una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public eliminarValorMarca<T>(model: IValoresMarca): Promise<T> {
    return firstValueFrom(this._marcasService.eliminarValorMarca(model));
  }

  /**
   * Descripción: Servicio que permite editar el valor a una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public editarValorMarca<T>(model: IValoresMarca): Promise<T> {
    return firstValueFrom(this._marcasService.editarValorMarca(model));
  }
}
