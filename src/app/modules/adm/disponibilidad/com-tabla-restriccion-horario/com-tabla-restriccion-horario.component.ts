import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ADM } from 'src/app/core/constant/adm.constants';
import { HORARIO_SISTEMA } from 'src/app/core/constant/adm/horario-sistema.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import { convertirFechaHora } from 'src/app/core/shared/functions/funciones-generales';
import { IRestriccionHorario } from 'src/app/domain/interface/adm/disponibilidad/restriccion-horario.interface';
import { IRestriccionSistema } from 'src/app/domain/interface/adm/disponibilidad/restriccion-sistema.interface';
import { RestriccionDisponibilidadStateService } from 'src/app/domain/service/adm/disponibilidad/restriccion-disponibilidad-state.service';

@Component({
  selector: 'app-com-tabla-restriccion-horario',
  templateUrl: './com-tabla-restriccion-horario.component.html',
  styleUrls: ['./com-tabla-restriccion-horario.component.scss'],
})
export class ComTablaRestriccionHorarioComponent implements OnInit, OnChanges {
  @Input() oRestriccionDisponibilidadId: IRestriccionSistema[] = [];
  @Output() oListaHorarioEmitter = new EventEmitter<IRestriccionHorario[]>();
  public oListaHorario: IRestriccionHorario[] = [];
  public nIdRestriccion: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _utilsService: UtilsService
  ) {}
  frmHorariosSistema: FormGroup = this._formBuilder.group({
    id: 0,
    horaInicio: [, [Validators.required]],
    horaFinal: [, [Validators.required]],
  });

  ngOnInit(): void {}
  ngOnChanges(cambio: SimpleChanges) {
    let respuesta =
      cambio['oRestriccionDisponibilidadId'].currentValue[
        'restriccionesHorarios'
      ];
    if (respuesta != undefined) {
      this.oListaHorario = respuesta;
      this.nIdRestriccion =
        cambio['oRestriccionDisponibilidadId'].currentValue.id;
      this.oListaHorarioEmitter.emit(this.oListaHorario);
    }
  }

  public async agregarReestriccionHorario() {
    let oFormHorario = this.frmHorariosSistema.value;
    let oRespuestaValidarHorario: any;
    let sHoraInicio = convertirFechaHora(oFormHorario.horaInicio);
    let sHoraFinal = convertirFechaHora(oFormHorario.horaFinal);
    let bExiste: boolean = false;
    let oHorario: IRestriccionHorario = {
      id: oFormHorario.id,
      horaInicio: sHoraInicio,
      horaFinal: sHoraFinal,
      idRestriccion: this.nIdRestriccion,
    };
    if (oFormHorario.horaInicio <= oFormHorario.horaFinal) {
      const bValidarHora = this.validarExistenciaRestriccionHorario(
        sHoraInicio,
        sHoraFinal
      );
      // this.oListaHorario.forEach((valor: any) => {
      //   //let bExiste = false;
      //   // if (
      //   //   (sHoraInicio >= valor.horaInicio && sHoraInicio <= valor.horaFinal) ||
      //   //   (sHoraFinal >= valor.horaInicio && sHoraFinal <= valor.horaFinal)
      //   // ) {

      //   // this._utilsService.fnMostrarMensaje({
      //   //   severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
      //   //   summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
      //   //   detail: 'Los rangos de horario se superponen',
      //   // });
      //   true;
      //   bExiste =
      //     (sHoraInicio >= valor.horaInicio && sHoraInicio <= valor.horaFinal) ||
      //     (sHoraFinal >= valor.horaInicio && sHoraFinal <= valor.horaFinal)
      //       ? true
      //       : false;
      //   // } else {
      //   //   console.log('no');
      //   // }
      //   console.log(bExiste);
      // });
      // // oRespuestaValidarHorario =
      // //   await this._restriccionDisponibilidadState.validarExistenciaRestriccionHorario(
      // //     oHorario
      // //   );

      if (bValidarHora) {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail: 'Los rangos de horario se superponen',
        });
      } else {
        this.oListaHorario.push(oHorario);
        this.oListaHorarioEmitter.emit(this.oListaHorario);
      }
    } else {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: HORARIO_SISTEMA.MSG_ERROR_VALIDAR_HORA,
      });
    }
  }

  public validarExistenciaRestriccionHorario(
    sHoraInicio: any,
    sHoraFinal: any
  ): boolean {
    let bExisteData = false;
    //if (this.oListaHorario.length > 0) {
    bExisteData = this.oListaHorario.some((valor: any) => {
      return (
        (sHoraInicio >= valor.horaInicio && sHoraInicio <= valor.horaFinal) ||
        (sHoraFinal >= valor.horaInicio && sHoraFinal <= valor.horaFinal)
      );
    });
    // }

    return bExisteData;
  }
  public async eliminarRestriccionHorario(
    oRestriccionHorario: IRestriccionHorario,
    nIndice: number
  ) {
    this.oListaHorario.splice(nIndice, 1);
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
}
