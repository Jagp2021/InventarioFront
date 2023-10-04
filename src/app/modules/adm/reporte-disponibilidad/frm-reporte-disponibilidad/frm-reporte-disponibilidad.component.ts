import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MARCAS } from 'src/app/core/constant/adm/marca.constants';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import {
  IEstadoGeneral,
  IFormPerfilesFG,
  IFormPosicionesFG,
  IFormTransaccionesFG,
} from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';
import { convertirFechaHora } from 'src/app/core/shared/functions/funciones-generales';
import { RestriccionDisponibilidadStateService } from 'src/app/domain/service/adm/disponibilidad/restriccion-disponibilidad-state.service';
import { ReporteDisponibilidadStateService } from 'src/app/domain/service/adm/reporte-disponibilidad/reporte-disponibilidad-state.service';

@Component({
  selector: 'app-frm-reporte-disponibilidad',
  templateUrl: './frm-reporte-disponibilidad.component.html',
  styleUrls: ['./frm-reporte-disponibilidad.component.scss'],
})
export class FrmReporteDisponibilidadComponent implements OnInit {
  public oNombreRestriccion: any[] = [];
  public oEstado: IEstadoGeneral[] = MARCAS.ESTADOS_VALORES;
  public selectedItem: any = null;

  /**VARIABLES FILTROS GENERICOS */
  public oCamposFormularioPerfiles: IFormPerfilesFG[] = [];
  public aPerfil: any;
  public bAbrirFiltroPerfil: boolean = false;
  public aNombreMostrarPerfiles: any[] = [];

  public oCamposFormularioUsuario: IFormPerfilesFG[] = [];
  public aUsuarios: any;
  public bAbrirFiltroUsuario: boolean = false;
  public aNombreMostrarUsuario: any[] = [];

  public oCamposFormularioTransaccion: IFormTransaccionesFG[] = [];
  public aTransacciones: any;
  public bAbrirFiltroTransaccion: boolean = false;
  public aNombreMostrarTransacciones: any[] = [];

  public aPosicionesPgn: any[] = [];
  public bAbrirFiltroPosicionPgn: boolean = false;
  public aNombreMostrarPosicionPgn: any[] = [];

  public oCamposFormulario: IFormPosicionesFG[] = [
    {
      funcionCatalogo: 'INST',
      idCatalogo: null,
      codigoEntidadPci: null,
      descripcion: null,
    },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _restriccionDisponibilidadState: RestriccionDisponibilidadStateService,
    private _reporteDisponibilidadState: ReporteDisponibilidadStateService
  ) {}

  formFiltroDisponibilidad: FormGroup = this._formBuilder.group({
    idRestriccion: null,
    descripcionRestriccion: null,
    activo: null,
    codigoEntidadPci: null,
    idPerfil: null,
    idUsuario: null,
    idFuncionalidad: null,
    fechaInicioRestriccion: null,
    fechaFinRestriccion: null,
    horaInicio: null,
    horaFin: null,
    id_usuario_solicitante: localStorage.getItem('idUsuario'),
  });

  ngOnInit(): void {
    this.listarNombreRestricciones();
    localStorage.setItem('idUsuario', '1');
  }

  public async listarNombreRestricciones() {
    let respuesta: any;
    respuesta =
      await this._restriccionDisponibilidadState.obtenerListaRestriccionDisponibilidad<IRespuestaApi>();
    this.oNombreRestriccion = respuesta.data;
  }

  fnGenerarReporte(): void {
    let filtro = this.formFiltroDisponibilidad.value;

    let oFiltroRestriccion: any = {
      ...filtro,
      horaInicio:
        filtro.horaInicio === null
          ? null
          : convertirFechaHora(filtro.horaInicio),
      horaFin:
        filtro.horaFin === null ? null : convertirFechaHora(filtro.horaFin),
      id_usuario_solicitante: localStorage.getItem('idUsuario'),
    };

    this._reporteDisponibilidadState.generarReporteTransacciones(
      oFiltroRestriccion
    );
  }

