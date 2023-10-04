import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';

import {
  IListaSeleccion,
  IValoresDominio,
} from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { ADM } from 'src/app/core/constant/adm.constants';
import { CATEGORIAS } from 'src/app/core/constant/adm/categoria.constants';
import { ActivatedRoute, Router } from '@angular/router';
import {
  END_WHITE_SPACE,
  SIN_CARACTERES_ESPECIALES,
  START_WHITE_SPACE,
} from 'src/app/core/utils/Patterns';

@Component({
  selector: 'app-frm-crear-categoria',
  templateUrl: './frm-crear-categoria.component.html',
  styleUrls: ['./frm-crear-categoria.component.scss'],
  providers: [MessageService],
})
export class FrmCrearCategoriaComponent implements OnInit {
  /*
    TODO: 
      1. REVISAR SUSCRIPTIONS Y DESTRUIR
      3. NOMBRE LA CATEGORÍA ES IGUAL A SIGLA EN LA BD, ESTE SOLO PERMITE 4 CARACTERES POR BD, NOMBRE PERMITE 150
      2. INTEGRACIÓN PERFILES Y ROLES
  */

  public sAccion!: string;
  public oCategoria?: IValoresDominio = {};
  public descripcionComparar!: string;
  public lItemsBreadcrumb: MenuItem[] = [];
  public oListaSeleccion!: IListaSeleccion;
  public aCategoriasFiltradas: string[] = [];
  private _aValorDominio: IValoresDominio[] | undefined = [];
  public aSuscripciones = Subscription;
  public nIdCategoria?: string;
  public sTituloComponente = CATEGORIAS.TITULO_CREAR;
  public bDeshabilitatBotones = false;

  get aValorDominio() {
    return this._aValorDominio;
  }

