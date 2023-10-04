import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { CuentasBancariasStateService } from 'src/app/domain/service/adm/cuentas-bancarias/cuentas-bancarias-state.service';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { UtilsService } from 'src/app/core/services/utils.service';

import {
  ICuentasBancarias,
  IEstado,
} from 'src/app/domain/interface/adm/cuentas-bancarias/cuentas-bancarias.interface';
import { IValoresDominio } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { ADM } from 'src/app/core/constant/adm.constants';
import { CUENTA_BANCARIA } from 'src/app/core/constant/adm/cuentas-bancarias';

@Component({
  selector: 'app-frm-crear-cuenta',
  templateUrl: './frm-crear-cuenta.component.html',
  styleUrls: ['./frm-crear-cuenta.component.scss'],
})
export class FrmCrearCuentaComponent implements OnInit {
  @Output() aCuentaBancaria = new EventEmitter<ICuentasBancarias>(true);
  public aEstados: IEstado[] = [];
  public aTipoMoneda: IValoresDominio[] = [];
  public aTipoCuentaBancaria: IValoresDominio[] = [];
  public aEstadosCuenta: IValoresDominio[] = [];
  public sTipoDocumentoTercero!: string;
  public sNumeroDocumentoTercero!: string;
  public bAbrirFiltro: boolean = false;
  public aCuentasBancarias: ICuentasBancarias[] = [];

  frmCrearCuentaBancaria: FormGroup = this._formBuilder.group({
    nombreEntidadFinanciera: [null, [Validators.required]],
    tipoEntidad: { value: true, disabled: true },
    tipoEntidad1: null,
    tipoDocumentoEntidadFinanciera: { value: null, disabled: true },
    numeroDocumentoEntidadFinanciera: { value: null, disabled: true },
    tipoMoneda: [null, [Validators.required]],
    tipoCuenta: [null, [Validators.required]],
    numeroCuenta: [null, [Validators.required]],
    estadoCuentaBancaria: {
      value: CUENTA_BANCARIA.ESTADO_CUENTA,
      disabled: true,
    },
    activo: true,
    fechaCreacion: { value: new Date(), disabled: true },
    tipoDocumentoTercero: null,
    numeroDocumentoTercero: null,
    esTemporal: true,
  });

  get frmCuenta(): FormGroup['controls'] {
    return this.frmCrearCuentaBancaria.controls;
  }

  get fnHabilitarAgregar(): boolean {
    return this.frmCrearCuentaBancaria.invalid;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _listaSeccionStateService: ListaSeccionStateService,
    private _cuentasBancariasState: CuentasBancariasStateService,
    private _utilsService: UtilsService,
    private _confirmationService: ConfirmationService,
    private _route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    /** TODO: Cambiar por la llegada de datos encriptados */
    this._route.params.subscribe(async ({ tipoDocumento, numeroDocumento }) => {
      this.sTipoDocumentoTercero = tipoDocumento;
      this.sNumeroDocumentoTercero = numeroDocumento;

      this.frmCrearCuentaBancaria.patchValue({
        tipoDocumentoTercero: tipoDocumento,
        numeroDocumentoTercero: numeroDocumento,
      });
    });

    await this.fnCargarTipoMoneda();
    await this.fnCargarTipoCuentaBancaria();
    await this.fnCargarTiposEstados();
  }

  fnCargarDatosTerceroForm() {}

  /**
   * @description Cargar los tipos de moneda de las Listas de Selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTipoMoneda(): Promise<void> {
    this.aTipoMoneda = (
      await this._listaSeccionStateService.fnConsultarDominio({
        dominio1: CUENTA_BANCARIA.DOMINIO_TIPOMONEDA,
      })
    ).data[0]?.valoresDominios;

    if (this.aTipoMoneda.length > 0) {
      this._utilsService.fnSetLocalStorage('aTipoMoneda', this.aTipoMoneda);
      this.fnModificarListaTipoMoneda();
    } else {
      throw Error(ADM.PERDIDA_DATA);
    }
  }

  /**
   * @description Modificación de la lista normal de tipo de monedas para mostrar en Dropdown
   * @return {void} No retorna datos
   */
  fnModificarListaTipoMoneda(): void {
    this.aTipoMoneda = this.aTipoMoneda.map((valor: any) => {
      return {
        ...valor,
        sOpcionConcatenada: valor.sigla + ' - ' + valor.descripcion,
      };
    });
  }

