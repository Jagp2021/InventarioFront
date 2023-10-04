import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { FrmHorarioSistemaComponent } from '../frm-horario-sistema/frm-horario-sistema.component';
import { IHorarioSistema } from 'src/app/domain/interface/adm/horario-sistema/horario-sistema.interface';
import { HorarioSistemaStateService } from 'src/app/domain/service/adm/horarioSistema/horario-sistema-state.service';
import { Subscription } from 'rxjs';
import { ADM } from 'src/app/core/constant/adm.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import { HORARIO_SISTEMA } from 'src/app/core/constant/adm/horario-sistema.constants';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

@Component({
  selector: 'app-com-tabla-horario-sistema',
  templateUrl: './com-tabla-horario-sistema.component.html',
  styleUrls: ['./com-tabla-horario-sistema.component.scss'],
})
export class ComTablaHorarioSistemaComponent implements OnInit {
  @Input() mensajeFormularioHora: any[] = [];
  public oListaHorarioSistema: any[] = [];
  public bLoadingTabla = false;
  public sTipoAccion?: string = '';
  private mensaje$ = new Subscription();

  constructor(
    public dialogService: DialogService,
    private _horarioSistema: HorarioSistemaStateService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.consultarHorariosSistema();
  }

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

  /**
   * @description Función que consulta los Horarios del sistema
   */
  public consultarHorariosSistema(): void {
    this.bLoadingTabla = true;
    let datos: IHorarioSistema = {};
    this._horarioSistema.consultarHorarioSistema(datos);
    this._horarioSistema
      .select((e) => e.oListaHorariosSistema)
      .subscribe({
        next: (e) => {
          this.oListaHorarioSistema = e;
          this.bLoadingTabla = false;
        },
      });
  }

  /**
   * @description Función que elimina un horario del sistema
   */
  public async eliminarHora(oIndice: any, nIndice: number) {
    let oEliminarHora: any;
    if (this.oListaHorarioSistema.length > 1) {
      oEliminarHora =
        await this._horarioSistema.eliminarHorarioSistema<IRespuestaApi>(
          oIndice
        );
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.creado,
        summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
        detail: HORARIO_SISTEMA.MSG_ELIMINAR.concat(' '),
      });
      this.oListaHorarioSistema.splice(nIndice, 1);
    } else {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.informacion,
        summary: ADM.ACCIONES_TOAST.toastMensaje.informacion,
        detail: HORARIO_SISTEMA.MSG_EXISTENCIA.concat(' '),
      });
    }
  }
  ngOnDestroy(): void {
    if (this.mensaje$) this.mensaje$.unsubscribe();
  }

  fnMostrarOcultarBotones(
    oEvento: any,
    nIndice: number,
    bMostrar: boolean,
    sId?: string
  ): void {
    this._utilsService.fnMostrarOcultarBotonesPrimario(
      oEvento,
      nIndice,
      bMostrar,
      sId
    );
  }
}
