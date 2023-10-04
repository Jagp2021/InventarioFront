import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { IListaSeleccion } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';

@Component({
  selector: 'app-lista-seleccion',
  templateUrl: './lista-seleccion.component.html',
  styleUrls: ['./lista-seleccion.component.scss'],
})
export class ListaSeleccionComponent implements OnInit {
  public oListasSeleccion$!: Observable<[]>;
  public bMostrarCrear: boolean = true;
  public oListaSeleccion!: IListaSeleccion;
  public lItemsBreadcrumb: MenuItem[] = [];

  constructor(private _listaSeleccionState: ListaSeccionStateService) {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Lista de selección' },
    ];

    localStorage.setItem('sTipoPerfil', 'ADM');
    localStorage.setItem('entidadPciRegistra', '2');
    localStorage.setItem('idPerfilRegistra', '1');

    this.fnConsultarListasSeleccion();
  }

  /**
   * @description Cargue inicial de las Listas de Selección
   * @returns {void} No retorna datos
   */
  fnConsultarListasSeleccion(): void {
    const sTipoPerfil = localStorage.getItem('sTipoPerfil');
    this._listaSeleccionState.consultarListaSeleccion({
      TipoPerfil: sTipoPerfil,
    });

    this.oListasSeleccion$ = this._listaSeleccionState.select(
      (resp) => resp.oListaSeleccion
    );
  }

  /**
   * @description Cargue inicial de las Listas de Selección
   * @returns {void} No retorna datos
   */
  fnCargarValoresDominio(oListaSeleccion: IListaSeleccion) {
    this.oListaSeleccion = oListaSeleccion;
    this.bMostrarCrear = false;
  }
}
