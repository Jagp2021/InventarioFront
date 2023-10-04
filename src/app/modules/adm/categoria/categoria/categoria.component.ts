import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuItem, MessageService } from 'primeng/api';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { CATEGORIAS } from 'src/app/core/constant/adm/categoria.constants';
import {
  IListaSeleccion,
  IValoresDominio,
} from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers: [MessageService],
})
export class CategoriaComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];
  public oListasSeleccion$!: Observable<IListaSeleccion>;
  public oListaActualizada!: IListaSeleccion;
  public lCategorias: IValoresDominio[] = [];
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private _listaSeleccionState: ListaSeccionStateService,
    private _router: Router,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Transacciones' },
      { label: 'Categorías' },
    ];

    this.consultarValoresDominio();
  }

  consultarValoresDominio(): void {
    this._listaSeleccionState.consultarValoresDominio(CATEGORIAS.DOMINIO_FIJO);
    this._listaSeleccionState
      .select((resp) => resp.oListaSeleccion)
      .subscribe({
        next: (response) => {
          this.lCategorias = response.valoresDominios;
        },
      });
  }

  recibirActualizadoLista(bCargue: boolean) {
    bCargue ? this.consultarValoresDominio() : null;
  }

  crearCategoria() {
    this._router.navigate(['adm/categorias/detalleCategoria', 0]);
  }

  editarCategoria(bCategoria: IValoresDominio) {
    this._router.navigate([
      'adm/categorias/detalleCategoria',
      bCategoria.sigla,
    ]);
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
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
}
