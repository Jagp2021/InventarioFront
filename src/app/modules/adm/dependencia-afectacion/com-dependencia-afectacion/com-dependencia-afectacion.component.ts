import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ADM } from 'src/app/core/constant/adm.constants';
import { DEPENDENCIAS } from 'src/app/core/constant/adm/dependencia-afectacion';
import { UtilsService } from 'src/app/core/services/utils.service';
import { FrmCrearDependenciaComponent } from '../frm-crear-dependencia/frm-crear-dependencia.component';
import { DependenciaAfectacionStateService } from 'src/app/domain/service/adm/dependencia-afectacion/dependencia-afectacion-state.service';
import {
  IDependenciasAfectacion,
  IErroresDependencia,
} from 'src/app/domain/interface/adm/dependencia-afectacion/dependencia-afectacion.interface';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-com-dependencia-afectacion',
  templateUrl: './com-dependencia-afectacion.component.html',
  styleUrls: ['./com-dependencia-afectacion.component.scss'],
})
export class ComDependenciaAfectacionComponent implements OnInit {
  @Input()
  oBusquedaDependencias!: IDependenciasAfectacion;
  public aDependenciasAfectacion: IDependenciasAfectacion[] = [];
  public bCargarLoading: boolean = true;
  public bDisplayModal: boolean = false;
  public bIndicaVinculacion: boolean = false;
  public bMostrarTabla: boolean = false;
  public aDependenciasAfectadasSeleccionadas!: IDependenciasAfectacion[];
  public oRef: DynamicDialogRef | undefined;
  public sTitulo!: string;
  public sMensajePrimario!: string;
  public sMensajeSecundario!: string;
  public aErroresMostrar: IErroresDependencia[] = [];

  constructor(
    private _utilsService: UtilsService,
    private _confirmationService: ConfirmationService,
    private _dependenciaAfectacionState: DependenciaAfectacionStateService,
    public dialogService: DialogService,
    private _messageService: MessageService
  ) {}

  async ngOnChanges(cambioEstado: SimpleChanges) {
    if (cambioEstado['oBusquedaDependencias']) {
      if (cambioEstado['oBusquedaDependencias'].currentValue !== undefined) {
        this.aDependenciasAfectadasSeleccionadas = [];
        this.bMostrarTabla = true;
        this.bIndicaVinculacion =
          cambioEstado['oBusquedaDependencias'].currentValue.indicaVinculacion;
        await this.fnConsultarDependencias(
          cambioEstado['oBusquedaDependencias'].currentValue
        );
      }
    }
  }

  ngOnInit(): void {}

  /**
   * @description Consulta las dependencias de Afectación con los datos ingresados en el formulario de búsqueda
   * @param {IDependenciasAfectacion} oBusqueda Objeto de búsqueda del formulario
   * @return {Promise<void>} No retorna datos
   */
  async fnConsultarDependencias(
    oBusqueda: IDependenciasAfectacion
  ): Promise<void> {
    this.aDependenciasAfectadasSeleccionadas = [];
    oBusqueda = this._utilsService.fnEliminarVaciosForm(oBusqueda);

    this.aDependenciasAfectacion = (
      await this._dependenciaAfectacionState.fnConsultarDependencias(oBusqueda)
    ).data;

    if (this.aDependenciasAfectacion.length > 0) {
      this.bCargarLoading = false;
    }
  }

