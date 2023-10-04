import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IDatosBasicos } from 'src/app/domain/interface/adm/terceros/datos-basicos.interface';
import { TerceroStateService } from 'src/app/domain/service/adm/terceros/tercero-state.service';

@Component({
  selector: 'app-modal-coincidencia-extranjero',
  templateUrl: './modal-coincidencia-extranjero.component.html',
  styleUrls: ['./modal-coincidencia-extranjero.component.scss'],
})
export class ModalCoincidenciaExtranjeroComponent implements OnInit {
  public oListaTerceros: any[] = [];
  public bLoadingTabla = false;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _tercerosServiceState: TerceroStateService
  ) {}

  ngOnInit(): void {
    this.cargarCoincidencia();
  }

  public cargarCoincidencia() {
    this.oListaTerceros = this.config.data.valores;
  }

  public estadoAccionModal() {
    this._tercerosServiceState.estadoCoincidenciaExtranjera.emit(true);
    this.ref.close(true);
  }

  public fnCerrarModal(accion: boolean) {
    this._tercerosServiceState.estadoCoincidenciaExtranjera.emit(false);
    this.ref.close(accion);
  }
}
