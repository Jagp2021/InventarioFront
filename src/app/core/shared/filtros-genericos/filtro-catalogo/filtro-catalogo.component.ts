import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FiltrosGenericosService } from 'src/app/core/shared/filtros-genericos/services/filtros-genericos.service';

import { FILTROS_GENERICOS } from 'src/app/core/shared/filtros-genericos/constants/filtros-genericos.constants';
import {
  ICatalogosFG,
  IValoresDominioFG,
} from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';

@Component({
  selector: 'app-filtro-catalogo',
  templateUrl: './filtro-catalogo.component.html',
  styleUrls: ['./filtro-catalogo.component.scss'],
})
export class FiltroCatalogoComponent implements OnInit {
  @Input() sId: string = '';
  @Input() bAbrirFiltro: boolean = true;
  @Input() sTituloHeader: string = 'Buscar...';
  @Input() oInformacionFiltro: any[] = [];
  @Input() oInformacionPreFiltrada: any[] = [];
  @Input() oCamposFormulario: any[] = [];
  @Input() nWidth: string = '400px';
  @Input() bEsMultiple: boolean = false;
  @Input() bDevolverSoloID: boolean = false;
  @Input() bGuardarLocalStorage: boolean = false;
  @Input() aNiveles: number[] = [];
  @Output() bCerrarFiltro = new EventEmitter<boolean>(false);
  @Output() aPosicionesCatalogosEmitadas = new EventEmitter<string[]>();
  public aFuncionCatalogo: IValoresDominioFG[] = [];
  public aCatalogos: ICatalogosFG[] = [];
  public oBuscar: any[] = [];
  public bMostrarResultados: boolean = false;
  public bSeleccionarTodo: boolean = false;

  frmBuscarFiltro: FormGroup = this._formBuilder.group({
    funcionCatalogo: null,
    idCatalogo: null,
    codigoEntidadPci: null,
    descripcion: null,
    nivel: 0,
    registrosSeleccionadosJerarquia: null,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _filtrosGenericosService: FiltrosGenericosService
  ) {}

  ngOnInit(): void {}

  async ngOnChanges(cambioEstado: SimpleChanges) {
    if (cambioEstado['bAbrirFiltro']) {
      if (cambioEstado['bAbrirFiltro'].currentValue === true) {
        await this.fnCargarFuncionCatalogo();
        this.fnValidarPreCargaForm();
        await this.fnCargarCatalogos();
      }
    }
  }

  fnCambiarRadio(): void {
    this.bSeleccionarTodo = !this.bSeleccionarTodo;
  }

  /**
   * @description Cargar las funciones de catálogo de listas de selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarFuncionCatalogo(): Promise<void> {
    this.aFuncionCatalogo = (
      await this._filtrosGenericosService.consultarFGListaSeleccion({
        dominio1: FILTROS_GENERICOS.POSICION_CATALOGO.funcionCatalogo,
      })
    ).data[0]?.valoresDominios;
  }

  /**
   * @description Cargar los catálogos de listas de selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarCatalogos(): Promise<void> {
    this.aCatalogos = (
      await this._filtrosGenericosService.consultarFGCatalogos({})
    ).data;
  }

  /**
   * @description Valida que exista data previamente enviada al Filtro genérico
   * @return {void} No retorna datos
   */
  fnValidarPreFiltrado(): void {
    if (
      this.oInformacionPreFiltrada !== undefined &&
      (this.oInformacionPreFiltrada.length > 0 ||
        Object.keys(this.oInformacionPreFiltrada).length > 0)
    ) {
      this.frmBuscarFiltro.patchValue({
        registrosSeleccionadosJerarquia: this.oInformacionPreFiltrada,
      });

      this.fnBuscarResultados();
    }
  }

  /**
   * @description Valida si se enviaron campos para precargar el formulario de búsqueda y bloquea los campos
   * @return {void} No retorna datos
   */
  fnValidarPreCargaForm(): void {
    if (this.oCamposFormulario.length > 0) {
      this.frmBuscarFiltro.patchValue({
        funcionCatalogo: this.oCamposFormulario[0].funcionCatalogo ?? null,
        idCatalogo: this.oCamposFormulario[0].idCatalogo ?? null,
        codigoEntidadPci: this.oCamposFormulario[0].codigoEntidadPci ?? null,
        descripcion: this.oCamposFormulario[0].descripcion ?? null,
      });

      for (let key in this.oCamposFormulario[0]) {
        if (this.oCamposFormulario[0][key] !== null) {
          this.frmBuscarFiltro.get(key)?.disable();
        }
      }
    }

    this.fnValidarPreFiltrado();
  }

  /**
   * @description Nullea el formulario cuando se da click en el botón limpiar
   * @return {void} No retorna datos
   */
  fnLimpiarDatos(): void {
    this.frmBuscarFiltro.patchValue({
      funcionCatalogo: null,
      idCatalogo: null,
      codigoEntidadPci: null,
      descripcion: null,
      nivel: this.aNiveles,
    });

    this.fnValidarPreCargaForm();
  }

  /**
   * @description Expande la modal al realizar una búsqueda y envía lo capturado en el formulario
   * @return {void} No retorna datos
   */
  fnBuscarResultados(): void {
    this.frmBuscarFiltro.patchValue({
      nivel: this.aNiveles,
    });
    this.fnExpandirModal();
    this.oBuscar = this.frmBuscarFiltro.getRawValue();
  }

  /**
   * @description Función para abrir la modal y mostrar los resultados
   * @return {void} No retorna datos
   */
  fnExpandirModal(): void {
    let dialog: HTMLElement | null = document.getElementById(
      'filtroCatalogo' + this.sId
    );
    dialog!.className = 'expandir-modal-plus';
    this.bMostrarResultados = true;
  }

  /**
   * @description Contrae la modal al cerrar y emite el cierre del modal a donde se invoque
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltro(bCerrarFiltro: boolean): void {
    let dialog: HTMLElement | null = document.getElementById(
      'filtroCatalogo' + this.sId
    );
    dialog!.className = 'contraer-modal';

    this.bAbrirFiltro = bCerrarFiltro;
    this.bMostrarResultados = bCerrarFiltro;
    this.bCerrarFiltro.emit(this.bAbrirFiltro);
  }

  /**
   * @description Emite lo capturado desde el modal a donde se invoque
   * @return {void} No retorna datos
   */
  fnObtenerPosicionesCatalogo(aPosicionesCatalogo: string[]): void {
    this.aPosicionesCatalogosEmitadas.emit(aPosicionesCatalogo);
  }

  /**
   * @description Validar de forma general los campos del formulario
   * @param {string} sCampo Campo del formulario a validar
   * @return {boolean | undefined} Retorna un booleano o indefinido al realizar la validación
   */
  fnValidarCampo(sCampo: string): boolean | undefined {
    // return this.frmBuscar[sCampo]?.invalid && this.frmBuscar[sCampo]?.touched;
    return;
  }

  /**
   * @description Obtener los posibles errores el formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {string} Retorna el mensaje de error para el formulario
   */
  fnListarErrorForm(sCampo: string): string {
    // const errors = this.frmBuscar[sCampo]?.errors;

    // if (errors?.['required']) return 'Este campo es obligatorio.';
    // if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    // if (errors?.['maxlength'])
    //   return `No puede superar los ${errors?.['maxlength'].requiredLength} caracteres.`;
    // if (errors?.['pattern'])
    //   return 'No puede contener caracteres especiales o espacios en blanco.';

    return '';
  }
}
