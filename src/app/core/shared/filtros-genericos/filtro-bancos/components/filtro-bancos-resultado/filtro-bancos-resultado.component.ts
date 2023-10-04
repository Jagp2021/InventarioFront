import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

import { UtilsService } from 'src/app/core/shared/filtros-genericos/services/utils.service';
import { FiltrosGenericosService } from 'src/app/core/shared/filtros-genericos/services/filtros-genericos.service';
import { IBancosFG } from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';

@Component({
  selector: 'app-filtro-bancos-resultado',
  templateUrl: './filtro-bancos-resultado.component.html',
  styleUrls: ['./filtro-bancos-resultado.component.scss'],
})
export class FiltroBancosResultadoComponent implements OnInit {
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
  @Output() aBancosEmitados = new EventEmitter<string[]>();
  public aResultados: any[] = [];
  public aBancosSeleccionados: any[] = [];
  public aBancoSeleccionado: any = null;
  private _oBuscar!: any;
  private _oInformacionFiltro: any = null;

  get fnValidarSeleccionDatos(): boolean {
    let bHabilitarBoton: boolean = true;

    if (
      this.bEsMultiple &&
      this.aBancosSeleccionados !== undefined &&
      this.aBancosSeleccionados.length > 0
    ) {
      bHabilitarBoton = false;
    }

    if (!this.bEsMultiple && this.aBancoSeleccionado !== undefined) {
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
    await this._utilsService.fnSleep(500);
    this._utilsService.fnModificarVaciosForm(this._oBuscar);

    this.aResultados = (
      await this._filtrosGenericosService.consultarFGBancos(this._oBuscar)
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

      this.aBancosSeleccionados = this._oInformacionFiltro;
    } else {
      this.aBancoSeleccionado = this.aResultados.filter(
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
    this.aBancosSeleccionados = [];
    this.bCerrarFiltro.emit(false);
  }

  /**
   * @description Genera un guardado en localStorage de la información y emite la información a donde se invoque
   * @return {void} No retorna datos
   */
  fnCargarResultados(): void {
    let aLocalStorage: any;
    if (this.bGuardarLocalStorage) {
      aLocalStorage = this.bEsMultiple
        ? JSON.stringify(this.aBancosSeleccionados)
        : JSON.stringify(this.aBancoSeleccionado);
      localStorage.setItem('FG_Perfiles_Seleccionados', aLocalStorage);
    }

    if (this.bEsMultiple) {
      this.aBancosEmitados.emit(this.aBancosSeleccionados);
    } else {
      this.aBancosEmitados.emit(this.aBancoSeleccionado);
    }
    this.fnCerrarModal();
  }

  fnMostrarMensaje(severity: string, summary: string, detail: string): void {
    this._messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
