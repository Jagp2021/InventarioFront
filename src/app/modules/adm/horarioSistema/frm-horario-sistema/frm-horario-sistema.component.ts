import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ADM } from 'src/app/core/constant/adm.constants';
import { HORARIO_SISTEMA } from 'src/app/core/constant/adm/horario-sistema.constants';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { convertirFechaHora } from 'src/app/core/shared/functions/funciones-generales';
import { IHorarioSistema } from 'src/app/domain/interface/adm/horario-sistema/horario-sistema.interface';
import { HorarioSistemaStateService } from 'src/app/domain/service/adm/horarioSistema/horario-sistema-state.service';

@Component({
  selector: 'app-frm-horario-sistema',
  templateUrl: './frm-horario-sistema.component.html',
  styleUrls: ['./frm-horario-sistema.component.scss'],
})
export class FrmHorarioSistemaComponent implements OnInit {
  public oListaHorarioSistema: IHorarioSistema[] = [];
  public bExisteHorarioSistema?: IHorarioSistema[] = [];
  private consultarHorarioSistema$!: Subscription;
  mensaje: any = [];
  constructor(
    private _confirmationService: ConfirmationService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _horarioSistema: HorarioSistemaStateService
  ) {}

  frmHorariosSistema = new FormGroup({
    id: new FormControl('0', []),
    horaInicial: new FormControl('', [Validators.required]),
    horaFinal: new FormControl('', [Validators.required]),
  });

  /**
   * Descripción: Consulta los campos del formulario de Horario del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   */
  get frmControlsHorariosSistema(): FormGroup['controls'] {
    return this.frmHorariosSistema.controls;
  }

  ngOnInit(): void {
    this.cargaInicial();
    this.consultarHorariosSistema();
  }

  public campoNoValido(campo: string) {
    return (
      this.frmHorariosSistema.get(campo)?.invalid &&
      this.frmHorariosSistema.get(campo)?.touched
    );
  }

  public listaErroresMensaje(nombreCampo: string): string {
    const errors = this.frmHorariosSistema.get(nombreCampo)?.errors;
    if (errors?.['required']) return 'Este campo es obligatorio.';
    return '';
  }

  /**
   * Descripción: Acción de Cancelar los cambios del formulario
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   */
  public cancelar(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this.ref.close();
      },
    });
  }

  /**
   * Descripción: Servicio que consulta los Horarios del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/04/2023
   */
  public consultarHorariosSistema(): void {
    let datos: IHorarioSistema = {};
    this._horarioSistema.consultarHorarioSistema(datos);
    this.consultarHorarioSistema$ = this._horarioSistema
      .select((e) => e.oListaHorariosSistema)
      .subscribe({
        next: (e) => {
          this.oListaHorarioSistema = e;
        },
      });
  }
  /**
   * Descripción: Acción que permite crear o editar los horarios del sistema
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   */
  public async crearHorarioSistema() {
    let horaInicial: any;
    let horaFinal: any;
    let id = 0;
    let respuesta: any;
    horaInicial = convertirFechaHora(this.frmHorariosSistema.value.horaInicial);
    horaFinal = convertirFechaHora(this.frmHorariosSistema.value.horaFinal);

    id =
      this.config.data.tipo === 'editar'
        ? (id = this.config.data.datosHorarioSistema.id)
        : id;

    let datos: IHorarioSistema = {
      id: id,
      horaInicial: horaInicial,
      horaFinal: horaFinal,
    };

    if (horaInicial <= horaFinal) {
      respuesta =
        await this._horarioSistema.validarHorarioSistema<IRespuestaApi>(datos);

      if (respuesta.estado != false) {
        if (this.config.data.tipo === 'editar') {
          respuesta = await this._horarioSistema.editarHorarioSistema(datos);
        } else {
          respuesta = await this._horarioSistema.crearHorarioSistema(datos);
        }

        respuesta.estado === true
          ? this.ref.close(true)
          : this.ref.close(false);
        await this.consultarHorariosSistema();
      }

      this._horarioSistema.mensajeFormularioHora.emit(respuesta);
    } else {
      this._horarioSistema.mensajeFormularioHora.emit({
        respuesta: false,
        mensaje: HORARIO_SISTEMA.MSG_ERROR_VALIDAR_HORA,
      });
    }
  }

  /**
   * Descripción: Acción que permite pre cargar los datos de una hora
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   */
  public cargaInicial() {
    if (this.config.data.tipo === 'editar') {
      let datos = this.config.data.datosHorarioSistema;
      let horaInicial = new Date('2020-05-12T' + datos.horaInicial);
      let horaFinal = new Date('2020-05-12T' + datos.horaFinal);

      this.frmControlsHorariosSistema['horaInicial'].setValue(horaInicial);
      this.frmControlsHorariosSistema['horaFinal'].setValue(horaFinal);
    }
  }

  ngOnDestroy(): void {
    this.consultarHorarioSistema$.unsubscribe();
  }
}
