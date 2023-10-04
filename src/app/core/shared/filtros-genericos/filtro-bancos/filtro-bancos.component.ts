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
  IBancosFG,
  IUbucacionGeograficaFG,
  IUsuariosFG,
  IValoresDominioFG,
} from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';
import { FILTROS_GENERICOS } from 'src/app/core/shared/filtros-genericos/constants/filtros-genericos.constants';

@Component({
  selector: 'app-filtro-bancos',
  templateUrl: './filtro-bancos.component.html',
  styleUrls: ['./filtro-bancos.component.scss'],
})
export class FiltroBancosComponent implements OnInit {
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
  @Output() aBancosEmitados = new EventEmitter<string[]>();
  public aTipoDocumentos: IValoresDominioFG[] = [];
  public aBancos: IBancosFG[] = [];
  public aBancosFiltrados: string[] = [];
  public oBuscar: any[] = [];
  public nLastIndex: number = -1;
  public bMostrarResultados: boolean = false;
  public bSeleccionarTodo: boolean = false;
  public bTipoPersona: boolean | null = null;
  public aTipoEntidad: IValoresDominioFG[] = [];

  frmBuscarFiltro: FormGroup = this._formBuilder.group({
    tipoEntidad: ['EXTR', [Validators.required]],
    tipoDocumento: [null, [Validators.required]],
    numeroDocumento: [
      null,
      [Validators.pattern(SOLO_NUMEROS), Validators.pattern(NO_WHITE_SPACES)],
    ],
    razonSocial: null,
    registrosSeleccionados: null,
  });

  get fnActivarAcordeon() {
    return this.frmBuscarFiltro.get('tipoPersona')?.value;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _filtrosGenericosService: FiltrosGenericosService
  ) {}

  async ngOnInit(): Promise<void> {}

  async ngOnChanges(cambioEstado: SimpleChanges) {
    if (cambioEstado['bAbrirFiltro']) {
      if (cambioEstado['bAbrirFiltro'].currentValue === true) {
        await this.fnConsultarTipoEntidad();
        await this.fnCargarTipoDocumentos();
        this.fnValidarPreCargaForm();
        await this.fnCargarBancos();
      }
    }
  }

  fnCambiarRadio(): void {
    this.bSeleccionarTodo = !this.bSeleccionarTodo;
  }

  /**
   * @description Carga los tipos de entidades de listas de selección
   * @return {Promise<void>} No retorna datos
   */
  async fnConsultarTipoEntidad(): Promise<void> {
    this.aTipoEntidad = (
      await this._filtrosGenericosService.consultarFGListaSeleccion({
        dominio1: FILTROS_GENERICOS.CUENTAS.tipoEntidad,
      })
    ).data[0]?.valoresDominios;
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

    if (this.aTipoDocumentos.length > 0) {
      this.aTipoDocumentos = this.aTipoDocumentos.filter((keys) => {
        return (
          keys.codigo === FILTROS_GENERICOS.TIPO_DOC.NIT ||
          keys.codigo === FILTROS_GENERICOS.TIPO_DOC.OTROS
        );
      });
    }
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
        tipoEntidad: this.oCamposFormulario[0].tipoEntidad,
        tipoDocumento: this.oCamposFormulario[0].tipoDocumento,
        numeroDocumento: this.oCamposFormulario[0].numeroDocumento,
        razonSocial: this.oCamposFormulario[0].razonSocial,
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
   * @description Cargar los bancos para generar prefiltros
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarBancos(): Promise<void> {
    this.aBancos = (
      await this._filtrosGenericosService.consultarFGBancos({})
    ).data;
  }

  /**
   * @description Permite a los autocomplete de Entidades para generar la información según lo que se escriba
   * @param {any} query Desestructura query de los parámetros enviados, lo que se escribe
   * @param {string} sTipo Es el tipo de dato que se necesita para realizar el filtro
   * @return {void} No retorna datos
   */
  fnFiltrarEntidades({ query }: any, sTipo: string) {
    let aFiltrados: any[] = [];

    for (let i = 0; i < this.aBancos.length; i++) {
      let aBanco = this.aBancos[i];
      switch (sTipo) {
        case 'razonSocial':
          if (aBanco.nombre?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            aFiltrados.push(aBanco.nombre);
          }
          break;

        case 'numeroDoc':
          if (
            aBanco.numeroDocumento
              ?.toLowerCase()
              .indexOf(query.toLowerCase()) == 0
          ) {
            aFiltrados.push(aBanco.numeroDocumento);
          }
          break;
      }
    }

    this.aBancosFiltrados = aFiltrados;
  }

  /**
   * @description Nullea el formulario cuando se da click en el botón limpiar
   * @return {void} No retorna datos
   */
  fnLimpiarDatos(): void {
    this.frmBuscarFiltro.reset({
      tipoEntidad: 'EXTR',
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
      'filtroBancos' + this.sId
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
      'filtroBancos' + this.sId
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
  fnObtenerBancos(aUsuarios: string[]): void {
    this.aBancosEmitados.emit(aUsuarios);
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
