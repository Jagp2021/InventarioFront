import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UtilsService } from 'src/app/core/shared/filtros-genericos/services/utils.service';
import { FiltrosGenericosService } from 'src/app/core/shared/filtros-genericos/services/filtros-genericos.service';

@Component({
  selector: 'app-filtro-catalogo-resultado',
  templateUrl: './filtro-catalogo-resultado.component.html',
  styleUrls: ['./filtro-catalogo-resultado.component.scss'],
})
export class FiltroCatalogoResultadoComponent implements OnInit {
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
  @Output() aPosicionesCatalogosEmitadas = new EventEmitter<string[]>();
  public aResultados: any[] = [];
  public aPosicionesTomadas: any[] = [];
  public aPosicionesSeleccionadas: any[] = [];
  public aPosicionSeleccionada: any = null;
  private _oBuscar!: any;
  private _oInformacionFiltro: any = null;

  get fnValidarSeleccionDatos(): boolean {
    let bHabilitarBoton: boolean = true;

    if (
      this.aPosicionesTomadas !== undefined &&
      this.aPosicionesTomadas.length > 0
    ) {
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
   * @description Busca las posiciones de catálogos con la información proporcionada por el filtro
   * @return {Promise<void>} No retorna datos
   */
  async fnBuscarResultados(): Promise<void> {
    this._oBuscar.idCatalogo = this._oBuscar.idCatalogo ?? 0;
    await this._utilsService.fnSleep(500);
    this._utilsService.fnModificarVaciosForm(this._oBuscar);

    this.aResultados = (
      await this._filtrosGenericosService.consultarFGPosicionArbol(
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
    if (this.bSeleccionarTodo) {
      this._oInformacionFiltro = this.aResultados;
    }

    this.aPosicionesTomadas = this._oInformacionFiltro;
  }

  /**
   * @description Limpia los resultados generados y emite el cierre del modal
   * @return {void} No retorna datos
   */
  fnCerrarModal(): void {
    this.aResultados = [];
    this.aPosicionesSeleccionadas = [];
    this.bCerrarFiltro.emit(false);
  }

  /**
   * @description Genera un guardado en localStorage de la información y emite la información a donde se invoque
   * @return {void} No retorna datos
   */
  fnCargarResultados(): void {
    let sValoresListas: any[] = [];

    if (!this.bEsMultiple && this.aPosicionesTomadas.length > 1) {
      this.fnMostrarMensaje(
        'error',
        'Error',
        'El filtro no está configurado para múltiples datos. Seleccione un único valor e intente de nuevo.'
      );

      return;
    }

    if (this.bGuardarLocalStorage) {
      for (const iterator of this.aPosicionesTomadas) {
        sValoresListas.push({ key: iterator.key, label: iterator.label });
      }

      const aPosiconesLocalStorage = JSON.stringify(sValoresListas);

      localStorage.setItem(
        'FG_Posiciones_Seleccionados',
        aPosiconesLocalStorage
      );
    }

    this.aPosicionesCatalogosEmitadas.emit(this.aPosicionesTomadas);
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