  /**
   * @description Método que permite establecer si una dependencia se está vinculando o desvinculando
   * @param {boolean} bVincular Bandera para true: vincular / false: desvincular
   * @return {Promise<void>} No retorna datos
   */
  async fnDeterminarDependencia(bVincular: boolean): Promise<void> {
    let sMensaje = bVincular ? DEPENDENCIAS.VINCULAR : DEPENDENCIAS.DESVINCULAR;

    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      key: 'ada-tbl-desvincular',
      message: `${DEPENDENCIAS.MSG_DESVINCULAR.MSG_DESVINCULAR_1} ${sMensaje} ${DEPENDENCIAS.MSG_DESVINCULAR.MSG_DESVINCULAR_2}`,
      accept: async () => {
        if (bVincular) {
          await this.fnVincularDependencia();
        } else {
          await this.fnDesvincularDependencia();
        }
      },
    });
  }

  /**
   * @description Vincula las dependencias seleccionadas y actualiza los resultados
   * @return {Promise<void>} No retorna datos
   */
  async fnVincularDependencia(): Promise<void> {
    let oRespuesta: IRespuestaApi;

    oRespuesta =
      await this._dependenciaAfectacionState.fnVincularDependeciaAfectacion(
        this.aDependenciasAfectadasSeleccionadas
      );

    const sValidarMsg =
      oRespuesta.codigo === ADM.ESTADO_HTTP_200 && oRespuesta.estado
        ? 'creado'
        : 'fallido';

    this._utilsService.fnMostrarMensaje({
      severity: ADM.ACCIONES_TOAST.toastTipo[sValidarMsg],
      summary: ADM.ACCIONES_TOAST.toastMensaje[sValidarMsg],
      detail: oRespuesta.mensaje,
    });

    this.fnCargarDependencias(false);
  }

  /**
   * @description Desvincula las dependencias seleccionadas y actualiza los resulados
   * @return {Promise<void>} No retorna datos
   */
  async fnDesvincularDependencia(): Promise<void> {
    let oRespuesta: IRespuestaApi;

    this.aDependenciasAfectadasSeleccionadas.map((valor) => {
      valor.indicaVinculacion = false;
    });

    oRespuesta =
      await this._dependenciaAfectacionState.fnDesvincularDependeciaAfectacion(
        this.aDependenciasAfectadasSeleccionadas
      );

    if (oRespuesta.codigo === ADM.ESTADO_HTTP_200 && oRespuesta.estado) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.creado,
        summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
        detail: oRespuesta.mensaje,
      });
    } else {
      this.fnGenerarMensajeErrores(String(oRespuesta.mensaje), oRespuesta.data);
    }

    this.fnCargarDependencias(true);
  }

  /**
   * @description Genera la información para el toast con acciones
   * @return {void} No retorna datos
   */
  fnGenerarMensajeErrores(
    sMensaje: string,
    aDatos: IErroresDependencia[]
  ): void {
    this.aErroresMostrar = aDatos;
    this.sTitulo = DEPENDENCIAS.ERROR;
    this.sMensajePrimario = sMensaje;
    this.sMensajeSecundario = DEPENDENCIAS.ERRORES_SUBTITULO;

    this._messageService.addAll([
      {
        key: 'some',
        severity: 'error',
        life: 100000,
      },
    ]);
  }

  fnCerrarModal() {
    this.bDisplayModal = false;
  }

  /**
   * @description Método que consulta nuevamente las dependencias
   * @return {void} No retorna datos
   */
  fnCargarDependencias(bVinculacion: boolean): void {
    setTimeout(async () => {
      await this.fnConsultarDependencias({
        idEntidadesPci: Number(localStorage.getItem('IdEntidadesPci')),
        indicaVinculacion: bVinculacion,
      });
    }, 500);
  }

  /**
   * @description Método que permita calcular la cantidad de elementos inactivos seleccionados
   * @return {number} Retorna la cantidad de elementos inactivos seleccionados
   */
  fnValidarInactivos(): number {
    let nIncrementador: number = 0;
    this.aDependenciasAfectadasSeleccionadas.forEach((valor: any) => {
      if (valor.estadoDependencia === 'INAC') {
        nIncrementador++;
      }
    });

    return nIncrementador;
  }

  /**
   * @description Método que abre la modal de edición de datos y pasa la información
   * @return {void} No retorna datos
   */
  fnEditarDependencia(
    oDependencia: IDependenciasAfectacion,
    bIndicaVinculacion: boolean
  ): void {
    this.oRef = this.dialogService.open(FrmCrearDependenciaComponent, {
      header: DEPENDENCIAS.MSG_MODIFICAR_DEPENDENCIA,
      width: '55vw',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { sTipo: DEPENDENCIAS.TIPO_EDITAR, oDependencia },
    });

    this.oRef.onClose.subscribe(async (data: any) => {
      this.fnCargarDependencias(bIndicaVinculacion);
    });
  }

  /**
   * @description Elimina la dependencia de afectación
   * @return {void} No retorna datos
   */
  fnEliminarDependencia(
    oDependencia: IDependenciasAfectacion,
    bIndicaVinculacion: boolean
  ): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      key: 'ada-tbl-eliminar',
      message: `${DEPENDENCIAS.MSG_ELIMINAR} ${oDependencia.codigoDependencia} - ${oDependencia.descripcionDependencia}?`,
      accept: async () => {
        const oRespuesta =
          await this._dependenciaAfectacionState.fnEliminarDependeciaAfectacion(
            {
              codigo: oDependencia.codigoDependencia,
              funcionCatalogo: oDependencia.funcionDependencia,
              descripcion: oDependencia.descripcionDependencia,
              estado: oDependencia.estadoDependencia,
              idEntidadesPci: oDependencia.idEntidadesPci,
            }
          );

        const sValidarMsg =
          oRespuesta.codigo === ADM.ESTADO_HTTP_200 && oRespuesta.estado
            ? 'creado'
            : 'fallido';

        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo[sValidarMsg],
          summary: ADM.ACCIONES_TOAST.toastMensaje[sValidarMsg],
          detail: oRespuesta.mensaje,
        });

        this.fnCargarDependencias(bIndicaVinculacion);
      },
    });
  }

  fnCargarEvento() {
    this.bDisplayModal = true;
  }

  /**
   * @description Lanza el mensaje para desvincular una cuenta, si se acepta procede a utilizar el endpoint de actualizar
   * @param {any} oEvento Objeto de tipo Cuenta emitida del formulario
   * @param {number} sTitulo Índice de la tabla
   * @param {boolean} bMostrar Bandera para mostrar o no mostrar los botones
   * @param {string} sId Complementa el ID único para cada tabla
   * @return {void} No retorna datos
   */
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

  /**
   * @description Método para recortar el texto que se envía
   * @param {string} sTexto Texto a recortar
   * @param {number} nIndex Índice de la tabla
   * @return {string} Retorna el texto recortado
   */
  fnCortarTexto(sTexto: string, nIndex: number): string {
    return this._utilsService.fnCortarTexto(sTexto, nIndex);
  }

  /**
   * @description Método para recortar el texto que se envía
   * @param {MouseEvent} oEventoMouse Evento del Mouse
   * @param {OverlayPanel} oOverlayPanel Opción de Overlay
   * @return {void} No retorna datos
   */
  fnCargarOverlay(oEventoMouse: MouseEvent, oOverlayPanel: OverlayPanel): void {
    this._utilsService.fnMostrarOverlay(oEventoMouse, oOverlayPanel);
  }
}
