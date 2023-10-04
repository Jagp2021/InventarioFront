import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IFormPerfilesFG } from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';
import { IRestriccionPerfil } from 'src/app/domain/interface/adm/disponibilidad/restriccion-perfil.interface';
import { IRestriccionSistema } from 'src/app/domain/interface/adm/disponibilidad/restriccion-sistema.interface';

@Component({
  selector: 'app-com-tabla-restriccion-perfiles',
  templateUrl: './com-tabla-restriccion-perfiles.component.html',
  styleUrls: ['./com-tabla-restriccion-perfiles.component.scss'],
})
export class ComTablaRestriccionPerfilesComponent implements OnInit {
  @Input() oRestriccionDisponibilidadId: IRestriccionSistema[] = [];
  @Output() oListaPerfilEmitter = new EventEmitter<IRestriccionPerfil[]>();
  public oListaPerfil: IRestriccionPerfil[] = [];
  public oListaPerfilEmit: IRestriccionPerfil[] = [];
  public oListaPerfilAgregar: IRestriccionPerfil[] = [];
  public nIdRestriccion: number = 0;

  public oCamposFormularioPerfil: IFormPerfilesFG[] = [];
  public aTransaccionesPerfil: any[] = [];
  public bAbrirFiltroPerfil: boolean = false;

  constructor(private _utilsService: UtilsService) {}

  ngOnInit(): void {}
  ngOnChanges(cambio: SimpleChanges) {
    let respuesta =
      cambio['oRestriccionDisponibilidadId'].currentValue[
        'restriccionesPerfil'
      ];
    if (respuesta != undefined) {
      this.oListaPerfil = respuesta;
      this.nIdRestriccion =
        cambio['oRestriccionDisponibilidadId'].currentValue.id;
      this.oListaPerfilEmitter.emit(this.oListaPerfil);
    }
  }

  public async eliminarRestriccionPerfil(
    oRestriccionPerfil: IRestriccionPerfil,
    nIndice: number
  ) {
    console.log(nIndice);

    this.oListaPerfil.splice(nIndice, 1);
    const listaPerfiles = this.oListaPerfilEmit.concat(this.oListaPerfil);
    this.oListaPerfilEmitter.emit(listaPerfiles);
  }

  public eliminarRestriccionPerfilFiltro(valor: any, nIndice: number) {
    this.aTransaccionesPerfil.splice(nIndice, 1);
    this.oListaPerfilEmit.splice(nIndice, 1);

    const listaPerfiles = this.oListaPerfilEmit.concat(this.oListaPerfil);
    this.oListaPerfilEmitter.emit(listaPerfiles);
    console.log(this.oListaPerfilEmit);
  }

  /** *********************
   *  FILTROS GENÉRICOS  **
   * **********************/

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico de perfil
   * @return {void} No retorna datos
   */
  fnAbrirFiltroTransaccionPerfil(): void {
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
  fnObtenerDataFiltroPerfil(aTransacciones: any) {
    this.oListaPerfilAgregar = [];
    this.oListaPerfilEmit = [];
    this.aTransaccionesPerfil = aTransacciones;
    this.aTransaccionesPerfil.forEach((valorAgregar: any) => {
      let bIgual = false;
      this.oListaPerfil.forEach((valorExistente: any) => {
        if (valorAgregar.id === valorExistente.idPerfil) bIgual = true;
      });
      if (!bIgual) {
        let perfilAgregar: IRestriccionPerfil = {
          id: 0,
          idPerfil: valorAgregar.id,
          idRestriccion: this.nIdRestriccion,
          activo: true,
        };
        this.oListaPerfilAgregar.push(valorAgregar);
        this.oListaPerfilEmit.push(perfilAgregar);
      }
      this.aTransaccionesPerfil = this.oListaPerfilAgregar;
    });

    const listaPerfiles = this.oListaPerfilEmit.concat(this.oListaPerfil);
    this.oListaPerfilEmitter.emit(listaPerfiles);
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
