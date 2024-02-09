import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/core/shared/filtros-genericos/services/utils.service';
import { FiltrosGenericosService } from 'src/app/core/shared/filtros-genericos/services/filtros-genericos.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-filtro-terceros-resultado',
  templateUrl: './filtro-terceros-resultado.component.html',
  styleUrls: ['./filtro-terceros-resultado.component.scss'],
})
export class FiltroTercerosResultadoComponent implements OnInit {
  @Input() bAbrirFiltro: boolean = true;
  @Input() bEsMultiple: boolean = false;
  @Input() bDevolverSoloID: boolean = false;
  @Input() bGuardarLocalStorage: boolean = false;
  @Input() bSeleccionarTodo: boolean = false;
  @Input()
  get oInformacionFiltro() {
    return this._oInformacionFiltro;
  }
  set oInformacionFiltro(value: any) {
    this._oInformacionFiltro = value;
    this.fnBuscarResultados();
  }
  @Input()
  get oBuscar() {
    return this._oBuscar;
  }
  set oBuscar(value: any) {
    this._oBuscar = value;
    this.fnBuscarResultados();
  }
  @Output() bCerrarFiltro = new EventEmitter<boolean>(false);
  @Output() aTercerosEmitados = new EventEmitter<string[]>();
  public aResultados: any[] = [];
  public aTercerosSeleccionados: any[] = [];
  public aTerceroSeleccionado: any = null;
  private _oBuscar!: any;
  private _oInformacionFiltro: any = null;
  // public aValoresPorcentuales: number[] = []; // TODO: VALIDAR QUE DEFINITIVAMENTE NO VAYAN LOS VALORES PORCENTUALES EN EL FILTRO

  get fnValidarSeleccionDatos(): boolean {
    let bHabilitarBoton: boolean = true;

    if (
      this.bEsMultiple &&
      this.aTercerosSeleccionados !== undefined &&
      this.aTercerosSeleccionados.length > 0
    ) {
      bHabilitarBoton = false;
    }

    if (!this.bEsMultiple && this.aTerceroSeleccionado !== undefined) {
      bHabilitarBoton = false;
    }

    return bHabilitarBoton;
  }

  constructor(
    private _filtrosGenericosService: FiltrosGenericosService,
    private _messageService: MessageService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  /**
   * @description Busca las transacciones con la información proporcionada por el filtro
   * @return {Promise<void>} No retorna datos
   */
  async fnBuscarResultados(): Promise<void> {
    this._oBuscar.idPais = this._oBuscar.idPais ?? 0;
    this._oBuscar.idRegion = this._oBuscar.idRegion ?? 0;
    this._oBuscar.idCiudad = this._oBuscar.idCiudad ?? 0;
    await this._utilsService.fnSleep(500);
    this._utilsService.fnModificarVaciosForm(this._oBuscar);

    this.aResultados = (
      await this._filtrosGenericosService.consultarFGUsuarios(this._oBuscar)
    ).data;

    if (this.aResultados.length > 0) {
      this.fnCheckSeleccionados();
    }
  }

  /**
   * @description Valida los datos que están preseleccionados y los marca en el filtro
   * @return {void} No retorna datos
   */
  fnCheckSeleccionados(): void {
    if (this.bEsMultiple) {
      if (this.bSeleccionarTodo) {
        this._oInformacionFiltro = this.aResultados;
      }

      this.aTercerosSeleccionados = this._oInformacionFiltro;
    } else {
      this.aTerceroSeleccionado = this.aResultados.filter(
        (val) => val.id === this._oInformacionFiltro?.id
      )[0];
    }
  }

  /**
   * @description Limpia los resultados generados y emite el cierre del modal
   * @return {void} No retorna datos
   */
  fnCerrarModal(): void {
    this.aResultados = [];
    this.aTercerosSeleccionados = [];
    this.bCerrarFiltro.emit(false);
  }

  /**
   * @description Genera un guardado en localStorage de la información y emite la información a donde se invoque
   * @return {void} No retorna datos
   */
  fnCargarResultados(): void {
    // if (this.aValoresPorcentuales.length === 0) {
    //   this.fnMostrarMensaje(
    //     'error',
    //     'Error',
    //     'No ha ingresado ningún valor porcentual para los terceros seleccionados.'
    //   );

    //   return;
    // } else {
    //   const nPorcentaje = this.fnValidarPorcentajes();
    //   if (nPorcentaje < 100) {
    //     this.fnMostrarMensaje(
    //       'error',
    //       'Error',
    //       'Los valores ingresados no cumplen con el 100%.'
    //     );

    //     return;
    //   }
    // }

    let aLocalStorage: any;
    if (this.bGuardarLocalStorage) {
      aLocalStorage = this.bEsMultiple
        ? JSON.stringify(this.aTercerosSeleccionados)
        : JSON.stringify(this.aTerceroSeleccionado);
      localStorage.setItem('FG_Terceros_Seleccionados', aLocalStorage);
    }

    if (this.bEsMultiple) {
      this.aTercerosEmitados.emit(this.aTercerosSeleccionados);
    } else {
      this.aTercerosEmitados.emit(this.aTerceroSeleccionado);
    }
    this.fnCerrarModal();
  }

  // fnValidarPorcentajes(): number {
  //   return this.aValoresPorcentuales.reduce((v1, v2) => v1 + v2);
  // }

  fnMostrarMensaje(severity: string, summary: string, detail: string): void {
    this._messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
