import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/core/shared/filtros-genericos/services/utils.service';
import { FiltrosGenericosService } from 'src/app/core/shared/filtros-genericos/services/filtros-genericos.service';

@Component({
  selector: 'app-filtro-transacciones-resultado',
  templateUrl: './filtro-transacciones-resultado.component.html',
  styleUrls: ['./filtro-transacciones-resultado.component.scss'],
})
export class FiltroTransaccionesResultadoComponent implements OnInit {
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
  @Output() aTransacionesEmitadas = new EventEmitter<string[]>();
  public aResultados: any[] = [];
  public aTransaccionesSeleccionadas: any[] = [];
  public aTransaccionSeleccionada: any = null;
  public _oBuscar!: any;
  private _oInformacionFiltro: any = null;

  get fnValidarSeleccionDatos(): boolean {
    let bHabilitarBoton: boolean = true;

    if (
      this.bEsMultiple &&
      this.aTransaccionesSeleccionadas !== undefined &&
      this.aTransaccionesSeleccionadas.length > 0
    ) {
      bHabilitarBoton = false;
    }

    if (!this.bEsMultiple && this.aTransaccionSeleccionada !== undefined) {
      bHabilitarBoton = false;
    }

    return bHabilitarBoton;
  }

  constructor(
    private _filtrosGenericosService: FiltrosGenericosService,
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
      await this._filtrosGenericosService.consultarFGTransacciones(
        this._oBuscar
      )
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

      this.aTransaccionesSeleccionadas = this._oInformacionFiltro;
    } else {
      this.aTransaccionSeleccionada = this.aResultados.filter(
        (val) => val.codigo === this._oInformacionFiltro?.codigo
      )[0];
    }
  }

  /**
   * @description Limpia los resultados generados y emite el cierre del modal
   * @return {void} No retorna datos
   */
  fnCerrarModal(): void {
    this.aResultados = [];
    this.aTransaccionesSeleccionadas = [];
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
        ? JSON.stringify(this.aTransaccionesSeleccionadas)
        : JSON.stringify(this.aTransaccionSeleccionada);
      localStorage.setItem('FG_Transacciones_Selected', aLocalStorage);
    }

    if (this.bEsMultiple) {
      this.aTransacionesEmitadas.emit(this.aTransaccionesSeleccionadas);
    } else {
      this.aTransacionesEmitadas.emit(this.aTransaccionSeleccionada);
    }

    this.fnCerrarModal();
  }
}
