import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { firstValueFrom } from 'rxjs';
import { DependenciaAfectacionService } from 'src/app/data/remote/adm/dependencia-afectacion/dependencia-afectacion.service';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ProductoService } from 'src/app/data/remote/parametrizacion/producto.service';
import { IProducto } from '../../interface/parametrizacion/producto.interface';

export interface StateGlobal {
}

const initialState: StateGlobal = {
};

@Injectable({
  providedIn: 'root',
})
export class PruductoStateService extends State<StateGlobal> {
  constructor(
    private _productoService: ProductoService
  ) {
    super(initialState);
  }

  public fnConsultarDependencias<T>(oModel: IProducto): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._productoService.consultarProductos(oModel)
    );
  }

  public fnListarProductos<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._productoService.listarProductos(oModel)
    );
  }


  public fnGuardarProducto<T>(oModel: any): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._productoService.saveProductos(oModel)
    );
  }

  public fnActualizarProducto<T>(
    oModel: IProducto
  ): Promise<IRespuestaApi> {
    return firstValueFrom(
      this._productoService.updateProductos(
        oModel
      )
    );
  }

  

}
