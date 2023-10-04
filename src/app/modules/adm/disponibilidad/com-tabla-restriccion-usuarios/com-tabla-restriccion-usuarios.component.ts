import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { concat } from 'rxjs';
import { ADM } from 'src/app/core/constant/adm.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IFormUsuariosFG } from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';
import { IRestriccionSistema } from 'src/app/domain/interface/adm/disponibilidad/restriccion-sistema.interface';
import { IRestriccionUsuario } from 'src/app/domain/interface/adm/disponibilidad/restriccion-usuario.interface';

@Component({
  selector: 'app-com-tabla-restriccion-usuarios',
  templateUrl: './com-tabla-restriccion-usuarios.component.html',
  styleUrls: ['./com-tabla-restriccion-usuarios.component.scss'],
})
export class ComTablaRestriccionUsuariosComponent implements OnInit, OnChanges {
  @Input() oRestriccionDisponibilidadId: IRestriccionSistema[] = [];
  @Output() oListaUsuarioEmitter = new EventEmitter<IRestriccionUsuario[]>();
  public oListaUsuario: IRestriccionUsuario[] = [];
  public oListaUsuarioPgn: IRestriccionUsuario[] = [];
  public oListaUsuarioNoPgn: IRestriccionUsuario[] = [];
  public oListaUsuarioPgnAgregar: IRestriccionUsuario[] = [];
  public oListaUsuarioNoPgnAgregar: IRestriccionUsuario[] = [];
  public oListaUsuarioPgnEmit: IRestriccionUsuario[] = [];
  public oListaUsuarioNoPgnEmit: IRestriccionUsuario[] = [];
  public nIdRestriccion: number = 0;

  /**VARIABLES FILTROS GENERICOS */
  public oCamposFormularioUsuarioPgn: IFormUsuariosFG[] = [];
  public aTransaccionesUsuarioPgn: any[] = [];
  public bAbrirFiltroUsuarioPgn: boolean = false;
  public oCamposFormularioUsuarioNoPgn: IFormUsuariosFG[] = [];
  public aTransaccionesUsuarioNoPgn: any[] = [];
  public bAbrirFiltroUsuarioNoPgn: boolean = false;

  constructor(private _utilsService: UtilsService) {}

  ngOnInit(): void {}

  ngOnChanges(cambio: SimpleChanges) {
    let respuesta =
      cambio['oRestriccionDisponibilidadId'].currentValue[
        'restriccionesUsuario'
      ];
    if (respuesta != undefined) {
      respuesta.forEach((usuario: any) => {
        if (
          usuario.valorUsuario.valorAmbitoEntidadPci.descripcion === ADM.PGN
        ) {
          this.oListaUsuarioPgn.push(usuario);
        } else if (
          usuario.valorUsuario.valorAmbitoEntidadPci.descripcion === ADM.NO_PGN
        ) {
          this.oListaUsuarioNoPgn.push(usuario);
        }
      });
      this.oListaUsuario = respuesta;
      this.nIdRestriccion =
        cambio['oRestriccionDisponibilidadId'].currentValue.id;
      this.oListaUsuarioEmitter.emit(this.oListaUsuario);
    }
  }

  public async eliminarRestriccionUsuarioPgn(nIndice: number) {
    this.oListaUsuarioPgn.splice(nIndice, 1);
    this.oListaUsuario = this.oListaUsuarioNoPgn.concat(this.oListaUsuarioPgn);
    this.oListaUsuarioEmitter.emit(this.oListaUsuario);
  }

  public async eliminarRestriccionUsuarioNoPgn(nIndice: number) {
    this.oListaUsuarioNoPgn.splice(nIndice, 1);
    this.oListaUsuario = this.oListaUsuarioNoPgn.concat(this.oListaUsuarioPgn);
    this.oListaUsuarioEmitter.emit(this.oListaUsuario);
  }

  public eliminarRestriccionUsuarioPgnFiltro(nIndice: number) {
    this.aTransaccionesUsuarioPgn.splice(nIndice, 1);
  }

  public eliminarRestriccionUsuarioNoPgnFiltro(nIndice: number) {
    this.aTransaccionesUsuarioNoPgn.splice(nIndice, 1);
  }

  /** *********************
   *  FILTROS GENÉRICOS  **
   * **********************/

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico de UsuarioPgn
   * @return {void} No retorna datos
   */
  fnAbrirFiltroUsuarioPgn(): void {
    this.bAbrirFiltroUsuarioPgn = true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico de UsuarioPgn
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltroUsuarioPgn(bCerrarFiltro: boolean): void {
    this.bAbrirFiltroUsuarioPgn = bCerrarFiltro;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico de UsuarioPgn
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltroUsuarioPgn(aTransacciones: any): void {
    this.oListaUsuarioPgnAgregar = [];
    this.oListaUsuarioPgnEmit = [];
    this.aTransaccionesUsuarioPgn = aTransacciones;
    this.aTransaccionesUsuarioPgn.forEach((valorAgregar: any) => {
      let bIgual = false;
      this.oListaUsuarioPgn.forEach((valorExistente: any) => {
        if (valorAgregar.id === valorExistente.idUsuario) bIgual = true;
      });
      if (!bIgual) {
        let usuarioAgregar: IRestriccionUsuario = {
          id: 0,
          idUsuario: valorAgregar.id,
          idRestriccion: this.nIdRestriccion,
          activo: true,
        };
        this.oListaUsuarioPgnAgregar.push(valorAgregar);
        this.oListaUsuarioPgnEmit.push(usuarioAgregar);
      }
      this.aTransaccionesUsuarioPgn = this.oListaUsuarioPgnAgregar;
    });
    const listaUsuarios = this.oListaUsuarioPgnEmit.concat(this.oListaUsuario);
    this.oListaUsuarioEmitter.emit(listaUsuarios);
    console.log('TRANSACCIONES: ', this.aTransaccionesUsuarioPgn);
  }

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico de usuarioNoPgn
   * @return {void} No retorna datos
   */
  fnAbrirFiltroUsuarioNoPgn(): void {
    this.bAbrirFiltroUsuarioNoPgn = true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico de usuarioNoPgn
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltroUsuarioNoPgn(bCerrarFiltro: boolean): void {
    this.bAbrirFiltroUsuarioNoPgn = bCerrarFiltro;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico de usuarioNoPgn
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltroUsuarioNoPgn(aTransacciones: any): void {
    this.aTransaccionesUsuarioNoPgn = aTransacciones;
    console.log('TRANSACCIONES: ', this.aTransaccionesUsuarioNoPgn);
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
