import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { State } from 'src/app/core/store/State';
import { ProveedorService } from 'src/app/data/remote/parametrizacion/proveedor.service';
import { IProveedor } from '../../interface/parametrizacion/proveedor.interface';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

export interface StateGlobal {
}

const initialState: StateGlobal = {
};

@Injectable({
  providedIn: 'root'
})
export class ProveedorStateService extends State<StateGlobal> {
  constructor(
    private _proveedorService: ProveedorService
  ) {
    super(initialState);
  }

  public fnConsultarProveedores<T>(oModel: IProveedor): Promise<IRespuestaApi> {
    return firstValueFrom(
     this._proveedorService.listarProveedores(oModel)
    );
  }

  public fnConsultarProveedor<T>(oModel: IProveedor): Promise<IRespuestaApi> {
    return firstValueFrom(
     this._proveedorService.consultarProveedor(oModel)
    );
  }

  public fnGuardarProveedor<T>(oModel: IProveedor): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._proveedorService.saveProveedor(oModel)
    );
  }

  public fnActualizarProveedor<T>(oModel: IProveedor): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._proveedorService.updateProveedor(oModel)
    );
  }

  public fnEliminarProveedor<T>(oModel: IProveedor): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._proveedorService.deleteProveedor(oModel)
    );
  }
}
