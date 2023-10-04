import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { ListaSeleccionValidatorService } from 'src/app/data/remote/adm/lista-seleccion/lista-seleccion.validator.service';
import { UtilsService } from 'src/app/core/services/utils.service';

import {
  IEstadoGeneral,
  IListaSeleccion,
  IModel,
  IValoresDominio,
} from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { ADM } from 'src/app/core/constant/adm.constants';
import { LISTA_SELECCION } from 'src/app/core/constant/adm/lista-seleccion.constants';
import { NO_ESPECIALES, NO_WHITE_SPACES } from 'src/app/core/utils/Patterns';

@Component({
  selector: 'app-frm-crear-lista-seleccion',
  templateUrl: './frm-crear-lista-seleccion.component.html',
  styleUrls: ['./frm-crear-lista-seleccion.component.scss'],
})
export class FrmCrearListaSeleccionComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];
  public oValoresDominio: IValoresDominio[] = [];
  public oEstado: IEstadoGeneral[] = LISTA_SELECCION.ESTADOS_VALORES;
  public oListaSeleccion!: IListaSeleccion;
  public sAccion!: string;
  public sListaSeleccion: string = '';
  public bMostrarLoading: boolean = true;
  public displayModal: boolean = false;
  public bEditando: boolean = false;
  private _aSuscripciones = new Subscription();

  /** Información del LocalStorage */
  public sTipoPerfil: string | null = localStorage.getItem('sTipoPerfil');
  public nIdPerfilRegistra: string | null =
    localStorage.getItem('idPerfilRegistra');
  public nEntidadPciRegistra: string | null =
    localStorage.getItem('entidadPciRegistra');

  frmCrearListaSeleccion: FormGroup = this._formBuilder.group({
    nombreLista: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
        Validators.pattern(NO_ESPECIALES),
        Validators.pattern(NO_WHITE_SPACES),
      ],
      [this._listaSeleccionValidatorService],
    ],
    mostrarCodigo: [false, [Validators.required]],
  });

  frmCrearValorDominio: FormGroup = this._formBuilder.group({
    indice: 0,
    dominio: '',
    sigla: [
      '',
      [
        Validators.required,
        Validators.maxLength(LISTA_SELECCION.VALOR_MAX_CARECTERES_SIGLA),
        Validators.pattern(NO_ESPECIALES),
        Validators.pattern(NO_WHITE_SPACES),
      ],
    ],
    entidadPciRegistra: null,
    codigo: null,
    descripcion: [
      '',
      [
        Validators.required,
        Validators.maxLength(LISTA_SELECCION.VALOR_MAX_CARECTERES_DESCRIPCION),
        Validators.pattern(NO_ESPECIALES),
        Validators.pattern(NO_WHITE_SPACES),
      ],
    ],
    activo: ['', [Validators.required]],
    valorAdministrable: true,
    dominioPadre: null,
    siglaPadre: null,
    entidadPciRegistraPadre: 0,
    orden: 0,
    idPerfilRegistra: Number(this.nIdPerfilRegistra),
    usoSecuencia: null,
  });

  get frmLista(): FormGroup['controls'] {
    return this.frmCrearListaSeleccion.controls;
  }

  get frmValores(): FormGroup['controls'] {
    return this.frmCrearValorDominio.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _listaSeleccionState: ListaSeccionStateService,
    private _listaSeleccionValidatorService: ListaSeleccionValidatorService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _confirmationService: ConfirmationService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(({ id }) => {
      this.sAccion =
        id === '' || id === undefined ? ADM.ACCION_CREAR : ADM.ACCION_EDITAR;
      this.fnPreConfigurarFormulario(id);
      this.fnCargarBreadcrumb();
    });

    this.sTipoPerfil !== ADM.PERFIL_ADMINISTRATIVO &&
    this.sAccion === ADM.ACCION_EDITAR
      ? this.frmLista['mostrarCodigo']?.disable()
      : '';
  }

  ngOnDestroy(): void {
    this._aSuscripciones.unsubscribe();
  }

  /**
   * @description Configura el breadcrumb dependiendo de la acción
   * @return {void} No retorna datos
   */
  fnCargarBreadcrumb(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Lista de selección' },
      {
        label: `${
          this.sAccion === ADM.ACCION_CREAR
            ? ADM.ACCION_CREAR
            : ADM.ACCION_EDITAR
        } Lista de selección`,
      },
    ];
  }

  /**
   * @description Configura el formulario cuando se está editando
   * @param {string} sDominio1 Recibe el parametro de URL del Dominio (Opcional)
   * @return {void} No retorna datos
   */
  fnPreConfigurarFormulario(sDominio1?: string): void {
    this.frmValores['entidadPciRegistra']?.disable();
    this.frmValores['idPerfilRegistra']?.disable();

    if (this.sAccion === ADM.ACCION_EDITAR) {
      this.frmLista['nombreLista']?.disable();

      this._aSuscripciones.add(
        this._listaSeleccionState.consultarValoresDominio(sDominio1)
      );
      this._aSuscripciones.add(
        this._listaSeleccionState
          .select((resp) => resp.oListaSeleccion)
          .subscribe({
            next: (respuesta) => {
              this.oListaSeleccion = respuesta;

              this.frmCrearListaSeleccion.patchValue({
                nombreLista: this.oListaSeleccion?.dominio1,
                mostrarCodigo: this.oListaSeleccion?.mostrarCodigo,
              });

              this.fnCargarValoresDominio();
            },
          })
      );
    } else {
      this.bMostrarLoading = false;
    }
  }

  fnCargarValoresDominio() {
    let oModel: IModel = {
      EntidadPciRegistra: Number(this.nEntidadPciRegistra),
      IdPerfilRegistra: Number(this.nIdPerfilRegistra),
    };

    setTimeout(() => {
      oModel = { Dominio: this.oListaSeleccion?.dominio1, ...oModel };
      this._aSuscripciones.add(
        this._listaSeleccionState.obtenerValoresDominiosxPerfil(oModel)
      );
      this._aSuscripciones.add(
        this._listaSeleccionState
          .select((resp) => resp.oValoresDominioxPerfil)
          .subscribe({
            next: (respuesta) => {
              this.oValoresDominio = respuesta;
              this.bMostrarLoading = false;
            },
          })
      );
    }, 1000);
  }

  /**
   * @description Valida el tipo de acción sobre la tabla y crea los valores para el formulario
   * @param {string} sTipoAccion Tipo de acción ejecutada desde el template (crear / editar)
   * @param {IValoresDominio} oValorDominio Lista de valores de dominio (Opcional)
   * @param {number} nIndice Valor numérico de la fila en el table (Opcional)
   * @return {void} No retorna datos
   */
  fnAgregarEditarFila(
    sTipoAccion: string,
    oValorDominio?: IValoresDominio,
    nIndice?: number
  ): void {
    this.displayModal = true;
    this.bEditando = sTipoAccion === ADM.ACCION_EDITAR ? true : false;

    this.sAccion === ADM.ACCION_EDITAR && this.bEditando === true
      ? this.frmValores['sigla']?.disable()
      : this.frmValores['sigla']?.enable();

    /** TODO: Cambiar los localstorage por datos de sesión */
    this.frmCrearValorDominio.patchValue({
      ...LISTA_SELECCION.VALORES_FORMULARIO,
      indice: this.bEditando ? nIndice : this.oValoresDominio.length,
      dominio: this.bEditando
        ? oValorDominio?.dominio
        : this.frmLista['nombreLista']?.value,
      sigla: this.bEditando ? oValorDominio?.sigla : '',
      entidadPciRegistra: this.bEditando
        ? oValorDominio?.entidadPciRegistra
        : Number(this.nEntidadPciRegistra),
      descripcion: this.bEditando ? oValorDominio?.descripcion : '',
      activo: this.bEditando ? oValorDominio?.activo : true,
      orden: this.bEditando
        ? oValorDominio?.orden
        : this.oValoresDominio.length,
      idPerfilRegistra: this.bEditando
        ? oValorDominio?.idPerfilRegistra
        : Number(this.nIdPerfilRegistra),
    });
  }

  /**
   * @description Determina si guarda o edita y crea los valores para el formulario
   * @param {number} nIndice Valor numérico de la fila en el table
   * @return {void } No retorna datos
   */
  fnEliminarFila(nIndice: number): void {
    let sValor: string;

    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        if (this.sAccion === ADM.ACCION_CREAR) {
          sValor = this.oValoresDominio[nIndice].sigla!;
          this.oValoresDominio.splice(nIndice, 1);
        } else {
          const oValorDominio = this.oValoresDominio[nIndice];
          sValor = oValorDominio.sigla!;
          this._aSuscripciones.add(
            this._listaSeleccionState.eliminarValorDominio(oValorDominio)
          );
          this._aSuscripciones.add(
            this._listaSeleccionState
              .select((resp) => resp.bEliminarValor)
              .subscribe({
                next: (respuesta) => {
                  if (respuesta !== undefined) {
                    this.fnPreConfigurarFormulario(
                      this.frmLista['nombreLista']?.value
                    );
                  }
                },
              })
          );
        }

        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.creado,
          summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
          detail: LISTA_SELECCION.MSG_ELIMINAR.concat(' ', sValor),
        });
      },
    });
  }

  /**
   * @description Cancela todos los cambios que se hubieran realizado de forma temporal
   * @return {void} No retorna datos
   */
  fnCancelarProceso(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._router.navigateByUrl('adm/listas-seleccion');
      },
    });
  }

  /**
   * @description Genera la acción de consulta al usuario para guardar todo el proceso
   * @return {void} No retorna datos
   */
  fnGuardarProceso(): void {
    if (this.frmCrearListaSeleccion.invalid) {
      this.frmCrearListaSeleccion.markAllAsTouched();
      return;
    }

    if (this.sAccion === ADM.ACCION_CREAR) {
      this.fnCrearListaSeleccion();
    } else {
      this.fnGuardarListaYValores();
    }
  }

  /**
   * @description Guardar la lista de selección al momento de crear
   * @return {void} No retorna datos
   */
  fnCrearListaSeleccion(): void {
    const sNombreLista = this.frmLista['nombreLista']?.value.trim();

    const oListaSeleccion: IListaSeleccion = {
      ...LISTA_SELECCION.ENCABEZADO_LISTA,
      dominio1: sNombreLista,
      descripcion: `DescListaSeleccion_${sNombreLista}`,
      mostrarCodigo: this.frmLista['mostrarCodigo']?.value,
      valoresDominios: this.oValoresDominio,
    };

    this._aSuscripciones.add(
      this._listaSeleccionState.crearListaSeleccion(oListaSeleccion)
    );
    this._aSuscripciones.add(
      this._listaSeleccionState
        .select((state) => state.bCrearLista)
        .subscribe((bResp) => {
          if (bResp !== undefined) {
            const sMensaje = `${LISTA_SELECCION.MSG_GUARDAR} ${oListaSeleccion.dominio1}`;
            this._utilsService.fnMostrarMensaje({
              severity: bResp
                ? ADM.ACCIONES_TOAST.toastTipo.creado
                : ADM.ACCIONES_TOAST.toastTipo.fallido,
              summary: bResp
                ? ADM.ACCIONES_TOAST.toastMensaje.creado
                : ADM.ACCIONES_TOAST.toastMensaje.fallido,
              detail: sMensaje,
            });

            if (bResp) {
              this.fnRegresarPaginaPrincipal();
            }
          }
        })
    );
  }

  /**
   * @description Ajusta los valores ya procesados y guarda la petición final del usuario
   * @return {void} No retorna datos
   */
  fnGuardarListaYValores(): void {
    this.oListaSeleccion.mostrarCodigo = this.frmLista['mostrarCodigo']?.value;
    this.oListaSeleccion.valoresDominios = this.oValoresDominio;

    this._aSuscripciones.add(
      this._listaSeleccionState.editarListaSeleccion(this.oListaSeleccion)
    );
    this._aSuscripciones.add(
      this._listaSeleccionState
        .select((e) => e.bEditarLista)
        .subscribe({
          next: (bResp) => {
            if (bResp !== undefined) {
              const sMensaje = `${LISTA_SELECCION.MSG_GUARDAR} ${this.oListaSeleccion.dominio1}`;
              this._utilsService.fnMostrarMensaje({
                severity: bResp
                  ? ADM.ACCIONES_TOAST.toastTipo.creado
                  : ADM.ACCIONES_TOAST.toastTipo.fallido,
                summary: bResp
                  ? ADM.ACCIONES_TOAST.toastMensaje.creado
                  : ADM.ACCIONES_TOAST.toastMensaje.fallido,
                detail: sMensaje,
              });

              if (bResp) {
                this.fnRegresarPaginaPrincipal();
              }
            }
          },
        })
    );
  }

  fnRegresarPaginaPrincipal() {
    setTimeout(() => {
      this._router.navigate(['adm/listas-seleccion']);
    }, 1500);
  }

  /**
   * @description Crea el valor de la lista de dominio dependiendo de Guardar / Editar
   * @return {void} No retorna datos
   */
  fnCrearValorDominio(): void {
    if (this.frmCrearValorDominio.invalid) {
      this.frmCrearValorDominio.markAllAsTouched();
      return;
    }

    const indice = this.frmValores['indice']?.value;
    const sigla = this.frmValores['sigla']?.value;
    const descripcion = this.frmValores['descripcion']?.value;

    const validarSigla = this.fnValidarCampos(sigla, indice);
    const validarDescripcion = this.fnValidarCampos(descripcion, indice);
    if (validarSigla || validarDescripcion) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: `El ${sigla} o ${descripcion} ${LISTA_SELECCION.MSG_M2}`,
      });
      return;
    } else {
      this.fnGuardarListaValores(indice, sigla);
    }
  }

  /**
   * @description Guarda las lista de valor de forma temporal o mediante endpoints
   * @param {number} nIndice recibe el valor de la fila para forma temporal
   * @param {string} sSigla sigla del evento (opcional)
   * @return {void} No retorna datos
   */
  fnGuardarListaValores(nIndice: number, sSigla?: string) {
    let oValorDominio: IValoresDominio =
      this.frmCrearValorDominio.getRawValue();
    delete oValorDominio.indice;
    let sMensaje: string = `${LISTA_SELECCION.MSG_CREADO} ${this.frmValores['sigla']?.value} `;

    if (this.sAccion === ADM.ACCION_CREAR) {
      this.oValoresDominio[nIndice] = this.frmCrearValorDominio.getRawValue();
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.creado,
        summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
        detail: sMensaje,
      });
      this.fnCerrarModal(false);
    }

    if (this.sAccion === ADM.ACCION_EDITAR && this.bEditando === false) {
      this.fnCrearValoresListaSeleccion(oValorDominio, sMensaje);
    } else if (this.sAccion === ADM.ACCION_EDITAR && this.bEditando === true) {
      this.fnEditarValoresListaSeleccion(oValorDominio, sMensaje);
    }
  }

  /**
   * @description Edita el valor de la lista de selección
   * @param {ValoresDominio} oValorDominio objeto con el valor de dominio a editar
   * @param {string} sMensaje mensaje a presentar al editar
   * @return {void} No retorna datos
   */
  fnEditarValoresListaSeleccion(
    oValorDominio: IValoresDominio,
    sMensaje: string
  ): void {
    this._aSuscripciones.add(
      this._listaSeleccionState.editarValoresListaSeleccion(oValorDominio)
    );
    this._aSuscripciones.add(
      this._listaSeleccionState
        .select((resp) => resp.bEditarValorLista)
        .subscribe({
          next: (respuesta: any) => {
            if (respuesta !== undefined) {
              this.fnPreConfigurarFormulario(
                this.frmLista['nombreLista']?.value
              );
            }
          },
        })
    );

    this._utilsService.fnMostrarMensaje({
      severity: ADM.ACCIONES_TOAST.toastTipo.creado,
      summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
      detail: sMensaje,
    });

    this.fnCerrarModal(false);
  }

  /**
   * @description Crea el valor de la lista de selección
   * @param {ValoresDominio} oValorDominio objeto con el valor de dominio a crear
   * @param {string} sMensaje mensaje a presentar al editar
   * @return {void} No retorna datos
   */
  fnCrearValoresListaSeleccion(
    oValorDominio: IValoresDominio,
    sMensaje: string
  ): void {
    this._aSuscripciones.add(
      this._listaSeleccionState.crearValoresListaSeleccion(oValorDominio)
    );
    this._aSuscripciones.add(
      this._listaSeleccionState
        .select((resp) => resp.bCrearValorLista)
        .subscribe({
          next: (respuesta: any) => {
            if (respuesta !== undefined) {
              this.fnPreConfigurarFormulario(
                this.frmLista['nombreLista']?.value
              );
            }
          },
        })
    );

    this._utilsService.fnMostrarMensaje({
      severity: ADM.ACCIONES_TOAST.toastTipo.creado,
      summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
      detail: sMensaje,
    });

    this.fnCerrarModal(false);
  }

  /**
   * @description Cerrar modal y resetear el formulario
   * @return {void} No retonar datos
   */
  fnCerrarModal(bMostrarMsg?: boolean): void {
    this.frmCrearValorDominio.reset({
      codigo: '',
      descripcion: '',
      activo: '',
    });

    if (bMostrarMsg) {
      this._confirmationService.confirm({
        ...ADM.ACCIONES_CONFIRM.cancel,
        ...ADM.ACCIONES_CONFIRM.buttons_class,
        accept: () => {
          this.displayModal = false;
        },
      });
    } else {
      this.displayModal = false;
    }
  }

  /**
   * @description Configura las opciones de los botones para editar o eliminar
   * @param {ValoresDominio} valorDominio Recibe el valor de Dominio
   * @param {string} sTipo Recibe el tipo de modificación
   * @param {number} nIndice Recibe el índice del valor a revisar (Opcional)
   * @return {boolean} Retorna true o false para inhabilitar
   */
  fnInhabilitarBoton(
    valorDominio: IValoresDominio,
    sTipo: string,
    nIndice?: number
  ): boolean {
    let bEstado: boolean = false;

    if (
      this.oListaSeleccion !== undefined &&
      this.oListaSeleccion.administrable === false
    ) {
      bEstado = true;
    } else {
      if (this.sTipoPerfil === ADM.PERFIL_ADMINISTRATIVO) {
        if (valorDominio.valorAdministrable === false && sTipo === 'del') {
          bEstado = true;
        } else {
          bEstado = false;
        }

        if (valorDominio.valorAdministrable === false && sTipo === 'edit') {
          bEstado = true;
        } else {
          bEstado = false;
        }
      }

      if (this.sTipoPerfil === ADM.PERFIL_NEGOCIO) {
        if (valorDominio.valorAdministrable === false && sTipo === 'del') {
          bEstado = true;
        } else {
          bEstado = false;
        }

        if (valorDominio.valorAdministrable === false && sTipo === 'edit') {
          bEstado = true;
        } else {
          bEstado = false;
        }

        if (valorDominio.entidadPciRegistra === 0 && sTipo === 'del') {
          bEstado = true;
        }

        if (valorDominio.entidadPciRegistra === 0) {
          bEstado = true;
        }

        if (this.oListaSeleccion.universal === false) {
        }
      }
    }

    return bEstado;
  }

  /**
   * @description Valida si el campo enviado existe dentro de la tabla
   * @param {string} sValor Campo a validar
   * @param {number} nIndice Fila a validar
   * @return {boolean} Retorna un booleano: true: existe el valor | false: no existe
   */
  fnValidarCampos(sValor: string, nIndice: number): boolean {
    let bExisteData = false;

    if (this.bEditando) {
      if (
        this.oValoresDominio[nIndice].sigla === sValor ||
        this.oValoresDominio[nIndice].descripcion === sValor
      ) {
        return false;
      } else {
        bExisteData = this.oValoresDominio.some((valor: any) => {
          return (
            (valor.sigla === sValor || valor.descripcion === sValor) &&
            valor.entidadPciRegistra === Number(this.nEntidadPciRegistra)
          );
        });
      }
    }

    if (!this.bEditando) {
      bExisteData = this.oValoresDominio.some((valor: any) => {
        return (
          (valor.sigla === sValor || valor.descripcion === sValor) &&
          valor.entidadPciRegistra === Number(this.nEntidadPciRegistra)
        );
      });
    }

    return bExisteData;
  }

  /**
   * @description Validar de forma general los campos del formulario
   * @param {string} sCampo Campo del formulario a validar
   * @return {boolean | undefined} Retorna un booleano o indefinido al realizar la validación
   */
  fnValidarCampo(sCampo: string): boolean | undefined {
    return this.frmLista[sCampo]?.invalid && this.frmLista[sCampo]?.touched;
  }

  /**
   * @description Validar de forma general los campos del formulario
   * @param {string} sCampo Campo del formulario a validar
   * @return {boolean | undefined} Retorna un booleano o indefinido al realizar la validación
   */
  fnValidarCampoValor(sCampo: string): boolean | undefined {
    return this.frmValores[sCampo]?.invalid && this.frmValores[sCampo]?.touched;
  }

  /**
   * @description Obtener los posibles errores el formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {string} Retorna el mensaje de error para el formulario
   */
  fnListarErrorForm(sCampo: string): string {
    const errors = this.frmLista[sCampo]?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength'])
      return `No puede superar los ${errors?.['maxlength'].requiredLength} caracteres.`;
    if (errors?.['pattern'])
      return 'No se permiten espacios ni caracteres especiales.';
    if (errors?.['listaRegistrada'])
      return 'Ya se encuentra registrado como lista, verifique y registre nuevamente.';

    return '';
  }

  /**
   * @description Obtener los posibles errores el formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {string} Retorna el mensaje de error para el formulario
   */
  fnListarErrorFormValor(sCampo: string): string {
    const errors = this.frmValores[sCampo]?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength'])
      return `No puede superar los ${errors?.['maxlength'].requiredLength} caracteres.`;
    if (errors?.['pattern'])
      return 'No se permiten espacios ni caracteres especiales.';
    if (errors?.['listaRegistrada'])
      return 'Ya se encuentra registrado como lista, verifique y registre nuevamente.';

    return '';
  }

  /**
   * @description Configura el hover del table para mostrar u ocultar los botones de acción
   * @param {any} e Evento disparado del table
   * @param {number} nIndice Número del indice para mostrar en el Row
   * @param {boolean} bMostrar Determina si se muestra u oculta la acción
   * @return {void} No retorna datos
   */
  fnMostrarOcultarBotones(
    oEvento: any,
    nIndice: number,
    bMostrar: boolean,
    sId?: string
  ): void {
    this._utilsService.fnMostrarOcultarBotonesPrimario(
      oEvento,
      nIndice,
      bMostrar,
      sId
    );
  }
}
