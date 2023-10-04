import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';

import { CuentasBancariasStateService } from 'src/app/domain/service/adm/cuentas-bancarias/cuentas-bancarias-state.service';
import { UtilsService } from 'src/app/core/services/utils.service';

import { ICuentasBancarias } from 'src/app/domain/interface/adm/cuentas-bancarias/cuentas-bancarias.interface';
import { IValoresDominio } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { ADM } from 'src/app/core/constant/adm.constants';
import { CUENTA_BANCARIA } from 'src/app/core/constant/adm/cuentas-bancarias';

@Component({
  selector: 'app-com-tabla-cuentas',
  templateUrl: './com-tabla-cuentas.component.html',
  styleUrls: ['./com-tabla-cuentas.component.scss'],
})
export class ComTablaCuentasComponent implements OnInit {
  @Input() aCuentaAgregar!: ICuentasBancarias;
  @Output() aCuentasGuardar = new EventEmitter<any[]>(true);
  public bDisplayModal: boolean = false;
  public bCargarLoading: boolean = true;
  public aTipoMoneda: IValoresDominio[] = [];
  public aTipoCuentaBancaria: IValoresDominio[] = [];
  public aEstadosCuenta: IValoresDominio[] = [];
  public oMensajeBandera!: Message[];
  public aCuentasBancarias: ICuentasBancarias[] = [];
  public sTipoDocumento!: string;
  public sNumeroDocumento!: string;

  frmEditarCuenta: FormGroup = this._formBuilder.group({
    indice: null,
    nombreEntidadFinanciera: [{ value: null, disabled: true }],
    tipoDocumentoEntidadFinanciera: null,
    numeroDocumentoEntidadFinanciera: null,
    id: null,
    entidadFinanciera: null,
    tipoEntidad: true,
    tipoMoneda: null,
    tipoCuenta: [{ value: null, disabled: true }, [Validators.required]],
    numeroCuenta: [{ value: null, disabled: true }, [Validators.required]],
    estadoCuentaBancaria: null,
    fechaCreacion: [{ value: null, disabled: true }],
    activo: null,
    tipoDocumentoTercero: null,
    numeroDocumentoTercero: null,
  });

  get frmEditar(): FormGroup['controls'] {
    return this.frmEditarCuenta.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _utilsService: UtilsService,
    private _cuentasBancariasState: CuentasBancariasStateService,
    private _route: ActivatedRoute
  ) {}

  async ngOnChanges(cambioEstado: SimpleChanges) {
    if (cambioEstado['aCuentaAgregar']) {
      if (cambioEstado['aCuentaAgregar'].currentValue !== undefined) {
        await this.fnCargarCuentaLocal(
          cambioEstado['aCuentaAgregar'].currentValue
        );
      }
    }
  }

  async ngOnInit(): Promise<void> {
    this._route.params.subscribe(async ({ tipoDocumento, numeroDocumento }) => {
      /** TODO: Desncryptar cuando se envíe desde los otros CU */
      // const sTipoDocumento = this._utilsService.fnDesencryptar(
      //   tipoDocumento
      // ) as string;
      // const sNumeroDocumento = this._utilsService.fnDesencryptar(
      //   numeroDocumento
      // ) as string;

      /** TODO: Cambiar por los desencriptados */
      this.sTipoDocumento = tipoDocumento;
      this.sNumeroDocumento = numeroDocumento;
      await this.fnConsultarCuentasBancarias(tipoDocumento, numeroDocumento);
    });
  }

  /**
   * @description Consulta las cuentas bancarias asociadas al tercero con los datos capturados de URL
   * @param {string} sTipoDocumento tipo de documento
   * @param {string} sNumeroDocumento número de documento
   * @return {Promise<void>} No retorna datos
   */
  async fnConsultarCuentasBancarias(
    sTipoDocumento: string,
    sNumeroDocumento: string
  ): Promise<void> {
    this.aCuentasBancarias = (
      await this._cuentasBancariasState.fnConsultarCuentaBancaria({
        TipoDocumentoTercero: sTipoDocumento,
        NumeroDocumentoTercero: sNumeroDocumento,
      })
    ).data;

    this.bCargarLoading = false;
  }

