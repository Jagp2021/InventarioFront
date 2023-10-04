import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { State } from 'src/app/core/store/State';
import { CalendarioPaisService } from 'src/app/data/remote/adm/calendario/calendario-pais.service';
import { ICalendarioPais } from 'src/app/domain/interface/adm/calendario/calendario-pais.interface';

export interface StateGlobal {
  oListaCalendario: ICalendarioPais[];
}

const initialState: StateGlobal = {
  oListaCalendario: [],
};

@Injectable({
  providedIn: 'root',
})
export class CalendarioPaisStateService extends State<StateGlobal> {
  constructor(private _calendarioPaisService: CalendarioPaisService) {
    super(initialState);
  }

  /**
   * Descripción: Servicio que consulta un calendario pais
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 26/05/2023
   * @param model
   */
  public obtenerCalendario<T>(model?: ICalendarioPais): Promise<T> {
    return firstValueFrom(this._calendarioPaisService.obtenerCalendario(model));
    // this._calendarioPaisService
    //   .obtenerCalendario<IRespuestaApi>(model)
    //   .subscribe({
    //     next: (res) => {
    //       this.setState({ oListaCalendario: <ICalendarioPais[]>res.data });
    //     },
    //   });
  }

  /**
   * Descripción: Servicio que Crea una calendario pais
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 26/05/2023
   * @param model
   */
  public crearCalendario<T>(model: any): Promise<IRespuestaApi> {
    return firstValueFrom(this._calendarioPaisService.crearCalendario(model));
  }

  /**
   * Descripción: Servicio que permite editar el calendario
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 26/05/2023
   * @param model
   */
  public editarCalendario<T>(model: any): Promise<IRespuestaApi> {
    return firstValueFrom(this._calendarioPaisService.editarCalendario(model));
  }

  /**
   * Descripción: Servicio que permite eliminar un registro del calendario pais
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 26/05/2023
   * @param model
   */
  public eliminarcalendarioDia<T>(
    model: ICalendarioPais
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._calendarioPaisService.eliminarcalendarioDia(model)
    );
  }
}
