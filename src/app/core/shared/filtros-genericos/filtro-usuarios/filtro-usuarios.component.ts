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

import { NO_WHITE_SPACES, SOLO_NUMEROS } from 'src/app/core/utils/Patterns';
import {
  IUbucacionGeograficaFG,
  IUsuariosFG,
  IValoresDominioFG,
} from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';
import { FILTROS_GENERICOS } from 'src/app/core/shared/filtros-genericos/constants/filtros-genericos.constants';

@Component({
  selector: 'app-filtro-usuarios',
  templateUrl: './filtro-usuarios.component.html',
  styleUrls: ['./filtro-usuarios.component.scss'],
})
export class FiltroUsuariosComponent implements OnInit {
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
  @Input() nIndex: number = 0;
  @Output() bCerrarFiltro = new EventEmitter<boolean>(false);
  @Output() aUsuariosEmitados = new EventEmitter<string[]>();
  public aTipoDocumentos: IValoresDominioFG[] = [];
  public aPaises: IUbucacionGeograficaFG[] = [];
  public aRegiones: IUbucacionGeograficaFG[] = [];
  public aCiudades: IUbucacionGeograficaFG[] = [];
  public aUsuarios: IUsuariosFG[] = [];
  public aUsuariosFiltrados: string[] = [];
  public oBuscar: any[] = [];
  public nLastIndex: number = -1;
  public bMostrarResultados: boolean = false;
  public bSeleccionarTodo: boolean = false;

  frmBuscarFiltro: FormGroup = this._formBuilder.group({
    login: null,
    tipoDocumento: null,
    numeroDocumento: [
      null,
      [Validators.pattern(SOLO_NUMEROS), Validators.pattern(NO_WHITE_SPACES)],
    ],
    primerNombre: null,
    segundoNombre: null,
    primerApellido: null,
    segundoApellido: null,
    idPais: null,
    idRegion: null,
    idCiudad: null,
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
        await this.fnCargarTipoDocumentos();
        this.fnValidarPreCargaForm();
        await this.fnCargarUsuarios();
        await this.fnCargarPaises();
      }
    }
  }

  fnCambiarRadio(): void {
    this.bSeleccionarTodo = !this.bSeleccionarTodo;
  }

  /**
   * @description Carga los tipos de documentos de listas de selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTipoDocumentos(): Promise<void> {
    this.aTipoDocumentos = (
      await this._filtrosGenericosService.consultarFGListaSeleccion({
        dominio1: FILTROS_GENERICOS.USUARIOS.tipoDocumentos,
      })
    ).data[0]?.valoresDominios;
  }

  /**
   * @description Carga los paises de la ubicación geográfica
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarPaises(): Promise<void> {
    this.aPaises = (
      await this._filtrosGenericosService.consultarFGUbicacionGeografica({
        tipoUbicacion: FILTROS_GENERICOS.USUARIOS.pais,
      })
    ).data;
  }

  /**
   * @description Carga las regiones con dependecia del país de la ubicación geográfica
   * @param {any} value Desestructuración del ID del país
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarRegiones({ value }: any): Promise<void> {
    this.aRegiones = (
      await this._filtrosGenericosService.consultarFGUbicacionGeografica({
        tipoUbicacion: FILTROS_GENERICOS.USUARIOS.region,
        idUbicacionPadre: value,
      })
    ).data;
  }

  /**
   * @description Carga las ciudades con dependecia de la región de la ubicación geográfica
   * @param {any} value Desestructuración del ID de la región
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarCiudades({ value }: any): Promise<void> {
    this.aCiudades = (
      await this._filtrosGenericosService.consultarFGUbicacionGeografica({
        tipoUbicacion: FILTROS_GENERICOS.USUARIOS.ciudad,
        idUbicacionPadre: value,
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
        login: this.oCamposFormulario[0].login,
        tipoDocumento: this.oCamposFormulario[0].tipoDocumento,
        numeroDocumento: this.oCamposFormulario[0].numeroDocumento,
        primerNombre: this.oCamposFormulario[0].primerNombre,
        segundoNombre: this.oCamposFormulario[0].segundoNombre,
        primerApellido: this.oCamposFormulario[0].primerApellido,
        segundoApellido: this.oCamposFormulario[0].segundoApellido,
        idPais: this.oCamposFormulario[0].idPais,
        idRegion: this.oCamposFormulario[0].idRegion,
        idCiudad: this.oCamposFormulario[0].idCiudad,
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
   * @description Cargar los usuarios aprobados para generar prefiltros
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarUsuarios(): Promise<void> {
    this.aUsuarios = (
      await this._filtrosGenericosService.consultarFGUsuarios({})
    ).data;
  }

  /**
   * @description Permite a los autocomplete de Categorías generar la información según lo que se escriba
   * @param {any} query Desestructura query de los parámetros enviados, lo que se escribe
   * @param {string} sTipo Es el tipo de dato que se necesita para realizar el filtro
   * @return {void} No retorna datos
   */
  fnFiltrarUsuario({ query }: any, sTipo: string) {
    let aFiltrados: any[] = [];

    for (let i = 0; i < this.aUsuarios.length; i++) {
      let aUsuarios = this.aUsuarios[i];
      switch (sTipo) {
        case 'login':
          if (
            aUsuarios.usuario1?.toLowerCase().indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aUsuarios.usuario1);
          }
          break;

        case 'numeroDoc':
          if (
            aUsuarios.numeroDocumento
              ?.toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aUsuarios.numeroDocumento);
          }
          break;

        case 'primerNombre':
          if (
            aUsuarios.primerNombre
              ?.toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aUsuarios.primerNombre);
          }
          break;

        case 'segundoNombre':
          if (
            aUsuarios.segundoNombre
              ?.toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aUsuarios.segundoNombre);
          }
          break;

        case 'primerApellido':
          if (
            aUsuarios.primerApellido
              ?.toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aUsuarios.primerApellido);
          }
          break;

        case 'segundoApellido':
          if (
            aUsuarios.segundoApellido
              ?.toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aUsuarios.segundoApellido);
          }
          break;
      }
    }

    this.aUsuariosFiltrados = aFiltrados;
  }

  /**
   * @description Nullea el formulario cuando se da click en el botón limpiar
   * @return {void} No retorna datos
   */
  fnLimpiarDatos(): void {
    this.frmBuscarFiltro.patchValue({
      login: null,
      tipoDocumento: null,
      numeroDocumento: null,
      primerNombre: null,
      segundoNombre: null,
      primerApellido: null,
      segundoApellido: null,
      idPais: null,
      idRegion: null,
      idCiudad: null,
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
      'filtroUsuarios' + this.sId
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
      'filtroUsuarios' + this.sId
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
  fnObtenerUsuarios(aUsuarios: string[]): void {
    this.aUsuariosEmitados.emit(aUsuarios);
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
