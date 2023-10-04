import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ADM } from 'src/app/core/constant/adm.constants';
import { Terceros } from 'src/app/core/constant/adm/terceros.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IDatosBasicos } from 'src/app/domain/interface/adm/terceros/datos-basicos.interface';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { TerceroStateService } from 'src/app/domain/service/adm/terceros/tercero-state.service';

@Component({
  selector: 'app-listar-terceros',
  templateUrl: './listar-terceros.component.html',
  styleUrls: ['./listar-terceros.component.scss'],
})
export class ListarTercerosComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public oListaTipDocumento = [];
  public oListaNaturaleza: any[] = [];
  public oListarTerceros: IDatosBasicos[] = [];
  public aEstadoGeneral: any[] = Terceros.ESTADOS_GENERAL;
  public sTipoTercero: string = '';
  public sTipo: string = '';
  public bPersonaNatural: boolean = false;
  public bPersonaJuridica: boolean = false;
  public bMostrarLoading: boolean = false;

  public listarTerceros$!: Subscription;

  formFiltro: FormGroup = this._formBuilder.group({
    tipoDocumento: '',
    numeroDocumento: '',
    digitoVerificacionPersona: '',
    tipoPersona: '',
    tipoNaturaleza: '',
    digitoVerificacion: '',
    razonSocial: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    activo: null,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private router: Router,
    private _tercerosServiceState: TerceroStateService,
    private _listaSeleccionState: ListaSeccionStateService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.obtenerNaturaleza();
    //this.obtenerTipoDocumento();

    if (this.activeRoute.snapshot.paramMap.get('tipo') === Terceros.NATURAL) {
      this.bPersonaNatural = true;
      this.bPersonaJuridica = false;
      this.sTipoTercero = Terceros.NATURAL;
      this.sTipo = Terceros.TEXTO_NATURALES;
    } else {
      this.bPersonaJuridica = true;
      this.bPersonaNatural = false;
      this.sTipoTercero = Terceros.JURIDICA;
      this.sTipo = Terceros.TEXTO_JURIDICAS;
    }
  }
  get frmControlFiltro(): FormGroup['controls'] {
    return this.formFiltro.controls;
  }

  ngOnDestroy(): void {
    if (this.listarTerceros$) this.listarTerceros$.unsubscribe();
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
   *@description Metodo que permite limpiar el formulario
   */
  public limpiarFiltro(): void {
    this.formFiltro.reset({
      tipoDocumento: '',
      numeroDocumento: '',
      digitoVerificacionPersona: '',
      tipoPersona: '',
      tipoNaturaleza: '',
      digitoVerificacion: '',
      razonSocial: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      activo: null,
    });
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
   *@description Metodo que me permite obtener un listado de terceros por filtro
   */
  public async listarTerceros(): Promise<void> {
    this.bMostrarLoading = true;
    let oRespuesta;
    let oDatos: any = [];
    let filtro = this.formFiltro.value;
    if (
      filtro.numeroDocumento != '' ||
      filtro.primerNombre != '' ||
      filtro.primerApellido != '' ||
      filtro.razonSocial != ''
    ) {
      let oFiltroTerceros = {
        ...filtro,
        tipoPersona: this.sTipoTercero,
        estadoRegistro: 'REG',
      };
      oDatos = this._utilsService.fnEliminarVaciosForm(oFiltroTerceros);

      oRespuesta =
        await this._tercerosServiceState.obtenerTercerosIdentificacion(oDatos);
      this.oListarTerceros = oRespuesta.data;

      if (oRespuesta.estado) {
        this.bMostrarLoading = false;
      }
    } else {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: 'Seleccione al menos un filtro para realizar la búsqueda.',
      });
      this.bMostrarLoading = false;
    }
  }

  /**
   * @description permite obtener la accion que se va a realizar y a su vez el tipo de persona mapeando un objeto en local storage
   * @param tipoAccion tipo de accion que se desea realizar
   */
  public accionTercero(sTipoAccion: string, sAccion: string) {
    let datos: any = {
      accion: sTipoAccion,
      accion2: sAccion,
      tipoPersona: this.sTipoTercero,
    };
    localStorage.removeItem('accionTercero');
    localStorage.setItem('accionTercero', JSON.stringify(datos));
  }

  /**
   *
   */
  crearPersona() {
    this.accionTercero(Terceros.CREAR, Terceros.ACCION_CREAR);
    localStorage.removeItem('datosTerceroNatural');
    localStorage.removeItem('datosTercero');
    localStorage.removeItem('datosDian');
    this.router.navigate([
      'adm/persona/crear/step-informacion-basica',
      this.sTipoTercero,
    ]);
  }

  /**
   *
   * @param oListarTerceros
   */
  public async cambiarEstado(oListarTerceros: any): Promise<void> {
    let oResponse;
    let oDatos = {
      ...oListarTerceros,
      activo: oListarTerceros.activo === true ? false : true,
    };

    if (oListarTerceros.activo === true) {
      this._confirmationService.confirm({
        ...ADM.ACCIONES_CONFIRM.inactivarTercero,
        ...ADM.ACCIONES_CONFIRM.buttons_class,
        accept: async () => {
          oResponse =
            await this._tercerosServiceState.actualizarPersonaInformacionBasica(
              1,
              oDatos
            );
          if (oResponse.estado) {
            await this.listarTerceros();
          }
        },
      });
    } else {
      this._confirmationService.confirm({
        ...ADM.ACCIONES_CONFIRM.activarTercero,
        ...ADM.ACCIONES_CONFIRM.buttons_class,
        accept: async () => {
          oResponse =
            await this._tercerosServiceState.actualizarPersonaInformacionBasica(
              1,
              oDatos
            );
          if (oResponse.estado) {
            await this.listarTerceros();
          }
        },
      });
    }
  }

  /**
   *
   * @param oListarTerceros
   */
  public editarTercero(oTercero: any): void {
    this.accionTercero(Terceros.EDITAR, Terceros.ACCION_EDITAR);
    localStorage.removeItem('datosTerceroNatural');
    localStorage.removeItem('datosTercero');
    localStorage.removeItem('datosDian');
    // const sTipoDocumentoEncrypt = this._utilsService.fnEncryptar(
    //   oTercero.tipoDocumento
    // );
    // const sNumeroDocumentoEncrypt = this._utilsService.fnEncryptar(
    //   oTercero.numeroDocumento
    // );
    const sTipoDocumentoEncrypt = oTercero.tipoDocumento;
    const sNumeroDocumentoEncrypt = oTercero.numeroDocumento;
    this.router.navigate([
      'adm/persona/editar/step-informacion-basica',
      this.sTipoTercero,
      sTipoDocumentoEncrypt,
      sNumeroDocumentoEncrypt,
      Terceros.NO,
    ]);
  }

  /**
   *
   * @param oTercero
   * @returns
   */
  public concatenarDigitoVerificacion(oTercero: any): string {
    let sNumeroDigito!: string;
    if (this.sTipoTercero === Terceros.NATURAL) {
      sNumeroDigito =
        oTercero.numeroDocumento + ' - ' + oTercero.digitoVerificacionPersona;
    } else {
      sNumeroDigito =
        oTercero.numeroDocumento + ' - ' + oTercero.digitoVerificacion;
    }
    return sNumeroDigito;
  }

  /**
   * @description Metodo que permite obtener los tipos de documentos para una persona natural o juridica
   */
  public async consultarListaTipoDocumentoNatJuri(): Promise<void> {
    let oTipo = {
      SiglaDominio: this.sTipoTercero,
      segundaSigla: this.frmControlFiltro['tipoNaturaleza']?.value,
    };
    this.oListaTipDocumento = (
      await this._listaSeleccionState.consultarListaTipoDocumentoNatJuri(oTipo)
    ).data;
  }
}
