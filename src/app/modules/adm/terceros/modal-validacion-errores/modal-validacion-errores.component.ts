import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-validacion-errores',
  templateUrl: './modal-validacion-errores.component.html',
  styleUrls: ['./modal-validacion-errores.component.scss'],
})
export class ModalValidacionErroresComponent implements OnInit {
  public oListavalidaciones: any[] = [];
  public bLoadingTabla = false;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.cargarCoincidencia();
  }
  public cargarCoincidencia() {
    this.oListavalidaciones = this.config.data.valores;
    console.log(this.oListavalidaciones);
  }
  public fnCerrarModal(accion: boolean) {
    this.ref.close(accion);
  }
}
