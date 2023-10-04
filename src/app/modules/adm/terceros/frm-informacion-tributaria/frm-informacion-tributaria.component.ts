import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ADM } from 'src/app/core/constant/adm.constants';
import {
  TIPOS_DOCUMENTO,
  Terceros,
} from 'src/app/core/constant/adm/terceros.constants';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import { convertirFecha } from 'src/app/core/shared/functions/funciones-generales';
import { IDatosNavegacion } from 'src/app/domain/interface/adm/terceros/datos-basicos.interface';
import {
  IActividadesEconomicas,
  IActividadesEconomicasCIIU,
  IResponsabilidadTributaria,
} from 'src/app/domain/interface/adm/terceros/informacion-tributaria.interface';
import { ApiTransversalStateService } from 'src/app/domain/service/adm/apiTransversal/api-transversal-state.service';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { TerceroStateService } from 'src/app/domain/service/adm/terceros/tercero-state.service';

@Component({
  selector: 'app-frm-informacion-tributaria',
  templateUrl: './frm-informacion-tributaria.component.html',
  styleUrls: ['./frm-informacion-tributaria.component.scss'],
})
export class FrmInformacionTributariaComponent implements OnInit {
  public oInformacionTributaria: IResponsabilidadTributaria[] = [];
  public oActEconomica: IActividadesEconomicasCIIU[] | undefined = [];
  public oResTributaria: IResponsabilidadTributaria[] | undefined = [];
  public oListaActividad: IActividadesEconomicas[] = [];
  public oListaResponsabilidad = [];
  public bMostrarLoading: boolean = false;
  public bValidacionExitosaDian: boolean = false;
  public bActualizarTributaria!: boolean;
  public sFechaActualizacion!: string;
  public bActivarAccionActividad!: boolean;
  public bActivarAccionResponsabilidad!: boolean;
  public bAccionesTabla!: boolean;
  public bAccionesActividad!: boolean;
  public bAccionesResponsabilidad!: boolean;
  public bActualizarDatosDian!: boolean;
  public sMensajeFuenteDian: string = 'Activa';
  public sTipoDocumento!: string;

  public bTipoJuridico: boolean = false;
  public bTipoNatural: boolean = false;
  public sTipoTercero: string = '';
  public sAccion: string = Terceros.ACCION_CREAR;
  public oTerceroNavegacion: IDatosNavegacion[] = [];
  public oTerceroStorage: IDatosNavegacion[] = [];
  public oDianStorage: any[] = [];

  frmInformacionTributaria: FormGroup = this._formBuilder.group({
    numeroDocumento: '',
    digitoVerificacionPersona: '',
    validacionExitosaDian: null,
  });

  frmResponsabilidad: FormGroup = this._formBuilder.group({
    responsabilidad: '',
  });

  frmActividad: FormGroup = this._formBuilder.group({
    actividad: '',
  });

  constructor(
    private _utilsService: UtilsService,
    private _formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _tercerosServiceState: TerceroStateService,
    private _listaSeleccionState: ListaSeccionStateService,
    private _apiTransversalState: ApiTransversalStateService
  ) {}

  get frmControlRespondabilidad(): FormGroup['controls'] {
    return this.frmResponsabilidad.controls;
  }

  get frmControlformacionTributaria(): FormGroup['controls'] {
    return this.frmInformacionTributaria.controls;
  }

  get frmControlActividad(): FormGroup['controls'] {
    return this.frmActividad.controls;
  }

  /**
   * @description permite mostrar los mensajes de errores sobre el formulario
   * @param nombreCampo nombre de campo a validar
   * @returns mensaje
   */
  listaErroresMensajes(nombreCampo: string): string {
    const errors = this.frmControlRespondabilidad[nombreCampo]?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['maxlength'] && nombreCampo === 'numeroDocumento')
      return 'Debe ser máximo de ' + 15;
    if (errors?.['pattern'] && nombreCampo === 'numeroDocumento')
      return 'Solo se permiten numeros.';

