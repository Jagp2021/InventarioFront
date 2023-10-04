import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { UtilsService } from 'src/app/core/services/utils.service';
import { RelacionesListasStateService } from 'src/app/domain/service/adm/relaciones-listas/relaciones-listas-state.service';

import { ADM } from 'src/app/core/constant/adm.constants';
import { IRelacionesCRUD } from 'src/app/domain/interface/adm/relaciones-listas/relaciones-listas.interface';

@Component({
  selector: 'app-relaciones-listas',
  templateUrl: './relaciones-listas.component.html',
  styleUrls: ['./relaciones-listas.component.scss'],
})
export class RelacionesListasComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];
  public bMostrarLoading: boolean = true;
  public aListasCrud: IRelacionesCRUD[] = [];

  constructor(
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _relacionesListasStateService: RelacionesListasStateService,
    private _utilsService: UtilsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Relaciones entre listas de selección' },
    ];

    await this.fnCargarRelacionesCrud();
  }

  /**
   * @description Consultar las relaciones CRUD ya generadas
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarRelacionesCrud(): Promise<void> {
    this.aListasCrud = (
      await this._relacionesListasStateService.consultarRelacionesCrud({})
    ).data;

    if (this.aListasCrud.length > 0) {
      this.bMostrarLoading = false;
    }
  }

  /**
   * @description Link a editar la lista de selección con el id por parámetro
   * @param {number} nIndice Asociación índice del table
   * @param {number} sCodigo Código de la relación seleccionada
   * @return {void} No retorna datos
   */
  fnEditarRelacionLista(nIndice: number, sCodigo: number): void {
    const sCodigoEncrypt = this._utilsService.fnEncryptar(sCodigo.toString());
    this._router.navigate(['adm/relacionesListas/editar/', sCodigoEncrypt]);
  }

  /**
   * @description Regresa a la página establecida de navegación
   * @return {void} No retorna datos
   */
  fnCancelarProceso(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._router.navigateByUrl('adm/pagina404');
      },
    });
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
