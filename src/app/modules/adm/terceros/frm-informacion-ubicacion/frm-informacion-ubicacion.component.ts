import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ADM } from 'src/app/core/constant/adm.constants';
import { Terceros } from 'src/app/core/constant/adm/terceros.constants';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import {
  NO_ESPECIALES,
  NO_WHITE_SPACES,
  SOLO_NUMEROS,
} from 'src/app/core/utils/Patterns';
import {
  IDatosNavegacion,
  IMediosContactos,
} from 'src/app/domain/interface/adm/terceros/datos-basicos.interface';
import {
  IUbicacion,
  IUbicacionesPersona,
} from 'src/app/domain/interface/adm/terceros/ubicacion.interface';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { TerceroStateService } from 'src/app/domain/service/adm/terceros/tercero-state.service';

@Component({
  selector: 'app-frm-informacion-ubicacion',
  templateUrl: './frm-informacion-ubicacion.component.html',
  styleUrls: ['./frm-informacion-ubicacion.component.scss'],
})
export class FrmInformacionUbicacionComponent implements OnInit {
  public oUbicacion: IUbicacion[] = [];
  public oCorreos: IMediosContactos[] | undefined = [];
  public oCorreoPrincipal: IMediosContactos[] | undefined = [];
  public oDirecciones: IUbicacionesPersona[] = [];
  public bMostrarLoading: boolean = false;
  public bDisplayModal: boolean = false;
  public bValidacionExitosaDian: boolean = false;
  public oListaTipoDireccion: any = [];
  public oListaPais = [];
  public oListaRegion = [];
  public oListaCiudad = [];
  public correos: string[] = [];
  public contacto: any[] = [];
  public aTelefonos: string[] = [];
  public oTelefonos: any[] = [];
  public oTerceroStorage: IDatosNavegacion[] = [];
  public sTextoTipoDocumento!: string;
  public sTextoNumeroDocumento!: string;
  public sTextoTipoPersona!: string;
  public nIndice: number = 0;
  public oPaisCiudadRegion: any[] = [];
  public bRequiereDatosAdministrativos!: boolean;
  public bDireccionFisisa: boolean = true;
  public nLongitudMaximaCodigo!: number;
  public nLongitudMinimaCodigo!: number;
  public bAgregarDireccion!: boolean;

  public sTipoTercero: string = '';
  public sAccion: string = Terceros.ACCION_CREAR;
  public sTextoAgregarDireccion: string = Terceros.TEXTO_AGREGAR;
  public oTerceroNavegacion: any[] = [];
  public oDianStorage: any[] = [];

  frmUbicacion: FormGroup = this._formBuilder.group({
    emailPrincipal: '',
    nombreContacto: [
      '',
      [Validators.pattern(NO_WHITE_SPACES), Validators.pattern(NO_ESPECIALES)],
    ],
    designacionContacto: [
      '',
      [Validators.pattern(NO_WHITE_SPACES), Validators.pattern(NO_ESPECIALES)],
    ],
    email: ['', [this._utilsService.emailValidator]],
  });

  frmDireccion: FormGroup = this._formBuilder.group({
    indice: null,
    id: 0,
    tipoDireccion: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    idCiudad: [0, [Validators.required]],
    id_Pais: [0, [Validators.required]],
    id_Region: [0, [Validators.required]],
    codigoPostal: [''],
    tipoDocumento: '',
    numeroDocumento: '',
    activo: [true],
    telefono: ['', [Validators.maxLength(15), Validators.minLength(7)]],
  });

