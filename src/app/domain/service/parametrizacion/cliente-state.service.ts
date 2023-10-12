import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { State } from 'src/app/core/store/State';
import { ClienteService } from 'src/app/data/remote/parametrizacion/cliente.service';
import { ICliente } from '../../interface/parametrizacion/cliente.interface';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

export interface StateGlobal {
}

const initialState: StateGlobal = {
};

@Injectable({
  providedIn: 'root'
})
export class ClienteStateService extends State<StateGlobal> {
  constructor(
    private _clienteService: ClienteService
  ) {
    super(initialState);
  }

  public fnConsultarClientes<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._clienteService.listarClientes(oModel)
    );
  }

  public fnConsultarCliente<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._clienteService.consultarCliente(oModel)
    );
  }

  public fnGuardarCliente<T>(oModel: ICliente): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._clienteService.saveCliente(oModel)
    );
  }

  public fnActualizarCliente<T>(oModel: ICliente): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._clienteService.updateCliente(oModel)
    );
  }
}
