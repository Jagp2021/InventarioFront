import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/core/shared/filtros-genericos/services/utils.service';
import { FiltrosGenericosService } from 'src/app/core/shared/filtros-genericos/services/filtros-genericos.service';

@Component({
  selector: 'app-filtro-perfiles-resultado',
  templateUrl: './filtro-perfiles-resultado.component.html',
  styleUrls: ['./filtro-perfiles-resultado.component.scss'],
})
export class FiltroPerfilesResultadoComponent implements OnInit {
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
  @Output() aPerfilesEmitados = new EventEmitter<string[]>();
  public aResultados: any[] = [];
  public aPerfilesSeleccionados: any[] = [];
  public aPerfilSeleccionado: any = null;
  private _oBuscar!: any;
  private _oInformacionFiltro: any = null;

  get fnValidarSeleccionDatos(): boolean {
    let bHabilitarBoton: boolean = true;

    if (
      this.bEsMultiple &&
      this.aPerfilesSeleccionados !== undefined &&
      this.aPerfilesSeleccionados.length > 0
    ) {
      bHabilitarBoton = false;
    }

    if (!this.bEsMultiple && this.aPerfilSeleccionado !== undefined) {
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
    this._oBuscar.codigoPerfil = this._oBuscar.codigoPerfil ?? 0;
    await this._utilsService.fnSleep(500);
    this._utilsService.fnModificarVaciosForm(this._oBuscar);

    this.aResultados = (
      await this._filtrosGenericosService.consultarFGPerfiles(this._oBuscar)
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

      this.aPerfilesSeleccionados = this._oInformacionFiltro;
    } else {
      this.aPerfilSeleccionado = this.aResultados.filter(
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
    this.aPerfilesSeleccionados = [];
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
        ? JSON.stringify(this.aPerfilesSeleccionados)
        : JSON.stringify(this.aPerfilSeleccionado);
      localStorage.setItem('FG_Perfiles_Seleccionados', aLocalStorage);
    }

    if (this.bEsMultiple) {
      this.aPerfilesEmitados.emit(this.aPerfilesSeleccionados);
    } else {
      this.aPerfilesEmitados.emit(this.aPerfilSeleccionado);
    }

    this.fnCerrarModal();
  }
}
