import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { HorarioSistemaStateService } from 'src/app/domain/service/adm/horarioSistema/horario-sistema-state.service';
import { FrmHorarioSistemaComponent } from '../frm-horario-sistema/frm-horario-sistema.component';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ADM } from 'src/app/core/constant/adm.constants';

@Component({
  selector: 'app-horario-sistema',
  templateUrl: './horario-sistema.component.html',
  styleUrls: ['./horario-sistema.component.scss'],
})
export class HorarioSistemaComponent implements OnInit {
  @Input() mensajeFormularioHora: any[] = [];
  public oListaHorarioSistema: any[] = [];
  public sTipoAccion?: string = '';
  private mensaje$ = new Subscription();
  constructor(
    public dialogService: DialogService,
    private _horarioSistema: HorarioSistemaStateService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {}
  /**
   * @description Función que permite abrir el modal de crear Horarios del sistema
   */
  public crearEditarHorarioSistemaModal(index?: any, tipo?: string): void {
    this.sTipoAccion = tipo;
    if (this.sTipoAccion === 'crear') {
      this.sTipoAccion = 'CREAR HORARIO';
    } else {
      this.sTipoAccion = 'ACTUALIZAR HORARIO';
      this.oListaHorarioSistema[index];
    }
    this.dialogService.open(FrmHorarioSistemaComponent, {
      header: this.sTipoAccion,
      width: '55vw',
      data: {
        tipo: tipo,
        datosHorarioSistema: this.oListaHorarioSistema[index],
      },
    });
    this.mensaje$ = this._horarioSistema.mensajeFormularioHora.subscribe(
      (e: any) => {
        if (e.estado === true) {
          if (e !== undefined) {
            this._utilsService.fnMostrarMensaje({
              severity: ADM.ACCIONES_TOAST.toastTipo.creado,
              summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
              detail: e.mensaje,
            });
            this.mensaje$.unsubscribe();
          }
        } else {
          if (e !== undefined) {
            this._utilsService.fnMostrarMensaje({
              severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
              summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
              detail: e.mensaje,
            });
            this.mensaje$.unsubscribe();
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.mensaje$) this.mensaje$.unsubscribe();
  }
}
