import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { DelimitarDocumentoStateService } from 'src/app/domain/service/adm/delimitar-documento/delimitar-documento-state.service';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { TransaccionesStateService } from 'src/app/domain/service/adm/transacciones/transacciones-state.service';
import { UtilsService } from 'src/app/core/services/utils.service';

import {
  IDocumento,
  IDocumentoSoporte,
  IHistoricoMovimiento,
} from 'src/app/domain/interface/adm/delimitar-documento/delimitar-documento.interface';
import { IValoresDominio } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { ITransacciones } from 'src/app/domain/interface/adm/transacciones/transacciones.interface';
import { ADM } from 'src/app/core/constant/adm.constants';
import { DELIMITARDOC } from 'src/app/core/constant/adm/delimitar-documento';
import { NO_WHITE_SPACES, NO_ESPECIALES } from 'src/app/core/utils/Patterns';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

@Component({
  selector: 'app-delimitar-documento',
  templateUrl: './delimitar-documento.component.html',
  styleUrls: ['./delimitar-documento.component.scss'],
})
export class DelimitarDocumentoComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];
  public aDocumentosADelimitar!: IValoresDominio[];
  public aDocumentos!: IValoresDominio[];
  public oHMovimientosDocumentos: IHistoricoMovimiento[] = [];
  public aDocumentosDelimitados: IDocumento[] = [];
  public oTransaccion: ITransacciones[] = [];
  public bMostrarLoading: boolean = true;
  public bInhabilitar: boolean = true;

  public documentoSoporte: IDocumentoSoporte = {
    id: 0,
    idFuncionalidad: 0,
    categoria: null,
    tipoDocumentoSoporte: '',
    activo: true,
    fechaRegistro: new Date().toISOString(),
    hMovientosDocumentosSoportes: [],
  };

  /** Filtros Genéricos */
  public bAbrirFiltro: boolean = false;
  public aTransacciones: any;

  frmBuscarTransaccion: FormGroup = this._formBuilder.group({
    codigoTransaccion: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
        Validators.pattern(NO_ESPECIALES),
        Validators.pattern(NO_WHITE_SPACES),
      ],
    ],
    nombreTransaccion: ['', [Validators.maxLength(150)]],
  });

  get frmBuscar(): FormGroup['controls'] {
    return this.frmBuscarTransaccion.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _listaSeleccionState: ListaSeccionStateService,
    private _transaccionState: TransaccionesStateService,
    private _delimitarDocumentoState: DelimitarDocumentoStateService,
    private _utilsService: UtilsService,
    private _router: Router,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Delimitar documento soporte' },
    ];

    this.bMostrarLoading = false;
    this.frmBuscar['nombreTransaccion'].disable();
  }

  /**
   * @description Buscar la transacción para asociar documentos
   * @return {Promise<void>} No retorna datos
   */
  async fnBuscarTransaccion(sEstado?: boolean): Promise<void> {
    const aResp: IRespuestaApi =
      await this._transaccionState.fnConsultarTransaccion({
        codigo: this.frmBuscar['codigoTransaccion']?.value,
      });

    if (aResp.data.length > 0) {
      this.oTransaccion = aResp.data;
      this.frmBuscarTransaccion.patchValue({
        codigoTransaccion: aResp.data[0].codigo,
        nombreTransaccion: aResp.data[0].nombre,
      });

      this.bInhabilitar = false;

      sEstado
        ? this._utilsService.fnMostrarMensaje({
            severity: aResp.estado!
              ? ADM.ACCIONES_TOAST.toastTipo.creado
              : ADM.ACCIONES_TOAST.toastTipo.fallido,
            summary: aResp.estado!
              ? ADM.ACCIONES_TOAST.toastMensaje.creado
              : ADM.ACCIONES_TOAST.toastMensaje.fallido,
            detail: aResp.mensaje!,
          })
        : '';

      await this.fnCargarTipoDocumentoSoporte();
    } else {
      this.aDocumentosADelimitar = [];
      this.aDocumentosDelimitados = [];
      this.fnGenerarError();
    }
  }

  /**
   * @description Cargar la lista de selección de Tipo de Documentos Soporte
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTipoDocumentoSoporte(): Promise<void> {
    this.aDocumentosADelimitar = [];
    this.aDocumentosADelimitar = (
      await this._listaSeleccionState.fnConsultarDominio({
        dominio1: DELIMITARDOC.DOMINIO_FIJO,
      })
    ).data[0]?.valoresDominios;

    if (this.aDocumentosADelimitar.length > 0) {
      this.aDocumentos = [...this.aDocumentosADelimitar];
      await this.fnCargarDocumentosAsociados();
    } else {
      throw Error(ADM.PERDIDA_DATA);
    }
  }

  /**
   * @description Busca los documentos asociados a una la transacción
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarDocumentosAsociados(): Promise<void> {
    const aResp = (
      await this._delimitarDocumentoState.fnObtenerDocumentosSoportexFuncionalidad(
        { idFuncionalidad: this.oTransaccion[0].id, activo: true }
      )
    ).data;

    this.fnCrearModeloTarget(aResp);
  }

  /**
   * @description Crear el modelo de Documentos que fueron delimitados (Documentos vinculados)
   * @param {IDocumentoSoporte} aDocumentoSoporte Array de documentos soporte
   * @return {void} No retorna datos
   */
  fnCrearModeloTarget(aDocumentoSoporte: IDocumentoSoporte[]): void {
    this.aDocumentosDelimitados = [];

    aDocumentoSoporte.forEach((element: any) => {
      this.aDocumentosDelimitados.push({
        id: element?.id,
        sigla: element?.tipoDocumentoSoporte,
        descripcion: this.fnObtenerNombreDocumento(
          element?.tipoDocumentoSoporte
        ),
      });
    });

    this.fnEliminarValoresDocumentosADelimitar();
  }

  /**
   * @description Elimina el listado de documentos disponibles dependiendo de los vinculados
   * @return {void} No retorna datos
   */
  fnEliminarValoresDocumentosADelimitar(): void {
    this.aDocumentosDelimitados.forEach((element: any) => {
      this.aDocumentosADelimitar = this.aDocumentosADelimitar.filter(
        (e) => e.sigla !== element.sigla
      );
    });
  }

  /**
   * @description Muestra un error al no encontrar datos de búsqueda con la Transacción
   * @return {void} No retorna datos
   */
  fnGenerarError(): void {
    this.frmBuscarTransaccion.reset();

    this._utilsService.fnMostrarMensaje({
      severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
      summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
      detail: DELIMITARDOC.NO_TRANSACCION,
    });
  }

  /**
   * @description
   * Verifica si el documento ha sido previamente asociado y dependiendo de eso
   * ejecuta activar o crear la asociación del documento
   * @param {any} {items} Desestructuración del $event Picklist
   * @return {Promise<void>} No retorna datos
   */
  async fnVerificarMovimientoDocumento({ items }: any): Promise<void> {
    items.forEach(async (docAsociar: any) => {
      const aResp = (
        await this._delimitarDocumentoState.fnObtenerDocumentosSoportexFuncionalidad(
          {
            idFuncionalidad: this.oTransaccion[0]?.id,
            tipoDocumentoSoporte: docAsociar?.sigla,
            activo: false,
          }
        )
      ).data;

      if (aResp.length > 0) {
        await this.activarDocumentoAsociado(aResp);
      } else {
        await this.crearMovimientoDocumento(docAsociar);
      }
    });
  }

  /**
   * @description Crea la asociación del documento para la transacción
   * @param {ValoresDominio} docAsociar Valores del documento a asociar
   * @return {Promise<void>} No retorna datos
   */
  async crearMovimientoDocumento(docAsociar: IValoresDominio): Promise<void> {
    this.documentoSoporte = {
      ...this.documentoSoporte,
      idFuncionalidad: this.oTransaccion[0].id,
      tipoDocumentoSoporte: docAsociar?.sigla,
    };

    await this._delimitarDocumentoState.fnCrearDocumentoSoportexFuncionalidad(
      this.documentoSoporte
    );

    this.fnBuscarTransaccion();
  }

  /**
   * @description Activa el documento si ya existe en la BD para la transacción
   * @param {DocumentoSoporte[]} docAsociar Valores del documento a asociar
   * @return {Promise<void>} No retorna datos
   */
  async activarDocumentoAsociado(
    docAsociar: IDocumentoSoporte[]
  ): Promise<void> {
    this.documentoSoporte = {
      ...this.documentoSoporte,
      id: docAsociar[0]?.id,
      idFuncionalidad: this.oTransaccion[0].id,
      tipoDocumentoSoporte: docAsociar[0]?.tipoDocumentoSoporte,
    };

    await this._delimitarDocumentoState.fnEditarDocumentoSoportexFuncionalidad(
      this.documentoSoporte
    );

    this.fnBuscarTransaccion();
  }

  /**
   * @description Edita el documento en True / False en la BD para la transacción
   * @param {any} {items} Desestructuración del $event Picklist
   * @return {Promise<void>} No retorna datos
   */
  async fnEditarMovimientoDocumento({ items }: any): Promise<void> {
    items.forEach(async (docDesasociar: any) => {
      this.documentoSoporte = {
        ...this.documentoSoporte,
        id: docDesasociar?.id,
        idFuncionalidad: this.oTransaccion[0].id,
        tipoDocumentoSoporte: docDesasociar?.sigla,
        activo: false,
      };

      await this._delimitarDocumentoState.fnEditarDocumentoSoportexFuncionalidad(
        this.documentoSoporte
      );
    });

    this.fnBuscarTransaccion();
  }

  /**
   * @description Cancela todos los cambios y devuelve al home
   * @return {void} No retorna datos
   */
  fnCancelarProceso(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._router.navigateByUrl('/home');
      },
    });
  }

  /**
   * @description Guarda el proceso de asociar/desasociar documentos a una transacción
   * @return {void} No retorna datos
   */
  async fnGuardarProceso(): Promise<void> {
    const sTransaccion: string = this.oTransaccion[0]?.codigo?.concat(
      ' - ',
      this.oTransaccion[0]?.nombre!
    )!;

    const sMensaje = DELIMITARDOC.MSG_GUARDAR.concat(' ', sTransaccion!);
    this._utilsService.fnMostrarMensaje({
      severity: ADM.ACCIONES_TOAST.toastTipo.creado,
      summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
      detail: sMensaje,
    });

    this._utilsService.fnSubirToScroll();
    await this._utilsService.fnSleep(1500);
    this._utilsService.fnReloadPage();
  }

  /**
   * @description Filtrar el nombre de la lista de selección de documentos
   * @param {string} sSigla Determina el tipo de documento
   * @return {string | undefined} Retorna el nombre del documento de lista
   */
  fnObtenerNombreDocumento(sSigla: string): string {
    return this.aDocumentos.filter((e) => e.sigla === sSigla)[0]?.descripcion!;
  }

  /**
   * @description Validar de forma general los campos del formulario
   * @param {string} sCampo Campo del formulario a validar
   * @return {boolean | undefined} Retorna un booleano o indefinido al realizar la validación
   */
  fnValidarCampo(sCampo: string): boolean | undefined {
    return this.frmBuscar[sCampo]?.invalid && this.frmBuscar[sCampo]?.touched;
  }

  /**
   * @description Obtener los posibles errores el formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {string} Retorna el mensaje de error para el formulario
   */
  fnListarErrorForm(sCampo: string): string {
    const errors = this.frmBuscar[sCampo]?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength'])
      return `No puede superar los ${errors?.['maxlength'].requiredLength} caracteres.`;
    if (errors?.['pattern'])
      return 'No puede contener caracteres especiales o espacios en blanco.';

    return '';
  }

  /** *********************
   *  FILTROS GENÉRICOS  **
   * **********************/

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnAbrirFiltroTransaccion(): void {
    this.bAbrirFiltro = true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltro(bCerrarFiltro: boolean): void {
    this.bAbrirFiltro = bCerrarFiltro;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltro(aTransacciones: any): void {
    this.aTransacciones = aTransacciones;
    this.frmBuscarTransaccion.patchValue({
      codigoTransaccion: this.aTransacciones?.codigo,
    });

    this.fnBuscarTransaccion(true);
  }
}
