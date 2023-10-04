import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ADM } from 'src/app/core/constant/adm.constants';
import { MARCAS } from 'src/app/core/constant/adm/marca.constants';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import { NO_ESPECIALES, NO_WHITE_SPACES } from 'src/app/core/utils/Patterns';
import { IRestriccionEntidadPci } from 'src/app/domain/interface/adm/disponibilidad/restriccion-entidad-pci.interface';
import { IRestriccionFuncionalidad } from 'src/app/domain/interface/adm/disponibilidad/restriccion-funcionalidad.interface';
import { IRestriccionHorario } from 'src/app/domain/interface/adm/disponibilidad/restriccion-horario.interface';
import { IRestriccionPerfil } from 'src/app/domain/interface/adm/disponibilidad/restriccion-perfil.interface';
import { IRestriccionPeriodo } from 'src/app/domain/interface/adm/disponibilidad/restriccion-predio.interface';
import { IRestriccionSistema } from 'src/app/domain/interface/adm/disponibilidad/restriccion-sistema.interface';
import { IRestriccionUsuario } from 'src/app/domain/interface/adm/disponibilidad/restriccion-usuario.interface';
import { RestriccionDisponibilidadStateService } from 'src/app/domain/service/adm/disponibilidad/restriccion-disponibilidad-state.service';

@Component({
  selector: 'app-restriccion-disponibilidad',
  templateUrl: './restriccion-disponibilidad.component.html',
  styleUrls: ['./restriccion-disponibilidad.component.scss'],
})
export class RestriccionDisponibilidadComponent implements OnInit {
  public lblBotonGuardar = '';
  public nTabActual: number = 0;
  private accion$!: Subscription;
  public sAccion: string = ADM.ACCION_CREAR;
  public oRestriccionDisponibilidadId: IRestriccionSistema[] = [];
  public nIdRestriccion: number = 0;
  public oRestriccion!: IRestriccionSistema;

  public oListaRestriccionTransaccion: IRestriccionFuncionalidad[] = [];
  public oListaRestriccionFechas: IRestriccionPeriodo[] = [];
  public oListaRestriccionHorario: IRestriccionHorario[] = [];
  public oListaRestriccionUnidad: IRestriccionEntidadPci[] = [];
  public oListaRestriccionPerfil: IRestriccionPerfil[] = [];
  public oListaRestriccionUsuario: IRestriccionUsuario[] = [];
  public oListaEntidadesPgn: IRestriccionEntidadPci[] = [];
  public oListaEntidadesNoPgn: IRestriccionEntidadPci[] = [];
  public bAmbitoSeleccionadoPgn: boolean = false;
  public bAmbitoSeleccionadoNoPgn: boolean = false;

