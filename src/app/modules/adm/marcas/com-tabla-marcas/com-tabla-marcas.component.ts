import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ADM } from 'src/app/core/constant/adm.constants';
import { MARCAS } from 'src/app/core/constant/adm/marca.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IEstadoGeneral } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { IMarca } from 'src/app/domain/interface/adm/marcas/marca.interface';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { MarcasStateService } from 'src/app/domain/service/adm/marcas/marcas-state.service';

@Component({
  selector: 'app-com-tabla-marcas',
  templateUrl: './com-tabla-marcas.component.html',
  styleUrls: ['./com-tabla-marcas.component.scss'],
})
export class ComTablaMarcasComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public lItemsBreadcrumb: MenuItem[] = [];
  public listaFuncionCatalogo: any[] = [];
  public listaMarcas: IMarca[] = [];
  public loadingTabla = false;
  public selectedItem: any = {};
  public aEstadoGeneral!: IEstadoGeneral[];
  private mensaje$ = new Subscription();

  constructor(
    private _marcasStateService: MarcasStateService,
    private _dominioStateService: ListaSeccionStateService,
    private _router: Router,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.mensaje();
    this.aEstadoGeneral = ADM.ESTADOS_GENERAL;
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Catálogos' },
      { label: 'Marca función' },
    ];
    this.obtenerCoincidenciaMarca();
    this.consultarFuncionCatalogo();
  }
  ngOnDestroy(): void {
    if (this.mensaje$) this.mensaje$.unsubscribe();
  }

  mensaje() {
    this._marcasStateService.mensajeFormularioMarca.subscribe((e) => {
      if (e === true) {
        if (e !== undefined) {
          console.log(e);
          this._utilsService.fnMostrarMensaje({
            severity: ADM.ACCIONES_TOAST.toastTipo.creado,
            summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
            detail: MARCAS.MSG_GUARDAR,
          });
        }

        //this.mensaje$.unsubscribe();
      }
    });
  }
  /**
   * Descripción: Metodo que consulta la lista de función de catálogo
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   */
  public consultarFuncionCatalogo(): void {
    let filtroDominio = { Dominio1: 'FUNCIONCATALOGO' };
    this._dominioStateService.consultatFuncionCatalogo(filtroDominio);
    this._dominioStateService
      .select((e) => e.funcionCatalogoDominio)
      .subscribe({
        next: (resp) => {
          this.listaFuncionCatalogo = resp;
        },
      });
  }

  /**
   * Descripción: Metodo que consulta una lista de marcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   */
  public obtenerCoincidenciaMarca(): void {
    this.loadingTabla = true;
    this._marcasStateService.obtenerCoincidenciaMarca();
    this._marcasStateService
      .select((e) => e.marcas)
      .subscribe({
        next: (e) => {
          this.listaMarcas = e;
          this.loadingTabla = false;
        },
      });
  }

  /**
   * Descripción: Metodo que consulta las marcas por funcion de catalogo
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   */
  public listarValoresMarcaFuncion(): void {
    var filtroMarcas: any = {};
    this.loadingTabla = true;
    if (this.selectedItem !== undefined && this.selectedItem !== null) {
      if (this.selectedItem.sigla !== undefined) {
        filtroMarcas = { Sigla: this.selectedItem.sigla };
      }
    }
    this._marcasStateService.listarValoresMarcaFuncion(filtroMarcas);
    this._marcasStateService
      .select((e) => e.marcas)
      .subscribe({
        next: (resp) => {
          this.listaMarcas = resp;
          this.loadingTabla = false;
        },
      });
  }

  /**
   * Descripción: Metodo que permite eliminar una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   */
  public async eliminarMarca(oMarca: IMarca, nIndice: number) {
    let marca: IMarca = {
      ...oMarca,
      valoresMarcas: [],
    };
    let respuesta: any = await this._marcasStateService.eliminarMarca(marca);
    if (respuesta.estado) {
      // this._utilsService.fnMostrarMensaje({
      //   severity: ADM.ACCIONES_TOAST.toastTipo.creado,
      //   summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
      //   detail: respuesta.mensaje.concat(' ', respuesta.data.nombre),
      // });
      this.listaMarcas.splice(nIndice, 1);
    } else {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: respuesta.mensaje,
      });
    }
  }

  applyFilter(event: any, sCampo: string, sValor: string): void {
    this.dt!.filter((event.target as HTMLInputElement).value, sCampo, sValor);
  }

  /**
   * Descripción: Metodo que redirecciona a la edicion de marcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   */
  public editarMarca(tipo: any, { nombre }: any): void {
    this._router.navigate(['adm/marcasFuncion/editarMarca', nombre]);
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
