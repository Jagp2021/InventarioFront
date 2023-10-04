import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  IDatosAdministrativos,
  IDatosAdministrativosAcciones,
} from '../interfaces/datos-administrativos.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NO_ESPECIALES,
  NO_WHITE_SPACES,
  SIN_ESPACIOS_CARACTERES_ESPECIALES,
} from 'src/app/core/utils/Patterns';
import { DatosAdministrativosService } from '../services/datos-administrativos.service';
import { DATOS_ADMINISTRATIVOS } from '../constants/datos-administrativos.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ADM } from 'src/app/core/constant/adm.constants';

@Component({
  selector: 'app-datos-administrativos',
  templateUrl: './datos-administrativos.component.html',
  styleUrls: ['./datos-administrativos.component.scss'],
})
export class DatosAdministrativosComponent implements OnInit {
  @Input() sCodigoFuncionalidad: string | undefined;
  @Input() sIdRegistro: string | undefined;
  @Input() sTabla: string | undefined;
  @Input() bModalDatosAdministrativos: boolean = true;
  @Input() bMostrarComponente: boolean = true;
  @Input() bMostrarBotones: boolean = true;
  @Input() oAcciones: IDatosAdministrativosAcciones = {};
  @Input() bGuardarDatos: boolean = false;
  @Input() bEsModalFlotante: boolean = false;
  @Output() bCerrarDatosAdministrativos = new EventEmitter<boolean>(false);
  public oListaTipoDocumento: any[] = [];
  public oListaExpedidor: any[] = [];
  public oDatosAdministrativos: IDatosAdministrativos[] = [];
  public id: number = 0;
  public selectedItem: any = null;
  public selectedItem2: any = null;
  public sAccion: string = DATOS_ADMINISTRATIVOS.ACCION_CREAR;

  constructor(
    private _formBuilder: FormBuilder,
    private _datosAdministrativos: DatosAdministrativosService,
    private _utilsService: UtilsService
  ) {}

  frmDatosAdministrativos: FormGroup = this._formBuilder.group({
    id: ['0', []],
    codigoFuncionalidad: [''],
    tablaOrigen: [''],
    idRegistro: [''],
    fechaIngreso: ['', [Validators.required]],
    documentoSoporte: ['', [Validators.required]],
    numeroDocumentoSoporte: [
      '',
      [
        Validators.required,
        Validators.pattern(SIN_ESPACIOS_CARACTERES_ESPECIALES),
      ],
    ],
    nombreFuncionario: [
      '',
      [
        Validators.maxLength(DATOS_ADMINISTRATIVOS.VALOR_MAX_CARECTERES),
        Validators.pattern(NO_ESPECIALES),
        Validators.pattern(NO_WHITE_SPACES),
      ],
    ],
    cargoFuncionario: [
      '',
      [
        Validators.maxLength(DATOS_ADMINISTRATIVOS.VALOR_MAX_CARECTERES),
        Validators.pattern(NO_ESPECIALES),
        Validators.pattern(NO_WHITE_SPACES),
      ],
    ],
    expedidor: ['', [Validators.required]],
    observaciones: [''],
  });

  /**
   * Descripción: Consulta los campos del formulario de datos administrativos
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/04/2023
   */
  get formControlsDatosAdministrativos(): FormGroup['controls'] {
    return this.frmDatosAdministrativos.controls;
  }

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();
    this.consultarExpedidor();
    this.consultarTipoDocumentoSoporte();

