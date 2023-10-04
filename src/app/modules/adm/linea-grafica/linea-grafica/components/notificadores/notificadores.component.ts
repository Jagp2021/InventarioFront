import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-notificadores',
  templateUrl: './notificadores.component.html',
  styleUrls: ['./notificadores.component.scss'],
})
export class NotificadoresComponent implements OnInit {
  /** Banderas */
  public oMensajeBandera!: Message[];

  /** Evento sistema */
  public oEventoSistema: any = {
    sTipo: '',
    sEncabezado: '',
    sIcono: '',
    sMensaje: `.`,
    sCerrar: '',
    bEsMultiple: false,
    bEsEvento: true,
    bMostrar: false,
  };

  /** Loading */
  public bVisibleLoading: boolean = false;
  public nValorProgress: number = 0;

  constructor(
    private _utilsService: UtilsService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {}

  fnMostrarToastSuccess() {
    this._utilsService.fnMostrarMensaje({
      severity: 'success',
      summary: 'Mensaje Éxito',
      detail: 'Mensaje de prueba Toast',
    });
  }

  fnMostrarToastError() {
    this._utilsService.fnMostrarMensaje({
      severity: 'error',
      summary: 'Mensaje Error',
      detail: 'Mensaje de prueba Toast',
    });
  }

  fnMostrarToastWarn() {
    this._utilsService.fnMostrarMensaje({
      severity: 'warn',
      summary: 'Mensaje Advertencia',
      detail: 'Mensaje de prueba Toast',
    });
  }

  fnGenerarMensajeErrores(): void {
    // this.sTitulo = DEPENDENCIAS.ERROR;
    // this.sMensajePrimario = sMensaje;
    // this.sMensajeSecundario = DEPENDENCIAS.ERRORES_SUBTITULO;

    this._messageService.addAll([
      {
        key: 'some',
        severity: 'error',
        life: 100000,
      },
    ]);
  }

  fnCargarEvento() {
    /** Acción a ejecutar tras el click del SI */
  }

  fnMostrarBanderaSuccess(bEsSencilla: boolean = true) {
    if (bEsSencilla) {
      this.oMensajeBandera = [
        {
          severity: 'success',
          summary: 'Éxitoso',
          detail: `Mensaje de prueba para la bandera de notificación sencilla.`,
        },
      ];
    } else {
      this.oMensajeBandera = [
        {
          severity: 'success',
          summary: '',
          detail: `<strong>Mensaje énfasis</strong> Mensaje de&#13;prueba para <br/> la bandera de notificación&#13;1 sencilla...`,
        },
      ];
    }
  }

  fnMostrarBanderaError(bEsSencilla: boolean = true) {
    if (bEsSencilla) {
      this.oMensajeBandera = [
        {
          severity: 'error',
          summary: 'Error',
          detail: `Mensaje de prueba para la bandera de notificación sencilla.`,
        },
      ];
    } else {
      this.oMensajeBandera = [
        {
          severity: 'error',
          summary: '',
          detail: `<strong>Mensaje énfasis</strong> Mensaje de&#13;prueba para <br/> la bandera de notificación&#13;1 sencilla...`,
        },
      ];
    }
  }

  fnMostrarBanderaWarn(bEsSencilla: boolean = true) {
    if (bEsSencilla) {
      this.oMensajeBandera = [
        {
          severity: 'warn',
          summary: 'Advertencia',
          detail: `Mensaje de prueba para la bandera de notificación sencilla.`,
        },
      ];
    } else {
      this.oMensajeBandera = [
        {
          severity: 'warn',
          summary: '',
          detail: `<strong>Mensaje énfasis</strong> Mensaje de&#13;prueba para <br/> la bandera de notificación&#13;1 sencilla...`,
        },
      ];
    }
  }

  fnMostrarLoading() {
    this.bVisibleLoading = true;

    this.fnCargarProgreso();
  }

  fnMostrarEventoSistema() {
    this.oEventoSistema = {
      ...this.oEventoSistema,
      sTipo: 'system',
      sEncabezado: 'Registro exitoso',
      sIcono: 'exclamation-triangle',
      sMensaje: `Registro masivo en ejecución...`,
      sCerrar: 'X',
      bEsMultiple: false,
      bEsEvento: true,
      bMostrar: true,
    };

    this.fnCargarProgreso(false);
  }

  fnCargarProgreso(bEsLoading: boolean = true) {
    this.nValorProgress = 0;
    let interval = setInterval(() => {
      this.nValorProgress =
        this.nValorProgress + Math.floor(Math.random() * 30) + 1;
      if (this.nValorProgress >= 100) {
        this.nValorProgress = 100;
        if (!bEsLoading) {
          this._utilsService.fnMostrarMensaje({
            severity: 'success',
            summary: 'Carga completa',
            detail: 'Se ha cargado el archivo correctamente',
          });

          this.oEventoSistema = {};
        }

        clearInterval(interval);
      }
    }, 2000);
  }
}
