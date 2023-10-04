import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ADM } from 'src/app/core/constant/adm.constants';
import { TRANSACCIONES } from 'src/app/core/constant/adm/transacciones.constants';
import { NO_ESPECIALES } from 'src/app/core/utils/Pattern';
import { IValoresDominio } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import {
  SIN_ESPACIOS_CARACTERES_ESPECIALES,
  SOLO_NUMEROS,
} from 'src/app/core/utils/Patterns';
import {
  IEstadosTransaccion,
  IHabilitarCampos,
  ITransacciones,
} from 'src/app/domain/interface/adm/transacciones/transacciones.interface';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { TransaccionesStateService } from 'src/app/domain/service/adm/transacciones/transacciones-state.service';

@Component({
  selector: 'app-frm-crear-transacciones',
  templateUrl: './frm-crear-transacciones.component.html',
  styleUrls: ['./frm-crear-transacciones.component.scss'],
  providers: [MessageService],
})
export class FrmCrearTransaccionesComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];
  public sAccion: string = ADM.ACCION_CREAR;
  public sTipoPerfil: string = ADM.PERFIL_ADMINISTRATIVO;
  public aTipoTransaccion: any[] = [];
  public aEstadoTransaccion: IEstadosTransaccion[] = [];
  public aValorRequerimientoSeguridad: IValoresDominio[] = [];
  public aCodigosTransaccionesSistema: IValoresDominio[] = [];
  public aFuncionNegocio: IValoresDominio[] = [];
  public aCategorias: IValoresDominio[] = [];
  public sCodigoTransaccion: string = '';
  public sCategoriaTransaccion: string = '';
  public bDeshabilitarBotones = false;
  public oCategoriaSeleccionada?: IValoresDominio;
  public aListaTransacciones: ITransacciones[] = [];
  public sNombreTransaccion?: string;
  public sTitulo = TRANSACCIONES.TITULOS.CREAR;
  public sSubtitulo = TRANSACCIONES.TITULOS.DESCRIPCION_CREAR;
  public aTransaccionesPendientes: ITransacciones[] = [];

  frmCrearTransaccion: FormGroup = this._formBuilder.group({
    id: [0],
    codigo: [
      '',
      [
        Validators.required,
        Validators.pattern(SIN_ESPACIOS_CARACTERES_ESPECIALES),
        Validators.maxLength(20),
      ],
    ],
    nombre: [
      '',
      [
        Validators.required,
        Validators.maxLength(150),
        Validators.pattern(NO_ESPECIALES),
      ],
    ],
    descripcion: [
      '',
      [Validators.maxLength(250), Validators.pattern(NO_ESPECIALES)],
    ],
    tipo: ['', [Validators.required]],
    funcionNegocio: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    estado: [{ value: true, disabled: true }, [Validators.required]],
    logAuditoria: [false],
    requerimientoSeguridad: [false],
    valorRequerimiento: [{ value: '', disabled: true }],
    datosAdministrativos: [false],
    consultaAsincrona: [false],
    contabiliza: [false],
    contabilizaAuto: [false],
    maxRegistroMasivo: [
      { value: 0, disabled: true },
      [
        Validators.min(
          Number(
            localStorage.getItem(
              TRANSACCIONES.REGISTRO_MASIVO.CANTIDAD_MIN_REGISTRO_MASIVO
            )
          )
        ),
        Validators.max(
          Number(
            localStorage.getItem(
              TRANSACCIONES.REGISTRO_MASIVO.CANTIDAD_MAX_REGISTRO_MASIVO
            )
          )
        ),
        Validators.pattern(SOLO_NUMEROS),
      ],
    ],
    maxCargaLinea: [
      { value: 0, disabled: true },
      [
        Validators.min(
          Number(
            localStorage.getItem(
              TRANSACCIONES.CARGA_MASIVA.CANTIDAD_MIN_CARGA_MASIVA
            )
          )
        ),
        Validators.max(
          Number(
            localStorage.getItem(
              TRANSACCIONES.CARGA_MASIVA.CANTIDAD_MAX_CARGA_MASIVA
            )
          )
        ),
        Validators.pattern(SOLO_NUMEROS),
      ],
    ],
    maxCargaAsincrona: [
      { value: 0, disabled: true },
      [
        Validators.max(
          Number(
            localStorage.getItem(
              TRANSACCIONES.CARGA_MASIVA.CANTIDAD_MAX_CARGA_MASIVA
            )
          )
        ),
        Validators.pattern(SOLO_NUMEROS),
      ],
    ],
  });

  get controlsForm(): FormGroup['controls'] {
    return this.frmCrearTransaccion.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _dominioService: ListaSeccionStateService,
    private _transaccionService: TransaccionesStateService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _confirmationService: ConfirmationService
  ) {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Transacciones' },
      { label: 'Identificación' },
    ];
    this.cargarListas();
  }

  ngOnInit(): void {
    this.aEstadoTransaccion = TRANSACCIONES.ESTADOS_VALORES;
    this._activatedRoute.params.subscribe({
      next: (param) => {
        this.sCodigoTransaccion = param['codigo'];
        this.sCategoriaTransaccion = param['categoria'];
        if (
          this.sCodigoTransaccion !== '0' &&
          this.sCategoriaTransaccion !== '0'
        ) {
          this.sAccion = ADM.ACCION_EDITAR;
          this.sTitulo = TRANSACCIONES.TITULOS.EDITAR;
          this.sSubtitulo = TRANSACCIONES.TITULOS.DESCRIPCION_EDITAR;
        }
        this.consultarTransaccion();
      },
    });
  }

  /**
   * Fecha: 12/04/2023
   * @description Función que carga las listas de selección del formulario
   * @author Asesoftware - Javier Gonzalez
   */
  cargarListas() {
    this.cargarCategorias();
    this.cargarTipoTransaccion();
    this.cargarAltoReqSeguridad();
    this.cargarFuncionNegocio();
  }

  /**
   * Fecha: 12/04/2023
   * @description Función que carga la lista de selección de Categorias
   * @author Asesoftware - Javier Gonzalez
   */
  cargarCategorias() {
    this._dominioService.consultarCategoria({
      dominio1: TRANSACCIONES.NOMBRE_LISTA_CATEGORIA,
    });
    this._dominioService
      .select((e) => e.aCategoriaDominio)
      .subscribe({
        next: (resp) => {
          this.aCategorias = resp;
          this.aCategorias = this.ordenarLista(this.aCategorias);
        },
      });
  }

  /**
   * Fecha: 12/04/2023
   * @description Función que carga la lista de selección de Tipo de Transacción
   * @author Asesoftware - Javier Gonzalez
   */
  cargarTipoTransaccion() {
    this._dominioService.consultarTipoTransaccion({
      dominio1: TRANSACCIONES.NOMBRE_LISTA_TIPO_TRANSACCION,
    });
    this._dominioService
      .select((e) => e.aTipoTransaccionDominio)
      .subscribe({
        next: (resp) => {
          this.aTipoTransaccion = resp;
          this.aTipoTransaccion = this.ordenarLista(this.aTipoTransaccion);
        },
      });
  }

  /**
   * Fecha: 12/04/2023
   * @description Función que carga la lista de selección de Función de Negocio
   * @author Asesoftware - Javier Gonzalez
   */
  cargarFuncionNegocio(): void {
    this._dominioService.consultarFuncionNegocio({
      dominio1: TRANSACCIONES.NOMBRE_LISTA_FUNCION_NEGOCIO,
    });
    this._dominioService
      .select((e) => e.aFuncionNegocioDominio)
      .subscribe({
        next: (resp) => {
          this.aFuncionNegocio = resp;
          this.aFuncionNegocio = this.ordenarLista(this.aFuncionNegocio);
        },
      });
  }

  /**
   * Fecha: 12/04/2023
   * @description Función que carga la lista de selección de Alto Requerimiento de Seguridad
   * @author Asesoftware - Javier Gonzalez
   */
  cargarAltoReqSeguridad(): void {
    this._dominioService.consultarAltoReqSeguridad({
      dominio1: TRANSACCIONES.NOMBRE_LISTA_ALTO_REQ_SEGURIDAD,
    });
    this._dominioService
      .select((e) => e.aReqSeguridadDominio)
      .subscribe({
        next: (resp) => {
          this.aValorRequerimientoSeguridad = resp;
          this.aValorRequerimientoSeguridad = this.ordenarLista(
            this.aValorRequerimientoSeguridad
          );
        },
      });
  }

  /**
   * Fecha: 12/04/2023
   * @description Función que consulta una transacción existente
   * @author Asesoftware - Javier Gonzalez
   */
  consultarTransaccion(): void {
    this._transaccionService.consultarTransacciones();
    this._transaccionService
      .select((e) => e.oTransacciones)
      .subscribe({
        next: (resp) => {
          if (resp != undefined) {
            this.aListaTransacciones = resp;
            if (this.sAccion === ADM.ACCION_EDITAR) {
              let oTransaccion = resp.filter(
                (e) =>
                  e.codigo === this.sCodigoTransaccion &&
                  e.categoria === this.sCategoriaTransaccion
              )[0];
              this.sNombreTransaccion = oTransaccion.nombre;
              this.cargarDatosIniciales(oTransaccion);
            } else {
              this.aTransaccionesPendientes = this.aListaTransacciones.filter(
                (e) =>
                  e.estadoFuncionalidad ===
                  TRANSACCIONES.ESTADO_PENDIENTE_TRANSACCION
              );
              this.aListaTransacciones = this.aListaTransacciones.filter(
                (e) =>
                  e.estadoFuncionalidad ===
                  TRANSACCIONES.ESTADO_ACTUALIZADO_TRANSACCION
              );
            }
          }
        },
      });
  }

  /**
   * Fecha: 12/04/2023
   * @description Función que carga los datos iniciales cuando es una acción de edición
   * @author Asesoftware - Javier Gonzalez
   * @param datos
   */
  cargarDatosIniciales(datos: ITransacciones): void {
    this.controlsForm['id'].setValue(datos.id);
    this.controlsForm['codigo'].setValue(datos.codigo);
    this.controlsForm['nombre'].setValue(datos.nombre);
    this.controlsForm['descripcion'].setValue(datos.descripcion);
    this.controlsForm['tipo'].setValue(datos.tipoTransaccion);
    this.controlsForm['funcionNegocio'].setValue(datos.funcionNegocio);
    this.controlsForm['categoria'].setValue(datos.categoria);
    this.controlsForm['estado'].setValue(datos.activo);

    if (datos.activo) {
      this.verificarTipoTransaccion(datos.tipoTransaccion);
    }

    this.controlsForm['logAuditoria'].setValue(datos.requiereLogAuditoria);
    if (datos.nivelSeguridadAlto !== '') {
      this.controlsForm['requerimientoSeguridad'].setValue(true);
      this.controlsForm['valorRequerimiento'].setValue(
        datos.nivelSeguridadAlto
      );
      this.controlsForm['valorRequerimiento'].enable();
    }
    this.controlsForm['datosAdministrativos'].setValue(
      datos.requiereDatosAdministrativos
    );
    this.controlsForm['contabiliza'].setValue(datos.contabiliza);
    this.controlsForm['contabilizaAuto'].setValue(
      datos.contabilizaAutomaticamente
    );
    this.controlsForm['consultaAsincrona'].setValue(datos.consultaAsincrona);
    this.controlsForm['maxRegistroMasivo'].setValue(
      datos.cantidadMaxRegistroLinea
    );
    this.controlsForm['maxCargaLinea'].setValue(datos.cantidadMaxCargaMasiva);
    this.controlsForm['maxCargaAsincrona'].setValue(
      datos.cantidadMaxCargaAsincrona
    );

    this.cambiarCategoria(datos.categoria);
    this.bloquearCamposIniciales(datos.activo);
  }

  /**
   * Fecha: 13/04/2023
   * @description Inhabilita los campos deacuerdo al estado de la transacción
   * @author Asesoftware - Javier Gonzalez
   * @returns {void} No retorna datos
   */
  bloquearCamposIniciales(estado?: boolean) {
    let oControls: IHabilitarCampos[] = [
      { campo: 'codigo', habilitar: false },
      { campo: 'tipo', habilitar: false },
      { campo: 'estado', habilitar: true },
    ];
    if (!estado) {
      oControls.push({ campo: 'nombre', habilitar: false });
      oControls.push({ campo: 'descripcion', habilitar: false });
      oControls.push({ campo: 'tipo', habilitar: false });
      oControls.push({ campo: 'funcionNegocio', habilitar: false });
      oControls.push({ campo: 'consultaAsincrona', habilitar: false });
      oControls.push({ campo: 'logAuditoria', habilitar: false });
      oControls.push({ campo: 'requerimientoSeguridad', habilitar: false });
      oControls.push({ campo: 'valorRequerimiento', habilitar: false });
      oControls.push({ campo: 'datosAdministrativos', habilitar: false });
      oControls.push({ campo: 'contabiliza', habilitar: false });
      oControls.push({ campo: 'contabilizaAuto', habilitar: false });
      oControls.push({ campo: 'maxRegistroMasivo', habilitar: false });
      oControls.push({ campo: 'maxCargaLinea', habilitar: false });
      oControls.push({ campo: 'maxCargaAsincrona', habilitar: false });
    }
    this.habilitarCamposForm(oControls);
  }

  /**
   * Fecha: 12/04/2023
   * @description Ejecuta  validaciones previas al guardado
   * @author Asesoftware - Javier Gonzalez
   * @returns {void} No retorna datos
   */
  validarTransaccion(): void {
    if (
      !this.validarCantidadesMaxMin() &&
      this.validarEstadoCategoria() &&
      this.validarTransaccionExiste()
    ) {
      let oTransaccion: ITransacciones = {
        id: this.controlsForm['id'].value,
        codigo: this.controlsForm['codigo'].value,
        categoria: this.controlsForm['categoria'].value,
        nombre: this.controlsForm['nombre'].value,
        descripcion: this.controlsForm['descripcion'].value,
        tipoTransaccion: this.controlsForm['tipo'].value,
        funcionNegocio: this.controlsForm['funcionNegocio'].value,
        activo: this.controlsForm['estado'].value,
        estadoFuncionalidad: 'ACT',
        opcionMenu: false,
        codigoCasoUso: this.controlsForm['codigo'].value,
        nivelSeguridadAlto: this.controlsForm['valorRequerimiento'].value,
        requiereLogAuditoria: this.controlsForm['logAuditoria'].value,
        requiereDatosAdministrativos:
          this.controlsForm['datosAdministrativos'].value,
        consultaAsincrona: this.controlsForm['consultaAsincrona'].value,
        contabiliza: this.controlsForm['contabiliza'].value,
        contabilizaAutomaticamente: this.controlsForm['contabilizaAuto'].value,
        cantidadMaxCargaAsincrona: this.controlsForm['maxCargaAsincrona'].value,
        cantidadMaxCargaMasiva: this.controlsForm['maxCargaLinea'].value,
        cantidadMaxRegistroLinea: this.controlsForm['maxRegistroMasivo'].value,
      };
      if (oTransaccion.id === 0) {
        this.guardarTransaccion(oTransaccion);
      } else {
        this.editarTransaccion(oTransaccion);
      }
    }
  }

  /**
   * Fecha: 12/04/2023
   * @description Función que guarda una transacción nueva
   * @author Asesoftware - Javier Gonzalez
   * @param model
   */
  guardarTransaccion(model: ITransacciones) {
    let sMensaje: string = '';
    this.bDeshabilitarBotones = true;
    this._transaccionService.crearTransaccion(model);
    this._transaccionService
      .select((e) => e.bCrearTransaccion)
      .subscribe({
        next: (resp) => {
          if (resp != undefined) {
            sMensaje = `Registro exitoso de la transacción ${model.nombre}`;
            this.mostrarMensaje(
              resp,
              sMensaje,
              ADM.ACCIONES_TOAST.toastMensaje.fallido
            );

            if (resp) {
              setTimeout(() => {
                this._router.navigate(['adm/transacciones']);
              }, 1000);
            } else {
              this.bDeshabilitarBotones = false;
            }
          }
        },
      });
  }

  /**
   * Fecha: 12/04/2023
   * @description Función que guarda la edición de una transacción existente
   * @author Asesoftware - Javier Gonzalez
   * @param model
   */
  editarTransaccion(model: ITransacciones) {
    let sMensaje: string = '';
    this.bDeshabilitarBotones = true;
    console.log(model);
    this._transaccionService.editarTransaccion(model);
    this._transaccionService
      .select((e) => e.bEditarTransaccion)
      .subscribe({
        next: (resp) => {
          if (resp != undefined) {
            sMensaje =
              this.sAccion == ADM.ACCION_CREAR
                ? `Registro exitoso de la transacción ${model.nombre}`
                : `Modificación exitosa de la transacción ${model.nombre}`;
            this.mostrarMensaje(
              resp,
              sMensaje,
              ADM.ACCIONES_TOAST.toastMensaje.fallido
            );

            if (resp) {
              this._transaccionService.cambiarEstadoPrivilegios({
                idFuncionalidadSistema: model.id,
                activo: model.activo,
              });
              setTimeout(() => {
                this._router.navigate(['adm/transacciones']);
              }, 1000);
            } else {
              this.bDeshabilitarBotones = false;
            }
          }
        },
      });
  }

  /**
   * Fecha: 13/04/2023
   * @description Valida si el código o nombre de la categoria ya fue registrado
   * @author Asesoftware - Javier Gonzalez
   * @returns
   */
  validarTransaccionExiste(): boolean {
    let bRetorno: boolean = true;
    let sMensaje = '';
    let sCodigo = this.controlsForm['codigo'].value;
    let sNombre = this.controlsForm['nombre'].value;
    let aTransaccionCodigo = this.aListaTransacciones.filter(
      (e) => e.codigo === sCodigo
    );
    let aTransaccionNombre = this.aListaTransacciones.filter(
      (e) => e.nombre === sNombre
    );
    if (aTransaccionCodigo.length > 0 && this.sCodigoTransaccion != sCodigo) {
      sMensaje = `${sCodigo} ${TRANSACCIONES.MENSAJES.VALOR_DUPLICADO}`;
      this.mostrarMensaje(
        false,
        '',
        ADM.ACCIONES_TOAST.toastMensaje.fallido,
        sMensaje
      );
      return false;
    }

    if (aTransaccionNombre.length > 0 && this.sNombreTransaccion !== sNombre) {
      sMensaje = `${sNombre} ${TRANSACCIONES.MENSAJES.VALOR_DUPLICADO}`;
      this.mostrarMensaje(
        false,
        '',
        ADM.ACCIONES_TOAST.toastMensaje.fallido,
        sMensaje
      );
      return false;
    }

    return bRetorno;
  }

  /**
   * Fecha: 13/04/2023
   * @description Valida el estado de la categoria seleccionada
   * @author Asesoftware - Javier Gonzalez
   * @returns
   */
  validarEstadoCategoria(): boolean {
    let bRetorno: boolean = true;
    if (!this.oCategoriaSeleccionada?.activo) {
      let sMensaje = `${this.oCategoriaSeleccionada?.descripcion} ${TRANSACCIONES.MENSAJES.CATEGORIA_INACTIVA}`;
      this.mostrarMensaje(
        false,
        '',
        ADM.ACCIONES_TOAST.toastMensaje.fallido,
        sMensaje
      );
      bRetorno = false;
    }
    return bRetorno;
  }

  /**
   * Fecha: 12/04/2023
   * @description
   * Valida los campos de Cantidades Máximas y Mínimas dependiendo de los
   * parámetros generales del sistema para cargas y el tipo de transacción
   * @author Asesoftware - Javier Gonzalez
   * @returns {boolean} Retorna un booleano como bandera de continuidad
   */
  validarCantidadesMaxMin(): boolean {
    let bFallaGuardar: boolean = false;
    const sTipoTransaccion = this.controlsForm['tipo'].value;

    switch (sTipoTransaccion) {
      case 'TRAN':
        bFallaGuardar = this.validarCantidadesTransaccion();
        break;

      case 'CARG':
        bFallaGuardar = this.validarCantidadesCarga();
        break;
    }

    return bFallaGuardar;
  }

  /**
   * Fecha: 12/04/2023
   * @description
   * Valida las cantidades para tipo transacción: Transacción [Registro masivo]
   * y genera mensaje de alerta en caso de no cumplirse
   * @author Asesoftware - Javier Gonzalez
   * @returns {boolean} Retorna true o false dependiendo de la validación
   */
  validarCantidadesTransaccion(): boolean {
    const nMaxRegistroMasivo = this.controlsForm['maxRegistroMasivo'].value;
    let sMensajeUnico: string = '';
    let bFallaGuardar: boolean = false;

    if (
      nMaxRegistroMasivo <
      TRANSACCIONES.REGISTRO_MASIVO.CANTIDAD_MIN_REGISTRO_MASIVO
    ) {
      sMensajeUnico = TRANSACCIONES.MENSAJES.MAX_REGISTRO_MIN_MASIVO;
      this.mostrarMensaje(
        false,
        '',
        ADM.ACCIONES_TOAST.toastMensaje.advertencia,
        sMensajeUnico
      );
      bFallaGuardar = true;
    } else if (
      nMaxRegistroMasivo >
      TRANSACCIONES.REGISTRO_MASIVO.CANTIDAD_MAX_REGISTRO_MASIVO
    ) {
      sMensajeUnico = TRANSACCIONES.MENSAJES.MAX_REGISTRO_MAX_MASIVO;
      this.mostrarMensaje(
        false,
        '',
        ADM.ACCIONES_TOAST.toastMensaje.advertencia,
        sMensajeUnico
      );
      bFallaGuardar = true;
    }

    return bFallaGuardar;
  }

  /**
   * Fecha: 12/04/2023
   * @description
   * Valida las cantidades para tipo transacción: Carga [Carga línea - Carga Asíncrona]
   * y genera mensaje de alerta en caso de no cumplirse
   * @author Asesoftware - Javier Gonzalez
   * @returns {boolean} Retorna true o false dependiendo de la validación
   */
  validarCantidadesCarga(): boolean {
    const nMaxCargaLinea = this.controlsForm['maxCargaLinea'].value;
    const nMaxCargaAsincrona = this.controlsForm['maxCargaAsincrona'].value;
    let sMensajeUnico: string = '';
    let bFallaGuardar: boolean = false;

    if (nMaxCargaLinea < TRANSACCIONES.CARGA_MASIVA.CANTIDAD_MIN_CARGA_MASIVA) {
      sMensajeUnico = TRANSACCIONES.MENSAJES.MAX_CARGAL_MIN_MASIVO;
      this.mostrarMensaje(
        false,
        '',
        ADM.ACCIONES_TOAST.toastMensaje.advertencia,
        sMensajeUnico
      );
      bFallaGuardar = true;
    } else if (
      nMaxCargaLinea > TRANSACCIONES.CARGA_MASIVA.CANTIDAD_MAX_CARGA_MASIVA
    ) {
      sMensajeUnico = TRANSACCIONES.MENSAJES.MAX_CARGAL_MAX_MASIVO;
      this.mostrarMensaje(
        false,
        '',
        ADM.ACCIONES_TOAST.toastMensaje.advertencia,
        sMensajeUnico
      );
      bFallaGuardar = true;
    }

    if (nMaxCargaAsincrona < nMaxCargaLinea) {
      sMensajeUnico = TRANSACCIONES.MENSAJES.MAX_CARGAA_VAL_CARGAL;
      this.mostrarMensaje(
        false,
        '',
        ADM.ACCIONES_TOAST.toastMensaje.advertencia,
        sMensajeUnico
      );
      bFallaGuardar = true;
    }

    return bFallaGuardar;
  }

  /**
   * Fecha: 12/04/2023
   * @description
   * Valida la interacción de los check del formulario dependiendo de las validaciones requeridas
   * y aplica también validación de tipo de perfil, adicionalmente remueve en cascada la selección
   * @author Asesoftware - Javier Gonzalez
   * @param {boolean} bChecked Boleano del check en form
   * @param {string} sControl Nombre del control del form a interactuar
   * @param {string} sCampo Nombre del contro del form a validar
   * @returns {void} No retorna datos
   */
  validarChecks(bChecked: boolean, sControl: string, sCampo: string): void {
    const valorFormCheck = this.controlsForm[sControl].value;
    let sMensajeUnico = '';

    if (sControl === 'logAuditoria') {
      sMensajeUnico = TRANSACCIONES.MENSAJES.NO_LOG_NO_REQUERIMIENTO;
    }

    if (sControl === 'requerimientoSeguridad') {
      sMensajeUnico = TRANSACCIONES.MENSAJES.NO_REQUERIMIENTO_NO_DATOS;
      this.habilitarCamposForm([{ campo: '', habilitar: true }]);
    }

    if (sControl === 'contabiliza') {
      sMensajeUnico = TRANSACCIONES.MENSAJES.NO_CONTABILIZA_NO_AUTO;
    }

    if (bChecked === true) {
      if (!valorFormCheck) {
        this.frmCrearTransaccion.patchValue({ [sCampo]: false });
        this.mostrarMensaje(
          false,
          '',
          ADM.ACCIONES_TOAST.toastMensaje.advertencia,
          sMensajeUnico
        );
      } else {
        if (sCampo === 'requerimientoSeguridad') {
          this.frmCrearTransaccion.patchValue({
            valorRequerimiento: TRANSACCIONES.VALOR_ALTO_REQ_SEGURIDAD_DEFECTO,
          });
          this.habilitarCamposForm([
            {
              campo: 'valorRequerimiento',
              habilitar: true,
            },
          ]);
        }
      }
    } else {
      if (
        this.sTipoPerfil === ADM.PERFIL_NEGOCIO &&
        this.sAccion === ADM.ACCION_EDITAR
      ) {
        if (sCampo === 'contabiliza' || sCampo === 'contabilizaAuto') {
          this.frmCrearTransaccion.patchValue({ [sCampo]: true });
          this.mostrarMensaje(
            false,
            '',
            ADM.ACCIONES_TOAST.toastMensaje.advertencia,
            TRANSACCIONES.MENSAJES.CONTABILIZA_NO_ADMIN
          );
        }
      }

      if (sCampo === 'requerimientoSeguridad') {
        this.frmCrearTransaccion.patchValue({
          valorRequerimiento: '',
        });
        this.habilitarCamposForm([
          {
            campo: 'valorRequerimiento',
            habilitar: false,
          },
        ]);
      }
      if (sControl === 'logAuditoria') {
        this.frmCrearTransaccion.patchValue({
          requerimientoSeguridad: false,
          valorRequerimiento: '',
        });
        this.habilitarCamposForm([
          {
            campo: 'valorRequerimiento',
            habilitar: false,
          },
        ]);
      }

      if (sControl === 'contabiliza') {
        this.frmCrearTransaccion.patchValue({
          contabilizaAuto: false,
        });
      }
    }
  }

  /**
   * Fecha: 12/04/2023
   * @description Valida a través del tipo de transacción las acciones para habilitar o inhabilitar controles del form
   * @author Asesoftware - Javier Gonzalez
   * @param {string} sTipoTransaccion Valor del evento capturado en el onChange de Tipo Transacción
   * @returns {void} No retorna datos
   */
  verificarTipoTransaccion(sTipoTransaccion?: string): void {
    let oControls: IHabilitarCampos[] = [];
    oControls = [
      { campo: 'logAuditoria', habilitar: false },
      { campo: 'requerimientoSeguridad', habilitar: false },
      { campo: 'valorRequerimiento', habilitar: false },
      { campo: 'datosAdministrativos', habilitar: false },
      { campo: 'consultaAsincrona', habilitar: false },
      { campo: 'contabiliza', habilitar: false },
      { campo: 'contabilizaAuto', habilitar: false },
      { campo: 'maxRegistroMasivo', habilitar: false },
      { campo: 'maxCargaLinea', habilitar: false },
      { campo: 'maxCargaAsincrona', habilitar: false },
    ];

    if (sTipoTransaccion === 'TRAN') {
      oControls = [
        { campo: 'logAuditoria', habilitar: true },
        { campo: 'requerimientoSeguridad', habilitar: true },
        { campo: 'datosAdministrativos', habilitar: true },
        { campo: 'contabiliza', habilitar: true },
        { campo: 'contabilizaAuto', habilitar: true },
        { campo: 'maxRegistroMasivo', habilitar: true, required: true },
        { campo: 'consultaAsincrona', habilitar: false },
        { campo: 'maxCargaLinea', habilitar: false },
        { campo: 'maxCargaAsincrona', habilitar: false },
      ];
    }

    if (sTipoTransaccion === 'CARG') {
      oControls = [
        { campo: 'logAuditoria', habilitar: true },
        { campo: 'requerimientoSeguridad', habilitar: true },
        { campo: 'datosAdministrativos', habilitar: true },
        { campo: 'contabiliza', habilitar: true },
        { campo: 'contabilizaAuto', habilitar: true },
        { campo: 'maxCargaLinea', habilitar: true, required: true },
        { campo: 'maxCargaAsincrona', habilitar: true, required: true },
        { campo: 'maxRegistroMasivo', habilitar: false },
        { campo: 'consultaAsincrona', habilitar: false },
      ];
    }

    if (sTipoTransaccion === 'CONS') {
      oControls = [
        { campo: 'consultaAsincrona', habilitar: true },
        { campo: 'logAuditoria', habilitar: false },
        { campo: 'requerimientoSeguridad', habilitar: false },
        { campo: 'valorRequerimiento', habilitar: false },
        { campo: 'datosAdministrativos', habilitar: false },
        { campo: 'contabiliza', habilitar: false },
        { campo: 'contabilizaAuto', habilitar: false },
        { campo: 'maxRegistroMasivo', habilitar: false },
        { campo: 'maxCargaLinea', habilitar: false },
        { campo: 'maxCargaAsincrona', habilitar: false },
      ];
    }

    this.habilitarCamposForm(oControls);

    this.frmCrearTransaccion.patchValue({
      logAuditoria: false,
      requerimientoSeguridad: false,
      datosAdministrativos: false,
      consultaAsincrona: false,
      contabiliza: false,
      contabilizaAuto: false,
      maxRegistroMasivo: 0,
      maxCargaLinea: 0,
      maxCargaAsincrona: 0,
    });
  }

  /**
   * Fecha: 12/04/2023
   * @description Reciben un objeto con los valores campo y habilitar que permite los disable y enable del form
   * @author Asesoftware - Javier Gonzalez
   * @param {HabilitarCampos[]} oControls Objeto { campo: string, habilitar: boolean }
   * @return {void} No retorna datos
   */
  habilitarCamposForm(oControls: IHabilitarCampos[]): void {
    oControls.forEach((objeto: IHabilitarCampos) => {
      objeto.habilitar
        ? this.controlsForm[objeto.campo].enable()
        : this.controlsForm[objeto.campo].disable();

      objeto.required
        ? this.controlsForm[objeto.campo].addValidators([Validators.required])
        : this.controlsForm[objeto.campo].removeValidators([
            Validators.required,
          ]);
    });
  }

  /**
   * Fecha: 12/04/2023
   * @description Validar de forma general los campos del formulario
   * @author Asesoftware - Javier Gonzalez
   * @param {string} sCampo Campo del formulario a validar
   * @return {boolean | undefined} Retorna un booleano o indefinido al realizar la validación
   */
  campoNoValido(sCampo: string): boolean | undefined {
    return (
      this.controlsForm[sCampo].invalid && this.controlsForm[sCampo]?.touched
    );
  }

  /**
   * Fecha: 12/04/2023
   * @description Obtener los posibles errores el formulario
   * @author Asesoftware - Javier Gonzalez
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {string} Retorna el mensaje de error para el formulario
   */
  listaErroresMensajes(sCampo: string): string {
    const errors = this.controlsForm[sCampo].errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength'])
      return `No puede superar los ${errors?.['maxlength'].requiredLength} caracteres.`;
    if (errors?.['min'] && sCampo === 'maxRegistroMasivo')
      return TRANSACCIONES.MENSAJES.MAX_REGISTRO_MIN_MASIVO;
    if (errors?.['max'] && sCampo === 'maxRegistroMasivo')
      return TRANSACCIONES.MENSAJES.MAX_REGISTRO_MAX_MASIVO;
    if (errors?.['min'] && sCampo === 'maxCargaAsincrona')
      return TRANSACCIONES.MENSAJES.MAX_CARGAL_MIN_MASIVO;
    if (errors?.['max'] && sCampo === 'maxCargaAsincrona')
      return TRANSACCIONES.MENSAJES.MAX_CARGAL_MAX_MASIVO;
    if (errors?.['min'] && sCampo === 'maxCargaLinea')
      return TRANSACCIONES.MENSAJES.MAX_CARGAL_MIN_MASIVO;
    if (errors?.['max'] && sCampo === 'maxCargaLinea')
      return TRANSACCIONES.MENSAJES.MAX_CARGAL_MAX_MASIVO;
    if (
      errors?.['pattern'] &&
      (sCampo === 'maxCargaLinea' ||
        sCampo === 'maxCargaAsincrona' ||
        sCampo === 'maxRegistroMasivo')
    )
      return 'Solo puede contener números.';
    if (errors?.['pattern']) return 'No puede contener caracteres especiales.';
    return '';
  }

  /**
   * Fecha: 12/04/2023
   * @description Genera el mensaje de la acción ejecutada
   * @author Asesoftware - Javier Gonzalez
   * @param {boolean} bRespuesta Booleano que determina el estado de la transacción
   * @param {string} sMensaje Mensaje de tipo exitoso
   * @param {string} sMensajeUnico Mensaje configurable para validaciones
   * @return {void} No retorna datos
   */
  mostrarMensaje(
    bRespuesta: boolean,
    sMensaje: string,
    sTipoMensaje: string,
    sMensajeUnico?: string
  ): void {
    this._messageService.add({
      severity: bRespuesta
        ? ADM.ACCIONES_TOAST.toastTipo.creado
        : ADM.ACCIONES_TOAST.toastTipo.fallido,
      summary: bRespuesta
        ? ADM.ACCIONES_TOAST.toastMensaje.creado
        : sTipoMensaje,
      detail: bRespuesta
        ? sMensaje
        : sMensajeUnico
        ? sMensajeUnico
        : 'Ha ocurrido un error al ejecutar el proceso. Intente nuevamente.',
    });
  }

  /**
   * Fecha: 12/04/2023
   * @description Evento de cancelación de la acción de guardado
   * @author Asesoftware - Javier Gonzalez
   */
  cancelar() {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      header: 'Cancelar registro',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._router.navigate(['adm/transacciones']);
      },
      reject: (type: any) => {},
    });
  }

  /**
   * Fecha: 12/04/2023
   * @description Evento de cambio de categoria
   * @author Asesoftware - Javier Gonzalez
   * @param codigo
   */
  cambiarCategoria(codigo?: string) {
    this.oCategoriaSeleccionada = this.aCategorias.filter(
      (e) => e.sigla === codigo
    )[0];
  }

  /**
   * Fecha: 13/04/2023
   * @description Ordena las listas por la descripción
   * @author Asesoftware - Javier Gonzalez
   * @param alista
   * @returns
   */
  ordenarLista(alista: any): IValoresDominio[] {
    return alista.sort(
      (a: { descripcion: string }, b: { descripcion: string }) =>
        a.descripcion.localeCompare(b.descripcion)
    );
  }

  /**
   * Fecha: 13/04/2023
   * @description Carga los datos cuando la transacción esta pendiente de categorización
   * @author Asesoftware - Javier Gonzalez
   * @param valor
   */
  cargarDatosTransaccionSinCategoria(valor: number) {
    let transaccion = this.aTransaccionesPendientes.filter(
      (e) => e.id === valor
    )[0];
    this.controlsForm['id'].setValue(transaccion.id);
    this.controlsForm['codigo'].setValue(transaccion.codigo);
    this.controlsForm['codigo'].disable();
    this.controlsForm['nombre'].setValue(transaccion.nombre);
    this.controlsForm['descripcion'].setValue(transaccion.descripcion);
  }
}
