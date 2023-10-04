import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { ListaSeleccionValidatorService } from 'src/app/data/remote/adm/lista-seleccion/lista-seleccion.validator.service';

import {
  IValoresDominio,
  IListaSeleccion,
} from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { NO_ESPECIALES } from 'src/app/core/utils/Pattern';
import { LISTA_SELECCION } from 'src/app/core/constant/adm/lista-seleccion.constants';
import { ADM } from 'src/app/core/constant/adm.constants';

@Component({
  selector: 'app-com-tabla-lista-valores',
  templateUrl: './com-tabla-lista-valores.component.html',
  styleUrls: ['./com-tabla-lista-valores.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ComTablaListaValoresComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  @Input() oListaSeleccion!: IListaSeleccion;
  public oValoresDominio: any = []; // TODO: Definir tipo valores de dominio
  public sListaSeleccion: string = ''; //TODO: CARGAR ESTE DATO
  public sTipoPerfil: string = 'Negocio'; //'Administrativo'
  public bEditableFila: boolean = false;
  public bEliminarFila: boolean = false;
  public displayModal: boolean = false;
  public bMostrarLoading: boolean = true;
  public bEditando: boolean = false;
  public bNoMostrar: boolean = true;
  public oEstado = LISTA_SELECCION.ESTADOS_VALORES;

  frmEditarListaSeleccion: FormGroup = this._formBuilder.group({
    nombreLista: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
        Validators.pattern(NO_ESPECIALES),
      ],
      [this._listaSeleccionValidatorService],
    ],
    mostrarCodigo: [false, [Validators.required]],
  });

  frmCrearValorDominio: FormGroup = this._formBuilder.group({
    indice: 0,
    dominio: '',
    dominioPadre: null,
    idPerfil: 0,
    orden: 0,
    pci: null,
    siglaPadre: null,
    vigente: true,
    sigla: [
      '',
      [
        Validators.required,
        Validators.maxLength(LISTA_SELECCION.VALOR_MAX_CARECTERES_SIGLA),
        Validators.pattern(NO_ESPECIALES),
      ],
    ],
    descripcion: [
      '',
      [
        Validators.required,
        Validators.maxLength(LISTA_SELECCION.VALOR_MAX_CARECTERES_DESCRIPCION),
        Validators.pattern(NO_ESPECIALES),
      ],
    ],
    activo: ['', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _listaSeleccionState: ListaSeccionStateService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _listaSeleccionValidatorService: ListaSeleccionValidatorService
  ) {}

  ngOnDestroy() {
    // TODO: Crear las subscripciones y Destruir los observables
  }

  ngOnInit(): void {
    this.cargarValoresDominioxLista();
  }

  /**
   * Descripción: Cargar los valores de dominio de una lista, recibida desde otro componente
   * @return {void} No retorna datos
   */
  cargarValoresDominioxLista(): void {
    this._listaSeleccionState.consultarValoresDominio(
      this.oListaSeleccion?.dominio1
    );
    this._listaSeleccionState
      .select((resp) => resp.oValoresDominio)
      .subscribe({
        next: (respuesta) => {
          this.oValoresDominio = respuesta;
          this.bMostrarLoading = false;
          this.preConfigurarFormularios();
        },
      });
  }

  /**
   * Descripción: Establece por defecto parámetros al formulario al iniciar
   * @return {void} No retorna datos
   */
  preConfigurarFormularios(): void {
    this.frmCrearValorDominio.get('pci')?.disable();
    this.frmCrearValorDominio.get('idPerfil')?.disable();
    this.sTipoPerfil !== 'Administrativo'
      ? this.frmEditarListaSeleccion.get('mostrarCodigo')?.disable()
      : '';

    this.frmEditarListaSeleccion.patchValue({
      nombreLista: this.oListaSeleccion?.dominio1,
      mostrarCodigo: this.oListaSeleccion?.mostrarCodigo,
    });

    // TODO: VALOR DE TIPO DE PERFIL PENDIENTE Y LISTAS UNIVERSALES O NO
    this.oListaSeleccion = {
      ...this.oListaSeleccion,
      universal: true, //TODO: ESTE VALOR DEPENDE DE BACK Y ARQUITECTURA
    };

    this.inhabilitarBotones();
  }

  /**
   * Descripción: Establece los bloqueos de editar y eliminar dependiendo del tipo de perfil
   * @return {void} No retorna datos
   */
  inhabilitarBotones(): void {
    if (this.oListaSeleccion.administrable === false) {
      this.bEditableFila = true;
      return;
    }

    if (this.sTipoPerfil === 'Negocio') {
      if (
        this.oListaSeleccion.administrable &&
        this.oListaSeleccion.universal === false
      ) {
        this.bEditableFila = false;
      } else {
        this.bEditableFila = true;
      }

      if (this.oListaSeleccion.administrable) {
        this.bEliminarFila = true;
      }
    } else if (
      this.sTipoPerfil === 'Administrativo' &&
      this.oListaSeleccion.administrable
    ) {
      this.bEditableFila = false;
    }
  }

  /**
   * Descripción: Determina si guarda o edita y crea los valores para el formulario
   * @param {string} sTipoAccion Tipo de acción ejecutada desde el template
   * @param {any} oValorDominio Lista de valores de dominio (Opcional)
   * @param {number} nIndice Valor numérico de la fila en el table (Opcional)
   * @return {void} No retorna datos
   */
  agregarEditarFila(
    sTipoAccion: string,
    oValorDominio?: any,
    nIndice?: number
  ): void {
    this.displayModal = true;
    this.bEditando = sTipoAccion === 'editar' ? true : false;

    sTipoAccion === 'editar'
      ? this.frmCrearValorDominio.get('sigla')?.disable()
      : this.frmCrearValorDominio.get('sigla')?.enable();

    this.frmCrearValorDominio.patchValue({
      indice: sTipoAccion === 'editar' ? nIndice : this.oValoresDominio.length,
      dominio:
        sTipoAccion === 'editar'
          ? oValorDominio.dominio
          : this.frmEditarListaSeleccion.get('nombreLista')?.value,
      dominioPadre: null,
      idPerfil: 0, //TODO: agregar el id del perfil
      orden:
        sTipoAccion === 'editar'
          ? oValorDominio.orden
          : this.oValoresDominio.length,
      pci:
        this.sTipoPerfil === 'Administrativo'
          ? 'A.F.S'
          : '000CodigoPresupuestal',
      siglaPadre: null,
      vigente: true,
      sigla: sTipoAccion === 'editar' ? oValorDominio.sigla : '',
      descripcion: sTipoAccion === 'editar' ? oValorDominio.descripcion : '',
      activo: sTipoAccion === 'editar' ? oValorDominio.activo : true,
    });
  }

  /**
   * Descripción: Determina si guarda o edita y crea los valores para el formulario
   * @param {number} nIndice Valor numérico de la fila en el table
   * @return {void } No retorna datos
   */
  eliminarFila(nIndice: number): void {
    this._confirmationService.confirm({
      message: '¿Desea eliminar el registro?',
      header: 'Eliminar registro',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si, eliminar',
      rejectLabel: 'No, cancelar',
      rejectButtonStyleClass: 'boton-rojo p-button-text',
      accept: () => {
        const sMensaje = `Se ha eliminado el valor: ${this.oValoresDominio[nIndice].sigla}`;
        this.mostrarMensaje(true, sMensaje);
        this.oValoresDominio.splice(nIndice, 1);
      },
    });
  }

  /**
   * Descripción: Guarda de forma temporal en el array de objetos los valores de lista de selección
   *              validando si hay campos repetidos en la tabla
   * @return {void} No retorna datos
   */
  guardarTemporalValorDominio() {
    if (this.frmCrearValorDominio.invalid) {
      this.frmCrearValorDominio.markAllAsTouched();
      return;
    }

    const indice = this.frmCrearValorDominio.get('indice')?.value;
    const sigla = this.frmCrearValorDominio.get('sigla')?.value;
    const descripcion = this.frmCrearValorDominio.get('descripcion')?.value;

    const validarSigla = this.validarExistencia(sigla, indice);
    const validarDescripcion = this.validarExistencia(descripcion, indice);

    if (validarSigla || validarDescripcion) {
      const sMensajeUnico = `El código o la descripción ya existe en la lista de valores.`;
      this.mostrarMensaje(false, '', sMensajeUnico);
      return;
    }

    this.oValoresDominio[indice] = this.frmCrearValorDominio.getRawValue();
    const sMensaje = `Se ha modificado el valor: ${sigla}`;
    this.mostrarMensaje(true, sMensaje);
    this.cerrarModal();
  }

  /**
   * Descripción: Genera la acción de consulta al usuario para guardar todo el proceso
   * @return {void} No retorna datos
   */
  guardarProceso(): void {
    this._confirmationService.confirm({
      message:
        '¿Esta seguro de guardar las modificaciones de la lista de selección?',
      header: 'Guardar proceso',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si, guardar',
      rejectLabel: 'No, continuar',
      rejectButtonStyleClass: 'boton-rojo p-button-text',
      accept: () => {
        this.guardarListaYValores();
      },
      reject: (type: any) => {},
    });
  }

  /**
   * Descripción: Ajusta los valores ya procesados y guarda la petición final del usuario
   * @return {void} No retorna datos
   */
  guardarListaYValores(): void {
    this.oListaSeleccion.dominio1 =
      this.frmEditarListaSeleccion.get('nombreLista')?.value;
    this.oListaSeleccion.mostrarCodigo =
      this.frmEditarListaSeleccion.get('mostrarCodigo')?.value;
    this.oListaSeleccion.valoresDominios = this.oValoresDominio;

    for (const valor in this.oListaSeleccion) {
      if (valor === 'universal') {
        delete this.oListaSeleccion.universal;
      }
    }

    this.oListaSeleccion.valoresDominios?.forEach((valorDominio: any) => {
      valorDominio.dominio = this.oListaSeleccion.dominio1;
      delete valorDominio.indice;
    });

    this._listaSeleccionState.editarListaSeleccion(this.oListaSeleccion);
    this._listaSeleccionState
      .select((e) => e.bEditarLista)
      .subscribe({
        next: (respuesta: any) => {
          if (respuesta !== undefined) {
            const sMensaje = `Registro exitoso de la lista ${this.oListaSeleccion.dominio1}`;
            this.mostrarMensaje(respuesta, sMensaje);
          }
        },
      });
  }

  /**
   * Descripción: Cancela todos los cambios que se hubieran realizado de forma temporal
   * @return {void} No retorna datos
   */
  cancelarProceso(): void {
    this._confirmationService.confirm({
      message:
        '¿Esta seguro de cancelar el proceso de creación o edición de listas de selección?',
      header: 'Cancelar proceso',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si, cancelar',
      rejectLabel: 'No, continuar',
      rejectButtonStyleClass: 'boton-rojo p-button-text',
      accept: () => {
        this.cargarValoresDominioxLista();
        this.cerrarModal();
      },
      reject: (type: any) => {},
    });
  }

  /**
   * Descripción: Aplicar corrección al p-table para el buscador
   * @param {any} event Asociación del table
   * @param {string} sValor Valor a buscar en el table
   * @return {void} No retorna datos
   */
  applyFilterGlobal(event: any, stringVal: string): void {
    this.dt!.filterGlobal((event.target as HTMLInputElement).value, stringVal);
  }

  /**
   * Descripción: Cerrar modal y resetear el formulario
   * @return {void} No retonar datos
   */
  cerrarModal(): void {
    this.frmCrearValorDominio.reset({
      codigo: '',
      descripcion: '',
      activo: '',
    });

    this.displayModal = false;
  }

  /**
   * Descripción: Cerrar modal y resetear el formulario
   * @param {string} sValor Campo a validar
   * @param {number} nIndice Fila a validar
   * @return {boolean} Retorna un booleano: true: existe el valor | false: no existe
   */
  validarExistencia(sValor: string, nIndice: number): boolean {
    let bExisteData = false;

    if (this.bEditando) {
      if (
        this.oValoresDominio[nIndice].sigla === sValor ||
        this.oValoresDominio[nIndice].descripcion === sValor
      ) {
        bExisteData = false;
      } else {
        bExisteData = this.oValoresDominio.some((x: any) => {
          return x.sigla === sValor || x.descripcion === sValor;
        });
      }
    }

    if (!this.bEditando) {
      bExisteData = this.oValoresDominio.some((x: any) => {
        return x.sigla === sValor || x.descripcion === sValor;
      });
    }

    return bExisteData;
  }

  /**
   * Descripción: Obtener los posibles errores el formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {string} Retorna el mensaje de error para el formulario
   */
  listaErroresMensajes(sCampo: string): string {
    const errors = this.frmCrearValorDominio.get(sCampo)?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength'])
      return `No puede superar los ${errors?.['maxlength'].requiredLength} caracteres.`;
    if (errors?.['pattern']) return `No puede contener caracteres especiales.`;

    return '';
  }

  /**
   * Descripción: Validar de forma general los campos del formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {boolean | undefined} Retorna un booleano o indefinido al realizar la validación
   */
  campoNoValido(sCampo: string): boolean | undefined {
    return (
      this.frmCrearValorDominio.get(sCampo)?.invalid &&
      this.frmCrearValorDominio.get(sCampo)?.touched
    );
  }

  /**
   * Descripción: Genera el mensaje de la acción ejecutada
   * @param {boolean} bRespuesta Booleano que determina el estado de la transacción
   * @param {string} sMensaje Mensaje de tipo exitoso
   * @param {string} sMensajeUnico Mensaje configurable para validaciones
   * @return {void} No retorna datos
   */
  mostrarMensaje(
    bRespuesta: boolean,
    sMensaje: string,
    sMensajeUnico?: string
  ): void {
    this._messageService.add({
      severity: bRespuesta
        ? ADM.ACCIONES_TOAST.toastTipo.creado
        : ADM.ACCIONES_TOAST.toastTipo.fallido,
      summary: bRespuesta
        ? ADM.ACCIONES_TOAST.toastMensaje.creado
        : ADM.ACCIONES_TOAST.toastMensaje.fallido,
      detail: bRespuesta
        ? sMensaje
        : sMensajeUnico
        ? sMensajeUnico
        : 'Ha ocurrido un error al ejecutar el proceso. Intente nuevamente.',
    });
  }
}
