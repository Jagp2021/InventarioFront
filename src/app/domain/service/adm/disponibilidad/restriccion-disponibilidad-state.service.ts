import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { State } from 'src/app/core/store/State';
import { RestriccionDisponibilidadServiceService } from 'src/app/data/remote/adm/disponibilidad/restriccion-disponibilidad-service.service';
import { IRestriccionEntidadPci } from 'src/app/domain/interface/adm/disponibilidad/restriccion-entidad-pci.interface';
import { IRestriccionFuncionalidad } from 'src/app/domain/interface/adm/disponibilidad/restriccion-funcionalidad.interface';
import { IRestriccionHorario } from 'src/app/domain/interface/adm/disponibilidad/restriccion-horario.interface';
import { IRestriccionPerfil } from 'src/app/domain/interface/adm/disponibilidad/restriccion-perfil.interface';
import { IRestriccionPeriodo } from 'src/app/domain/interface/adm/disponibilidad/restriccion-predio.interface';
import { IRestriccionSistemaConsulta } from 'src/app/domain/interface/adm/disponibilidad/restriccion-sistema-consulta.interface';
import { IRestriccionSistema } from 'src/app/domain/interface/adm/disponibilidad/restriccion-sistema.interface';
import { IRestriccionUsuario } from 'src/app/domain/interface/adm/disponibilidad/restriccion-usuario.interface';

export interface StateGlobal {
  oListaRestriccion: IRestriccionSistema[];
}

const initialState: StateGlobal = {
  oListaRestriccion: [],
};

@Injectable({
  providedIn: 'root',
})
export class RestriccionDisponibilidadStateService extends State<StateGlobal> {
  constructor(
    private _restriccionDisponibilidadService: RestriccionDisponibilidadServiceService
  ) {
    super(initialState);
  }
  /**
   * Descripción: Servicio que consulta las restricciones del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param model
   */
  public obtenerRestriccionDisponibilidad(
    model?: IRestriccionSistemaConsulta
  ): void {
    this._restriccionDisponibilidadService
      .obtenerRestriccion<IRespuestaApi>(model)
      .subscribe({
        next: (res) => {
          this.setState({ oListaRestriccion: <IRestriccionSistema[]>res.data });
        },
      });
  }

  /**
   * Descripción: Servicio que consulta una lista de restricciones del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/05/2023
   * @param model
   */
  public obtenerListaRestriccionDisponibilidad<T>(
    model?: IRestriccionSistemaConsulta
  ): Promise<T> {
    return firstValueFrom(
      this._restriccionDisponibilidadService.obtenerRestriccion(model)
    );
  }

  /**
   * Descripción: Servicio que consulta una lista de restricciones del sistema por id
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/05/2023
   */
  public obtenerRestriccionId<T>(
    model: IRestriccionSistemaConsulta
  ): Promise<T> {
    return firstValueFrom(
      this._restriccionDisponibilidadService.obtenerRestriccion(model)
    );
  }

  /**
   * Descripción: Servicio que Crea una restriccion de disponibilidad
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/05/2023
   * @param model
   */
  public crearRestriccionDisponibilidad<T>(
    model: IRestriccionSistema
  ): Promise<T> {
    return firstValueFrom(
      this._restriccionDisponibilidadService.crearRestriccion(model)
    );
  }

  /**
   * Descripción: Servicio que permite editar una restriccion de disponibilidad
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/05/2023
   * @param model
   */
  public editarRestriccionDisponibilidad<T>(
    model: IRestriccionSistema
  ): Promise<T> {
    return firstValueFrom(
      this._restriccionDisponibilidadService.editarRestriccion(model)
    );
  }

  // /**
  //  * Descripción: Servicio que permite validar existencia de funcionalidad
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 12/03/2023
  //  * @param model
  //  */
  // public validarExistenciaFuncionalidad<T>(
  //   model: IRestriccionFuncionalidad
  // ): Promise<T> {
  //   return firstValueFrom(
  //     this._restriccionDisponibilidadService.validarExistenciaFuncionalidad(
  //       model
  //     )
  //   );
  // }