  frmCrearCategoria: FormGroup = this._formBuilder.group({
    sigla: [''],

    descripcion: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(150),
        Validators.pattern(START_WHITE_SPACE),
        Validators.pattern(END_WHITE_SPACE),
        Validators.pattern(SIN_CARACTERES_ESPECIALES),
      ],
    ],
    codigo: ['', [Validators.required]],
    estado: [true, [Validators.required]],
  });

  constructor(
    private _messageService: MessageService,
    private _formBuilder: FormBuilder,
    private _listaSeleccionState: ListaSeccionStateService,
    private _confirmationService: ConfirmationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Transacciones' },
      { label: 'Categorías' },
    ];
  }

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (param) => {
        this.nIdCategoria = param['id'];
        this.sAccion =
          this.nIdCategoria === '0'
            ? CATEGORIAS.ACCION_CREAR
            : CATEGORIAS.ACCION_EDITAR;
        this.sTituloComponente =
          this.nIdCategoria === '0'
            ? CATEGORIAS.TITULO_CREAR
            : CATEGORIAS.TITULO_EDITAR;
      },
    });
    this._listaSeleccionState.consultarValoresDominio(CATEGORIAS.DOMINIO_FIJO);
    this._listaSeleccionState
      .select((resp) => resp.oListaSeleccion)
      .subscribe({
        next: (response) => {
          if (response.dominio1 !== undefined) {
            this.oListaSeleccion = response;
            console.log('ID', this.nIdCategoria);
            this._aValorDominio = this.oListaSeleccion.valoresDominios;
            console.log(this._aValorDominio);
            console.log(
              this._aValorDominio?.filter((e) => e.sigla == this.nIdCategoria)
            );
            this.oCategoria = this._aValorDominio?.filter(
              (e) => e.sigla == this.nIdCategoria
            )[0];
            this.preConfigurarFormulario();
          }
        },
      });
    this._listaSeleccionState.consultarValoresDominio(CATEGORIAS.DOMINIO_FIJO);
    this._listaSeleccionState
      .select((resp) => resp.oListaSeleccion)
      .subscribe({
        next: (response) => {
          if (response.dominio1 !== undefined) {
            this.oListaSeleccion = response;
            this._aValorDominio = this.oListaSeleccion.valoresDominios;
            this.oCategoria = this._aValorDominio?.filter(
              (e) => e.sigla == this.nIdCategoria
            )[0];
            this.preConfigurarFormulario();
          }
        },
      });
  }

  /**
   * Descripción: Establece por defecto parámetros al formulario al iniciar
   * @return {void} No retorna datos
   */
  preConfigurarFormulario(): void {
    this.frmCrearCategoria.get('codigo')?.disable();

    if (this.sAccion === 'crear') {
      this.frmCrearCategoria.patchValue({
        codigo: this.generarConsecutivo(),
      });
    } else {
      const VALOR_DOMINIO = this.oListaSeleccion?.valoresDominios?.filter(
        (e) => e.sigla == this.nIdCategoria
      );
      console.log(VALOR_DOMINIO);
      this.frmCrearCategoria.patchValue({
        descripcion: this.oCategoria?.descripcion,
        codigo: this.oCategoria?.codigo,
        estado: this.oCategoria?.activo,
        sigla: this.oCategoria?.sigla,
      });
    }
  }

  /**
   * Descripción: Genera el código de la categoría automáticamente
   * @return {string} retorna un valor convertido a string
   */
  generarConsecutivo(): string {
    let nCodigo = this.oListaSeleccion.valoresDominios?.length;
    let sCodigo = nCodigo === undefined ? '1' : (nCodigo + 1).toString();

    return sCodigo;
  }

  /**
   * Descripción: Crea temporalmente la creación de la categoría
   * @return {void} No retorna datos
   */
  guardarValorCategoria(): void {
    if (this.frmCrearCategoria.invalid) {
      this.frmCrearCategoria.markAllAsTouched();
      return;
    }

    const bValidarExistencia = this.validarExistenciaCategoria();
    if (!bValidarExistencia) {
      const oValorDominio: IValoresDominio = {
        dominio: CATEGORIAS.DOMINIO_FIJO,
        sigla:
          this.sAccion === 'crear'
            ? this.generarConsecutivo()
            : this.frmCrearCategoria.get('sigla')?.value,
        codigo:
          this.sAccion === 'crear'
            ? this.generarConsecutivo()
            : this.frmCrearCategoria.get('codigo')?.value,
        descripcion: this.frmCrearCategoria.get('descripcion')?.value,
        activo: this.frmCrearCategoria.get('estado')?.value,
        valorAdministrable: true,
        dominioPadre: null,
        siglaPadre: null,
        orden:
          this.sAccion === 'crear'
            ? parseInt(this.generarConsecutivo())
            : this.frmCrearCategoria.get('sigla')?.value,
      };

      this.guardarCategoria(oValorDominio);
    }
  }

  /**
   * Descripción: Guardar la creación de la categoría con el consumo de API
   * @param {ValoresDominio} oValorDominio Recibe los valores de dominio asociado a CATEGORIAS
   * @return {void} No retorna datos
   */
  guardarCategoria(oValorDominio: IValoresDominio): void {
    this.bDeshabilitatBotones = true;
    if (this.sAccion === 'editar') {
      this._listaSeleccionState.editarValoresListaSeleccion(oValorDominio);
      this._listaSeleccionState
        .select((state) => state.bEditarValorLista)
        .subscribe((respuesta) => {
          if (respuesta !== undefined) {
            this.mostrarMensaje({
              severity: respuesta
                ? ADM.ACCIONES_TOAST.toastTipo.creado
                : ADM.ACCIONES_TOAST.toastTipo.fallido,
              summary: respuesta
                ? ADM.ACCIONES_TOAST.toastMensaje.creado
                : ADM.ACCIONES_TOAST.toastMensaje.fallido,
              detail: respuesta
                ? `Registro exitoso de la categoría ${oValorDominio.descripcion}.`
                : 'Ha ocurrido un error al intentar crear la Categoría.',
            });
            if (respuesta) {
              setTimeout(() => {
                this._router.navigate(['adm/categorias']);
              }, 1000);
            } else {
              this.bDeshabilitatBotones = false;
            }
          }
        });
    } else {
      this._listaSeleccionState.crearValoresListaSeleccion(oValorDominio);
      this._listaSeleccionState
        .select((state) => state.bCrearValorLista)
        .subscribe((respuesta) => {
          if (respuesta !== undefined) {
            this.mostrarMensaje({
              severity: respuesta
                ? ADM.ACCIONES_TOAST.toastTipo.creado
                : ADM.ACCIONES_TOAST.toastTipo.fallido,
              summary: respuesta
                ? ADM.ACCIONES_TOAST.toastMensaje.creado
                : ADM.ACCIONES_TOAST.toastMensaje.fallido,
              detail: respuesta
                ? `Registro exitoso de la categoría ${oValorDominio.descripcion}.`
                : 'Ha ocurrido un error al intentar crear la Categoría.',
            });
            if (respuesta) {
              setTimeout(() => {
                this._router.navigate(['adm/categorias']);
              }, 1000);
            }
          }
        });
    }
  }

  /**
   * Descripción: Cancela la operación de creación o edición de la categoría
   * @return {void} No retorna datos
   */
  cancelarCategoria(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      header: 'Cancelar operación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._router.navigate(['adm/categorias']);
      },
      reject: (type: any) => {},
    });
  }

  /**
   * Descripción: Valida la existencia de un valor y muestra mensaje de error en caso de existir
   * @return {boolean} Retorna un booleano
   */
  validarExistenciaCategoria(): boolean {
    let bExisteData: boolean = false;
    const valor = this.frmCrearCategoria.get('descripcion')?.value.trim();

    if (this.sAccion === 'editar' && valor === this.oCategoria?.descripcion) {
      bExisteData = false;
    }

    if (valor !== this.oCategoria?.descripcion) {
      bExisteData = this.oListaSeleccion.valoresDominios!.some((resp: any) => {
        return resp.descripcion === valor;
      });
    }

    if (bExisteData) {
      this.mostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: `El nombre de la categoría se encuentra ya definido, verifique y registre nuevamente.`,
      });

      this.bDeshabilitatBotones = false;
    }

    return bExisteData;
  }

  /**
   * Descripción: Validar de forma general los campos del formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {boolean | undefined} Retorna un booleano o indefinido al realizar la validación
   */
  campoNoValido(sCampo: string): boolean | undefined {
    return (
      this.frmCrearCategoria.get(sCampo)?.invalid &&
      this.frmCrearCategoria.get(sCampo)?.touched
    );
  }

  /**
   * Descripción: Obtener los posibles errores el formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {string} Retorna el mensaje de error para el formulario
   */
  listaErroresMensajes(sCampo: string): string {
    const errors = this.frmCrearCategoria.get(sCampo)?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength']) return 'No puede superar los 150 caracteres.';
    if (errors?.['pattern'])
      return 'No puede contener caracteres especiales, ni espacios al principio y final.';

    return '';
  }

  /**
   * Descripción: Mostrar el p-toast con el mensaje al usuario
   * @param {object} oMensaje Objeto que contiene severity, summary y detail para generar un mensaje
   * @return {void} No retorna datos
   */
  mostrarMensaje({ severity, summary, detail }: any): void {
    this._messageService.add({
      severity,
      summary,
      detail,
    });
  }

  /**
   * Descripción: Filtra los valores recibidos de un objeto y devuelve al autocomplete
   * @param {any} event Recibe el evento desde el template
   * @return {void} No retorna datos
   */
  filtrarCategorias(event: any) {
    let aFiltrados: any[] = [];
    let sQuery = event.query;

    for (let i = 0; i < this.oListaSeleccion.valoresDominios!.length; i++) {
      let aCategoria = this.oListaSeleccion.valoresDominios![i];
      if (aCategoria.sigla?.toLowerCase().indexOf(sQuery.toLowerCase()) == 0) {
        aFiltrados.push(aCategoria.sigla);
      }
    }

    this.aCategoriasFiltradas = aFiltrados;
  }
}