  fnLimpiarFormulario(): void {
    this.formFiltroDisponibilidad.reset({
      idRestriccion: null,
      descripcionRestriccion: null,
      activo: null,
      codigoEntidadPci: null,
      idPerfil: null,
      idUsuario: null,
      idFuncionalidad: null,
      fechaInicioRestriccion: null,
      fechaFinRestriccion: null,
      horaInicio: null,
      horaFin: null,
      id_usuario_solicitante: localStorage.getItem('idUsuario'),
    });
    this.aPerfil = [];
    this.aPosicionesPgn = [];
    this.aTransacciones = [];
    this.aUsuarios = [];
    this.aNombreMostrarPosicionPgn = [];
    this.aNombreMostrarPerfiles = [];
    this.aNombreMostrarTransacciones = [];
    this.aNombreMostrarUsuario = [];
  }

  /** *********************
   *  FILTROS GENÉRICOS  **
   * **********************/

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnAbrirFiltroTransaccion(): void {
    this.bAbrirFiltroTransaccion = true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltroTransaccion(bCerrarFiltro: boolean): void {
    this.bAbrirFiltroTransaccion = bCerrarFiltro;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltroTransaccion(aTransacciones: any): void {
    console.log(aTransacciones);

    this.aNombreMostrarTransacciones = [{ id: '', nombre: '' }];

    this.aTransacciones = aTransacciones;
    this.aNombreMostrarTransacciones[0].id = aTransacciones.id;
    this.aNombreMostrarTransacciones[0].nombre = aTransacciones.descripcion;

    this.formFiltroDisponibilidad.patchValue({
      idFuncionalidad: aTransacciones.id,
    });
  }

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico de perfil
   * @return {void} No retorna datos
   */
  fnAbrirFiltroPerfil(): void {
    this.bAbrirFiltroPerfil = true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico de perfil
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltroPerfil(bCerrarFiltro: boolean): void {
    this.bAbrirFiltroPerfil = bCerrarFiltro;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico de perfil
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltroPerfil(aPerfiles: any): void {
    this.aNombreMostrarPerfiles = [{ id: '', nombre: '' }];

    this.aPerfil = aPerfiles;
    this.aNombreMostrarPerfiles[0].id = aPerfiles.id;
    this.aNombreMostrarPerfiles[0].nombre = aPerfiles.descripcion;

    this.formFiltroDisponibilidad.patchValue({
      idPerfil: aPerfiles.id,
    });
  }

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico de usuario
   * @return {void} No retorna datos
   */
  fnAbrirFiltroUsuario(): void {
    this.bAbrirFiltroUsuario = true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico de usuario
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltroUsuario(bCerrarFiltro: boolean): void {
    this.bAbrirFiltroUsuario = bCerrarFiltro;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico de usuario
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltroUsuario(aUsuarios: any): void {
    this.aNombreMostrarUsuario = [{ id: '', nombre: '' }];
    console.log(aUsuarios);

    this.aUsuarios = aUsuarios;
    this.aNombreMostrarUsuario[0].id = aUsuarios.id;
    this.aNombreMostrarUsuario[0].nombre =
      aUsuarios.primerNombre + ' ' + aUsuarios.primerApellido;

    this.formFiltroDisponibilidad.patchValue({
      idUsuario: aUsuarios.id,
    });
  }

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico pgn
   * @return {void} No retorna datos
   */
  fnAbrirFiltroTransaccionPosicionPgn(): void {
    this.bAbrirFiltroPosicionPgn = true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico pgn
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltroPosicionPgn(bCerrarFiltroPosicionPgn: boolean): void {
    this.bAbrirFiltroPosicionPgn = bCerrarFiltroPosicionPgn;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico pgn
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltroPosicionPgn(aPosicionesPgn: any): void {
    this.aNombreMostrarPosicionPgn = [{ id: '', nombre: '' }];

    this.aPosicionesPgn = aPosicionesPgn;
    this.aNombreMostrarPosicionPgn[0].id = aPosicionesPgn[0].data?.id;
    this.aNombreMostrarPosicionPgn[0].nombre =
      aPosicionesPgn[0].data?.codigo + ' - ' + aPosicionesPgn[0].data?.nombre;

    this.formFiltroDisponibilidad.patchValue({
      codigoEntidadPci: aPosicionesPgn[0].data?.id,
    });
  }
}
