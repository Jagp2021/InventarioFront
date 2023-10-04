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
  ITransaccionesFG,
  IValoresDominioFG,
  IEstadosTransaccionFG,
} from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';

@Component({
  selector: 'app-filtro-transacciones',
  templateUrl: './filtro-transacciones.component.html',
  styleUrls: ['./filtro-transacciones.component.scss'],
})
export class FiltroTransaccionesComponent implements OnInit {
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
  @Input() nIndex: number = 1;
  @Output() bCerrarFiltro = new EventEmitter<boolean>(false);
  @Output() aTransacionesEmitadas = new EventEmitter<string[]>();
  public aCategorias: IValoresDominioFG[] = [];
  public aTipoTransaccion: IValoresDominioFG[] = [];
  public aFuncionNegocio: IValoresDominioFG[] = [];
  public aEstadoTransaccion: IEstadosTransaccionFG[] = [];
  public aTransacciones: ITransaccionesFG[] = [];
  public aCategoriasFiltradas: string[] = [];
  public aTransaccionesFiltradas: string[] = [];
  public oBuscar: any[] = [];
  public bMostrarResultados: boolean = false;
  public bSeleccionarTodo: boolean = false;

  frmBuscarFiltro: FormGroup = this._formBuilder.group({
    codigoCategoria: null,
    nombreCategoria: null,
    tipoTransaccion: null,
    funcionNegocio: null,
    estado: null,
    nombreTransaccion: null,
    codigoTransaccion: null,
    registrosSeleccionados: null,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _filtrosGenericosService: FiltrosGenericosService
  ) {}

  ngOnInit(): void {}

  async ngOnChanges(cambioEstado: SimpleChanges) {
    if (cambioEstado['bAbrirFiltro']) {
      if (cambioEstado['bAbrirFiltro'].currentValue === true) {
        await this.fnCargarCategorias();
        this.fnValidarPreCargaForm();
        await this.fnCargarTipoTransaccion();
        await this.fnCargarFuncionNegocio();
        await this.fnCargarTransacciones();
        this.aEstadoTransaccion = FILTROS_GENERICOS.ESTADOS;
      }
    }
  }

  fnCambiarRadio(): void {
    this.bSeleccionarTodo = !this.bSeleccionarTodo;
  }

  /**
   * @description Carga las categorías de listas de selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarCategorias(): Promise<void> {
    this.aCategorias = (
      await this._filtrosGenericosService.consultarFGListaSeleccion({
        dominio1: FILTROS_GENERICOS.TRANSACCIONES.categoria,
      })
    ).data[0]?.valoresDominios;
  }

  /**
   * @description Carga los tipos de transacciones de listas de selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTipoTransaccion(): Promise<void> {
    this.aTipoTransaccion = (
      await this._filtrosGenericosService.consultarFGListaSeleccion({
        dominio1: FILTROS_GENERICOS.TRANSACCIONES.tipoTransaccion,
      })
    ).data[0]?.valoresDominios;
  }

  /**
   * @description Carga las funciones de negocio de listas de selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarFuncionNegocio(): Promise<void> {
    this.aFuncionNegocio = (
      await this._filtrosGenericosService.consultarFGListaSeleccion({
        dominio1: FILTROS_GENERICOS.TRANSACCIONES.funcionNegocio,
      })
    ).data[0]?.valoresDominios;
  }

  /**
   * @description Carga las transacciones para filtrar la data
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTransacciones(): Promise<void> {
    this.aTransacciones = (
      await this._filtrosGenericosService.consultarFGTransaccion({
        activo: true,
      })
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
        registrosSeleccionados: this.oInformacionPreFiltrada,
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
        codigoCategoria: this.oCamposFormulario[0].codigoCategoria,
        nombreCategoria: this.oCamposFormulario[0].nombreCategoria,
        tipoTransaccion: this.oCamposFormulario[0].tipoTransaccion,
        funcionNegocio: this.oCamposFormulario[0].funcionNegocio,
        estado: this.oCamposFormulario[0].estado,
        nombreTransaccion: this.oCamposFormulario[0].nombreTransaccion,
        codigoTransaccion: this.oCamposFormulario[0].codigoTransaccion,
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
   * @description Permite a los autocomplete de Categorías generar la información según lo que se escriba
   * @param {any} query Desestructura query de los parámetros enviados, lo que se escribe
   * @param {string} sTipo Es el tipo de dato que se necesita para realizar el filtro
   * @return {void} No retorna datos
   */
  fnFiltrarCategoria({ query }: any, sTipo: string): void {
    let aFiltrados: any[] = [];

    for (let i = 0; i < this.aCategorias.length; i++) {
      let aCategoria = this.aCategorias[i];
      switch (sTipo) {
        case 'codigo':
          if (
            aCategoria.codigo?.toLowerCase().indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aCategoria.codigo);
          }
          break;

        case 'nombre':
          if (
            aCategoria.descripcion
              ?.toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aCategoria.descripcion);
          }
          break;
      }
    }

    this.aCategoriasFiltradas = aFiltrados;
  }

  /**
   * @description Permite a los autocomplete de Transacciones generar la información según lo que se escriba
   * @param {any} query Desestructura query de los parámetros enviados, lo que se escribe
   * @param {string} sTipo Es el tipo de dato que se necesita para realizar el filtro
   * @return {void} No retorna datos
   */
  fnFiltrarTransacciones({ query }: any, sTipo: string): void {
    let aFiltrados: any[] = [];

    for (let i = 0; i < this.aTransacciones.length; i++) {
      let aTransaccion = this.aTransacciones[i];

      switch (sTipo) {
        case 'codigo':
          if (
            aTransaccion.codigo?.toLowerCase().indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aTransaccion.codigo);
          }
          break;

        case 'nombre':
          if (
            aTransaccion.nombre?.toLowerCase().indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aTransaccion.nombre);
          }
          break;
      }
    }

    this.aTransaccionesFiltradas = aFiltrados;
  }

  /**
   * @description Nullea el formulario cuando se da click en el botón limpiar
   * @return {void} No retorna datos
   */
  fnLimpiarDatos(): void {
    this.frmBuscarFiltro.patchValue({
      codigoCategoria: null,
      nombreCategoria: null,
      tipoTransaccion: null,
      funcionNegocio: null,
      estado: null,
      nombreTransaccion: null,
      codigoTransaccion: null,
    });

    this.fnValidarPreCargaForm();
  }

  /**
   * @description Expande la modal al realizar una búsqueda y envía lo capturado en el formulario
   * @return {void} No retorna datos
   */
  fnBuscarResultados(): void {
    this.fnExpandirModal();
    this.oBuscar = this.frmBuscarFiltro.getRawValue();
  }

  /**
   * @description Función para abrir la modal y mostrar los resultados
   * @return {void} No retorna datos
   */
  fnExpandirModal(): void {
    let dialog: HTMLElement | null = document.getElementById(
      'filtroTransaccion' + this.sId
    );
    dialog!.className = 'expandir-modal';
    this.bMostrarResultados = true;
  }

  /**
   * @description Contrae la modal al cerrar y emite el cierre del modal a donde se invoque
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltro(bCerrarFiltro: boolean): void {
    let dialog: HTMLElement | null = document.getElementById(
      'filtroTransaccion' + this.sId
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
  fnObtenerTransacciones(aTransacciones: string[]): void {
    this.aTransacionesEmitadas.emit(aTransacciones);
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