    if (
      this.sCodigoFuncionalidad !== undefined &&
      this.sIdRegistro !== undefined
    ) {
      this.consultarDatosAdministrativos();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['oAcciones']) {
      if (changes['oAcciones'].currentValue['guardar'] == true) {
        if (this.frmDatosAdministrativos.valid) {
          this.crearDatosAdministrativos();
        } else {
          this.fnObtenerCierreFiltro(false);
        }
      }
    } else if (changes['bGuardarDatos'].currentValue) {
      this.crearDatosAdministrativos();
    }
  }

  /**
   * @description Contrae la modal al cerrar y emite el cierre del modal a donde se invoque
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltro(bCerrarDatosAdministrativos: boolean): void {
    this.bCerrarDatosAdministrativos.emit(bCerrarDatosAdministrativos);
  }

  /**
   * @description Valida cuando el campo no es valido
   */
  public campoNoValido(campo: string) {
    return (
      this.frmDatosAdministrativos.get(campo)?.invalid &&
      this.frmDatosAdministrativos.get(campo)?.touched
    );
  }

  /**
   * @description Muestra el mensaje de errores
   */
  public listaErroresMensaje(nombreCampo: string): string {
    const errors = this.frmDatosAdministrativos.get(nombreCampo)?.errors;
    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (
      (errors?.['maxlength'] && nombreCampo === 'nombreFuncionario') ||
      (errors?.['maxlength'] && nombreCampo === 'cargoFuncionario')
    )
      return 'Debe ser máximo de ' + DATOS_ADMINISTRATIVOS.VALOR_MAX_CARECTERES;
    if (
      (errors?.['pattern'] && nombreCampo === 'nombreFuncionario') ||
      (errors?.['pattern'] && nombreCampo === 'cargoFuncionario')
    )
      return 'No se permiten espacios ni caracteres especiales.';
    return '';
  }

  /**
   * @description Carga los tipos de documento soporte de listas de selección
   * @return {Promise<void>} No retorna datos
   */
  async consultarTipoDocumentoSoporte(): Promise<void> {
    this.oListaTipoDocumento = (
      await this._datosAdministrativos.consultarListaSeleccion({
        dominio1: DATOS_ADMINISTRATIVOS.tipoDocumentoSoporte,
      })
    ).data[0]?.valoresDominios;
  }

  /**
   * @description Carga los tipos de documentos de listas de expedidor
   * @return {Promise<void>} No retorna datos
   */
  async consultarExpedidor(): Promise<void> {
    this.oListaExpedidor = (
      await this._datosAdministrativos.consultarListaSeleccion({
        dominio1: DATOS_ADMINISTRATIVOS.expedidor,
      })
    ).data[0]?.valoresDominios;
  }

  /**
   * @description Cierra el modal
   */
  public cancelar() {
    this.frmDatosAdministrativos.reset();
    this.bCerrarDatosAdministrativos.emit(false);
  }

  /**
   * @description Función que consulta los datos administrativos
   */
  public async consultarDatosAdministrativos(): Promise<void> {
    let datos: IDatosAdministrativos = {
      codigoFuncionalidad: String(this.sCodigoFuncionalidad),
      idRegistro: Number(this.sIdRegistro),
    };

    let respuesta =
      await this._datosAdministrativos.consultarDatosAdministrativos(datos);

    if (respuesta.estado) {
      this.oDatosAdministrativos = respuesta.data[0];
      if (this.oDatosAdministrativos != undefined) {
        this.cargarDatosAdministrativos(this.oDatosAdministrativos);
      }
    }
  }

  /**
   * Permite pregarcar los datos en el formulario
   * @param oDatos datos a precargar
   */
  public cargarDatosAdministrativos(oDatos?: any): void {
    let fecha = new Date(oDatos.fechaIngreso?.split('T')[0]);
    this.frmDatosAdministrativos.patchValue({
      ...this.oDatosAdministrativos,
      fechaIngreso: fecha,
    });
    this.sAccion = DATOS_ADMINISTRATIVOS.ACCION_EDITAR;
  }

  /**
   * @description Función que me permite crear o actualizar los datos administrativos
   */
  public async crearDatosAdministrativos(): Promise<void> {
    let oValoresFormulario = this.frmDatosAdministrativos.value;
    let respuesta: IRespuestaApi;
    let oDatos: IDatosAdministrativos = {
      ...oValoresFormulario,
      codigoFuncionalidad: String(this.sCodigoFuncionalidad),
      tablaOrigen: this.sTabla,
      idRegistro: Number(this.sIdRegistro),
      fechaIngreso: oValoresFormulario.fechaIngreso,
      numeroDocumentoSoporte: String(oValoresFormulario.numeroDocumentoSoporte),
    };
    if (this.frmDatosAdministrativos.valid) {
      console.log(this.sAccion);

      if (this.sAccion === DATOS_ADMINISTRATIVOS.ACCION_EDITAR) {
        respuesta = await this._datosAdministrativos.editarDatosAdministrativos(
          oDatos
        );
      } else {
        respuesta = await this._datosAdministrativos.crearDatosAdministrativos(
          oDatos
        );
      }
      if (respuesta.estado) {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.creado,
          summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
          detail: respuesta.mensaje,
        });
      } else {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail: respuesta.mensaje,
        });
      }
      this.fnObtenerCierreFiltro(true);
    } else {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: 'Fallo',
      });
    }
  }
}