  /**
   * @description Método que permite capturar la cuenta emitida y volver a emitir hacía el padre para el guardado final
   * @param {ICuentasBancarias} oCuentaAgregar Objeto de tipo Cuenta emitida del formulario
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarCuentaLocal(oCuentaAgregar: ICuentasBancarias): Promise<void> {
    const aFechaCreacion = oCuentaAgregar.fechaCreacion?.toLocaleString('es');
    const sTipoCuenta = this.fnConsultarTipo(
      oCuentaAgregar,
      'aTipoCuentaBancaria'
    );
    const sTipoEstado = this.fnConsultarTipo(
      oCuentaAgregar,
      'aEstadosCuenta',
      false
    );

    oCuentaAgregar = {
      ...oCuentaAgregar,
      descripcionTipoCuenta: sTipoCuenta,
      descripcionEstadoCuentaBancaria: sTipoEstado,
      fechaCreacion: aFechaCreacion
        ?.split(',')[0]
        .split('/')
        .reverse()
        .join('/'),
    };

    if (this.fnValidarCuentasRepetidas(oCuentaAgregar)) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: CUENTA_BANCARIA.MSG_ME7,
      });
    } else {
      this.aCuentasBancarias.push(oCuentaAgregar);
      this.aCuentasGuardar.emit(this.aCuentasBancarias);
      this.fnCrearMensajeBandera(`${CUENTA_BANCARIA.MSG_GUARDAR}
      ${oCuentaAgregar.descripcionTipoCuenta} - ${oCuentaAgregar.numeroCuenta}`);
    }
  }

  /**
   * @description Valida que la cuenta recibida no se encuentre ya asociada en la tabla
   * @param {ICuentasBancarias} oCuentasGuardar Objeto de tipo Cuenta emitida del formulario
   * @return {boolean} Retorna true / false si encuentra una concidencia
   */
  fnValidarCuentasRepetidas(oCuentasGuardar: ICuentasBancarias): boolean {
    let aDuplicados: any[] = [];
    let bEncontrado: boolean = false;

    aDuplicados = this.aCuentasBancarias.filter((cuenta: any) => {
      return (
        String(cuenta.numeroCuenta) === String(oCuentasGuardar.numeroCuenta)
      );
    });

    if (aDuplicados.length > 0) {
      bEncontrado = true;
    }

    return bEncontrado;
  }

  /**
   * @description Permite retornar el nombre del TipoCuenta y EstadoCuenta que no se tienen por consulta
   * @param {ICuentasBancarias} oCuentaAgregar Objeto de tipo Cuenta emitida del formulario
   * @param {string} sLocalItem Captura el dato almacenado en el LocalStorage para su consulta
   * @param {boolean} bTipoCuenta Es true si se requiere consultar por TipoCuenta - False EstadoCuenta
   * @return {string} Retorna el tipo de dato completo para visualizar en la tabla
   */
  fnConsultarTipo(
    oCuentaAgregar: ICuentasBancarias,
    sLocalItem: string,
    bTipoCuenta: boolean = true
  ): string {
    let sTipoEncontrado: any[] = [];
    let sCuenta: string = '';
    const aTipo = JSON.parse(localStorage.getItem(sLocalItem) as string);
    const sCampo = bTipoCuenta
      ? oCuentaAgregar.tipoCuenta
      : oCuentaAgregar.estadoCuentaBancaria;

    sTipoEncontrado = aTipo.filter(
      (val: any) => String(val.sigla) === String(sCampo)
    );

    if (sTipoEncontrado !== undefined && sTipoEncontrado.length > 0) {
      sCuenta = sTipoEncontrado[0]['descripcion'];
    }

    return sCuenta;
  }

