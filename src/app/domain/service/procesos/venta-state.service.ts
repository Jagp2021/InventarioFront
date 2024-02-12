import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { VentaService } from 'src/app/data/remote/procesos/venta.service';

@Injectable({
  providedIn: 'root'
})
export class VentaStateService {

  constructor(private _ventaService: VentaService) { }

  public fnListarVentas<T>(oModel: any): Promise<any> {
    return  firstValueFrom(this._ventaService.listarVentas(oModel));
  }

  public fnGuardarVenta<T>(oModel: any): Promise<any> {
    return  firstValueFrom(this._ventaService.guardarVenta(oModel));
  }

  public fnGenerarConsecutivo<T>(): Promise<any> {
    return  firstValueFrom(this._ventaService.generarConsecutivo());
  }
}
