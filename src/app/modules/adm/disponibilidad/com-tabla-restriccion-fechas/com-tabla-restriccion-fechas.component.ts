import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ADM } from 'src/app/core/constant/adm.constants';
import { HORARIO_SISTEMA } from 'src/app/core/constant/adm/horario-sistema.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import { convertirFecha } from 'src/app/core/shared/functions/funciones-generales';
import { IRestriccionPeriodo } from 'src/app/domain/interface/adm/disponibilidad/restriccion-predio.interface';
import { IRestriccionSistema } from 'src/app/domain/interface/adm/disponibilidad/restriccion-sistema.interface';

@Component({
  selector: 'app-com-tabla-restriccion-fechas',
  templateUrl: './com-tabla-restriccion-fechas.component.html',
  styleUrls: ['./com-tabla-restriccion-fechas.component.scss'],
})
export class ComTablaRestriccionFechasComponent implements OnInit, OnChanges {
  @Input() oRestriccionDisponibilidadId: IRestriccionSistema[] = [];
  @Output() oListaFechaEmitter = new EventEmitter<IRestriccionPeriodo[]>();
  public fechaSelecionada!: any[];
  public oListaFecha: IRestriccionPeriodo[] = [];
  public nIdRestriccion: number = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private _utilsService: UtilsService
  ) {}

  formFecha: FormGroup = this._formBuilder.group({
    id: 0,
    fechaInicial: [, [Validators.required]],
    fechaFinal: [, [Validators.required]],
    idRestriccion: 0,
  });

  /**
   * @description Consulta los campos del formulario fecha

   */
  get formControlsFecha(): FormGroup['controls'] {
    return this.formFecha.controls;
  }

  ngOnInit(): void {}

  /**
   * @description: Lista de errores del formulario fecha
   * @param nombreCampo
   * @returns
   */
  listaErroresMensajes(nombreCampo: string): string {
    const errors = this.formControlsFecha[nombreCampo]?.errors;
    if (errors?.['required']) return 'Este campo es obligatorio.';
    return '';
  }

  /**
   * @description Validación de campos del fecha
   * @param campo
   * @returns
   */
  campoNoValido(campo: string) {
    return (
      this.formControlsFecha[campo]?.invalid &&
      this.formControlsFecha[campo]?.touched
    );
  }

  ngOnChanges(cambio: SimpleChanges) {
    let respuesta =
      cambio['oRestriccionDisponibilidadId'].currentValue[
        'restriccionesPeriodo'
      ];
    if (respuesta != undefined) {
      this.oListaFecha = respuesta;
      this.nIdRestriccion =
        cambio['oRestriccionDisponibilidadId'].currentValue.id;
      this.oListaFechaEmitter.emit(this.oListaFecha);
    }
  }

  public async agregarFechaRestriccion() {
    let oFormFecha = this.formFecha.value;
    let sFechaInicial = oFormFecha.fechaInicial;
    let sFechaFinal = oFormFecha.fechaFinal;

    let oFecha: IRestriccionPeriodo = {
      id: oFormFecha.id,
      fechaInicial: sFechaInicial,
      fechaFinal: sFechaFinal,
      idRestriccion: this.nIdRestriccion,
    };

    if (oFormFecha.fechaInicial <= oFormFecha.fechaFinal) {
      const bValidarFecha = this.validarExistenciaPeriodo(
        sFechaInicial,
        sFechaFinal
      );

      if (bValidarFecha) {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail: HORARIO_SISTEMA.MSG_RANGO_FECHA,
        });
      } else {
        this.oListaFecha.push(oFecha);
        this.oListaFechaEmitter.emit(this.oListaFecha);
      }
    } else {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: HORARIO_SISTEMA.MSG_ERROR_VALIDAR_FECHA,
      });
    }
  }

  public validarExistenciaPeriodo(
    sFechaInicial: any,
    sFechaFinal: any
  ): boolean {
    let bExisteData = false;
    if (this.oListaFecha.length > 0) {
      bExisteData = this.oListaFecha.some((valor: any) => {
        return (
          (sFechaInicial >= valor.fechaInicial &&
            sFechaInicial <= valor.fechaFinal) ||
          (sFechaFinal >= valor.fechaInicial && sFechaFinal <= valor.fechaFinal)
        );
      });
    }
    return bExisteData;
  }

  public eliminarRestriccionFecha(nIndice: number) {
    this.oListaFecha.splice(nIndice, 1);
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