  /**
   * @description Cargar los tipos de cuenta bancaria de las Listas de Selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTipoCuentaBancaria(): Promise<void> {
    this.aTipoCuentaBancaria = (
      await this._listaSeccionStateService.fnConsultarDominio({
        dominio1: CUENTA_BANCARIA.DOMINIO_TIPOCUENTA,
      })
    ).data[0]?.valoresDominios;

    if (this.aTipoCuentaBancaria.length > 0) {
      this._utilsService.fnSetLocalStorage(
        'aTipoCuentaBancaria',
        this.aTipoCuentaBancaria
      );
    } else {
      throw Error(ADM.PERDIDA_DATA);
    }
  }

  /**
   * @description Cargar los tipos de estados de una cuenta bancaria de las Listas de Selección
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarTiposEstados(): Promise<void> {
    this.aEstadosCuenta = (
      await this._listaSeccionStateService.fnConsultarDominio({
        dominio1: CUENTA_BANCARIA.DOMINIO_ESTADOCUENTA,
      })
    ).data[0]?.valoresDominios;

    if (this.aEstadosCuenta.length > 0) {
      this._utilsService.fnSetLocalStorage(
        'aEstadosCuenta',
        this.aEstadosCuenta
      );
    } else {
      throw Error(ADM.PERDIDA_DATA);
    }
  }

  /**
   * @description Mensaje de confirmación para descartar la asociación de una cuenta a la tabla
   * @return {void} No retorna datos
   */
  fnDescartarCuenta(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      key: 'cf-frm-crear',
      acceptLabel: ADM.ACCION_ACEPTAR,
      rejectLabel: ADM.ACCION_CANCELAR,
      message: CUENTA_BANCARIA.MSG_CANCELAR_PROCESO,
      accept: () => {
        this.fnResetFormulario();
      },
    });
  }

  /**
   * @description Método para emitir la cuenta a agregar, valida la longitud de la cuenta bancaria
   * @return {Promise<void>} No retorna datos
   */
  async fnAgregarCuentaBancaria(): Promise<void> {
    const nLongitudCuenta = await this.fnConsultarLogitudCuenta();
    const sToISOStringFecha = this.frmCuenta['fechaCreacion'].value;
    if (this.fnValidarCuentaIngresada(nLongitudCuenta)) {
      this.frmCrearCuentaBancaria.patchValue({
        numeroCuenta: String(this.frmCuenta['numeroCuenta'].value),
        fechaCreacion: sToISOStringFecha.toISOString(),
      });

      this.aCuentaBancaria.emit(this.frmCrearCuentaBancaria.getRawValue());
      this.fnResetFormulario();
    } else {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: `${CUENTA_BANCARIA.MSG_ME2.MSG_ME2_1} ${nLongitudCuenta} ${CUENTA_BANCARIA.MSG_ME2.MSG_ME2_2}`,
      });
    }
  }

  /**
   * @description Método para buscar el nombre completo del Tipo de cuenta
   * @return {string} Retorna el nombre del Tipo de Cuenta
   */
  fnConsultarNombreTipoCuenta(sTipoCuenta: string): string {
    return this.aTipoCuentaBancaria.filter(
      (valor) => valor.sigla === sTipoCuenta
    )[0].descripcion as string;
  }

  /**
   * @description Consulta la configuración de una cuenta bancaria y retorna solo su longitud
   * @return {Promise<number>} Retorna la longitud de la cuenta para validar
   */
  async fnConsultarLogitudCuenta(): Promise<number> {
    return (
      await this._cuentasBancariasState.fnConsultarConfiguracionCuenta({
        TipoCuenta: this.frmCuenta['tipoCuenta'].value,
        TipoDocumento: this.frmCuenta['tipoDocumentoEntidadFinanciera'].value,
        NumeroDocumento:
          this.frmCuenta['numeroDocumentoEntidadFinanciera'].value,
      })
    ).data[0].longitudCuenta;
  }

  /**
   * @description Validación de la longitud de la cuenta con los datos obtenidos de configuración y los ingresados por el usuario
   * @param {number} nLongitudCuenta Recibe la longitud de la cuenta de configuración
   * @return {boolean} Retorna false / true dependiendo de la condición
   */
  fnValidarCuentaIngresada(nLongitudCuenta: number): boolean {
    let bEstado = true;
    let nTotalCuenta: string = this.frmCuenta['numeroCuenta'].value;

    if (String(nTotalCuenta).length < 1) {
      bEstado = false;
    } else if (String(nTotalCuenta).length > nLongitudCuenta) {
      bEstado = false;
    }

    return bEstado;
  }

  /**
   * @description Método para resetar el formulario y mantener datos de uso para funcionamiento
   * @return {void} No retorna datos
   */
  fnResetFormulario(): void {
    this.frmCrearCuentaBancaria.reset({
      estadoCuentaBancaria: CUENTA_BANCARIA.ESTADO_CUENTA,
      activo: true,
      fechaCreacion: new Date(),
      esTemporal: true,
      tipoDocumentoTercero: this.sTipoDocumentoTercero,
      numeroDocumentoTercero: this.sNumeroDocumentoTercero,
    });
  }

  /**
   * @description Validar de forma general los campos del formulario
   * @param {string} sCampo Campo del formulario a validar
   * @return {boolean | undefined} Retorna un booleano o indefinido al realizar la validación
   */
  fnValidarCampo(sCampo: string): boolean | undefined {
    return this.frmCuenta[sCampo]?.invalid && this.frmCuenta[sCampo]?.touched;
  }

  /**
   * @description Obtener los posibles errores el formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {string} Retorna el mensaje de error para el formulario
   */
  fnListarErrorForm(sCampo: string): string {
    const errors = this.frmCuenta[sCampo]?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength'])
      return `No puede superar los ${errors?.['maxlength'].requiredLength} caracteres.`;
    if (errors?.['pattern'])
      return 'No se permiten espacios ni caracteres especiales.';
    if (errors?.['listaRegistrada'])
      return 'Ya se encuentra registrado como lista, verifique y registre nuevamente.';

    return '';
  }

  fnAbrirFiltroCuentasBancarias() {
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
  fnObtenerDataFiltro(aBancos: any): void {
    this.aCuentasBancarias = aBancos;

    this.frmCrearCuentaBancaria.patchValue({
      nombreEntidadFinanciera: aBancos.nombre,
      tipoEntidad: true,
      tipoEntidad1: aBancos.descripcionTipoEntidad,
      tipoDocumentoEntidadFinanciera: aBancos.tipoDocumento,
      numeroDocumentoEntidadFinanciera: aBancos.numeroDocumento,
    });

    if (
      this.frmCuenta['tipoEntidad1'].value === CUENTA_BANCARIA.CUENTA_NACIONAL
    ) {
      this.frmCrearCuentaBancaria.patchValue({
        tipoMoneda: CUENTA_BANCARIA.TIPO_MONEDA_NAC,
      });
    }
  }
}
