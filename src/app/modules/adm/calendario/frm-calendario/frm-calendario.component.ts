import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ADM } from 'src/app/core/constant/adm.constants';
import { CALENDARIO } from 'src/app/core/constant/adm/calendario.constants';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import { FiltrosGenericosService } from 'src/app/core/shared/filtros-genericos/services/filtros-genericos.service';
import { convertirFecha } from 'src/app/core/shared/functions/funciones-generales';
import {
  ICalendarioPais,
  IUbicacionGeografica,
} from 'src/app/domain/interface/adm/calendario/calendario-pais.interface';
import { IListaSeleccion } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { CalendarioPaisStateService } from 'src/app/domain/service/adm/calendario/calendario-pais-state.service';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';

@Component({
  selector: 'app-frm-calendario',
  templateUrl: './frm-calendario.component.html',
  styleUrls: ['./frm-calendario.component.scss'],
})
export class FrmCalendarioComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public oListaPais: IUbicacionGeografica[] = [];
  public oListaAnio: IListaSeleccion[] = [];
  public oListaTipoDia: any[] = [];
  public oDiasSeleccionados: any[] = [];
  public oListaFinesSemana: Array<Date> = [];
  public oListaDias: ICalendarioPais[] = [];
  public bMostrarLoading = false;
  public bDisplayModal: boolean = false;
  public sAccion: string = ADM.ACCION_CREAR;
  public sAccionLectura: boolean = false;
  public anioActual: number = 0;
  public sMensaje: string = '';
  public aEstadoGeneral: any[] = ADM.ESTADOS_GENERAL;
  public fechaMinima!: Date;
  public fechaMaxima!: Date;

  constructor(
    private _formBuilder: FormBuilder,
    private _listaSeleccionState: ListaSeccionStateService,
    private _calendarioPaisState: CalendarioPaisStateService,
    private _confirmationService: ConfirmationService,
    private _utilsService: UtilsService,
    private _router: Router,
    private _filtrosGenicosState: FiltrosGenericosService
  ) {}

  formCalendario: FormGroup = this._formBuilder.group({
    annoFiscal: ['', [Validators.required]],
    diaNoHabilFinanciero: [, []],
    diaNoLaboral: [, []],
    fecha: [, Validators.required],
    idPais: [, [Validators.required]],
    tipoDia: [, [Validators.required]],
  });

  formCalendarioEditar: FormGroup = this._formBuilder.group({
    id: 0,
    annoFiscal: [''],
    diaNoHabilFinanciero: [false, []],
    diaNoLaboral: [false, []],
    fecha: [, [Validators.required]],
    idPais: [, []],
    tipoDia: [, [Validators.required]],
  });

  /**
   * @description Consulta los campos del formulario del calendario
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  get formControlsCalendario(): FormGroup['controls'] {
    return this.formCalendario.controls;
  }

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();
    this.consultarListaTipoDia();
    this.consultarListaPais();
    this.obtenerAnioActual();
  }

  /**
   * @description Configura el hover del table para mostrar u ocultar los botones de acción
   * @param {any} e Evento disparado del table
   * @param {number} nIndice Número del indice para mostrar en el Row
   * @param {boolean} bMostrar Determina si se muestra u oculta la acción
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

  /**
   * @description: Lista de errores del formulario calendario
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 14/06/2023
   */
  listaErroresMensajes(nombreCampo: string): string {
    const errors = this.formControlsCalendario[nombreCampo]?.errors;
    if (errors?.['required']) return 'Este campo es obligatorio.';
    return '';
  }

  /**
   * Descripción: Validación de campos del Marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param campo
   * @returns
   */
  campoNoValido(campo: string) {
    return (
      this.formControlsCalendario[campo]?.invalid &&
      this.formControlsCalendario[campo]?.touched
    );
  }

  /**
   *@description Metodo que obtiene una lista de los paises
   */
  public async consultarListaPais(): Promise<void> {
    this.oListaPais = (
      await this._filtrosGenicosState.consultarFGUbicacionGeografica()
    ).data;
  }

  /**
   * @description Metodo que consulta la lista de dominio para año
   */
  public async consultarListaAnio(): Promise<void> {
    let filtroDominio = { Dominio1: 'ANIOFISCAL' };
    this.oListaAnio = (
      await this._listaSeleccionState.consultarListaAnio(filtroDominio)
    ).data[0].valoresDominios;
  }

  /**
   * @description Metodo que consulta la lista de dominio para tipo dia
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 26/05/2023
   */
  public async consultarListaTipoDia(): Promise<void> {
    let filtroDominio = { Dominio1: 'TIPODIA' };
    this.oListaTipoDia = (
      await this._listaSeleccionState.consultarListaTipoDia(filtroDominio)
    ).data[0].valoresDominios;
  }

  /**
   * @description Acción de Cancelar los cambios del formulario
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 9/06/2023
   */
  public cerrarModal(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this.bDisplayModal = false;
      },
    });
  }

  /**
   * @description Metodo que abre el modal para modificar los valores de un dia
   * @param oValoresTipoDia valores del dia a setear
   */
  public modalTipoDiaCalendario(oValoresTipoDia?: ICalendarioPais): void {
    let sValores: any = oValoresTipoDia;
    let fecha = sValores?.fecha.split('T')[0];

    this.formCalendarioEditar.patchValue({
      ...oValoresTipoDia,
      fecha: fecha,
    });
    this.bDisplayModal = true;
  }

  /**
   * @description Metodo que permite consultar el calendario de un pais
   */
  public async consultarCalendarioPais(): Promise<void> {
    this.oListaDias = [];
    let oFormulario = this.formCalendario.value;
    let respuestaObtenerDatos: IRespuestaApi;
    let respuestaCrear: IRespuestaApi;
    const oDatos: ICalendarioPais = {
      idPais: oFormulario.idPais,
      annoFiscal: oFormulario.annoFiscal,
    };

    this.bMostrarLoading = true;
    respuestaObtenerDatos =
      await this._calendarioPaisState.obtenerCalendario<IRespuestaApi>(oDatos);

    this.sAccionLectura =
      this.anioActual - Number(oDatos.annoFiscal) >= 2 ? false : true;

    if (respuestaObtenerDatos.data.length === 0) {
      this.generarFinesSemana();
      respuestaCrear = await this._calendarioPaisState.crearCalendario(
        this.oListaDias
      );
      if (respuestaCrear.estado) {
        this.oListaDias = (
          await this._calendarioPaisState.obtenerCalendario<IRespuestaApi>(
            oDatos
          )
        ).data;
      }
      this.bMostrarLoading = false;
    } else {
      this.sAccion = ADM.ACCION_EDITAR;
      this.oListaDias = respuestaObtenerDatos.data;
      await this.obtenerDiasConsulta(respuestaObtenerDatos.data);
      this.bMostrarLoading = false;
    }
    this.calendarioAnio(String(oDatos.annoFiscal));
  }

  /**
   * @description metodo que me permite habilitar solo el calendario del año fiscal
   * @param anio año seleccionado por el usuario
   */
  public calendarioAnio(anio: string): void {
    this.fechaMinima = new Date(anio.concat('-01-01'));
    this.fechaMinima.setMonth(0);
    this.fechaMinima.setFullYear(Number(anio));
    this.fechaMaxima = new Date(anio.concat('-12-31'));
    this.fechaMaxima.setMonth(11);
    this.fechaMaxima.setFullYear(Number(anio));
  }

  /**
   *@description metodo que me permite obtener por medio de la seleccion pais el año
   */
  public obtenerPais() {
    this.consultarListaAnio();
  }

  /**
   * @description Metodo que permite obtener solo los dias de la consulta del calendario para mapear al componente
   * @param oListaDias lita de valores
   */
  public obtenerDiasConsulta(oListaDias: any): void {
    this.oListaFinesSemana = [];
    oListaDias.forEach((element: any) => {
      this.oListaFinesSemana.push(new Date(element.fecha?.split('T')[0]));
    });
  }

  /**
   * @description Metodo que permite generar los fines de semana
   */
  public generarFinesSemana(): void {
    let nAnio = this.formCalendario.value.annoFiscal;
    let oListaFinesSemana: any = [];

    if (this.oListaDias.length === 0) {
      for (
        let fecha = new Date(nAnio, 0, 1);
        fecha <= new Date(nAnio, 11, 31);
        fecha.setDate(fecha.getDate() + 1)
      ) {
        if (fecha.getDay() === 0 || fecha.getDay() === 6) {
          this.oListaFinesSemana.push(new Date(fecha));

          const dias: ICalendarioPais = {
            id: 0,
            annoFiscal: String(nAnio),
            diaNoHabilFinanciero: true,
            diaNoLaboral: true,
            fecha: convertirFecha(fecha),
            idPais: this.formCalendario.value.idPais,
            tipoDia: 'FISE',
          };
          oListaFinesSemana.push(dias);
        }
      }

      this.oListaDias = oListaFinesSemana;
    }
  }

  /**
   * @description Metodo que me permite agregar una fecha al calendario
   */
  public async agregarFecha(): Promise<void> {
    let respuesta: IRespuestaApi;
    let bValidacionTipoDia = false;
    let bValidacionExistenciaFecha = false;
    const oFormulario = this.formCalendario.value;
    bValidacionTipoDia = this.validarTiposDias(oFormulario);
    bValidacionExistenciaFecha = this.validarExistenciaDia(oFormulario);

    if (
      Number(oFormulario.annoFiscal) !=
      new Date(oFormulario.fecha[0]).getFullYear()
    ) {
      bValidacionTipoDia = true;
      this.sMensaje = CALENDARIO.MSG_ANIO_NO_COINCIDE;
    }

    if (bValidacionTipoDia || bValidacionExistenciaFecha) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: this.sMensaje,
      });
    } else {
      this.oDiasSeleccionados.forEach((element) => {
        const dias: ICalendarioPais = {
          ...oFormulario,
          fecha: element,
        };
        this.oListaDias.push(dias);
      });
      respuesta = await this._calendarioPaisState.editarCalendario(
        this.oListaDias
      );
      if (respuesta.estado) {
        this.consultarCalendarioPais();
      }
    }
  }

  /**
   * @description Metodo que permite guardar los datos de edición
   */
  public async guardarDatos(): Promise<void> {
    let datos: ICalendarioPais[] = [];
    let bValidacion: boolean = false;
    bValidacion = this.validarTiposDias(
      this.formCalendarioEditar.value,
      this.formCalendarioEditar.value.fecha
    );

    if (bValidacion === true) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: this.sMensaje,
      });
    } else {
      datos.push(this.formCalendarioEditar.value);

      let respuesta = await this._calendarioPaisState.editarCalendario(datos);
      if (respuesta.estado === true) {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.creado,
          summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
          detail: respuesta.mensaje,
        });
        this.bDisplayModal = false;
        await this.consultarCalendarioPais();
      }
    }
  }

  /**
   * @description Metodo que permite validar la existencia de la fecha a ingresar
   * @param oValoresDia fecha a validar
   * @returns retorna si existe o no la fecha
   */
  public validarExistenciaDia(oValoresDia: any): boolean {
    let bValidacion: boolean = false;
    let convertirDia: string = '';
    this.oListaDias.some((valor: any) => {
      convertirDia = valor.fecha.split('T')[0];
      if (oValoresDia.fecha[0] === convertirDia) {
        this.sMensaje = CALENDARIO.MSG_EXISTE_FECHA;
        bValidacion = true;
      }
    });

    return bValidacion;
  }

  /**
   * @description Metodo que permite validar el tipo de dia de una fecha a ingresar
   * @param oValoresDia lista de fechas que puede llegar
   * @param fecha unica fecha que puede llegar
   * @returns retorna si existe o no el tipo de dia
   */
  validarTiposDias(oValoresFecha?: any, fecha?: any): boolean {
    let bValidacion: boolean = false;
    //Valida si llega una lista de fechas o una unica fecha
    let nMes =
      fecha != undefined
        ? new Date(fecha).getMonth()
        : new Date(oValoresFecha.fecha[0]).getMonth();

    let diaNoLaboral =
      oValoresFecha.diaNoLaboral === null || false
        ? false
        : oValoresFecha.diaNoLaboral;
    let diaNoHabilFinanciero =
      oValoresFecha.diaNoHabilFinanciero === null || false
        ? false
        : oValoresFecha.diaNoHabilFinanciero;

    switch (oValoresFecha.fecha.length > 0) {
      case oValoresFecha.tipoDia === CALENDARIO.PRIMER_DIA_LABORAL &&
        nMes != 0 &&
        (diaNoLaboral === false || diaNoHabilFinanciero === false):
        this.sMensaje = CALENDARIO.MSG_ENERO;
        return true;
        break;

      case oValoresFecha.tipoDia === CALENDARIO.PENULTIMO_DIA_LABORAL &&
        nMes != 11 &&
        (diaNoLaboral === false || diaNoHabilFinanciero === false):
        this.sMensaje = CALENDARIO.MSG_DICIEMBRE;
        return true;
        break;

      case (oValoresFecha.tipoDia === CALENDARIO.PRIMER_DIA_LABORAL ||
        oValoresFecha.tipoDia === CALENDARIO.PENULTIMO_DIA_LABORAL) &&
        (diaNoLaboral === true || diaNoHabilFinanciero === true):
        if (diaNoLaboral === true && diaNoHabilFinanciero === true) {
          this.sMensaje = CALENDARIO.MSG_FESTIVOS;
        } else if (diaNoLaboral === true || diaNoHabilFinanciero === true) {
          this.sMensaje = CALENDARIO.MSG_PRIMER_ULTIMO;
        }
        return true;
        break;

      case oValoresFecha.tipoDia === CALENDARIO.PRIMER_DIA_LABORAL ||
        oValoresFecha.tipoDia === CALENDARIO.PENULTIMO_DIA_LABORAL:
        bValidacion = this.oListaDias.some((valor: any) => {
          return oValoresFecha.tipoDia === valor.tipoDia;
        });
        if (bValidacion) {
          this.sMensaje =
            oValoresFecha.tipoDia === 'PDHE'
              ? CALENDARIO.MSG_PRIMER_DIA_LABORAL
              : CALENDARIO.MSG_PENULTIMO_DIA_LABORAL;
        }
        break;

      case (oValoresFecha.tipoDia === CALENDARIO.FESTIVO ||
        oValoresFecha.tipoDia === CALENDARIO.FIN_SEMANA) &&
        diaNoLaboral === false &&
        diaNoHabilFinanciero === false:
        this.sMensaje = CALENDARIO.MSG_FESTIVOS_FIN_SEMANA;
        return true;
        break;

      default:
        break;
    }

    return bValidacion;
  }

  /**
   * @description Metodo que permite eliminar un dia del calendario pais
   * @param oListaDias valor a eliminar
   */
  public async eliminarFecha(
    oListaDias: ICalendarioPais,
    nIndice: number
  ): Promise<void> {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.deleteCalendario,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: async () => {
        let respuesta: IRespuestaApi =
          await this._calendarioPaisState.eliminarcalendarioDia(oListaDias);
        if (respuesta.estado) {
          this._utilsService.fnMostrarMensaje({
            severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
            summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
            detail: respuesta.mensaje,
          });
          this.oListaDias.splice(nIndice, 1);
          this.bDisplayModal = false;
        }
      },
    });
  }

  /**
   * @description Metodo que permite guardar todo el proceso
   * @return {void} No retorna datos
   */
  public async guardarProceso(): Promise<void> {
    let respuesta: IRespuestaApi =
      this.sAccion === ADM.ACCION_CREAR
        ? await this._calendarioPaisState.crearCalendario(this.oListaDias)
        : await this._calendarioPaisState.editarCalendario(this.oListaDias);
    if (respuesta.estado) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.creado,
        summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
        detail: respuesta.mensaje,
      });
      await this.consultarCalendarioPais();
    }
  }

  /**
   * @description Metodo que cancela todos los cambios que se hubieran realizado de forma temporal
   * @return {void} No retorna datos
   */
  cancelarProceso(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._router.navigateByUrl('adm/calendario');
      },
    });
  }

  /**
   * @description Metodo que me permite obtener el año actual para manejo de edicion del calendario
   */
  public obtenerAnioActual() {
    this.anioActual = Number(new Date().getFullYear());
  }

  /**
   * @description Metodo que me permite aplicar filtros a las columnas de la tabla
   * @param event
   * @param sCampo campo de la columna que se desea aplicar el filtro
   * @param sValor valor a capturar
   */
  public aplicarFiltro(event: any, sCampo: string, sValor: string): void {
    this.dt!.filter((event.target as HTMLInputElement).value, sCampo, sValor);
  }

  /**
   * @description Metodo que me permite convertir el valor del tipo de dia que llega de la consulta para mostrar en la tabla
   * @param sTipoDia tipo de dia a convertir
   * @returns retorna el texto a mostrar dependiendo el filtro
   */
  convertirTipoDia(sTipoDia: string): string {
    let sValor = this.oListaTipoDia.filter((e: any) => e.sigla === sTipoDia)[0]
      .descripcion;
    return sValor;
  }

  /**
   * @description Metodo que me permite activar los check de los dias dependiendo el tipo de dia seleccionado
   * @param sSigla tipo de dia seleccionado
   */
  public checkDias(sSigla: string) {
    if (sSigla === CALENDARIO.FESTIVO || sSigla === CALENDARIO.FIN_SEMANA) {
      this.formCalendario.patchValue({
        diaNoHabilFinanciero: true,
        diaNoLaboral: true,
      });
    } else {
      this.formCalendario.patchValue({
        diaNoHabilFinanciero: false,
        diaNoLaboral: false,
      });
    }
  }
}
