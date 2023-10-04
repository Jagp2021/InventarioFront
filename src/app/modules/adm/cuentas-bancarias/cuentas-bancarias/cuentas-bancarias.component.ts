import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { CuentasBancariasStateService } from 'src/app/domain/service/adm/cuentas-bancarias/cuentas-bancarias-state.service';
import { TransaccionesStateService } from 'src/app/domain/service/adm/transacciones/transacciones-state.service';
import { UtilsService } from 'src/app/core/services/utils.service';

import {
  ICuentasBancarias,
  ITerceros,
} from 'src/app/domain/interface/adm/cuentas-bancarias/cuentas-bancarias.interface';
import { CUENTA_BANCARIA } from 'src/app/core/constant/adm/cuentas-bancarias';
import { ADM } from 'src/app/core/constant/adm.constants';

@Component({
  selector: 'app-cuentas-bancarias',
  templateUrl: './cuentas-bancarias.component.html',
  styleUrls: ['./cuentas-bancarias.component.scss'],
})
export class CuentasBancariasComponent implements OnInit {
  /** TODO: REEMPLAZAR POR INTERFAZ DE TERCEROS PROPIA +1*/

  public sJuridicoNatural: string = '';
  public bAbrirDatosAdministrativos: boolean = false;
  public oCuentaAgregar!: ICuentasBancarias;
  public lItemsBreadcrumb: MenuItem[] = [];
  public aTercero: ITerceros[] = []; /** +1 */
  public aCuentasGuardar: ICuentasBancarias[] = [];
  public sTipoPersona!: string;
  public sTipoDocumento!: string;
  public sNumeroDocumento!: string;
  public bMostrarBotonDatos: boolean = false;

  constructor(
    private _cuentasBancariasState: CuentasBancariasStateService,
    private _utilsService: UtilsService,
    private _confirmationService: ConfirmationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _transaccionState: TransaccionesStateService
  ) {}

  async ngOnInit(): Promise<void> {
    this._route.params.subscribe(async ({ tipoDocumento, numeroDocumento }) => {
      // this.sTipoDocumento = this._utilsService.fnDesencryptar(
      //   tipoDocumento
      // ) as string;
      // this.sNumeroDocumento = this._utilsService.fnDesencryptar(
      //   numeroDocumento
      // ) as string;
      this.sTipoDocumento = tipoDocumento;
      this.sNumeroDocumento = numeroDocumento;

      await this.fnConsultarTercero(this.sTipoDocumento, this.sNumeroDocumento);
      await this.fnConsultarDatosAdministrativos();
      this.fnCargarBreadcrumb();
    });
  }

