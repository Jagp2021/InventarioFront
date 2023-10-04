import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ADM } from 'src/app/core/constant/adm.constants';
import { FUENTEEXTERNA } from 'src/app/core/constant/adm/fuentes-externas.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import {
  IDatosAutenticar,
  IFuenteExterna,
} from 'src/app/domain/interface/adm/fuentes-externas/fuentes-externas.interface';
import { FuentesExternasStateService } from 'src/app/domain/service/adm/fuentes-externas/fuentes-externas-state.service';

@Component({
  selector: 'app-frm-fuentes-externas',
  templateUrl: './frm-fuentes-externas.component.html',
  styleUrls: ['./frm-fuentes-externas.component.scss'],
})
export class FrmFuentesExternasComponent implements OnInit {
  public bMostrarLogin: boolean = false;
  public bEditadoLogin: boolean = false;
  public oDatosAutenticacion: IDatosAutenticar = {
    usuario: null,
    contrasena: null,
  };

  frmEditarFuenteExterna: FormGroup = this._formBuilder.group({
    codigo: '',
    descripcion: '',
    activo: false,
    requeridoFuenteExterna: false,
    requiereAutenticacion: false,
    usuario: '',
    contrasena: '',
  });

  get frmFuente(): FormGroup['controls'] {
    return this.frmEditarFuenteExterna.controls;
  }

  constructor(
    public ref: DynamicDialogRef,
    private _formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _config: DynamicDialogConfig,
    private _utilsService: UtilsService,
    private _fuentesExternasStateService: FuentesExternasStateService
  ) {}

  ngOnInit(): void {
    if (this._config.data === undefined) {
      throw Error('Missing data...');
    } else {
      this.fnCargarInformacionFuenteExterna();
    }
  }

  /**
   * @description Carga la información al formulario para realizar la edición
   * @return {void} No retorna datos
   */
  fnCargarInformacionFuenteExterna(): void {
    const data: IFuenteExterna = this._config.data.oFuente;

    this.frmEditarFuenteExterna.patchValue({
      codigo: data?.codigo,
      descripcion: data?.descripcion,
      activo: data?.activo,
      requeridoFuenteExterna: data?.requeridoFuenteExterna,
      requiereAutenticacion: data?.requiereAutenticacion,
    });

    if (data.usuario !== null || data.usuario !== '') {
      this.oDatosAutenticacion = {
        usuario: data.usuario,
        contrasena: data.contrasena,
      };
    }
  }

  /**
   * @description Cierra la modal de autenticación de datos
   * @return {void} No retorna datos
   */
  fnCerrarAutenticacion(): void {
    const data: IFuenteExterna = this._config.data.oFuente;
    this.bMostrarLogin = false;

    if (data.contrasena !== null && data.contrasena !== '') {
      this.frmEditarFuenteExterna.patchValue({
        requiereAutenticacion: true,
      });
    } else {
      this.frmEditarFuenteExterna.patchValue({
        requiereAutenticacion: false,
      });
    }
  }

  /**
   * @description Cierra la modal general de edición de Fuentes Externas
   * @return {void} No retorna datos
   */
  fnCerrarModal(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this.ref.close();
      },
    });
  }

  /**
   * @description Permite editar la información de la fuente externa
   * @return {Promise<void>} No retorna datos
   */
  async fnEditarFuenteExterna(): Promise<void> {
    if (this.frmFuente['contrasena'].value !== '') {
      this.fnEncriptarDatos();
    }

    this.frmEditarFuenteExterna.patchValue({
      usuario: this.bEditadoLogin
        ? this.frmFuente['usuario'].value
        : this.oDatosAutenticacion.usuario,
      contrasena: this.bEditadoLogin
        ? this.frmFuente['contrasena'].value
        : this.oDatosAutenticacion.contrasena,
    });

    if (this.frmFuente['requiereAutenticacion'].value === false) {
      this.frmEditarFuenteExterna.patchValue({
        usuario: null,
        contrasena: null,
      });
    }

    let respuesta =
      await this._fuentesExternasStateService.editarFuentesExternas(
        this.frmEditarFuenteExterna.getRawValue()
      );

    if (respuesta.estado) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.creado,
        summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
        detail: FUENTEEXTERNA.MSG_GUARDAR.concat(
          '',
          this.frmFuente['descripcion'].value
        ),
      });

      await this._utilsService.fnSleep(1000);
      this.ref.close({ estado: true });
    }
  }

  /**
   * @description Encriptar la contraseña de autenticación
   * @return {void} No retorna datos
   */
  fnEncriptarDatos(): void {
    const contrasena = this.frmFuente['contrasena'].value;
    const contrasenaEncrypt = this._utilsService.fnEncryptar(contrasena);

    this.frmEditarFuenteExterna.patchValue({
      contrasena: contrasenaEncrypt,
    });
  }

  /**
   * @description Cierra la modal general de edición de Fuentes Externas
   * @param {boolean} bEsActivo booleano para habilitar login
   * @return {void} No retorna datos
   */
  fnActivarCamposUsuario(bEsActivo: boolean): void {
    const data = this._config.data.oFuente;
    this.bMostrarLogin = bEsActivo;

    if (data?.usuario !== null && bEsActivo) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.advertencia,
        summary: ADM.ACCIONES_TOAST.toastMensaje.advertencia,
        detail: FUENTEEXTERNA.MSG_ME1,
      });
    }
  }

  /**
   * @description Valida si se ingresaron los datos en usuario y contraseña
   * @return {void} No retorna datos
   */
  fnEditarAuditoria(): void {
    if (
      this.frmFuente['usuario'].value === '' &&
      this.frmFuente['contrasena'].value === ''
    ) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail:
          FUENTEEXTERNA.MSG_ME3_1 +
          ' ' +
          this._config.data.oFuente?.descripcion +
          ' ' +
          FUENTEEXTERNA.MSG_ME3_2,
      });
      return;
    }

    this.bEditadoLogin = true;
    this.fnActivarCamposUsuario(false);
  }
}