  public codigoPostalColombia = [Validators.pattern(SOLO_NUMEROS)];
  public codigoPostal = [
    Validators.pattern(NO_ESPECIALES),
    Validators.pattern(NO_WHITE_SPACES),
  ];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _utilsService: UtilsService,
    private _confirmationService: ConfirmationService,
    private _tercerosServiceState: TerceroStateService,
    private _listaSeleccionState: ListaSeccionStateService,
    private _messageService: MessageService
  ) {}

  get frmControlUbicacion(): FormGroup['controls'] {
    return this.frmUbicacion.controls;
  }

  get frmControlDireccion(): FormGroup['controls'] {
    return this.frmDireccion.controls;
  }

  async ngOnInit(): Promise<void> {
    this.frmUbicacion.get('emailPrincipal')?.disable();
    this.obtenerTipoDireccion();
    this.obtenerPais();
    this._route.params.subscribe(
      async ({ tipoPersona, tipoDocumento, numeroDocumento }) => {
        this.sTipoTercero = tipoPersona;
        if (tipoDocumento) {
          this.sAccion = Terceros.ACCION_EDITAR;

          // const sTipoDocumentoEncrypt =
          //   this._utilsService.fnDesencryptar(tipoDocumento);
          // const sNumeroDocumentoEncrypt =
          //   this._utilsService.fnDesencryptar(numeroDocumento);
          const sTipoDocumentoEncrypt = tipoDocumento;
          const sNumeroDocumentoEncrypt = numeroDocumento;

          let oTercero: any = {
            tipoDocumento: sTipoDocumentoEncrypt,
            numeroDocumento: sNumeroDocumentoEncrypt,
            tipoPersona: tipoPersona,
          };

          this.oTerceroNavegacion = oTercero;
          await this.obtenerUbicacionesGeograficas(this.oTerceroNavegacion);
        } else {
          //obtiene la información del local storage tanto para la información de la DIAN, como para el tipo y numerro de documento del tercero
          this.oTerceroStorage = JSON.parse(
            localStorage.getItem('datosTercero') as string
          );
          this.oDianStorage = JSON.parse(
            localStorage.getItem('datosDian') as string
          );
          //if (this.sTipoTercero === Terceros.JURIDICA) {
          this.obtenenerDatosDian();
          //}
        }

        //permite mapear los datos del local strage al momento de editar y que no se encuentren datos de la ubicación en la bd
        if (
          this.sAccion === Terceros.ACCION_EDITAR &&
          Object.entries(this.oUbicacion).length == 0
        ) {
          this.oDianStorage = JSON.parse(
            localStorage.getItem('datosDian') as string
          );
          await this.obtenenerDatosDian();
        }
        //permite obtener la transacción para verificar si esta activo los datos administrativos
        await this.consultarTransacciones(tipoPersona);
      }
    );
  }

  public desactivarCamposDireccion(bEstado: boolean) {
    if (bEstado) {
      this.frmControlDireccion['tipoDireccion'].enable();
      this.frmControlDireccion['direccion'].enable();
      this.frmControlDireccion['idCiudad'].enable();
      this.frmControlDireccion['id_Pais'].enable();
      this.frmControlDireccion['id_Region'].enable();
      this.frmControlDireccion['activo'].enable();
      this.frmControlDireccion['telefono'].enable();
    } else {
      this.frmControlDireccion['tipoDireccion'].disable();
      this.frmControlDireccion['direccion'].disable();
      this.frmControlDireccion['idCiudad'].disable();
      this.frmControlDireccion['id_Pais'].disable();
      this.frmControlDireccion['id_Region'].disable();
      //this.frmControlDireccion['activo'].disable();
    }
  }

  /**
   * @description permite traer la ciudad pais región por medio del código ciudad
   * @param codigo codigo de la ciudad a consultar
   */
  public async obtenerCiudadPaisRegion(
    id?: string,
    codigo?: string
  ): Promise<void> {
    let oCodigo = {
      Id: id,
      Codigo: codigo,
    };
    let oDatosEnviar = this._utilsService.fnEliminarVaciosForm(oCodigo);
    this.oPaisCiudadRegion = (
      await this._tercerosServiceState.obtenerCiudadPaisRegion(oDatosEnviar)
    ).data;
  }

  /**
   * @description permite mapear la información obtenida por la fuente de la DIAN
   */
  public async obtenenerDatosDian(): Promise<void> {
    if (Object.entries(this.oDianStorage).length > 0) {
      let oDatos: any =
        this.sAccion === Terceros.ACCION_EDITAR
          ? this.oTerceroNavegacion
          : this.oTerceroStorage;
      let oDatosDian: any = this.oDianStorage;
      let oDirecciones =
        oDatosDian['respuestaDian'].data.terceroJuridicoEntidad.ubicacion
          .direcciones[0];

      let aTelefono = oDirecciones.telefono.split(',');

      //Valida y mapea el correo principal obtenido por la fuete de la DIAN
      if (
        oDatosDian['respuestaDian'].data.terceroJuridicoEntidad
          .correoElectronico != ''
      ) {
        let oCorreoAgregar: IMediosContactos = {
          id: 0,
          activo: true,
          tipoDocumento: oDatos.tipoDocumento,
          numeroDocumento: oDatos.numeroDocumento,
          principal: true,
          tipoContacto: 'CORR',
          idPersonasContacto: 4,
          valorContacto:
            oDatosDian['respuestaDian'].data.terceroJuridicoEntidad
              .correoElectronico,
        };

        let oCorreo = this.oCorreos?.filter((valor) => {
          return valor.valorContacto === oCorreoAgregar.valorContacto;
        });

        if (oCorreo?.length == 0) {
          this.oCorreoPrincipal?.push(oCorreoAgregar);
        }

        this.frmUbicacion.patchValue({
          ...this.oUbicacion,
          emailPrincipal: this.oCorreoPrincipal![0].valorContacto,
        });
      }

      //valida y mapea la dirección obtenida por la fuente de la DIAN
      if (
        oDirecciones.ciudad.id != 0 &&
        oDirecciones.ciudad.region.id != 0 &&
        oDirecciones.ciudad.region.pais.id != 0
      ) {
        let sCodigoCiudad = oDirecciones.ciudad.id;
        await this.obtenerCiudadPaisRegion('', sCodigoCiudad);
        let oDatosUbicacion: any = this.oPaisCiudadRegion;

        aTelefono.forEach((valor: string) => {
          let oTelefono: IMediosContactos = {
            ...this.oTerceroNavegacion,
            id: 0,
            activo: true,
            tipoDocumento: oDatos.tipoDocumento,
            numeroDocumento: oDatos.numeroDocumento,
            principal: false,
            tipoContacto: 'TELE',
            telefono: valor,
            idPersonasContacto: 2,
            valorContacto: valor,
          };
          this.oTelefonos.push(oTelefono);
        });
        let oDireccionAgregar: IUbicacionesPersona = {
          id: 0,
          tipoDireccion: 'FISC',
          descripcionTipoDireccion: 'Fiscal',
          direccion: oDirecciones.descripcion,
          idCiudad: oDatosUbicacion.ciudad.id,
          codigoPostal: '',
          tipoDocumento: oDatos['tipoDocumento'],
          numeroDocumento: oDatos['numeroDocumento'],
          activo: true,
          descripcion_Ciudad: oDatosUbicacion.ciudad.nombre,
          id_Region: oDatosUbicacion.region.id,
          descripcion_Region: oDatosUbicacion.region.nombre,
          id_Pais: oDatosUbicacion.pais.id,
          descripcion_Pais: oDatosUbicacion.pais.nombre,
          mediosContactosPersonas: this.oTelefonos,
        };

        let oDireccion = this.oDirecciones?.filter((valor) => {
          return valor.direccion === oDireccionAgregar.direccion;
        });

        if (oDireccion!.length === 0) {
          this.oDirecciones?.push(oDireccionAgregar);
        }
      }
    }
  }

  listaErroresMensajes(nombreCampo: string): string {
    const errors =
      this.frmControlDireccion[nombreCampo]?.errors ||
      this.frmControlUbicacion[nombreCampo]?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['maxlength'] && nombreCampo === 'razonSocial')
      return 'Debe ser máximo de ' + '6';
    if (
      (errors?.['pattern'] && nombreCampo === 'nombreContacto') ||
      (errors?.['pattern'] && nombreCampo === 'designacionContacto')
    )
      return 'No se permiten espacios ni caracteres especiales.';
    if (errors?.['pattern'] && nombreCampo === 'codigoPostal')
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
      (this.frmControlDireccion[campo]?.invalid &&
        this.frmControlDireccion[campo]?.touched) ||
      (this.frmControlUbicacion[campo]?.invalid &&
        this.frmControlUbicacion[campo]?.touched)
    );
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
   * @description permite obtener una transaccion por medio de un parametro
   * @param sTipoTercero  tipo de transacción a consultar
   */
  public async consultarTransacciones(sTipoTercero: string): Promise<void> {
    let oRespuesta;
    let sCodigo;

    if (sTipoTercero === Terceros.JURIDICA) {
      if (this.sAccion === Terceros.ACCION_CREAR) {
        sCodigo = 'ADM019';
      } else {
        sCodigo = 'ADM020';
      }
    } else if (sTipoTercero === Terceros.NATURAL) {
      if (this.sAccion === Terceros.ACCION_CREAR) {
        sCodigo = 'ADM021';
      } else {
        sCodigo = 'ADM022';
      }
    }
    let oData = {
      Codigo: sCodigo,
    };

    oRespuesta = (
      await this._tercerosServiceState.consultarTransacciones(oData)
    ).data[0].requiereDatosAdministrativos;
    this.bRequiereDatosAdministrativos = oRespuesta;
    localStorage.setItem('funcionalidad', JSON.stringify(sCodigo));
  }

  /**
   * @description Metodo que permite navegar al siguiente steper
   */
  async siguiente(sAccionGuardar?: boolean): Promise<void> {
    //let datos: any = this.oTerceroNavegacion;
    let oRespuesta: IRespuestaApi;
    let oDatosTercero: any =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;

    //permite setear tipo de documento y numero para mensaje de confirmación
    this.sTextoTipoDocumento = oDatosTercero.tipoDocumento;
    this.sTextoNumeroDocumento = oDatosTercero.numeroDocumento;
    this.sTextoTipoPersona =
      this.sTipoTercero === Terceros.NATURAL
        ? Terceros.TEXTO_NATURAL
        : Terceros.TEXTO_JURIDICA;

    let oDatosUbicacion = {
      ...oDatosTercero,
      ...this.frmUbicacion.value,
      mediosContactosPersonas: this.oCorreos?.concat(this.oCorreoPrincipal!),
      ubicacionesPersonas: this.oDirecciones,
      estado_registro:
        this.bRequiereDatosAdministrativos == true &&
        this.sTipoTercero === Terceros.ACCION_CREAR
          ? 'TMP'
          : 'REG',
    };

    if (this.sAccion === Terceros.ACCION_CREAR) {
      oRespuesta = await this.crearUbicacionGeograficaPersona(
        1,
        oDatosUbicacion
      );
    } else {
      oRespuesta = await this.actualzarUbicacionGeograficaPersona(
        1,
        oDatosUbicacion
      );
    }
    if (oRespuesta && this.bRequiereDatosAdministrativos && !sAccionGuardar) {
      if (this.oTerceroNavegacion.length === 0) {
        this._router.navigate([
          'adm/persona/crear/step-datos-administrativos',
          this.sTipoTercero,
        ]);
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
          'adm/persona/editar/step-datos-administrativos',
          this.sTipoTercero,
          sTipoDocumentoEncrypt,
          sNumeroDocumentoEncrypt,
        ]);
      }
    } else if (
      this.sAccion === Terceros.ACCION_CREAR &&
      this.bRequiereDatosAdministrativos == false
    ) {
      this.fnLanzarToastPersonalizado();
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
  }

  fnCargarEvento() {
    let oDatosNavegacion: any = this.oTerceroStorage;
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

  fnLanzarToastPersonalizado() {
    this._messageService.addAll([
      {
        key: 'some',
        severity: 'success',
        life: 100000,
      },
    ]);
  }

  /**
   *
   */
  async anterior(): Promise<void> {
    //let datos: any = this.oTerceroNavegacion;
    let oDatosTercero: any;
    oDatosTercero =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;
    if (this.oTerceroNavegacion.length === 0) {
      this._router.navigate([
        'adm/persona/crear/step-informacion-tributaria',
        this.sTipoTercero,
      ]);
      let oDatosAnterior = {
        ...oDatosTercero,
        anterior: true,
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
        'adm/persona/editar/step-informacion-tributaria',
        this.sTipoTercero,
        sTipoDocumentoEncrypt,
        sNumeroDocumentoEncrypt,
      ]);
    }
  }

  /**
   * @description Metodo que permite crear la ubicacion geografica del tercero y persistir los datos
   * @param idUsuario usuario que crea la ubicacion geografica
   * @param oInformacionBasica datos que se envian
   * @returns respuesta del servicio
   */
  public async crearUbicacionGeograficaPersona(
    idUsuario: number,
    oUbicacion: any
  ): Promise<IRespuestaApi> {
    let oRespuesta =
      await this._tercerosServiceState.crearUbicacionGeograficaPersona(
        idUsuario,
        oUbicacion
      );
    return oRespuesta;
  }

  /**
   * @description Metodo que permite actualizar la ubicacion geografica del tercero y persistir los datos
   * @param idUsuario usuario que actualiza la ubicacion geografica
   * @param oInformacionBasica datos que se envian
   * @returns respuesta del servicio
   */
  public async actualzarUbicacionGeograficaPersona(
    idUsuario: number,
    oUbicacion: any
  ): Promise<IRespuestaApi> {
    let oRespuesta =
      await this._tercerosServiceState.actualzarUbicacionGeograficaPersona(
        idUsuario,
        oUbicacion
      );
    return oRespuesta;
  }

  /**
   * @description Metodo que permite actualizar la direccion geografica del tercero y persistir los datos
   * @param idUsuario usuario que actualiza la direccion geografica
   * @param oInformacionBasica datos que se envian
   * @returns respuesta del servicio
   */
  public async ActualzarDireccionUbicacionGeograficaPersona(
    idUsuario: number,
    oDireccion: any
  ): Promise<IRespuestaApi> {
    let oRespuesta =
      await this._tercerosServiceState.ActualzarDireccionUbicacionGeograficaPersona(
        idUsuario,
        oDireccion
      );
    return oRespuesta;
  }

  validarCodigo(id: number) {
    if (id == 1) {
      this.nLongitudMinimaCodigo = 6;
      this.nLongitudMaximaCodigo = 6;
      this.frmControlDireccion['codigoPostal'].setValidators(
        this.codigoPostalColombia
      );
    } else {
      this.nLongitudMinimaCodigo = 6;
      this.nLongitudMaximaCodigo = 10;
      this.frmControlDireccion['codigoPostal'].setValidators(this.codigoPostal);
    }
  }

  /**
   * @description Metodo que permite consultar los paises
   */
  public async obtenerPais(): Promise<void> {
    this.oListaPais = (
      await this._listaSeleccionState.obtenerListadoPaises()
    ).data;
    this.validarCodigo(this.frmControlDireccion['id_Pais'].value);
  }

  /**
   * @description Metodo que permite consultar las regiones
   * @param idPais parametro de consulta
   */
  public async obtenerRegionPorId(event: number): Promise<void> {
    this.oListaRegion = (
      await this._listaSeleccionState.obtenerRegionPorId(event)
    ).data;
    this.validarCodigo(event);
  }

  /**
   * @description Metodo que permite consultar las ciudades
   * @param idRegion parametro de consulta
   */
  public async obtenerCiudadPorId(event: number): Promise<void> {
    this.oListaCiudad = (
      await this._listaSeleccionState.obtenerCiudadPorId(event)
    ).data;
  }

  /**
   * @description Metodo que permite consultar los tipos de direccion
   */
  public async obtenerTipoDireccion(): Promise<void> {
    this.oListaTipoDireccion = (
      await this._listaSeleccionState.consultarTipoDireccion()
    ).data[0].valoresDominios;
  }

  /**
   * @description Metodo que permite obtener los datos de seccion ubicacion dado unos parametros
   * @param oTercero array donde contiene tipo documento, numero de documento y tipo persona
   */
  public async obtenerUbicacionesGeograficas(oTercero: any): Promise<void> {
    this.oCorreos = [];
    oTercero = {
      ...oTercero,
      //estadoRegistro: 'REG',
    };
    let oRespuesta: IRespuestaApi =
      await this._tercerosServiceState.obtenerUbicacionesGeograficas(oTercero);
    this.oUbicacion = oRespuesta.data[0];

    this.frmUbicacion.patchValue({
      ...this.oUbicacion,
    });

    this.oDirecciones = oRespuesta.data[0].ubicacionesPersonas;
    //recorre los contactos de la persona para obtener el correo principal y setear la informacion en el formulario frmUbicaion
    oRespuesta.data[0].mediosContactosPersonas.forEach(
      (valor: IMediosContactos) => {
        if (valor.principal === null || valor.principal === false) {
          this.oCorreos?.push(valor);
        } else if (valor.principal === true) {
          this.frmUbicacion.patchValue({
            ...this.oUbicacion,
            emailPrincipal: valor.valorContacto,
          });
        }
      }
    );
  }

  /**
   * @description Metodo que permite calcelar el proceso y redireccionar a listar terceros
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
   *@description Metodo que permite abrir modal para agregar una direccion
   */
  agregarDireccion() {
    this.bAgregarDireccion = true;
    this.desactivarCamposDireccion(true);
    this.oTelefonos = [];
    this.bDisplayModal = true;
    this.frmDireccion.reset();
    this.frmControlDireccion['activo'].setValue(true);
    //this.frmControlDireccion['activo'].disable();
    this.sTextoAgregarDireccion = Terceros.TEXTO_AGREGAR;
  }

  /**
   *@description Metodo que permite abrir modal para editar una direccion
   * @param oDireccion
   */
  async editarDirecciones(
    oDireccion: IUbicacionesPersona,
    nIndice: number
  ): Promise<void> {
    await this.obtenerCiudadPaisRegion(String(oDireccion.idCiudad), '');
    let oUbicacionesCiudad: any = this.oPaisCiudadRegion;
    await this.obtenerRegionPorId(oUbicacionesCiudad.pais.id);
    await this.obtenerCiudadPorId(oUbicacionesCiudad.region.id);
    this.bAgregarDireccion = false;
    this.desactivarCamposDireccion(false);
    this.nIndice = nIndice;

    this.sTextoAgregarDireccion = Terceros.TEXTO_EDITAR;
    this.bDisplayModal = true;
    this.oTelefonos = oDireccion.mediosContactosPersonas;
    if (oDireccion.tipoDireccion === 'FISC') {
      this.bDireccionFisisa = false;
    } else {
      this.bDireccionFisisa = true;
    }
    this.frmDireccion.patchValue({
      ...oDireccion,
      indice: nIndice,
    });
  }

  public agregarCorreo() {
    let oDatosTercero: any;
    oDatosTercero =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;
    let oValor: any = this.frmUbicacion.get('email')?.value;
    if (oValor) {
      if (!this.frmUbicacion.get('email')?.hasError('emailInvalido')) {
        let duplicado = this.oCorreos!.filter((item) => {
          return item.valorContacto === oValor.toLocaleLowerCase();
        });
        if (duplicado.length === 0) {
          let cor: IMediosContactos = {
            id: 0,
            activo: true,
            tipoDocumento: oDatosTercero.tipoDocumento,
            numeroDocumento: oDatosTercero.numeroDocumento,
            principal: false,
            tipoContacto: 'CORR',
            idPersonasContacto: 4,
            valorContacto: oValor,
          };
          this.oCorreos!.push(cor);
          this.frmUbicacion.get('email')?.reset();
          this.frmUbicacion.get('email')?.clearValidators();
          this.frmUbicacion.get('email')?.updateValueAndValidity();
          if (this.oCorreos?.length == 2) {
            this.frmControlUbicacion['email'].disable();
          }
        } else {
          this.frmUbicacion
            .get('email')
            ?.setValidators([this._utilsService.emailValidator]);
          this.frmUbicacion.get('email')?.updateValueAndValidity();
        }
      }
    }
  }

  agregarTelefono() {
    let oDatosTercero: any;
    oDatosTercero =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;
    let oValor: any = this.frmDireccion.get('telefono')?.value;
    if (oValor) {
      if (this.frmDireccion.get('telefono')?.errors === null) {
        let duplicado = this.oTelefonos!.filter((item) => {
          return item.telefono === oValor.toLocaleLowerCase();
        });
        if (duplicado.length === 0) {
          let cor: IMediosContactos = {
            ...this.oTerceroNavegacion,
            id: 0,
            activo: true,
            tipoDocumento: oDatosTercero.tipoDocumento,
            numeroDocumento: oDatosTercero.numeroDocumento,
            principal: false,
            tipoContacto: 'TELE',
            telefono: oValor,
            idPersonasContacto: 2,
            valorContacto: oValor,
          };
          this.oTelefonos!.push(cor);
          this.frmDireccion.get('telefono')?.reset();
          this.frmDireccion.get('telefono')?.clearValidators();
          this.frmDireccion
            .get('telefono')
            ?.setValidators([
              Validators.maxLength(15),
              Validators.minLength(7),
            ]);
          this.frmDireccion.get('telefono')?.updateValueAndValidity();
        } else {
          this.frmDireccion
            .get('telefono')
            ?.setValidators([
              Validators.maxLength(15),
              Validators.minLength(7),
            ]);
          this.frmDireccion.get('telefono')?.updateValueAndValidity();
        }
      }
    }
  }

  borrartelefono(telefono: any) {
    const index = this.oTelefonos!.indexOf(telefono);
    if (index > -1) {
      this.oTelefonos!.splice(index, 1);
    }
  }

  public borrarcorreo(correo: any) {
    const index = this.oCorreos!.indexOf(correo);
    if (index > -1) {
      this.oCorreos!.splice(index, 1);
      this.frmControlUbicacion['email'].enable();
    }
  }

  /**
   * @description Permite cambiar el estado de una direccion de la grilla
   * @param oDireccion objeto de la lista a cambiar estado
   * @param nIndice indice a cambiar estado
   */
  async cambiarEstadoDireccion(oDireccion: IUbicacionesPersona): Promise<void> {
    let oResponse;
    let oDatos = {
      ...oDireccion,
      activo: oDireccion.activo === true ? false : true,
      tipoPersona: this.sTipoTercero,
    };
    if (this.oDirecciones.length > 1) {
      if (oDireccion.activo === true) {
        this._confirmationService.confirm({
          ...ADM.ACCIONES_CONFIRM.inactivarDireccion,
          ...ADM.ACCIONES_CONFIRM.buttons_class,
          accept: async () => {
            oResponse =
              await this._tercerosServiceState.ActualzarDireccionUbicacionGeograficaPersona(
                1,
                oDatos
              );
            if (oResponse.estado) {
              await this.obtenerUbicacionesGeograficas(this.oTerceroNavegacion);
            }
          },
        });
      } else {
        this._confirmationService.confirm({
          ...ADM.ACCIONES_CONFIRM.activarDireccion,
          ...ADM.ACCIONES_CONFIRM.buttons_class,
          accept: async () => {
            oResponse =
              await this._tercerosServiceState.ActualzarDireccionUbicacionGeograficaPersona(
                1,
                oDatos
              );
            if (oResponse.estado) {
              await this.obtenerUbicacionesGeograficas(this.oTerceroNavegacion);
            }
          },
        });
      }
    } else {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: 'Se debe encontrar al menos una dirección activa',
      });
    }
  }

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

  /**
   * @description Metodo que permite unir los telefonos en un string para mostrar en la tabla
   * @param oDatos lista de contactos a unir
   * @returns
   */
  public unirContactos(oDatos: any): string {
    let telefonos: string = '';
    if (oDatos.length != 0) {
      oDatos.forEach((valor: any) => {
        if (telefonos != '') {
          telefonos = telefonos + ', ' + valor.valorContacto;
        } else {
          telefonos = valor.valorContacto;
        }
      });
    }
    return telefonos;
  }

  public async guardarDirecciones(): Promise<void> {
    let oDatosTercero: any;
    let bContinuar = false;
    oDatosTercero =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;
    let oDatosFormulario: any = this.frmDireccion.getRawValue();
    let sIdCiudad;
    sIdCiudad =
      this.sAccion === Terceros.ACCION_CREAR
        ? oDatosFormulario.idCiudad
        : this.frmControlDireccion['idCiudad'].value;
    await this.obtenerCiudadPaisRegion(sIdCiudad, '');
    let oUbicacionesCiudad: any = this.oPaisCiudadRegion;

    //cambia el estado de una dirección siempre y cuando sea fiscal
    if (oDatosFormulario.tipoDireccion === 'FISC') {
      this.oDirecciones.forEach((valor: any) => {
        if (valor.tipoDireccion === 'FISC' && valor.activo == true) {
          valor.activo = false;
        }
      });
    }

    let oDireccionAgregar = {
      ...oDatosFormulario,
      id: oDatosFormulario.id > 0 ? oDatosFormulario.id : 0,
      activo: true,
      descripcionTipoDireccion:
        oDatosFormulario.tipoDireccion === 'FISC' ? 'Fiscal' : 'Física',
      tipoDocumento: oDatosTercero.tipoDocumento,
      numeroDocumento: oDatosTercero.numeroDocumento,
      mediosContactosPersonas: this.oTelefonos,
      descripcion_Ciudad: oUbicacionesCiudad.ciudad.nombre,
      descripcion_Region: oUbicacionesCiudad.region.nombre,
      descripcion_Pais: oUbicacionesCiudad.pais.nombre,
    };

    if (oDatosFormulario.codigoPostal != null) {
      if (
        oDatosFormulario.codigoPostal.length > 0 &&
        oDatosFormulario.codigoPostal.length < 6
      ) {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail: 'El código postal no válido',
        });
        bContinuar = false;
      } else {
        bContinuar = true;
      }
    } else {
      bContinuar = true;
    }
    if (this.bAgregarDireccion && bContinuar) {
      let oDireccion = this.oDirecciones?.filter((valor) => {
        return valor.direccion === oDireccionAgregar.direccion;
      });

      if (oDireccion!.length === 0) {
        this.oDirecciones?.unshift(oDireccionAgregar);
      }
      this.bDisplayModal = false;
    } else if (bContinuar) {
      this.oDirecciones[this.frmControlDireccion['indice'].value] = {
        ...this.frmDireccion.getRawValue(),
      };
      this.oDirecciones[this.frmControlDireccion['indice'].value].codigoPostal =
        this.frmDireccion.value.codigoPostal;
      this.oDirecciones[
        this.frmControlDireccion['indice'].value
      ].descripcionTipoDireccion =
        oDatosFormulario.tipoDireccion === 'FISC' ? 'Fiscal' : 'Física';
      this.oDirecciones[
        this.frmControlDireccion['indice'].value
      ].mediosContactosPersonas = this.oTelefonos;
      this.oDirecciones[
        this.frmControlDireccion['indice'].value
      ].descripcion_Ciudad = oUbicacionesCiudad.ciudad.nombre;
      this.oDirecciones[
        this.frmControlDireccion['indice'].value
      ].descripcion_Region = oUbicacionesCiudad.region.nombre;
      this.oDirecciones[
        this.frmControlDireccion['indice'].value
      ].descripcion_Pais = oUbicacionesCiudad.pais.nombre;
      this.bDisplayModal = false;
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
}