    return '';
  }

  /**
   *@description Validación de campos
   * @param campo
   * @returns
   */
  campoNoValido(campo: string) {
    return (
      this.frmControlRespondabilidad[campo]?.invalid &&
      this.frmControlRespondabilidad[campo]?.touched
    );
  }

  async ngOnInit(): Promise<void> {
    this.frmInformacionTributaria.get('validacionExitosaDian')?.disable();
    this.frmInformacionTributaria.get('digitoVerificacionPersona')?.disable();
    let sTipoDocumento = '';
    let oTerceroStorage = await JSON.parse(
      localStorage.getItem('datosTercero') as string
    );
    if (oTerceroStorage != null) {
      sTipoDocumento = oTerceroStorage.tipoDocumento;
    }
    this._route.params.subscribe(
      async ({ tipoPersona, tipoDocumento, numeroDocumento }) => {
        this.sTipoTercero = tipoPersona!;
        if (tipoDocumento) {
          sTipoDocumento = tipoDocumento!;
          this.sAccion = Terceros.ACCION_EDITAR;
          // const sTipoDocumentoEncrypt =
          //   this._utilsService.fnDesencryptar(tipoDocumento);
          // const sNumeroDocumentoEncrypt =
          //   await this._utilsService.fnDesencryptar(numeroDocumento);
          const sTipoDocumentoEncrypt = tipoDocumento;
          const sNumeroDocumentoEncrypt = numeroDocumento;

          const oTercero: any = {
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            tipoPersona: tipoPersona,
            estadoRegistro: 'REG',
          };

          this.oTerceroNavegacion = oTercero;
          await this.obtenerInformacionTributaria(this.oTerceroNavegacion);
        } else {
          await this.obtenerInformacionTributaria(oTerceroStorage);
          await this.obtenerActividadesEconomicasCiiu();
          await this.obtenerTiposResponsabilidadTributaria();
          this.oTerceroStorage = JSON.parse(
            localStorage.getItem('datosTercero') as string
          );
          this.oDianStorage = JSON.parse(
            localStorage.getItem('datosDian') as string
          );
          //valida el tipo del tercero
          if (this.sTipoTercero === Terceros.JURIDICA) {
            this.obtenenerDatosDian();
          } else if (this.sTipoTercero === Terceros.NATURAL) {
            if (sTipoDocumento === TIPOS_DOCUMENTO.CED_CIUDADANIA) {
              await this.validarTipoYnumeroIdentificacion(true);
            } else {
              this.desactivarControlesActividad(false);
              this.desactivarControlesResponsabilidad(false);
            }
          }
        }
        //permite obtener datos del local storage y mapear la data si el tercero se esta editando, es pernosa juridica y no tiene registrada informacion en BD
        if (
          this.sAccion === Terceros.ACCION_EDITAR &&
          this.sTipoTercero === Terceros.JURIDICA &&
          Object.entries(this.oInformacionTributaria).length == 0
        ) {
          this.oDianStorage = JSON.parse(
            localStorage.getItem('datosDian') as string
          );
          this.obtenenerDatosDian();
        }

        //mapea variables para el tipo de tercero
        this.bTipoNatural = tipoPersona === Terceros.NATURAL ? true : false;
        this.bTipoJuridico = tipoPersona === Terceros.JURIDICA ? true : false;
      }
    );
  }

  /**
   * @description permite validar dependiendo el numero de documento si el usuario ingresado en informacion basica
   * tiene coincidencias con el servicio de la DIAN
   */
  public async validarTipoYnumeroIdentificacion(
    sAccionInicio?: boolean
  ): Promise<void> {
    let oDatosTerceroNatural = JSON.parse(
      localStorage.getItem('datosTerceroNatural') as string
    );

    let oDatosTercero =
      this.sAccion === Terceros.ACCION_CREAR
        ? oDatosTerceroNatural
        : this.oTerceroNavegacion;
    let sDigitoVerificacion;
    let oRespuesta;
    let sDigito;
    let sNumeroDocumento = String(
      this.frmControlformacionTributaria['numeroDocumento'].value
    );

    if (oDatosTerceroNatural != null) {
      if (Object.entries(oDatosTerceroNatural).length > 0 && sAccionInicio) {
      }
      sDigito = this._utilsService.calcularDigitoVerificacion(sNumeroDocumento);
      sNumeroDocumento = oDatosTerceroNatural.numeroDocumento;
    } else {
      if (sNumeroDocumento != '') {
        //const numeroDocumento = String(sNumeroDocumento);
        sDigitoVerificacion =
          this._utilsService.calcularDigitoVerificacion(sNumeroDocumento);
        this.frmInformacionTributaria.patchValue({
          digitoVerificacionPersona: sDigitoVerificacion,
        });
      }

      sDigito =
        this.frmControlformacionTributaria['digitoVerificacionPersona']?.value;
      sNumeroDocumento =
        this.frmControlformacionTributaria['numeroDocumento']?.value;
    }

    //valida si es tipo de documento cedula de ciudadania
    if (oDatosTercero.tipoDocumento === TIPOS_DOCUMENTO.CED_CIUDADANIA) {
      //mapea los datos del tercero provenientes del local strage de la sección información basica
      let oTipoJuridico = {
        DigitoVerificacion: sDigito,
        NumeroDocumento: sNumeroDocumento,
        primerNombre: oDatosTercero.primerNombre,
        segundoNombre: oDatosTercero.segundoNombre,
        primerApellido: oDatosTercero.primerApellido,
        segundoApellido: oDatosTercero.segundoApellido,
        validaCoincidencia: true,
      };

      //elimina aquellas propiedades que esten vacias o nulas
      let oDatosEnviar = await this._utilsService.fnEliminarVaciosForm(
        oTipoJuridico
      );
      oRespuesta = await this._apiTransversalState.obtenerPersonaJuridica(
        oDatosEnviar
      );

      //valida si la fuente de la DIAN esta activa o no
      if (oRespuesta.estado) {
        if (oRespuesta.data.respuestaDian.estado) {
          this.oDianStorage = oRespuesta.data;
          //mapea nuevamente lo obtenido en la DIAN en el local storage
          localStorage.setItem('datosDian', JSON.stringify(oRespuesta.data));
          this.obtenenerDatosDian();
        } else {
          this._utilsService.fnMostrarMensaje({
            severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
            summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
            detail: oRespuesta.data.respuestaDian.mensaje,
          });
        }
        this.desactivarControlesActividad(true);
        this.desactivarControlesResponsabilidad(true);
      } else {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail: oRespuesta.mensaje,
        });
        this.desactivarControlesActividad(true);
        this.desactivarControlesResponsabilidad(true);
      }
    }
  }

  /**
   * @description permite mapear la información obtenida por la fuente de la DIAN
   */
  public obtenenerDatosDian(): void {
    let bEstado!: boolean;
    if (this.oDianStorage != null) {
      if (Object.entries(this.oDianStorage).length > 0) {
        bEstado = true;
        this.bAccionesActividad = false;
        this.bAccionesResponsabilidad = false;
        let oDatos: any = this.oTerceroStorage;
        let oDatosDian: any = this.oDianStorage;
        let oActividadEconomica =
          oDatosDian['respuestaDian'].data.terceroJuridicoEntidad
            .informacionTributaria.actividadEconomica;
        const sCampoActividad =
          this.frmControlActividad['actividad']?.disable();
        const sCampoResponsabilidad =
          this.frmControlRespondabilidad['responsabilidad']?.disable();
        console.log(this.sTipoTercero);

        //mapea la informacion de numero y digito si es una persona natural
        if (this.sTipoTercero === Terceros.NATURAL) {
          this.frmControlformacionTributaria['numeroDocumento']?.disable();
          this.frmInformacionTributaria.patchValue({
            numeroDocumento:
              oDatosDian.respuestaDian.data.terceroJuridicoEntidad
                .numeroDocumento,
            digitoVerificacionPersona:
              oDatosDian.respuestaDian.data.terceroJuridicoEntidad
                .digitoVerificacion,
          });
        }

        //mapea los datos de la dian en actividades economicas
        let oResponsabilidad =
          oDatosDian['respuestaDian'].data.terceroJuridicoEntidad
            .informacionTributaria.responsabilidadTributaria;
        if (this.oActEconomica?.length == 0) {
          let oDato = {
            activo: true,
            codigoActividadCiiu: oActividadEconomica.codigoActividadCiiu,
            descripcionActividadCiiu:
              oActividadEconomica.descripcionActividadCiiu,
            numeroDocumento: oDatos['numeroDocumento'],
            tipoDocumento: oDatos['tipoDocumento'],
          };
          this.oActEconomica?.push(oDato);
        }
        this.bActivarAccionActividad =
          this.oActEconomica!.length >= 1 ? true : false;
        sCampoActividad;

        //mapea los datos de la dian en responsabilidaddes tributarias
        if (this.oResTributaria!.length == 0) {
          oResponsabilidad.forEach((valor: any) => {
            let oDato = {
              activo: true,
              descripcionTipoResponsabilidadTributaria:
                valor.tipoResponsabilidadTributaria
                  .descripcionTipoResponsabilidadTributaria,
              tipoResponsabilidadTributaria:
                valor.tipoResponsabilidadTributaria
                  .tipoResponsabilidadTributaria,
              numeroDocumento: oDatos['numeroDocumento'],
              tipoDocumento: oDatos['tipoDocumento'],
            };
            this.oResTributaria?.push(oDato);
          });
        }

        //establece es estado del nit dependiendo si trae información
        this.bActivarAccionResponsabilidad =
          this.oResTributaria!.length >= 1 ? true : false;
        sCampoResponsabilidad;
      } else if (this.sTipoTercero === Terceros.NATURAL) {
        //validaciones para cuando el servicio de la dian no trae información y es persona natural
        this.desactivarControlesActividad(true);
        this.desactivarControlesResponsabilidad(true);
        this.frmControlformacionTributaria['numeroDocumento']?.enable();
        this.frmControlformacionTributaria['numeroDocumento']?.setValidators([
          Validators.required,
          Validators.maxLength(15),
        ]);
      } else {
        bEstado = false;
      }

      //mapea la información de la sección tributaria
      this.frmInformacionTributaria.patchValue({
        ...this.oInformacionTributaria,
        validacionExitosaDian: bEstado === true ? 'Activo' : 'Inactivo',
      });
    } else {
      this.desactivarControlesActividad(false);
      this.desactivarControlesResponsabilidad(false);
    }
  }

  /**
   * @description permite actualizar los datos de la dian
   */
  public async actualizarDatosDian(): Promise<void> {
    let oResuesta;
    let oDatosTercero: any = this.oTerceroNavegacion;
    if (this.sTipoTercero === Terceros.NATURAL) {
      let oTercero: any = this.oTerceroNavegacion;
      oDatosTercero = {
        tipoDocumento: oTercero.tipoDocumento,
        numeroDocumento:
          this.frmControlformacionTributaria['numeroDocumento'].value,
        tipoPersona: oTercero.tipoPersona,
        estadoRegistro: 'REG',
      };
      console.log(oDatosTercero);
    } else {
      oDatosTercero = this.oTerceroNavegacion;
    }
    console.log(oDatosTercero.numeroDocumento);

    let sDigito = await this._utilsService.calcularDigitoVerificacion(
      String(oDatosTercero.numeroDocumento)
    );
    let oDatosBusqueda = {
      DigitoVerificacion: sDigito,
      NumeroDocumento: oDatosTercero.numeroDocumento,
    };
    console.log(oDatosBusqueda);

    oResuesta = await this._apiTransversalState.obtenerPersonaJuridica(
      oDatosBusqueda
    );
    if (oResuesta.data.respuestaDian.estado) {
      this.oActEconomica = [];
      this.oResTributaria = [];
      this.bActualizarDatosDian = true;
      this.oTerceroStorage = oDatosTercero;
      this.oDianStorage = oResuesta.data;
      this.frmControlformacionTributaria['validacionExitosaDian'].setValue(
        'Activa'
      );
      await this.obtenenerDatosDian();
      localStorage.setItem('datosDian', JSON.stringify(this.oDianStorage));
    } else {
      this.oActEconomica = [];
      this.oResTributaria = [];
      this.sMensajeFuenteDian = 'Inactiva';
      this.frmControlformacionTributaria['validacionExitosaDian'].setValue(
        'Inactiva'
      );
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: oResuesta.data.respuestaDian.mensaje,
      });
    }
    this.frmControlformacionTributaria['digitoVerificacionPersona'].setValue(
      String(sDigito)
    );
  }

  /**
   * @description Metodo que permite navegar al siguiente steper
   */
  async siguiente(sAccionGuardar?: boolean): Promise<void> {
    let oDatosTributaria: any = this.oInformacionTributaria;
    let datos: any = this.oTerceroNavegacion;
    let oRespuesta;
    let oDatosTercero;
    let sFechaActualizacion =
      this.bActualizarDatosDian === true
        ? convertirFecha(new Date())
        : oDatosTributaria.fechaActualizacion;
    oDatosTercero =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;
    let oInformacionTributaria = {
      ...oDatosTercero,
      ...this.frmInformacionTributaria.value,
      digitoVerificacionPersona: String(
        this.frmControlformacionTributaria['digitoVerificacionPersona'].value
      ),
      actividadesEconomicas: this.oActEconomica,
      responsabilidadTributaria: this.oResTributaria,
      estadoRegistro: this.sAccion === Terceros.ACCION_CREAR ? 'TMP' : 'REG',
      fechaActualizacion: sFechaActualizacion,
      numeroDocumento: String(
        this.frmControlformacionTributaria['numeroDocumento'].value
      ),
    };

    if (this.sAccion === Terceros.ACCION_CREAR) {
      oRespuesta = await this.crearInformacionTributaria(
        1,
        oInformacionTributaria
      );
    } else {
      oRespuesta = await this.actualizarInformacionTributaria(
        1,
        oInformacionTributaria
      );
    }
    if (oRespuesta && !sAccionGuardar) {
      if (datos.length === 0) {
        this._router.navigate([
          'adm/persona/crear/step-informacion-ubicacion',
          this.sTipoTercero,
        ]);
      } else {
        // const sTipoDocumentoEncrypt = this._utilsService.fnEncryptar(
        //   datos.tipoDocumento
        // );
        // const sNumeroDocumentoEncrypt = this._utilsService.fnEncryptar(
        //   datos.numeroDocumento
        // );
        const sTipoDocumentoEncrypt = datos.tipoDocumento;
        const sNumeroDocumentoEncrypt = datos.numeroDocumento;
        this._router.navigate([
          'adm/persona/editar/step-informacion-ubicacion',
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
    console.log(oRespuesta);
  }

  /**
   * @description permite regresar al steper anterior
   */
  async anterior(): Promise<void> {
    let oDatosTercero: any;
    oDatosTercero =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;

    if (this.oTerceroNavegacion.length === 0) {
      this._router.navigate([
        'adm/persona/crear/step-informacion-basica',
        this.sTipoTercero,
      ]);
      let oDatosAnterior = {
        ...oDatosTercero,
        estadoRegistro: 'TMP',
      };
      localStorage.setItem('datosTercero', JSON.stringify(oDatosAnterior));
    } else {
      // const sTipoDocumentoEncrypt = this._utilsService.fnEncryptar(
      //   datos.tipoDocumento
      // );
      // const sNumeroDocumentoEncrypt = this._utilsService.fnEncryptar(
      //   datos.numeroDocumento
      // );
      const sTipoDocumentoEncrypt = oDatosTercero.tipoDocumento;
      const sNumeroDocumentoEncrypt = oDatosTercero.numeroDocumento;
      this._router.navigate([
        'adm/persona/editar/step-informacion-basica',
        this.sTipoTercero,
        sTipoDocumentoEncrypt,
        sNumeroDocumentoEncrypt,
        'no',
      ]);
    }
  }

  /**
   * @description Metodo que permite crear la informacion tributaria del tercero y persistir los datos
   * @param idUsuario usuario que crea la informacion tributaria
   * @param oInformacionBasica datos que se envian
   * @returns respuesta del servicio
   */
  public async crearInformacionTributaria(
    idUsuario: number,
    oInformacionTributaria: any
  ): Promise<IRespuestaApi> {
    let oRespuesta =
      await this._tercerosServiceState.crearInformacionTributaria(
        idUsuario,
        oInformacionTributaria
      );
    return oRespuesta;
  }

  /**
   * @description Metodo que permite actualizar la informacion tributaria del tercero y persistir los datos
   * @param idUsuario usuario que actualiza la informacion tributaria
   * @param oInformacionBasica datos que se envian
   * @returns respuesta del servicio
   */
  public async actualizarInformacionTributaria(
    idUsuario: number,
    oInformacionTributaria: any
  ): Promise<IRespuestaApi> {
    let oRespuesta =
      await this._tercerosServiceState.actualizarInformacionTributaria(
        idUsuario,
        oInformacionTributaria
      );
    return oRespuesta;
  }

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
   * @description permite obtener una lista de actividades economicas
   */
  public async obtenerActividadesEconomicasCiiu(): Promise<void> {
    this.oListaActividad = (
      await this._tercerosServiceState.obtenerActividadesEconomicasCiiu()
    ).data;
  }

  /**
   * @description perimite obtener la lista de responsabilidades
   */
  public async obtenerTiposResponsabilidadTributaria(): Promise<void> {
    this.oListaResponsabilidad = (
      await this._listaSeleccionState.consultarTipoResponsabilidadTributaria()
    ).data[0].valoresDominios;
  }

  /**
   * @description permite consultar la información tributaria de un tercero
   * @param oDatos parametros de consulta
   */
  public async obtenerInformacionTributaria(oDatos: any): Promise<void> {
    oDatos = {
      ...oDatos,
      //estadoRegistro: 'REG',
    };
    let oRespuesta: IRespuestaApi =
      await this._tercerosServiceState.obtenerInformacionTributaria(oDatos);
    if (oRespuesta.data.length > 0) {
      this.oInformacionTributaria = oRespuesta.data[0];
      this.oActEconomica = oRespuesta.data[0].actividadesEconomicas;
      this.oResTributaria = oRespuesta.data[0].responsabilidadTributaria;
      this.bValidacionExitosaDian = oRespuesta.data[0].validacionExitosaDian;
      this.bActualizarTributaria =
        this.sAccion === Terceros.ACCION_EDITAR &&
        (oRespuesta.data[0].tipoDocumento === TIPOS_DOCUMENTO.NIT ||
          oRespuesta.data[0].tipoDocumento === TIPOS_DOCUMENTO.CED_CIUDADANIA ||
          oRespuesta.data[0].tipoDocumento === TIPOS_DOCUMENTO.CED_EXTRANJERIA)
          ? true
          : false;
      this.sFechaActualizacion =
        oRespuesta.data[0].fechaActualizacion.split('T')[0];
      if (this.sTipoTercero === Terceros.NATURAL) {
        this.frmInformacionTributaria.patchValue({ ...oRespuesta.data[0] });
      }

      this.desactivarControlesActividad(true);
      this.desactivarControlesResponsabilidad(true);
    }
  }

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

  /**
   * @description permite activar o desactivar el boton e input de actividades economicas
   * @param estado parametro boleano para desactivar el estado
   */
  public desactivarControlesActividad(estado: boolean) {
    this.bAccionesActividad = estado == true ? false : true;
    this.bActivarAccionActividad = estado;
    estado == true
      ? this.frmControlActividad['actividad']?.disable()
      : this.frmControlActividad['actividad']?.enable();
  }

  /**
   * @description Metodo que permite agregar actividades economicas
   */
  public agregarActividad(): void {
    let oDatosTercero: any;
    oDatosTercero =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;
    let oActividad = this.frmActividad.value.actividad;

    let oDato = {
      activo: true,
      codigoActividadCiiu: oActividad.codigo,
      descripcionActividadCiiu: oActividad.descripcion,
      numeroDocumento: oDatosTercero.numeroDocumento,
      tipoDocumento: oDatosTercero.tipoDocumento,
    };
    this.oActEconomica!.push(oDato);
    this.frmActividad.reset({
      actividad: [],
    });
    if (this.oActEconomica!.length > 0) {
      this.desactivarControlesActividad(true);
    }
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

  /**
   * @description permite activar o desactivar el boton e input de responsabilidades tributarias
   * @param estado parametro boleano para desactivar el estado
   */
  public desactivarControlesResponsabilidad(estado: boolean) {
    this.bAccionesResponsabilidad = estado == true ? false : true;
    this.bActivarAccionResponsabilidad = estado;
    estado == true
      ? this.frmControlRespondabilidad['responsabilidad']?.disable()
      : this.frmControlRespondabilidad['responsabilidad']?.enable();
  }

  /**
   *@description Metodo que permite agregar responsabilidades tributarias
   */
  public agregarResponsabilidad(): void {
    let oDatosTercero: any;
    oDatosTercero =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;
    let oResponsabilidad = this.frmResponsabilidad.value.responsabilidad;

    let oDato = {
      activo: true,
      descripcionTipoResponsabilidadTributaria: oResponsabilidad.descripcion,
      tipoResponsabilidadTributaria: oResponsabilidad.sigla,
      numeroDocumento: oDatosTercero.numeroDocumento,
      tipoDocumento: oDatosTercero.tipoDocumento,
    };
    this.oResTributaria!.push(oDato);
    this.frmResponsabilidad.reset({
      responsabilidad: [],
    });
    if (this.oResTributaria!.length > 0) {
      this.desactivarControlesResponsabilidad(true);
    }
  }

  /**
   * @description permite eliminar una actividad economica de la lista
   * @param oActEconomica
   * @param nIndice actividad a elininar
   */
  eliminarActividad(oActEconomica: IActividadesEconomicas, nIndice: number) {
    this.oActEconomica!.splice(nIndice, 1);
    this.desactivarControlesActividad(false);
  }

  /**
   * @description permite eliminar una responsabilidad tributaria
   * @param oResTributaria
   * @param nIndice responsabilidad a eliminar
   */
  eliminarResponsabilidad(oResTributaria: any, nIndice: number) {
    this.oResTributaria!.splice(nIndice, 1);
    this.desactivarControlesResponsabilidad(false);
  }
}