  /**
   * @description Carga los datos a la modal y realiza validaciones de tipo moneda
   * @param {number} nIndex Posición en la tabla
   * @param {ICuentasBancarias} oCuentaBancaria Objeto de tipo Cuenta emitida del formulario
   * @return {void} No retorna datos
   */
  fnEditarCuentaBancaria(
    nIndex: number,
    oCuentaBancaria: ICuentasBancarias
  ): void {
    this.bDisplayModal = true;

    this.frmEditarCuenta.patchValue({
      ...this.frmEditarCuenta.getRawValue(),
      indice: nIndex,
      nombreEntidadFinanciera: oCuentaBancaria.nombreEntidadFinanciera,
      tipoDocumentoEntidadFinanciera:
        oCuentaBancaria.tipoDocumentoEntidadFinanciera,
      numeroDocumentoEntidadFinanciera:
        oCuentaBancaria.numeroDocumentoEntidadFinanciera,
      id: oCuentaBancaria.id,
      tipoMoneda: oCuentaBancaria.tipoMoneda,
      tipoCuenta: oCuentaBancaria.tipoCuenta,
      numeroCuenta: oCuentaBancaria.numeroCuenta,
      estadoCuentaBancaria: oCuentaBancaria.estadoCuentaBancaria,
      fechaCreacion: new Date(oCuentaBancaria.fechaCreacion as string),
      activo: oCuentaBancaria.activo,
      tipoDocumentoTercero: oCuentaBancaria.tipoDocumentoTercero,
      numeroDocumentoTercero: oCuentaBancaria.numeroDocumentoTercero,
    });

    oCuentaBancaria.estadoCuentaBancaria !== CUENTA_BANCARIA.ESTADO_REGP
      ? this.frmEditar['tipoMoneda'].disable()
      : this.frmEditar['tipoMoneda'].enable();

    this.fnCargarDatosListas();
  }

