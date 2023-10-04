import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MARCAS } from 'src/app/core/constant/adm/marca.constants';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import {
  IFormPerfilesFG,
  IFormPosicionesFG,
} from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';
import { convertirFechaHora } from 'src/app/core/shared/functions/funciones-generales';
import { IRestriccionSistemaConsulta } from 'src/app/domain/interface/adm/disponibilidad/restriccion-sistema-consulta.interface';
import { IEstadoGeneral } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { RestriccionDisponibilidadStateService } from 'src/app/domain/service/adm/disponibilidad/restriccion-disponibilidad-state.service';

@Component({
  selector: 'app-frm-filtro-restriccion-disponibilidad',
  templateUrl: './frm-filtro-restriccion-disponibilidad.component.html',
  styleUrls: ['./frm-filtro-restriccion-disponibilidad.component.scss'],
})
export class FrmFiltroRestriccionDisponibilidadComponent implements OnInit {
  public oEstado: IEstadoGeneral[] = MARCAS.ESTADOS_VALORES;
  public oLoadingTabla: boolean = false;
  public oNombreRestriccion!: any;
  public oListaRestriccionDisponibilidad: IRestriccionSistemaConsulta[] = [];

  /**VARIABLES FILTROS GENERICOS */
  public oCamposFormularioPerfiles: IFormPerfilesFG[] = [];
  public aTransaccionesPerfil: any;
  public bAbrirFiltroPerfil: boolean = false;
  public aNombreMostrarPerfiles: any[] = [];
  public oCamposFormularioUsuario: IFormPerfilesFG[] = [];
  public aTransaccionesUsuario: any;
  public aNombreMostrarUsuario: any[] = [];
  public bAbrirFiltroUsuario: boolean = false;
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
    private _router: Router,
    private _utilsService: UtilsService
  ) {}

  formFiltroDisponibilidad: FormGroup = this._formBuilder.group({
    id: new FormControl(),
    descripcion: '',
    activo: true,
    idPerfil: null,
    idUsuario: new FormControl(),
    idEntidadPci: new FormControl(),
    fechaInicial: '',
    fechaFinal: '',
    horaInicial: '',
    horaFinal: '',
  });

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();
    this.listarNombreRestricciones();
  }

  /**
   *
   */
  public async listarNombreRestricciones() {
    let respuesta: any;
    respuesta =
      await this._restriccionDisponibilidadState.obtenerListaRestriccionDisponibilidad<IRespuestaApi>();
    this.oNombreRestriccion = respuesta.data;
  }

  /**
   *
   */
  public listarRestricciones(): void {
    let datos: any = [];
    let filtro: IRestriccionSistemaConsulta =
      this.formFiltroDisponibilidad.value;
    //refactorizar codigo cuando se cambie el formato de hora a militar
    let oFiltroRestriccion: IRestriccionSistemaConsulta = {
      ...filtro,
    };
    datos = this._utilsService.fnEliminarVaciosForm(oFiltroRestriccion);

    this.oLoadingTabla = true;
    this._restriccionDisponibilidadState.obtenerRestriccionDisponibilidad(
      datos
    );
    this._restriccionDisponibilidadState
      .select((e) => e.oListaRestriccion)
      .subscribe({
        next: (e) => {
          this.oListaRestriccionDisponibilidad = e;
          this.oLoadingTabla = false;
        },
      });
  }

  /**
   *
   */
  public limpiarFiltroRestricciones() {
    this.formFiltroDisponibilidad.reset();
    this.aTransaccionesUsuario = [];
    this.aNombreMostrarPerfiles = [];
    this.aNombreMostrarPosicionPgn = [];
    this.aNombreMostrarUsuario = [];
    this.aTransaccionesPerfil = [];
    this.aPosicionesPgn = [];
  }

  /**
   * @description Metodo que redirecciona a la edicion de restricciones de disponibilidad
   * @param param0
   */
  public editarRestriccion({ id }: IRestriccionSistemaConsulta) {
    this._router.navigate([
      'adm/disponibilidad/restriccionDisponibilidadEditar',
      id,
    ]);
  }

  /** *********************
   *  FILTROS GENÉRICOS  **
   * **********************/

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
    this.aNombreMostrarPerfiles = [{ nombre: '' }];

    this.aTransaccionesPerfil = aPerfiles;
    this.aNombreMostrarPerfiles[0].nombre = aPerfiles.descripcion;

    this.formFiltroDisponibilidad.patchValue({
      idPerfil: this.aTransaccionesPerfil.id,
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
    this.aNombreMostrarUsuario = [{ nombre: '' }];

    this.aTransaccionesUsuario = aUsuarios;
    this.aNombreMostrarUsuario[0].nombre =
      aUsuarios.primerNombre + ' ' + aUsuarios.primerApellido;

    this.formFiltroDisponibilidad.patchValue({
      idUsuario: this.aTransaccionesUsuario.id,
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

    this.aPosicionesPgn = aPosicionesPgn[0].data?.id;
    this.aNombreMostrarPosicionPgn[0].id = aPosicionesPgn[0].data?.id;
    this.aNombreMostrarPosicionPgn[0].nombre =
      aPosicionesPgn[0].data?.codigo + ' - ' + aPosicionesPgn[0].data?.nombre;

    this.formFiltroDisponibilidad.patchValue({
      idEntidadPci: aPosicionesPgn[0].data?.id,
    });
  }

  fnMostrarOcultarBotones(
    oEvento: any,
    nIndice: number,
    bMostrar: boolean
  ): void {
    this._utilsService.fnMostrarOcultarBotonesPrimario(
      oEvento,
      nIndice,
      bMostrar
    );
  }
}