  // /**
  //  * Descripción: Servicio que permite validar existencia de una restriccion de disponibilidad de horario
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 12/03/2023
  //  * @param model
  //  */
  // public validarExistenciaRestriccionHorario<T>(
  //   model: IRestriccionHorario
  // ): Promise<T> {
  //   return firstValueFrom(
  //     this._restriccionDisponibilidadService.validarExistenciaRestriccionHorario(
  //       model
  //     )
  //   );
  // }

  // /**
  //  * Descripción: Servicio que permite validar existencia de una restriccion de disponibilidad periodo
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 12/03/2023
  //  * @param model
  //  */
  // public validarExistenciaPeriodo<T>(model: IRestriccionPeriodo): Promise<T> {
  //   return firstValueFrom(
  //     this._restriccionDisponibilidadService.validarExistenciaPeriodo(model)
  //   );
  // }

  // /**
  //  * Descripción: Servicio que permite validar existencia de una restriccion de disponibilidad perfil
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 12/03/2023
  //  * @param model
  //  */
  // public validarExistenciaPerfil<T>(model: IRestriccionPerfil): Promise<T> {
  //   return firstValueFrom(
  //     this._restriccionDisponibilidadService.validarExistenciaPerfil(model)
  //   );
  // }

  // /**
  //  * Descripción: Servicio que permite eliminar el valor a una restriccion de funcionalidad
  //  * Autor: Asesoftware - Danilo Narvaez
  //  * Fecha: 10/05/2023
  //  * @param model
  //  */
  // public eliminarRestriccionFuncionalidad<T>(
  //   model: IRestriccionFuncionalidad
  // ): Promise<T> {
  //   return firstValueFrom(
  //     this._restriccionDisponibilidadService.eliminarRestriccionFuncionalidad(
  //       model
  //     )
  //   );
  // }

  // /**
  //  * Descripción: Servicio que permite eliminar el valor a una restriccion de entidad Pci
  //  * Fecha: 10/05/2023
  //  * @param model
  //  */
  // public eliminarRestriccionEntidadPci<T>(
  //   model: IRestriccionEntidadPci
  // ): Promise<T> {
  //   return firstValueFrom(
  //     this._restriccionDisponibilidadService.eliminarRestriccionEntidadPci(
  //       model
  //     )
  //   );
  // }

  // /**
  //  * Descripción: Servicio que permite eliminar el valor a una restriccion de horario
  //  * Fecha: 10/05/2023
  //  * @param model
  //  */
  // public eliminarRestriccionHorario<T>(model: IRestriccionHorario): Promise<T> {
  //   return firstValueFrom(
  //     this._restriccionDisponibilidadService.eliminarRestriccionHorario(model)
  //   );
  // }

  // /**
  //  * Descripción: Servicio que permite eliminar el valor a una restriccion de horario
  //  * Fecha: 10/05/2023
  //  * @param model
  //  */
  // public eliminarRestriccionPerfil<T>(model: IRestriccionPerfil): Promise<T> {
  //   return firstValueFrom(
  //     this._restriccionDisponibilidadService.eliminarRestriccionPerfil(model)
  //   );
  // }

  // /**
  //  * Descripción: Servicio que permite eliminar el valor a una restriccion de periodo
  //  * Fecha: 10/05/2023
  //  * @param model
  //  */
  // public eliminarRestriccionPeriodo<T>(model: IRestriccionPeriodo): Promise<T> {
  //   return firstValueFrom(
  //     this._restriccionDisponibilidadService.eliminarRestriccionPeriodo(model)
  //   );
  // }

  // /**
  //  * Descripción: Servicio que permite eliminar el valor a una restriccion de usuario
  //  * Fecha: 10/05/2023
  //  * @param model
  //  */
  // public eliminarRestriccionUsuario<T>(model: IRestriccionUsuario): Promise<T> {
  //   return firstValueFrom(
  //     this._restriccionDisponibilidadService.eliminarRestriccionUsuario(model)
  //   );
  // }
}
