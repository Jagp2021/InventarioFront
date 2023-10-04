import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { State } from 'src/app/core/store/State';
import { HorarioSistemaService } from 'src/app/data/remote/adm/horario-sistema/horario-sistema.service';
import { IHorarioSistema } from 'src/app/domain/interface/adm/horario-sistema/horario-sistema.interface';

export interface StateGlobal {
  oListaHorariosSistema: IHorarioSistema[];
}

const initialState: StateGlobal = {
  oListaHorariosSistema: [],
};

@Injectable({
  providedIn: 'root',
})
export class HorarioSistemaStateService extends State<StateGlobal> {
  public mensajeFormularioHora: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _horariosSistema: HorarioSistemaService) {
    super(initialState);
  }

  /**
   * Descripción: Servicio que consulta los horarios del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 14/04/2023
   * @param horarioSistema
   */
  public consultarHorarioSistema(horarioSistema?: IHorarioSistema): void {
    this._horariosSistema
      .consultarHorariosSistema<IRespuestaApi>(horarioSistema)
      .subscribe({
        next: (resp) => {
          this.setState({
            oListaHorariosSistema: <IHorarioSistema[]>resp?.data,
          });
        },
      });
  }

  /**
   * Descripción: Servicio que crea los horarios del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 14/04/2023
   * @param model
   */
  public crearHorarioSistema<T>(model: IHorarioSistema): Promise<T> {
    return firstValueFrom(this._horariosSistema.crearHorarioSistema(model));
  }

  /**
   * Descripción: Servicio que crea los horarios del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 14/04/2023
   * @param model
   */
  public validarHorarioSistema<T>(model: IHorarioSistema): Promise<T> {
    return firstValueFrom(this._horariosSistema.validarHorarioSistema(model));
  }

  /**
   * Descripción: Servicio que edita los horarios del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 14/04/2023
   */
  public editarHorarioSistema<T>(oHorarioSistema: IHorarioSistema): Promise<T> {
    return firstValueFrom(
      this._horariosSistema.editarListaSeleccion(oHorarioSistema)
    );
  }

  /**
   * Descripción: Servicio que elimina un horario del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 14/04/2023
   * @param model
   */
  public eliminarHorarioSistema<T>(model: IHorarioSistema): Promise<T> {
    return firstValueFrom(this._horariosSistema.eliminarHorarioSistema(model));
  }
}