  fnCargarBreadcrumb() {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Cuentas bancarias' },
    ];
  }

  /**
   * @description Consulta el tercero con los datos capturados de URL y crea la variable con el nombre a mostrar en pantalla
   * @param {string} sTipoDocumento tipo de documento
   * @param {string} sNumeroDocumento número de documento
   * @return {Promise<void>} No retorna datos
   */
  async fnConsultarTercero(
    sTipoDocumento: string,
    sNumeroDocumento: string
  ): Promise<void> {
    this.aTercero = (
      await this._cuentasBancariasState.fnConsultarTercero({
        TipoDocumento: sTipoDocumento,
        NumeroDocumento: sNumeroDocumento,
      })
    ).data;

    if (this.aTercero.length > 0) {
      this.sTipoPersona = String(this.aTercero[0].tipoPersona);
      this.fnConstruirNombreTitulo();
    } else {
      this.fnRedireccionarNoEncontrado();
    }
  }

  /**
   * @description Método para redireccionar a Terceros si los datos no existen en BD
   * @return {void} No retorna datos
   */
  fnRedireccionarNoEncontrado(): void {
    this._utilsService.fnMostrarMensaje({
      severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
      summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
      detail: CUENTA_BANCARIA.MSG_NOEXISTE,
    });

    setTimeout(() => {
      this.fnRediccionar(true);
    }, 3000);
  }

  /**
   * @description Método para capturar la información de los datos y mostrarlos como título
   * @return {void} No retorna datos
   */
  fnConstruirNombreTitulo(): void {
    const sTercero =
      this.aTercero[0].tipoPersona === CUENTA_BANCARIA.TIPO_PERSONA_JURI
        ? this.aTercero[0].razonSocial
        : this.aTercero[0].primerNombre?.concat(
            ' ',
            this.aTercero[0]!.primerApellido as string
          );

    this.sJuridicoNatural = sTercero as string;
  }

  /**
   * @description Establece la variable que devuelve la modal de Datos Administrativos para cierre o apertura
   * @param {boolean} bCerrar Dato emitido por Datos Administrativos
   * @return {void} No retorna datos
   */
  fnObtenerCierreDatosAdmin(bCerrar: boolean): void {
    this.bAbrirDatosAdministrativos = bCerrar;
  }

  /**
   * @description Captura la emisión de la cuenta a agregar enviada por el formulario para llevarla a la tabla
   * @param {ICuentasBancarias} oCuentaAgregar Objeto de tipo Cuenta Bancaria
   * @return {void} No retorna datos
   */
  fnCargarCuentaBancaria(oCuentaAgregar: ICuentasBancarias): void {
    this.oCuentaAgregar = oCuentaAgregar;
  }

  /**
   * @description Captura la emisión de la cuenta a agregar enviada
   * @param {ICuentasBancarias} aCuentasGuardar Array de tipo Cuenta Bancaria
   * @return {void} No retorna datos
   */
  fnGuardarCuentasLocal(aCuentasGuardar: ICuentasBancarias[]): void {
    this.aCuentasGuardar = aCuentasGuardar;
  }

  /**
   * @description Establece la variable para el cerrado de la modal de Datos Administrativos
   * @return {void} No retorna datos
   */
  fnAbrirDatosAdministrativos(): void {
    this.bAbrirDatosAdministrativos = true;
  }

  /**
   * @description Guarda / Actualiza todas las cuentas existentes en la tabla de cuentas
   * @return {Promise<void>} No retorna datos
   */
  async fnGuardarCuentasGeneral(): Promise<void> {
    const resultado =
      await this._cuentasBancariasState.fnActualizarCuentaBancaria(
        this.aCuentasGuardar
      );

    if (resultado.estado && resultado.codigo === ADM.ESTADO_HTTP_200) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.creado,
        summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
        detail: `${CUENTA_BANCARIA.MSG_EDITAR}`,
      });

      await this._utilsService.fnSleep(2000);
      this.fnRediccionar(false);
    }

    if (!resultado.estado && resultado.codigo === ADM.ESTADO_HTTP_500) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: resultado.mensaje,
      });
    }
  }

  /**
   * @description Lanza la confirmación para cancelar lo que se haya realizado en la transacción
   * @return {void} No retorna datos
   */
  fnCancelarTransaccion(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      key: 'cb-principal',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      message: CUENTA_BANCARIA.MSG_CANCELAR,
      accept: async () => {
        this.fnRediccionar(true);
      },
    });
  }

  /**
   * @description  Método para redireccionar dependiendo del tipo de persona
   * @param {boolean} bRedireccionNormal Bandera para redirección normal o con datos
   * @return {void} No retorna datos
   */
  fnRediccionar(bRedireccionNormal: boolean): void {
    const sUrlRedirigir =
      this.sTipoPersona === CUENTA_BANCARIA.TIPO_JURI
        ? CUENTA_BANCARIA.JURI_URL
        : CUENTA_BANCARIA.NATU_URL;

    if (bRedireccionNormal) {
      this._router.navigate([
        `/adm/${sUrlRedirigir}`,
        { tipo: this.sTipoPersona },
      ]);
    } else {
      // const sEncryptTipoDoc = this._utilsService.fnEncryptar(
      //   this.sTipoDocumento
      // );
      // const sEncryptNumDoc = this._utilsService.fnEncryptar(
      //   this.sNumeroDocumento
      // );

      this._router.navigate([
        `/adm/persona/editar/step-informacion-basica/${this.sTipoPersona}/${this.sTipoDocumento}/${this.sNumeroDocumento}/si`,
      ]);
    }
  }

  async fnConsultarDatosAdministrativos(): Promise<void> {
    const bResp: boolean = (
      await this._transaccionState.fnConsultarTransaccion({
        Codigo: CUENTA_BANCARIA.CU_DATOS_ADMINISTRATIVOS,
      })
    ).data[0].requiereDatosAdministrativos;
    this.bMostrarBotonDatos = bResp;
  }
}
