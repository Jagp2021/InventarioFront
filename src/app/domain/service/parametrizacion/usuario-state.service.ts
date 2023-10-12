import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { State } from 'src/app/core/store/State';
import { UsuarioService } from 'src/app/data/remote/parametrizacion/usuario.service';
import { IUsuario } from '../../interface/parametrizacion/usuario.interface';

export interface StateGlobal {
}

const initialState: StateGlobal = {
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioStateService extends State<StateGlobal> {
  constructor(
    private _usuarioService: UsuarioService
  ) {
    super(initialState);
  }

  public fnConsultarUsuarios<T>(oModel: IUsuario): Promise<IRespuestaApi> {
    return firstValueFrom(
     this._usuarioService.listarUsuarios(oModel)
    );
  }

  public fnConsultarUsuario<T>(oModel: IUsuario): Promise<IRespuestaApi> {
    return firstValueFrom(
     this._usuarioService.consultarUsuario(oModel)
    );
  }

  public fnGuardarUsuario<T>(oModel: IUsuario): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._usuarioService.saveUsuario(oModel)
    );
  }

  public fnActualizarUsuario<T>(oModel: IUsuario): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._usuarioService.updateUsuario(oModel)
    );
  }
}