  public bExisteDescripcion: boolean = false;
  public oNombreRestriccion!: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _restriccionDisponibilidadState: RestriccionDisponibilidadStateService,
    private _utilsService: UtilsService
  ) {}

  formRestriccionSistema: FormGroup = this._formBuilder.group({
    id: 0,
    descripcion: [
      '',
      [
        Validators.required,
        Validators.maxLength(MARCAS.VALOR_MAX_CARECTERES_VALOR),
        Validators.pattern(NO_ESPECIALES),
        Validators.pattern(NO_WHITE_SPACES),
      ],
    ],
    activo: [true, [Validators.required]],
  });

  /**
   * Descripción: Consulta los campos del formulario de restricciones
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 30/05/2023
   */
  get formControlRestricciones(): FormGroup['controls'] {
    return this.formRestriccionSistema.controls;
  }

  get frmRestriccionSistema(): FormGroup['controls'] {
    return this.formRestriccionSistema.controls;
  }
  ngOnInit(): void {
    this.frmRestriccionSistema['id']?.disable();
    this.listarNombreRestricciones();
    this.accion$ = this._route.params.subscribe(({ id }) => {
      this.sAccion =
        id === '' || id === undefined ? ADM.ACCION_CREAR : ADM.ACCION_EDITAR;
      this.lblBotonGuardar = id === '' || id === undefined ? 'Crear' : 'Editar';
      this.oRestriccion = {
        id: id,
      };
      if (this.sAccion === ADM.ACCION_EDITAR) {
        this.obtenerRestriccionId(this.oRestriccion);
      }
    });
  }

  ngOnDestroy() {
    if (this.accion$) this.accion$.unsubscribe();
  }

  listaErroresMensajes(nombreCampo: string): string {
    const errors = this.formControlRestricciones[nombreCampo]?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['maxlength'] && nombreCampo === 'descripcion')
      return 'Debe ser máximo de ' + MARCAS.VALOR_MAX_CARECTERES_VALOR;
    if (errors?.['pattern'] && nombreCampo === 'descripcion')
      return 'No se permiten espacios ni caracteres especiales.';

    return '';
  }

  /**
   * Descripción: Validación de campos derestricciones
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 30/05/2023
   * @param campo
   * @returns
   */
  campoNoValido(campo: string) {
    return (
      this.formControlRestricciones[campo]?.invalid &&
      this.formControlRestricciones[campo]?.touched
    );
  }

  public cancelarProceso(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._router.navigateByUrl('adm/disponibilidad');
      },
    });
  }

  public async obtenerRestriccionId(sValorRestriccion?: any) {
    let respuesta =
      await this._restriccionDisponibilidadState.obtenerRestriccionId<IRespuestaApi>(
        sValorRestriccion
      );
    this.oRestriccionDisponibilidadId = respuesta.data[0];
    this.nIdRestriccion = respuesta.data[0].id;

    this.formRestriccionSistema.patchValue({
      id: this.nIdRestriccion,
      descripcion: respuesta.data[0].descripcion,
      activo: respuesta.data[0].activo,
    });
  }

  public obtenerRestriccionTransaccion($event: any) {
    this.oListaRestriccionTransaccion = $event;
  }

  public obtenerRestriccionFecha($event: any) {
    this.oListaRestriccionFechas = $event;
  }

  public obtenerRestriccionHorario($event: any) {
    this.oListaRestriccionHorario = $event;
  }

  public obtenerRestriccionPerfil($event: any) {
    this.oListaRestriccionPerfil = $event;
  }

  public obtenerRestriccionUsuario($event: any) {
    this.oListaRestriccionUsuario = $event;
  }

  public obtenerAmbitoSeleccionadoPgn($event: any) {
    this.bAmbitoSeleccionadoPgn = $event;
  }

  public obtenerAmbitoSeleccionadoNoPgn($event: any) {
    this.bAmbitoSeleccionadoNoPgn = $event;
  }

  public obtenerListaEntidadesPgn($event: any) {
    this.oListaEntidadesPgn = $event;
  }
  public obtenerListaEntidadesNoPgn($event: any) {
    this.oListaEntidadesNoPgn = $event;
  }

  public async guardarRestriccionDisponibilidad(sAccion?: string) {
    let oRespuesta: any;
    this.oListaRestriccionUnidad = this.oListaEntidadesPgn.concat(
      this.oListaEntidadesNoPgn
    );

    let oRestriccion: IRestriccionSistema = {
      ...this.formRestriccionSistema.value,
      id: this.nIdRestriccion,
      restriccionesFuncionalidad: this.oListaRestriccionTransaccion,
      restriccionesPeriodo: this.oListaRestriccionFechas,
      restriccionesHorarios: this.oListaRestriccionHorario,
      restriccionesEntidadPci: this.oListaRestriccionUnidad,
      restriccionesPerfil: this.oListaRestriccionPerfil,
      restriccionesUsuario: this.oListaRestriccionUsuario,
    };
    // if (
    //   (!this.bAmbitoSeleccionadoNoPgn &&
    //     this.oListaEntidadesNoPgn.length > 0) ||
    //   (!this.bAmbitoSeleccionadoPgn && this.oListaEntidadesPgn.length > 0)
    // ) {
    //   console.log(this.oListaEntidadesNoPgn);
    //   console.log(this.oListaEntidadesPgn);
    // }

    this.bExisteDescripcion = this.validarDescripcion(
      this.formRestriccionSistema.value.descripcion
    );

    if (this.bExisteDescripcion) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: 'Ya existe una Restricción con la descripción ingresada',
      });
    } else {
      switch (sAccion != '') {
        case (this.bAmbitoSeleccionadoNoPgn &&
          this.oListaEntidadesNoPgn.length === 0) ||
          (this.bAmbitoSeleccionadoPgn && this.oListaEntidadesPgn.length === 0):
          this._utilsService.fnMostrarMensaje({
            severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
            summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
            detail:
              ' Selecciono “Restringir” o “No Restringir”, debe seleccionar al menos una unidad o subunidad ejecutora',
          });
          this.nTabActual = 3;
          break;
        case this.nTabActual === 2 && this.oListaRestriccionFechas.length <= 0:
          this._utilsService.fnMostrarMensaje({
            severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
            summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
            detail:
              ' Debe ingresar un periodo indicando “Fecha Inicial” y “Fecha Final',
          });
          this.nTabActual = 1;

          break;
        case this.nTabActual === 3 && this.oListaRestriccionHorario.length <= 0:
          this._utilsService.fnMostrarMensaje({
            severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
            summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
            detail:
              ' Debe ingresar un periodo indicando “Hora Inicial” y “Hora Final”',
          });
          this.nTabActual = 2;

          break;
        case this.oListaRestriccionTransaccion.length > 0 &&
          this.oListaRestriccionFechas.length > 0 &&
          this.oListaRestriccionHorario.length > 0 &&
          sAccion === 'guardar' &&
          this.sAccion === ADM.ACCION_CREAR &&
          this.bExisteDescripcion === false:
          oRespuesta =
            await this._restriccionDisponibilidadState.crearRestriccionDisponibilidad(
              oRestriccion
            );
          this._utilsService.fnMostrarMensaje({
            severity: ADM.ACCIONES_TOAST.toastTipo.creado,
            summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
            detail: oRespuesta.mensaje,
          });
          setTimeout(() => {
            this._router.navigateByUrl('adm/disponibilidad');
          }, 1000);

          break;
        case this.sAccion === ADM.ACCION_EDITAR:
          oRespuesta =
            await this._restriccionDisponibilidadState.editarRestriccionDisponibilidad(
              oRestriccion
            );
          if (sAccion === 'guardar' && oRespuesta.estado === true) {
            this._utilsService.fnMostrarMensaje({
              severity: ADM.ACCIONES_TOAST.toastTipo.creado,
              summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
              detail: oRespuesta.mensaje,
            });
            setTimeout(() => {
              this._router.navigateByUrl('adm/disponibilidad');
            }, 1000);
          }

          break;

        default:
          break;
      }
    }
  }

  public async listarNombreRestricciones() {
    let respuesta: any;
    respuesta =
      await this._restriccionDisponibilidadState.obtenerListaRestriccionDisponibilidad<IRespuestaApi>();
    this.oNombreRestriccion = respuesta.data;
  }

  public validarDescripcion(oValorRestriccion: string): boolean {
    let bExisteData = false;
    if (this.sAccion === ADM.ACCION_CREAR) {
      bExisteData = this.oNombreRestriccion.some((valor: any) => {
        return valor.descripcion === oValorRestriccion;
      });
    } else {
      bExisteData = this.oNombreRestriccion.some((valor: any) => {
        if (
          valor.descripcion === oValorRestriccion &&
          this.sAccion === ADM.ACCION_EDITAR
        ) {
          return false;
        }
        return false;
      });
    }

    return bExisteData;
  }
}
