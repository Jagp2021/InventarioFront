import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { IConsecutivoTipoDocumento } from 'src/app/domain/interface/adm/consecutivo/consecutivo-tipo-documento.interface';
import { ConfiguracionConsecutivoStateService } from 'src/app/domain/service/adm/consecutivo/configuracion-consecutivo-state.service';
import { FrmConfiguracionConsecutivoComponent } from '../frm-configuracion-consecutivo/frm-configuracion-consecutivo.component';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { Table } from 'primeng/table';
import { ADM } from 'src/app/core/constant/adm.constants';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-com-tabla-configuracion-consecutivo',
  templateUrl: './com-tabla-configuracion-consecutivo.component.html',
  styleUrls: ['./com-tabla-configuracion-consecutivo.component.scss'],
})
export class ComTablaConfiguracionConsecutivoComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public oListaSecuenciaDocumentoSoporte: IConsecutivoTipoDocumento[] = [];
  public oListaTipoDocumentoSoporte: any[] = [];
  public loadingTabla = false;
  public sTipoAccion?: string = '';
  private mensaje$ = new Subscription();
  constructor(
    public dialogService: DialogService,
    private _configuracionConsecutivoStateService: ConfiguracionConsecutivoStateService,
    private _listaSeleccionState: ListaSeccionStateService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('stipoDocumentoSoporte', '5');
    this.consultarTipoDocumentoSoporte();
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

  ngOnDestroy(): void {
    if (this.mensaje$) this.mensaje$.unsubscribe();
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  /**
   * @description Función que consulta la lista de expedidor

   */
  public async consultarTipoDocumentoSoporte(): Promise<void> {
    this.oListaTipoDocumentoSoporte = (
      await this._listaSeleccionState.consultarTipoDocumentoSoporte({
        Dominio: 'TIPODOCUMENTOSOPORTE',
      })
    ).data;
  }

  /**
   * @description Función que permite abrir el modal de configuracion de consecutivos
   * @param index
   */
  public editarSecuenciaDocumentoSoporte(index: any): void {
    this.dialogService.open(FrmConfiguracionConsecutivoComponent, {
      header: 'EDITAR GENERACIÓN DE CONSECUTIVOS',
      width: '55vw',
      data: {
        tipoDocumentoSoporte: this.oListaTipoDocumentoSoporte[index],
      },
    });
    this.mensaje$ =
      this._configuracionConsecutivoStateService.mensajeFormularioConsecutivo.subscribe(
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
            this._utilsService.fnMostrarMensaje({
              severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
              summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
              detail: e.mensaje,
            });
            this.mensaje$.unsubscribe();
          }
        }
      );
  }
}
