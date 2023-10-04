import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ADM } from 'src/app/core/constant/adm.constants';
import {
  MENSAJE,
  TIPOS_DOCUMENTO,
  Terceros,
} from 'src/app/core/constant/adm/terceros.constants';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import { convertirFecha } from 'src/app/core/shared/functions/funciones-generales';
import {
  NO_ESPECIALES,
  NO_WHITE_SPACES,
  SOLO_NUMEROS,
} from 'src/app/core/utils/Patterns';
import {
  IDatosBasicos,
  IParticipantes,
} from 'src/app/domain/interface/adm/terceros/datos-basicos.interface';
import { IActividadesEconomicas } from 'src/app/domain/interface/adm/terceros/informacion-tributaria.interface';
import { ApiTransversalStateService } from 'src/app/domain/service/adm/apiTransversal/api-transversal-state.service';

import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { TerceroStateService } from 'src/app/domain/service/adm/terceros/tercero-state.service';
import { ModalCoincidenciaExtranjeroComponent } from '../modal-coincidencia-extranjero/modal-coincidencia-extranjero.component';
import { ModalValidacionErroresComponent } from '../modal-validacion-errores/modal-validacion-errores.component';

@Component({
  selector: 'app-frm-informacion-basica',
  templateUrl: './frm-informacion-basica.component.html',
  styleUrls: ['./frm-informacion-basica.component.scss'],
})
export class FrmInformacionBasicaComponent implements OnInit {
  public oListaTipDocumento = [];
  public oListaNaturaleza: any = [];
  public oTercero: IDatosBasicos[] = []!;
  public oDatosDian: any[] = []!;
  public oEstadoPersonaBonos!: boolean;
  public oTerceroNavegacion: any[] = [];
  public oListaParticipantes: IParticipantes[] | undefined = [];
  public oParticipanteAgregar: IParticipantes[] = [];
  public oListaActividad: IActividadesEconomicas[] = [];
  public oListaResponsabilidad = [];
  public oListaMensajesValidacion = [];
  public bDisplayModal: boolean = false;
  public bMostrarLoading: boolean = false;
  public bTipoJuridico: boolean = false;
  public bTipoNatural: boolean = false;
  public bValidacionBonos: boolean = false;
  public bValidacionDian: boolean = false;
  public bValidacionExitosaDian: boolean = false;
  public bEstadoFuenteDian!: boolean;
  public bEstadoFuenteBonos!: boolean;
  public bParticipantes: boolean = true;
  public bContinuarProceso: boolean = true;
  public sTipoTercero: string = '';
  public sTipoTerceroJuridico!: any;
  public sMensaje: string = '';
  public sAccion: string = Terceros.ACCION_CREAR;
  public nTipoJuridico: number = 1;
  public bValorCheck: any = null;
  private accion$!: Subscription;
  private estadoCoincidenciaExtranjera$!: Subscription;
  public nLongitudTipoDocumento!: number;
  public bMostrarInputText: boolean = true;
  public bMostrarInputNumber: boolean = false;
  public bRazonSocial: boolean = false;
  public bContinuarProcesoNatual: boolean = false;
  public sDitoVerificacion!: Number;

  frmDatosBasicos: FormGroup = this._formBuilder.group({
    tipoDocumento: ['', [Validators.required]],
    numeroDocumento: '',
    digitoVerificacionPersona: '',
    tipoPersona: '',
    tipoNaturaleza: ['', [Validators.required]],
    tipoTerceroJuridicoCONS: false,
    tipoTerceroJuridicoUNIO: false,
    digitoVerificacion: '',
    razonSocial: '',
    descripcionActividadEconomica: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    activo: [true, [Validators.required]],
    nitPersona: ['', [Validators.maxLength(Terceros.VALOR_MAX_NIT)]],
    fechaCreacion: null,
    fechaActualizacion: null,
    validacionDian: null,
    validacionExitosaDian: null,
    designacion_contacto: '',
    nombre_contacto: '',
    estadoDocumento: '',
  });
  public oRazonSocial = [
    Validators.required,
    Validators.maxLength(Terceros.VALOR_MAX_CARECTERES_RAZON),
    Validators.pattern(NO_ESPECIALES),
    Validators.pattern(NO_WHITE_SPACES),
  ];
  public oValidacionNitExtranjero = [
    Validators.required,
    Validators.max(Terceros.VALOR_MAX_NIT_EXTRANJETO),
    Validators.min(Terceros.VALOR_MIN_NIT_EXTRANJETO),
  ];
  public oValidacionNit = [
    Validators.required,
    Validators.pattern(SOLO_NUMEROS),
    Validators.pattern(NO_ESPECIALES),
    Validators.pattern(NO_WHITE_SPACES),
  ];
  public oValidacionAlfanumerico = [
    Validators.required,
    Validators.pattern(NO_ESPECIALES),
    Validators.pattern(NO_WHITE_SPACES),
  ];

  public oValidacionSegNombreApellido = [
    Validators.pattern(NO_ESPECIALES),
    Validators.pattern(NO_WHITE_SPACES),
  ];

