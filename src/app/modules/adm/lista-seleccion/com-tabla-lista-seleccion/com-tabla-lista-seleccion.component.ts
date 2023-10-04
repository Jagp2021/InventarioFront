import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, delay } from 'rxjs';
import { Table } from 'primeng/table';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

import {
  IEstadoGeneral,
  IListaSeleccion,
} from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { ADM } from 'src/app/core/constant/adm.constants';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-com-tabla-lista-seleccion',
  templateUrl: './com-tabla-lista-seleccion.component.html',
  styleUrls: ['./com-tabla-lista-seleccion.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ComTablaListaSeleccionComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  @Input() oListasSeleccionPadre!: Observable<[]>;
  public bMostrarLoading: boolean = false;
  public oListasSeleccion: IListaSeleccion[] = [];
  public aEstadoGeneral!: IEstadoGeneral[];
  public aItemsSped: MenuItem[] = [];
  private _aSuscripciones = new Subscription();

  constructor(private _router: Router, private _utilsService: UtilsService) {}

  ngOnDestroy() {
    this._aSuscripciones.unsubscribe();
  }

  ngOnInit(): void {
    this.aEstadoGeneral = ADM.ESTADOS_GENERAL;
    this.bMostrarLoading = true;
    this._aSuscripciones.add(
      this.oListasSeleccionPadre.pipe(delay(800)).subscribe({
        next: (respuesta) => {
          this.oListasSeleccion = respuesta;
          this.bMostrarLoading = false;
        },
      })
    );
  }

  /**
   * @description Link a editar la lista de selección con el id por parámetro
   * @param {any} event Asociación del table
   * @param {any} dominio1 Desestructuración de campo
   * @return {void} no retorna datos
   */
  fnEditarListaSeleccion(a: any, { dominio1 }: any): void {
    this._router.navigate(['adm/listas-seleccion/editar', dominio1]);
  }

  /**
   * @description Aplicar corrección al p-table para el buscador general
   * @param {any} event Asociación del table
   * @param {string} sValor Valor a buscar en el table
   * @return {void} no retorna datos
   */
  fnApplyFilterGlobal(event: any, sValor: string): void {
    this.dt!.filterGlobal((event.target as HTMLInputElement).value, sValor);
  }

  /**
   * @description Aplicar corrección al p-table para el buscador interno
   * @param {any} event Asociación del table
   * @param {string} sCampo Campo que permite filtrar en el table
   * @param {string} sValor Valor a buscar en el table
   * @return {void} no retorna datos
   */
  fnApplyFilter(event: any, sCampo: string, sValor: string): void {
    this.dt!.filter((event.target as HTMLInputElement).value, sCampo, sValor);
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
