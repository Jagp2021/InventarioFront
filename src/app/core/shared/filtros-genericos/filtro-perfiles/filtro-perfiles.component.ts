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
import { NO_WHITE_SPACES, SOLO_NUMEROS } from 'src/app/core/utils/Patterns';
import {
  IValoresDominioFG,
  IEstadosTransaccionFG,
} from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';

@Component({
  selector: 'app-filtro-perfiles',
  templateUrl: './filtro-perfiles.component.html',
  styleUrls: ['./filtro-perfiles.component.scss'],
})
export class FiltroPerfilesComponent implements OnInit {
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
  @Output() bCerrarFiltro = new EventEmitter<boolean>(false);
  @Output() aPerfilesEmitados = new EventEmitter<string[]>();
  public aRoles: IValoresDominioFG[] = [];
  public aTipoPerfil: IValoresDominioFG[] = [];
  public aEstadoPerfil: IEstadosTransaccionFG[] = [];
  public aPerfilesFiltrados: string[] = [];
  public oBuscar: any[] = [];
  public nLastIndex: number = -1;
  public bMostrarResultados: boolean = false;
  public aPerfiles: any[] = [];
  public bSeleccionarTodo: boolean = false;

  frmBuscarFiltro: FormGroup = this._formBuilder.group({
    codigoPerfil: [
      null,
      [Validators.pattern(SOLO_NUMEROS), Validators.pattern(NO_WHITE_SPACES)],
    ],
    nombrePerfil: null,
    descripcionPerfil: null,
    rolNegocio: null,
    tipoPerfil: null,
    estado: null,
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
        await this.fnCargarRoles();
        this.fnValidarPreCargaForm();
        await this.fnCargarTipoPerfil();
        await this.fnCargarPerfiles();
        this.aEstadoPerfil = FILTROS_GENERICOS.ESTADOS;
      }
    }
  }

  fnCambiarRadio(): void {
    this.bSeleccionarTodo = !this.bSeleccionarTodo;
  }

  /**
   * @description Cargar los roles de listas de selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarRoles(): Promise<void> {
    this.aRoles = (
      await this._filtrosGenericosService.consultarFGListaSeleccion({
        dominio1: FILTROS_GENERICOS.PERFILES.roles,
      })
    ).data[0]?.valoresDominios;
  }

  /**
   * @description Cargar los tipos de perfiles de listas de selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTipoPerfil(): Promise<void> {
    this.aTipoPerfil = (
      await this._filtrosGenericosService.consultarFGListaSeleccion({
        dominio1: FILTROS_GENERICOS.PERFILES.tipoPerfil,
      })
    ).data[0]?.valoresDominios;
  }

  /**
   * @description Cargar los perfiles de SEG
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarPerfiles(): Promise<void> {
    this.aPerfiles = (
      await this._filtrosGenericosService.consultarFGPerfilesSEG({})
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
        codigoPerfil: this.oCamposFormulario[0].codigoPerfil,
        nombrePerfil: this.oCamposFormulario[0].nombrePerfil,
        descripcionPerfil: this.oCamposFormulario[0].descripcionPerfil,
        rolNegocio: this.oCamposFormulario[0].rolNegocio,
        tipoPerfil: this.oCamposFormulario[0].tipoPerfil,
        estado: this.oCamposFormulario[0].estado,
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
   * @description Permite a los autocomplete de Perfil generar la información según lo que se escriba
   * @param {any} query Desestructura query de los parámetros enviados, lo que se escribe
   * @param {string} sTipo Es el tipo de dato que se necesita para realizar el filtro
   * @return {void} No retorna datos
   */
  fnFiltrarPerfil({ query }: any, sTipo: string): void {
    let aFiltrados: any[] = [];

    for (let i = 0; i < this.aPerfiles.length; i++) {
      let aPerfiles = this.aPerfiles[i];
      switch (sTipo) {
        case 'codigo':
          if (aPerfiles.codigoPerfil === Number(query)) {
            aFiltrados.push(aPerfiles.codigoPerfil);
          }
          break;

        case 'nombre':
          if (
            aPerfiles.nombrePerfil
              ?.toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aPerfiles.nombrePerfil);
          }
          break;

        case 'descripcion':
          if (
            aPerfiles.descripcionPerfil
              ?.toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aPerfiles.descripcionPerfil);
          }
          break;
      }
    }

    this.aPerfilesFiltrados = aFiltrados;
  }

  /**
   * @description Nullea el formulario cuando se da click en el botón limpiar
   * @return {void} No retorna datos
   */
  fnLimpiarDatos(): void {
    this.frmBuscarFiltro.patchValue({
      codigoPerfil: null,
      nombrePerfil: null,
      descripcionPerfil: null,
      rolNegocio: null,
      tipoPerfil: null,
      estadoPerfil: null,
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
      'filtroPerfil' + this.sId
    );
    dialog!.className = 'expandir-modal';
    this.bMostrarResultados = true;
  }

  /**
   * @description Contrae la modal al cerrar y emite el cierre del modal a donde se invoque
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltro(bCerrarFiltro: boolean): void {
    this.fnLimpiarDatos();
    let dialog: HTMLElement | null = document.getElementById(
      'filtroPerfil' + this.sId
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
  fnObtenerPerfiles(aPerfiles: string[]): void {
    this.aPerfilesEmitados.emit(aPerfiles);
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
