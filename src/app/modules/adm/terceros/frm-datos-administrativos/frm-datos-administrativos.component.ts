import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ADM } from 'src/app/core/constant/adm.constants';
import { Terceros } from 'src/app/core/constant/adm/terceros.constants';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IDatosAdministrativosAcciones } from 'src/app/core/shared/datos-administrativos/interfaces/datos-administrativos.interface';
import { IDatosNavegacion } from 'src/app/domain/interface/adm/terceros/datos-basicos.interface';
import { TerceroStateService } from 'src/app/domain/service/adm/terceros/tercero-state.service';

@Component({
  selector: 'app-frm-datos-administrativos',
  templateUrl: './frm-datos-administrativos.component.html',
  styleUrls: ['./frm-datos-administrativos.component.scss'],
})
export class FrmDatosAdministrativosComponent implements OnInit {
  public oAcciones: IDatosAdministrativosAcciones = {};
  public usuModificar!: any;
  public bMostrarComponente: boolean = true;
  public sCodigoFuncionalidad: string = '';
  public sTabla: string = '';
  public oTerceroStorage: IDatosNavegacion[] = [];
  public oTercero: any[] = [];
  public sTextoTipoDocumento!: string;
  public sTextoNumeroDocumento!: string;
  public sTextoTipoPersona!: string;
  public bGuardarDatos!: boolean;

  constructor(
    private _utilsService: UtilsService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _tercerosServiceState: TerceroStateService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) {}

  public sTipoTercero: string = '';
  public sAccion: string = Terceros.ACCION_CREAR;
  public oTerceroNavegacion: any[] = [];

  ngOnInit(): void {
    this._route.params.subscribe(
      async ({ tipoPersona, tipoDocumento, numeroDocumento }) => {
        this.sTipoTercero = tipoPersona!;
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
        }
        this.oTerceroStorage = JSON.parse(
          localStorage.getItem('datosTercero') as string
        );

        this.sCodigoFuncionalidad = JSON.parse(
          localStorage.getItem('funcionalidad') as string
        );
        this.sTabla = '10';
        this.obtenerTercerosIdentificacion();
      }
    );
  }
  get sIdRegistro(): string {
    return this.usuModificar?.solicitudUsuario?.id?.toString() || '';
  }

  /**
   *
   */
  public async obtenerTercerosIdentificacion(): Promise<void> {
    let oDatosTercero: any =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;
    let oTercero: any = {
      ...oDatosTercero,
    };
    let oRespuesta = (
      await this._tercerosServiceState.obtenerTercerosIdentificacion(oTercero)
    ).data[0];
    this.oTercero = oRespuesta;
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
   *
   */
  anterior() {
    //let datos: any = this.oTerceroNavegacion;
    let oDatosTercero: any;
    oDatosTercero =
      this.sAccion === Terceros.ACCION_CREAR
        ? this.oTerceroStorage
        : this.oTerceroNavegacion;
    if (this.oTerceroNavegacion.length === 0) {
      this._router.navigate([
        'adm/persona/crear/step-informacion-ubicacion',
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
        'adm/persona/editar/step-informacion-ubicacion',
        this.sTipoTercero,
        sTipoDocumentoEncrypt,
        sNumeroDocumentoEncrypt,
      ]);
    }
  }

  /**
   *
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
   *
   */
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

  /**
   *
   */
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
  async guardarTercero(): Promise<void> {
    this.oAcciones.guardar = true;
    let oDatos: any = {
      ...this.oTercero,
      estadoRegistro: 'REG',
    };
    let oRespuesta = await this.actualizarPersonaInformacionBasica(1, oDatos);
    console.log(oDatos);
    if (oRespuesta.estado) {
      if (this.sAccion === Terceros.ACCION_CREAR) {
        this.sTextoTipoDocumento = oDatos.tipoDocumento;
        this.sTextoNumeroDocumento = oDatos.numeroDocumento;
        this.sTextoTipoPersona =
          this.sTipoTercero === Terceros.NATURAL
            ? Terceros.TEXTO_NATURAL
            : Terceros.TEXTO_JURIDICA;
        this.fnLanzarToastPersonalizado();
      } else {
        let oDatosTercero: any =
          this.sAccion === Terceros.ACCION_CREAR
            ? this.oTerceroStorage
            : this.oTerceroNavegacion;
        //permite setear tipo de documento y numero para mensaje de confirmación

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
          detail: `Se actualizo correctamente el tercero en el sistema ${oDatosTercero.tipoDocumento} y ${oDatosTercero.numeroDocumento}.`,
        });
      }
    }
  }
}