  /**
   * @description Carga las listas en la modal y ejecuta la lista de estados con sus dependencias
   * @return {void} No retorna datos
   */
  fnCargarDatosListas(): void {
    this.aTipoCuentaBancaria = JSON.parse(
      localStorage.getItem('aTipoCuentaBancaria') as string
    );

    this.aTipoMoneda = JSON.parse(
      localStorage.getItem('aTipoMoneda') as string
    );

    this.aEstadosCuenta = JSON.parse(
      localStorage.getItem('aEstadosCuenta') as string
    );

    this.fnModificarListaTipoMoneda();
    this.fnModificarEstadosCuenta();
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
   * @description Modificación de la lista tipo estados de cuenta según el CU
   * @return {void} No retorna datos
   */
  fnModificarEstadosCuenta(): void {
    let aEstadoActual;
    const sEstadoCuenta = this.frmEditar['estadoCuentaBancaria'].value;
    const aEstados: any[] = [...this.aEstadosCuenta];
    const aEstados1 = ['ACT', 'CANC', 'INV'];
    const aEstados1Par = ['REGP', 'INAC'];
    const aEstados2 = ['INAC'];
    const aEstados2Par = ['REGP'];
    const aEstados3 = ['REGP'];
    const aEstados3Par = ['INAC'];

    if (aEstados1.includes(sEstadoCuenta)) {
      this.aEstadosCuenta = aEstados.filter((valor) => {
        return aEstados1Par.includes(valor.sigla);
      });

      aEstadoActual = aEstados.filter((valor) => valor.sigla === sEstadoCuenta);
      this.aEstadosCuenta.push(aEstadoActual[0]);
    }

    if (aEstados2.includes(sEstadoCuenta)) {
      this.aEstadosCuenta = aEstados.filter((valor) => {
        return aEstados2Par.includes(valor.sigla);
      });

      aEstadoActual = aEstados.filter((valor) => valor.sigla === sEstadoCuenta);
      this.aEstadosCuenta.push(aEstadoActual[0]);
    }

    if (aEstados3.includes(sEstadoCuenta)) {
      this.aEstadosCuenta = aEstados.filter((valor) => {
        return aEstados3Par.includes(valor.sigla);
      });

      aEstadoActual = aEstados.filter((valor) => valor.sigla === sEstadoCuenta);
      this.aEstadosCuenta.push(aEstadoActual[0]);
    }
  }

  /**
   * @description Emite los cambios realizados en la modal el editar la cuenta y los baja a tabla
   * @return {Promise<void>} No retorna datos
   */
  async fnEditarTempCuentaBancaria(): Promise<void> {
    this.aCuentasBancarias[this.frmEditar['indice'].value] = {
      ...this.frmEditarCuenta.getRawValue(),
    };

    const sTipoCuenta = this.fnConsultarTipo(
      this.aCuentasBancarias[this.frmEditar['indice'].value],
      'aTipoCuentaBancaria'
    );
    const sTipoEstado = this.fnConsultarTipo(
      this.aCuentasBancarias[this.frmEditar['indice'].value],
      'aEstadosCuenta',
      false
    );

    this.aCuentasBancarias[
      this.frmEditar['indice'].value
    ].descripcionTipoCuenta = sTipoCuenta;
    this.aCuentasBancarias[
      this.frmEditar['indice'].value
    ].descripcionEstadoCuentaBancaria = sTipoEstado;

    this.bDisplayModal = false;
    this.aCuentasGuardar.emit(this.aCuentasBancarias);
  }

  /**
   * @description Lanza el mensaje para desvincular una cuenta, si se acepta procede a utilizar el endpoint de actualizar
   * @param {ICuentasBancarias} oCuenta Objeto de tipo Cuenta emitida del formulario
   * @param {string} sTitulo Título del modal de confirmación
   * @return {Promise<void>} No retorna datos
   */
  async fnVincularCuentaBancaria(
    oCuenta: ICuentasBancarias,
    sTitulo: string
  ): Promise<void> {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      key: 'cf-frm-desvincular',
      message: `${CUENTA_BANCARIA.MSG_DESVINCULAR.MSG_DESVINCULAR_1}
                ${sTitulo} ${CUENTA_BANCARIA.MSG_DESVINCULAR.MSG_DESVINCULAR_2}`,
      accept: async () => {
        const resultado =
          await this._cuentasBancariasState.fnActualizarCuentaBancaria([
            {
              id: oCuenta.id,
              tipoDocumentoEntidadFinanciera:
                oCuenta.tipoDocumentoEntidadFinanciera,
              numeroDocumentoEntidadFinanciera:
                oCuenta.numeroDocumentoEntidadFinanciera,
              tipoCuenta: oCuenta.tipoCuenta,
              numeroCuenta: oCuenta.numeroCuenta,
              tipoMoneda: oCuenta.tipoMoneda,
              fechaCreacion: oCuenta.fechaCreacion,
              activo: false,
              tipoDocumentoTercero: oCuenta.tipoDocumentoTercero,
              numeroDocumentoTercero: oCuenta.numeroDocumentoTercero,
              estadoCuentaBancaria: oCuenta.estadoCuentaBancaria,
            },
          ]);

        if (resultado.estado && resultado.codigo === ADM.ESTADO_HTTP_200) {
          this.fnConsultarCuentasBancarias(
            this.sTipoDocumento,
            this.sNumeroDocumento
          );
          this.fnCrearMensajeBandera(`${CUENTA_BANCARIA.MSG_VINCULAR}`);
        }
      },
    });
  }

  /**
   * @description Cerrar la modal
   * @param {boolean} bEstado Bandera
   * @return {void} No retorna datos
   */
  fnCerrarModal(bEstado: boolean): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      key: 'cf-frm-cerrarmd',
      header: 'Cancelar proceso',
      accept: () => {
        this.bDisplayModal = false;
      },
    });
  }

  fnCrearMensajeBandera(sMensaje: string) {
    this.oMensajeBandera = [
      {
        severity: ADM.ESTADO_EXITOSO,
        summary: 'Exitoso',
        detail: `${sMensaje}`,
      },
    ];
  }

  /**
   * @description Validar de forma general los campos del formulario
   * @param {string} sCampo Campo del formulario a validar
   * @return {boolean | undefined} Retorna un booleano o indefinido al realizar la validación
   */
  fnValidarCampo(sCampo: string): boolean | undefined {
    return this.frmEditar[sCampo]?.invalid && this.frmEditar[sCampo]?.touched;
  }

  /**
   * @description Obtener los posibles errores el formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {string} Retorna el mensaje de error para el formulario
   */
  fnListarErrorForm(sCampo: string): string {
    const errors = this.frmEditar[sCampo]?.errors;

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

  /**
   * @description Lanza el mensaje para desvincular una cuenta, si se acepta procede a utilizar el endpoint de actualizar
   * @param {any} oEvento Objeto de tipo Cuenta emitida del formulario
   * @param {number} sTitulo Índice de la tabla
   * @param {boolean} bMostrar Bandera para mostrar o no mostrar los botones
   * @param {string} sId Complementa el ID único para cada tabla
   * @return {void} No retorna datos
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
}