  public oValidacionPriNombreApellido = [
    Validators.required,
    Validators.pattern(NO_ESPECIALES),
    Validators.pattern(NO_WHITE_SPACES),
  ];
  public oValidacionNumerico = [
    Validators.required,
    Validators.pattern(SOLO_NUMEROS),
    Validators.pattern(NO_ESPECIALES),
    Validators.pattern(NO_WHITE_SPACES),
  ];
  public sDigitoVerificacionDisable =
    this.frmControlDatosBasicos['digitoVerificacion']?.disable();
  public sDigitoVerificacionPersonaDisable =
    this.frmControlDatosBasicos['digitoVerificacionPersona']?.disable();

  frmParticipantes: FormGroup = this._formBuilder.group({});
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _utilsService: UtilsService,
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _tercerosServiceState: TerceroStateService,
    private _listaSeleccionState: ListaSeccionStateService,
    private _apiTransversalState: ApiTransversalStateService,
    private _messageService: MessageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.generarNumeroDocumentoExtrangero();
    this.sDigitoVerificacionDisable;
    this.sDigitoVerificacionPersonaDisable;
    this.frmControlDatosBasicos['numeroDocumento'].disable();
    let oTerceroStorage = await JSON.parse(
      localStorage.getItem('datosTercero') as string
    );

    this._route.params.subscribe(
      async ({ tipoPersona, tipoDocumento, numeroDocumento, estadoCuenta }) => {
        this.obtenerNaturaleza();
        if (tipoDocumento) {
          this.sAccion = Terceros.ACCION_EDITAR;
          //desencripta los valores que llegan por url
          // const sTipoDocumentoEncrypt =
          //   this._utilsService.fnDesencryptar(tipoDocumento);
          // const sNumeroDocumentoEncrypt =
          //   this._utilsService.fnDesencryptar(numeroDocumento);
          const sTipoDocumentoEncrypt = tipoDocumento;
          const sNumeroDocumentoEncrypt = numeroDocumento;
          this.frmControlDatosBasicos['tipoDocumento'].disable();
          this.frmControlDatosBasicos['numeroDocumento'].disable();
          if (tipoDocumento != TIPOS_DOCUMENTO.NIT) {
            this.frmControlDatosBasicos['tipoNaturaleza'].disable();
          }

          let oTercero: any = {
            tipoDocumento: sTipoDocumentoEncrypt,
            numeroDocumento: sNumeroDocumentoEncrypt,
            tipoPersona: tipoPersona,
            estadoRegistro: 'REG',
          };
          this.oTerceroNavegacion = oTercero;

          this.bContinuarProceso = false;
          estadoCuenta === Terceros.SI ? this.cargarMensajeCuenta() : '';
          await this.obtenerInformacionBasica(oTercero);
          if (this.sTipoTercero === Terceros.NATURAL) {
            await this.obtenerBonos();
          }
        }

        if (oTerceroStorage != null) {
          await this.obtenerInformacionBasica(oTerceroStorage);
        }
        //mapea variables para el tipo de tercero
        this.sTipoTercero = tipoPersona!;

        this.frmControlDatosBasicos['tipoPersona'].setValue(this.sTipoTercero);
        this.bTipoNatural = tipoPersona === Terceros.NATURAL ? true : false;
        this.bTipoJuridico = tipoPersona === Terceros.JURIDICA ? true : false;

        if (this.sTipoTercero === Terceros.NATURAL) {
          await this.validacionNombres();
        }

        //habilita o no la seccion de participantes dependiendo de los datos del tercero
        let nTipoTerceroJuridico: any = this.oTercero;
        if (this.sAccion === Terceros.EDITAR) {
          this.nTipoJuridico =
            nTipoTerceroJuridico.tipoTerceroJuridico === undefined ? 1 : 0;
        }
      }
    );
  }

  cargarMensajeCuenta() {
    this._utilsService.fnMostrarMensaje({
      severity: ADM.ACCIONES_TOAST.toastTipo.creado,
      summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
      detail:
        'Se han creado con exito las cuentas bancarias del tercero jurídico',
    });
  }
  ngOnDestroy(): void {
    if (this.accion$) this.accion$.unsubscribe();
    if (this.estadoCoincidenciaExtranjera$)
      this.estadoCoincidenciaExtranjera$.unsubscribe();
  }
  get frmControlDatosBasicos(): FormGroup['controls'] {
    return this.frmDatosBasicos.controls;
  }

  listaErroresMensajes(nombreCampo: string): string {
    const errors = this.frmControlDatosBasicos[nombreCampo]?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['maxlength'] && nombreCampo === 'razonSocial')
      return 'Debe ser máximo de ' + Terceros.VALOR_MAX_CARECTERES_RAZON;
    if (errors?.['maxlength'] && nombreCampo === 'numeroDocumento')
      return 'Debe ser máximo de ' + Terceros.VALOR_MAX_NIT;
    if (errors?.['max'] && nombreCampo === 'numeroDocumento')
      return 'Valor máximo a ingresar es ' + Terceros.VALOR_MAX_NIT_EXTRANJETO;
    if (errors?.['min'] && nombreCampo === 'numeroDocumento')
      return 'Valor mínimo a ingresar es ' + Terceros.VALOR_MIN_NIT_EXTRANJETO;
    if (errors?.['pattern'] && nombreCampo === 'razonSocial')
      return 'No se permiten espacios ni caracteres especiales.';
    if (errors?.['pattern'] && nombreCampo === 'numeroDocumento')
      return 'Solo se permiten numeros.';

    return '';
  }

  /**
   * @description permite inyectar validaciones al numero de documento dependiendo el tipo seleccionado
   */
  public validacionLongitudTipos() {
    const sTipoDocumento = this.frmControlDatosBasicos['tipoDocumento'].value;
    const sHabilitarRazonSocial =
      this.frmControlDatosBasicos['razonSocial'].enable();
    this.frmControlDatosBasicos['numeroDocumento'].enable();

    switch (sTipoDocumento != '') {
      case sTipoDocumento === TIPOS_DOCUMENTO.SIN_IDENTIFICACION:
        sHabilitarRazonSocial;
        this.nLongitudTipoDocumento = 9;
        this.bMostrarInputNumber = true;
        this.bMostrarInputText = false;
        let sDigito;
        let nNumeroExtranjero = this.generarNumeroDocumentoExtrangero();

        sDigito = Number(
          this._utilsService.calcularDigitoVerificacion(nNumeroExtranjero)
        );
        this.frmControlDatosBasicos['razonSocial'].setValidators(
          this.oRazonSocial
        );
        this.frmControlDatosBasicos['numeroDocumento'].setValue(sDigito + 1);

        this.frmControlDatosBasicos['numeroDocumento'].setValue(
          nNumeroExtranjero
        );
        this.frmControlDatosBasicos['numeroDocumento'].setValidators(
          this.oValidacionNitExtranjero
        );
        break;

      case sTipoDocumento === TIPOS_DOCUMENTO.NIT:
        this.nLongitudTipoDocumento = 9;
        this.bMostrarInputNumber = true;
        this.bMostrarInputText = false;
        this.frmControlDatosBasicos['razonSocial'].setValidators(
          this.oRazonSocial
        );
        this.frmControlDatosBasicos['numeroDocumento'].setValidators(
          this.oValidacionNit
        );
        break;

      case sTipoDocumento === TIPOS_DOCUMENTO.CED_CIUDADANIA ||
        sTipoDocumento === TIPOS_DOCUMENTO.CED_EXTRANJERIA:
        this.nLongitudTipoDocumento = 15;
        this.bMostrarInputNumber = true;
        this.bMostrarInputText = false;

        this.frmControlDatosBasicos['numeroDocumento'].setValidators(
          this.oValidacionNumerico
        );
        break;

      case sTipoDocumento === TIPOS_DOCUMENTO.TAR_IDENTIDAD:
        this.nLongitudTipoDocumento = 25;
        this.bMostrarInputNumber = true;
        this.bMostrarInputText = false;
        this.frmControlDatosBasicos['numeroDocumento'].setValidators(
          this.oValidacionNumerico
        );
        break;

      case sTipoDocumento === TIPOS_DOCUMENTO.PASAPORTE ||
        sTipoDocumento === TIPOS_DOCUMENTO.REG_CIVIL ||
        sTipoDocumento === TIPOS_DOCUMENTO.TAR_EXTRANJERIA ||
        sTipoDocumento === TIPOS_DOCUMENTO.DOC_EXTRANJERO:
        this.nLongitudTipoDocumento = 25;
        this.bMostrarInputNumber = false;
        this.bMostrarInputText = true;
        this.frmControlDatosBasicos['numeroDocumento'].setValidators(
          this.oValidacionAlfanumerico
        );
        this.frmControlDatosBasicos['razonSocial'].setValidators(
          this.oRazonSocial
        );
        break;

      default:
        break;
    }
  }

  async validacionNombres(): Promise<void> {
    this.frmControlDatosBasicos['primerNombre'].setValidators(
      this.oValidacionPriNombreApellido
    );
    this.frmControlDatosBasicos['segundoNombre'].setValidators(
      this.oValidacionSegNombreApellido
    );
    this.frmControlDatosBasicos['primerApellido'].setValidators(
      this.oValidacionPriNombreApellido
    );
    this.frmControlDatosBasicos['segundoApellido'].setValidators(
      this.oValidacionSegNombreApellido
    );
  }

  /**
   *@description Validación de campos
   * @param campo
   * @returns
   */
  campoNoValido(campo: string) {
    return (
      this.frmControlDatosBasicos[campo]?.invalid &&
      this.frmControlDatosBasicos[campo]?.touched
    );
  }

  /**
   * @description permite abrir el modal de coincidencia juridico extranjero
   * @param oData lista de coincidencia que se envia al modal
   */
  public modalCoincidendiaJuridicoExtranjero(oData: IDatosBasicos) {
    this.dialogService.open(ModalCoincidenciaExtranjeroComponent, {
      header: 'CREAR TERCERO EXTRANJERO COINCIDENTE',
      width: '70%',
      data: {
        valores: oData,
      },
    });
  }

  /**
   * @description permite abrir el modal de mensajes de las validaciones que aún no se cumplen
   * @param oData lista de coincidencia que se envia al modal
   */
  public modalValidacionMensajes() {
    this.dialogService.open(ModalValidacionErroresComponent, {
      header: 'Validaciones',
      width: '70%',
      data: {
        valores: this.oListaMensajesValidacion,
      },
    });
  }

  /**
   * @description permite obtener los terceros mediante parabetros de busqueda
   */
  public async obtenerListaTercerosCoinciddencia(
    sTipoDocumento: string,
    sNumeroDocumento: string
  ): Promise<string> {
    let oRespuesta;
    let sValidación!: string;
    let oData = {
      numeroDocumento: sNumeroDocumento,
      estadoRegistro: 'REG',
    };
    oRespuesta = await this._tercerosServiceState.obtenerTercerosIdentificacion(
      oData
    );

    if (oRespuesta.data.length > 0) {
      oRespuesta.data.some((valor: any) => {
        if (valor.numeroDocumento === sNumeroDocumento) {
          sValidación =
            valor.tipoDocumento != sTipoDocumento ? 'numeroTipo' : 'numero';
        }
      });
    }

    return sValidación;
  }

  /**
   * @description Metodo que permite obtener los datos de la dian
   */
  public async obtenerPersonaJuridicaDian(): Promise<void> {
    let oRespuesta;
    let oTipoJuridico = {
      DigitoVerificacion: this.sDitoVerificacion,
      NumeroDocumento: this.frmControlDatosBasicos['numeroDocumento']?.value,
    };
    oRespuesta = await this._apiTransversalState.obtenerPersonaJuridica(
      oTipoJuridico
    );

    this.bEstadoFuenteDian = true;

    if (this.bEstadoFuenteDian) {
      this.bValidacionDian = oRespuesta.data.respuestaDian.estado;

      if (this.bValidacionDian) {
        this.oDatosDian = oRespuesta.data;
        this.oListaMensajesValidacion =
          oRespuesta.data.respuestaDian.data.mensajesValidacion;
        if (this.oListaMensajesValidacion.length > 0) {
          this.bContinuarProceso = true;
          this.bRazonSocial = true;
          this.fnLanzarToastPersonalizado();
        }
        //se limpia todo aquello que exista en el local strage referente a 'datosDian'
        localStorage.removeItem('datosDian');
        //se mapea en el local storage los datos retornados por la dian
        localStorage.setItem('datosDian', JSON.stringify(this.oDatosDian));
      } else {
        if (this.bTipoJuridico) {
          this._utilsService.fnMostrarMensaje({
            severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
            summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
            detail: 'El tercero no se encuentra registrado en la DIAN',
          });
        }

        this.bContinuarProceso = true;
      }
    } else {
      this.frmControlDatosBasicos['razonSocial'].enable();
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: oRespuesta.mensaje,
      });
    }
  }

  get fnContinuarProceso() {
    let bActivar: boolean = true;
    if (this.sAccion === Terceros.ACCION_CREAR) {
      if (!this.frmDatosBasicos.invalid) {
        if (!this.bContinuarProceso && this.bEstadoFuenteBonos) {
          bActivar = false;
        } else if (!this.bValidacionDian) {
          bActivar = false;
        } else {
          bActivar = true;
        }
      }
    } else {
      bActivar = false;
    }

    return bActivar;
  }

  /**
   * @description permite consultar y obtener informacion del servicio de bonos mediante parametros
   */
  public async obtenerBonos(): Promise<void> {
    let oRespuesta;
    let oDatosBasicosFormulario =
      this.sAccion === Terceros.ACCION_EDITAR
        ? this.oTercero
        : this.frmDatosBasicos.value;
    let oDatosConsulta = {
      ...oDatosBasicosFormulario,
      validacionCoincidencia: true,
    };
    oRespuesta = await this._apiTransversalState.obtenerPersona(oDatosConsulta);

    if (oRespuesta.data == null && oRespuesta.estado == true) {
      this.bEstadoFuenteBonos = false;
    } else {
      this.bEstadoFuenteBonos = true;
    }
    if (this.bEstadoFuenteBonos) {
      this.oEstadoPersonaBonos =
        oRespuesta.data.estadoDocumento === '00' ||
        oRespuesta.data.estadoDocumento === '01'
          ? true
          : false;
      if (this.oEstadoPersonaBonos) {
        this.bValidacionBonos = true;
        this.bContinuarProceso = false;
        this.frmControlDatosBasicos['estadoDocumento'].setValue(
          this.oEstadoPersonaBonos
        );
      } else {
        this.bContinuarProceso = true;
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail:
            'El estado del documento del tercero no se encuentra vigente.',
        });
      }
    } else {
      this.bContinuarProceso = true;
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: oRespuesta.mensaje,
      });
    }
  }

  /**
   * @description Metodo que permite activar y limpiar la seccion participantes dependiendo la accion del mismo
   * si no se selecciona ningun tipo se lispia los valores seleccionados en participantes
   * @param sTipo valor que se selecciona
   */
  public activarParticipante(sTipo: string) {
    const oFormulario = this.frmDatosBasicos.value;

    if (oFormulario.tipoTerceroJuridicoCONS && sTipo === Terceros.CONSORCIO) {
      this.datosCheckConsorcio();
    } else if (
      oFormulario.tipoTerceroJuridicoUNIO &&
      sTipo === Terceros.UNION_TEMPORAL
    ) {
      this.datosCheckUnion();
    } else {
      if (sTipo === Terceros.CONSORCIO) {
        this.datosCheckConsorcio();
      } else if (sTipo === Terceros.UNION_TEMPORAL) {
        this.datosCheckUnion();
      }
      this._confirmationService.confirm({
        ...ADM.ACCIONES_CONFIRM.deleteParticipantes,
        ...ADM.ACCIONES_CONFIRM.buttons_class,
        accept: () => {
          this.oListaParticipantes = [];
          this.bParticipantes = true;
          this.sTipoTerceroJuridico = null;
          this.nTipoJuridico = 1;
          this.frmDatosBasicos.patchValue({
            tipoTerceroJuridicoCONS: false,
            tipoTerceroJuridicoUNIO: false,
          });
        },
      });
    }
  }

  /**
   * @description Metodo que permite setear los valores del check de consorcio
   */
  public datosCheckConsorcio() {
    this.bParticipantes = false;
    this.sTipoTerceroJuridico = Terceros.CONSORCIO;
    this.nTipoJuridico = 0;
    this.frmDatosBasicos.patchValue({
      tipoTerceroJuridicoCONS: true,
      tipoTerceroJuridicoUNIO: false,
    });
  }

  /**
   * @description Metodo que permite setear los valores del check de union temporal
   */
  public datosCheckUnion() {
    this.bParticipantes = false;
    this.sTipoTerceroJuridico = Terceros.UNION_TEMPORAL;
    this.nTipoJuridico = 0;
    this.frmDatosBasicos.patchValue({
      tipoTerceroJuridicoCONS: false,
      tipoTerceroJuridicoUNIO: true,
    });
  }

  /**
   * @description permite validar si el tipo de documento es de tipo "Sin identificación del exterior o uso definido por la DIAN"
   * para generar el numero de documento y si hay coincidencia abrir el modal de coincidencias extranjeras
   */
  public async fnValidarSinIdentificacion(): Promise<void> {
    let oRespuesta;
    let sRazonSocial = this.frmControlDatosBasicos['razonSocial'].value;
    const sTipoDocumento = this.frmControlDatosBasicos['tipoDocumento'].value;

    if (
      sTipoDocumento === TIPOS_DOCUMENTO.SIN_IDENTIFICACION &&
      sRazonSocial != ''
    ) {
      const datos = {
        tipoPersona: this.sTipoTercero,
        tipoDocumento: sTipoDocumento,
        razonSocial: sRazonSocial,
      };
      oRespuesta =
        await this._tercerosServiceState.obtenerTercerosIdentificacion(datos);

      if (oRespuesta.data.length > 0) {
        this.modalCoincidendiaJuridicoExtranjero(oRespuesta.data);
      }

      this.estadoCoincidenciaExtranjera$ =
        this._tercerosServiceState.estadoCoincidenciaExtranjera.subscribe(
          (estado: boolean) => {
            //limpia el formulario de datos basicos
            if (!estado) {
              this.frmDatosBasicos.reset({
                tipoNaturaleza: null,
                tipoDocumento: '',
                numeroDocumento: '',
                razonSocial: '',
                tipoPersona: this.sTipoTercero,
                activo: true,
              });
              this.oListaParticipantes = [];
              this.nTipoJuridico = 1;
              this.bParticipantes = true;
              this.bContinuarProceso = true;
              this.frmControlDatosBasicos['numeroDocumento'].disable();
            } else {
              this.bContinuarProceso = false;
            }
          }
        );
    }
  }

  /**
   * @description permite generar un numero aleatorio para el tipo de documento "Sin identificación del exterior o uso definido por la DIAN"
   * @returns numero generado
   */
  generarNumeroDocumentoExtrangero(): string {
    const sNmeroMaximo = Terceros.VALOR_MAX_NIT_EXTRANJETO;
    const sNmeroMinimo = Terceros.VALOR_MIN_NIT_EXTRANJETO;
    let nResultado =
      Math.floor(Math.random() * (sNmeroMaximo - sNmeroMinimo)) + sNmeroMinimo;

    return String(nResultado);
  }

  /**
   * @description permite validar los nombres si el tipo persona es natural
   */
  public async validarNombres(): Promise<void> {
    this.oListaMensajesValidacion = [];
    const sNumeroDocumento = this.frmControlDatosBasicos['tipoDocumento'].value;
    if (
      this.frmDatosBasicos.value.primerNombre != '' &&
      this.frmDatosBasicos.value.primerApellido != '' &&
      this.bContinuarProcesoNatual == true
    ) {
      if (
        sNumeroDocumento === TIPOS_DOCUMENTO.CED_CIUDADANIA ||
        sNumeroDocumento === TIPOS_DOCUMENTO.CED_EXTRANJERIA
      ) {
        await this.obtenerBonos();
        if (
          this.bEstadoFuenteBonos &&
          sNumeroDocumento === TIPOS_DOCUMENTO.CED_CIUDADANIA
        ) {
          await this.obtenerPersonaJuridicaDian();
        } else {
          this.bContinuarProceso = false;
        }
      } else {
        this.bContinuarProceso = false;
      }
    }
  }

  /**
   * @description permite limpiar el numero del documento al cambio del tipo
   */
  limpiarNumero() {
    this.frmControlDatosBasicos['numeroDocumento'].setValue('');
    this.oListaMensajesValidacion = [];
    this.validacionLongitudTipos();
  }

  /**
   * @description Metodo que permite validar la existencia del numero y tipo de identificacion y a su vez calcular el digito de
   *  verificación para persona natural y juridica
   */
  public async validarTipoYnumeroIdentificacion(): Promise<void> {
    this.bContinuarProceso = true;
    let sValidarTercero;
    let sDigitoJuridica = '';
    let sDigitoNatural = '';
    this.frmControlDatosBasicos['razonSocial'].setValue('');
    this.frmControlDatosBasicos['razonSocial'].enable();
    const sTipoDocumento = this.frmControlDatosBasicos['tipoDocumento'].value;
    const sNumeroDocumento = String(
      this.frmControlDatosBasicos['numeroDocumento'].value
    );

    if (sTipoDocumento === TIPOS_DOCUMENTO.DOC_EXTRANJERO) {
      this.bContinuarProceso = true;
    }
    if (sTipoDocumento != '' && sNumeroDocumento != '') {
      sValidarTercero = await this.obtenerListaTercerosCoinciddencia(
        sTipoDocumento,
        sNumeroDocumento
      );

      //mapea los input en vacio al cambio de tipo de documento
      if (this.sTipoTercero === Terceros.NATURAL) {
        this.frmControlDatosBasicos['primerNombre'].setValue('');
        this.frmControlDatosBasicos['segundoNombre'].setValue('');
        this.frmControlDatosBasicos['primerApellido'].setValue('');
        this.frmControlDatosBasicos['segundoApellido'].setValue('');
        this.bContinuarProceso = true;
      }

      this.sDitoVerificacion = Number(
        await this._utilsService.calcularDigitoVerificacion(sNumeroDocumento)
      );

      this.sTipoTercero === Terceros.JURIDICA
        ? (sDigitoJuridica = String(this.sDitoVerificacion))
        : (sDigitoNatural = String(this.sDitoVerificacion));

      this.frmDatosBasicos.patchValue({
        digitoVerificacion: sDigitoJuridica,
        digitoVerificacionPersona: sDigitoNatural,
      });

      //validacion cuando ya se encuentra un tercero natural o juridico con el mismo numero y tipo
      if (sValidarTercero === 'numero') {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail: MENSAJE.EXISTE_TERCERO,
        });
        this.frmControlDatosBasicos['numeroDocumento'].setValue('');
        this.bContinuarProceso = true;
        //validacion cuando ya se encuentra un tercero juridico con el mismo numero pero con diferente tipo
      } else if (sValidarTercero === 'numeroTipo' && this.bTipoJuridico) {
        this._confirmationService.confirm({
          ...ADM.ACCIONES_CONFIRM.validacionNumeroYtipoDocumentoJuridico,
          ...ADM.ACCIONES_CONFIRM.buttons_class,
          accept: async () => {
            if (this.bTipoJuridico) {
              this.bContinuarProceso = true;
              await this.obtenerPersonaJuridicaDian();
            }
          },
        });
        //validación cuando ya se encuentra un tercero natural con el mismo numero pero con diferente tipo
      } else if (sValidarTercero === 'numeroTipo') {
        if (this.bTipoNatural) {
          let numero = this.frmControlDatosBasicos['numeroDocumento'].value;
          let tipo = this.frmControlDatosBasicos['tipoDocumento'].value;
          this._confirmationService.confirm({
            ...ADM.ACCIONES_CONFIRM.validacionNumeroNatural,
            ...ADM.ACCIONES_CONFIRM.buttons_class,
            accept: async () => {
              if (this.bTipoNatural) {
                this.frmControlDatosBasicos['numeroDocumento'].setValue(numero);
                this.frmControlDatosBasicos['tipoDocumento'].setValue(tipo);
                this.bContinuarProcesoNatual = true;
              }
            },
          });
          this.frmControlDatosBasicos['numeroDocumento'].setValue('');
          this.frmControlDatosBasicos['tipoDocumento'].setValue('');
          this.bContinuarProceso = true;
          this.bContinuarProcesoNatual = false;
        }
      } else {
        this.bContinuarProcesoNatual = true;
        // condicionales para validar el tipo de tercero y consumir el servicio de la dian o bonos
        if (
          this.bTipoJuridico &&
          sTipoDocumento === TIPOS_DOCUMENTO.NIT &&
          sNumeroDocumento != '0' &&
          this.sDitoVerificacion != 0
        ) {
          await this.fnValidacionesDian();
        }
      }
    }
  }

  /**
   * @description permite obtener el servicio de la dian y validar si fue exitosa para mapear dotos de la misma
   */
  public async fnValidacionesDian(): Promise<void> {
    await this.obtenerPersonaJuridicaDian();
    if (this.bEstadoFuenteDian) {
      if (this.bValidacionDian && this.oListaMensajesValidacion.length == 0) {
        let oDatosDian: any = this.oDatosDian;
        this.bContinuarProceso = false;
        this.bValidacionExitosaDian = true;
        if ((this.sTipoTercero = Terceros.JURIDICA)) {
          this.frmControlDatosBasicos['razonSocial'].disable();
          this.frmControlDatosBasicos['razonSocial'].setValue(
            oDatosDian.respuestaDian.data.terceroJuridicoEntidad.razonSocial
          );
        }
        this.frmControlDatosBasicos['nitPersona'].setValue(
          oDatosDian.respuestaDian.data.terceroJuridicoEntidad.numeroDocumento
        );
      }
    } else {
      this.bContinuarProceso = true;
    }
  }

  /**
   * @description permite obtener a un tercero por parametros de consulta
   * @param oDatosConsulta parametros de sonculta
   * @returns un object con los datos
   */
  async consultarTercero(oDatosConsulta: any): Promise<any> {
    let oRespuesta = (
      await this._tercerosServiceState.obtenerTercerosIdentificacion(
        oDatosConsulta
      )
    ).data[0];
    return oRespuesta;
  }

  /**
   * @description Metodo que permite consultar la información basica y a su vez setear los valores de participantes
   * @param oTercero parametros a consultar
   */
  public async obtenerInformacionBasica(
    oTercero: IDatosBasicos
  ): Promise<void> {
    let oRespuesta = await this.consultarTercero(oTercero);
    this.bContinuarProceso = true;
    this.oTercero = oRespuesta;

    this.frmDatosBasicos.patchValue({
      ...oRespuesta,
      tipoPersona: this.sTipoTercero,
    });

    this.frmControlDatosBasicos['numeroDocumento'].setValue(
      oRespuesta.numeroDocumento
    );

    oRespuesta.tipoDocumento === TIPOS_DOCUMENTO.NIT && Terceros.ACCION_EDITAR
      ? this.frmControlDatosBasicos['razonSocial'].disable()
      : this.frmControlDatosBasicos['razonSocial'].enable();

    this.bParticipantes = oRespuesta.tipoTerceroJuridico != '' ? true : false;

    this.oListaParticipantes =
      oRespuesta.participantesColaboracionEmpresarialPersonas;
    //Mapea el tipo de tercero juridico dependiento lo que retorne el servicio
    // if (this.oListaParticipantes!.length > 0) {
    if (oRespuesta.tipoTerceroJuridico === Terceros.CONSORCIO) {
      this.datosCheckConsorcio();
    } else if (oRespuesta.tipoTerceroJuridico === Terceros.UNION_TEMPORAL) {
      this.datosCheckUnion();
    } else {
      this.frmDatosBasicos.patchValue({
        tipoTerceroJuridicoCONS: false,
        tipoTerceroJuridicoUNIO: true,
      });
    }
    // }
  }

  /**
   * @description Metodo que permite obtener los tipos de documentos para una persona natural o juridica
   */
  public async consultarListaTipoDocumentoNatJuri(): Promise<void> {
    this.bContinuarProceso = true;
    let sTipoPersonaValue;
    let sTipoNaturalezaValue;
    if (this.sAccion === Terceros.ACCION_CREAR) {
      this.frmControlDatosBasicos['digitoVerificacion'].setValue('');
      this.frmControlDatosBasicos['numeroDocumento'].setValue('');
      this.frmControlDatosBasicos['razonSocial'].setValue('');
    }
    let sTipoNaturaleza = this.frmControlDatosBasicos['tipoNaturaleza']?.value;
    let oTercero: any = this.oTercero;

    sTipoNaturalezaValue =
      this.sAccion === Terceros.ACCION_CREAR
        ? sTipoNaturaleza
        : oTercero.tipoNaturaleza;
    sTipoPersonaValue =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.sTipoTercero
        : oTercero.tipoPersona;

    let oTipo = {
      SiglaDominio: sTipoPersonaValue,
      segundaSigla: sTipoNaturalezaValue,
    };
    this.oListaTipDocumento = (
      await this._listaSeleccionState.consultarListaTipoDocumentoNatJuri(oTipo)
    ).data;
  }

  /**
   * @description Metodo que me permite obtener la naturaleza de una persona
   */
  public async obtenerNaturaleza(): Promise<void> {
    this.oListaNaturaleza = (
      await this._listaSeleccionState.consultarNaturaleza()
    ).data[0].valoresDominios;
  }

  /**
   * @description Metodo que permite navegar al siguiente steper
   */
  public async siguiente(sAccionGuardar?: boolean): Promise<void> {
    if (this.oListaMensajesValidacion.length == 0) {
      let oDatosNavegacion: any = this.oTerceroNavegacion;
      let oRespuesta;
      let oInformacionBasica = this.tercero();
      let oInformacionBasicaStorage = {
        ...this.tercero(),
        digitoVerificacionPersona: this.sDitoVerificacion,
      };

      if (this.sAccion === Terceros.ACCION_CREAR) {
        oRespuesta = await this.crearPersonaInformacionBasica(
          1,
          oInformacionBasica
        );

        let oTercero: any = {
          tipoDocumento: oRespuesta.data.tipoDocumento,
          numeroDocumento: oRespuesta.data.numeroDocumento,
          tipoPersona: oRespuesta.data.tipoPersona,
          anterior: false,
        };

        localStorage.setItem('datosTercero', JSON.stringify(oTercero));
        if (this.sTipoTercero === Terceros.NATURAL) {
          localStorage.setItem(
            'datosTerceroNatural',
            JSON.stringify(oInformacionBasicaStorage)
          );
        }
      } else {
        //edita la información y realiza el llamado de la fuente de la DIAN
        oRespuesta = await this.actualizarPersonaInformacionBasica(
          1,
          oInformacionBasica
        );
      }

      if (oRespuesta && !sAccionGuardar) {
        if (this.oTerceroNavegacion.length === 0) {
          this._router.navigate([
            'adm/persona/crear/step-informacion-tributaria',
            this.sTipoTercero,
          ]);
        } else {
          // const sTipoDocumentoEncrypt = this._utilsService.fnEncryptar(
          //   oDatosNavegacion.tipoDocumento
          // );
          // const sNumeroDocumentoEncrypt = this._utilsService.fnEncryptar(
          //   oDatosNavegacion.numeroDocumento
          // );
          const sTipoDocumentoEncrypt = oDatosNavegacion.tipoDocumento;
          const sNumeroDocumentoEncrypt = oDatosNavegacion.numeroDocumento;
          this._router.navigate([
            'adm/persona/editar/step-informacion-tributaria',
            this.sTipoTercero,
            sTipoDocumentoEncrypt,
            sNumeroDocumentoEncrypt,
          ]);
        }
      } else if (this.sAccion === Terceros.ACCION_EDITAR) {
        setTimeout(() => {
          if (this.sTipoTercero === Terceros.NATURAL) {
            this._router.navigateByUrl('adm/personaNatural;tipo=NATU');
          } else if (this.sTipoTercero === Terceros.JURIDICA) {
            this._router.navigateByUrl('adm/personaJuridica;tipo=JURI');
          }
        }, 3000);
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.creado,
          summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
          detail: oRespuesta.mensaje,
        });
      }
    } else {
      this.fnLanzarToastPersonalizado();
    }
  }

  /**
   * @description Metodo que crea el objeto de la informacion basica del tercero
   * @returns retorna el objeto creado
   */
  public tercero(): IDatosBasicos {
    let sFecha = convertirFecha(new Date());
    let oDatos = this.frmDatosBasicos.getRawValue();

    let oInformacionBasica = {
      ...oDatos,
      digitoVerificacionPersona: String(
        this.frmControlDatosBasicos['digitoVerificacionPersona']?.value
      ),
      tipoTerceroJuridico: this.sTipoTerceroJuridico,
      digitoVerificacion: String(
        this.frmControlDatosBasicos['digitoVerificacion']?.value
      ),
      fechaCreacion:
        this.sAccion === Terceros.ACCION_CREAR ? sFecha : oDatos?.fechaCreacion,
      fechaActualizacion:
        this.sAccion === Terceros.ACCION_EDITAR
          ? sFecha
          : oDatos?.fechaCreacion,
      numeroDocumento: String(
        this.frmControlDatosBasicos['numeroDocumento']?.value
      ),
      validacionDian: this.bValidacionDian,
      validacionExitosaDian: this.bValidacionExitosaDian,
      participantesColaboracionEmpresarialPersonas: this.oListaParticipantes,
      estadoRegistro: this.sAccion === Terceros.ACCION_CREAR ? 'TMP' : 'REG',
    };

    return oInformacionBasica;
  }

  /**
   * @description Metodo que permite crear la informacion basica del tercero y persistir los datos
   * @param idUsuario usuario que crea la informacion
   * @param oInformacionBasica datos que se envian
   * @returns respuesta del servicio
   */
  public async crearPersonaInformacionBasica(
    idUsuario: number,
    oInformacionBasica: any
  ): Promise<IRespuestaApi> {
    let oRespuesta =
      await this._tercerosServiceState.crearPersonaInformacionBasica(
        idUsuario,
        oInformacionBasica
      );
    return oRespuesta;
  }

  /**
   * @description Metodo que permite actualizar la informacion basica del tercero y persistir los datos
   * @param idUsuario usuario que actualiza la informacion
   * @param oInformacionBasica datos que se envian
   * @returns respuesta del servicio
   */
  public async actualizarPersonaInformacionBasica(
    idUsuario: number,
    oInformacionBasica: any
  ): Promise<IRespuestaApi> {
    let oRespuesta =
      await this._tercerosServiceState.actualizarPersonaInformacionBasica(
        idUsuario,
        oInformacionBasica
      );
    return oRespuesta;
  }

  /**
   *@description Metodo que permite al momento de cancelar redireccionar a la pantalla de busqueda de terceros
   */
  cancelar() {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        if (this.sTipoTercero === Terceros.NATURAL) {
          this._router.navigateByUrl('adm/personaNatural;tipo=NATU');
        } else if (this.sTipoTercero === Terceros.JURIDICA) {
          this._router.navigateByUrl('adm/personaJuridica;tipo=JURI');
        }
      },
    });
  }

  /**
   * @description permite redireccionar a los componentes de cuentas bancarias
   */
  public adicionarCuentasBancarias(): void {
    let oDatosNavegacion: any = this.oTerceroNavegacion;

    // const sTipoDocumentoEncrypt = this._utilsService.fnEncryptar(
    //   oDatosNavegacion.tipoDocumento
    // );
    // const sNumeroDocumentoEncrypt = this._utilsService.fnEncryptar(
    //   oDatosNavegacion.numeroDocumento
    // );
    const sTipoDocumentoEncrypt = oDatosNavegacion.tipoDocumento;
    const sNumeroDocumentoEncrypt = oDatosNavegacion.numeroDocumento;

    this._router.navigate([
      'adm/cuentas-bancarias',
      sTipoDocumentoEncrypt,
      sNumeroDocumentoEncrypt,
    ]);
  }

  fnCargarEvento() {
    this.modalValidacionMensajes();
  }

  fnLanzarToastPersonalizado() {
    this._messageService.addAll([
      {
        key: 'some',
        severity: 'error',
        life: 100000,
      },
    ]);
  }

  /*
  ----------SECCIÓN PARTICIPANTES----------
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

  fnEditarParticipantes(sAccion: string, oParticipante: any): void {
    this.bDisplayModal = true;
  }

  eliminarParticipante(ri: any) {}

  /**
   * @description Cerrar modal y resetear el formulario
   * @return {void} No retonar datos
   */
  fnCerrarModal(bMostrarMsg?: boolean): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this.bDisplayModal = false;
      },
    });
  }

  guardarDatosParticipantes() {}
}
