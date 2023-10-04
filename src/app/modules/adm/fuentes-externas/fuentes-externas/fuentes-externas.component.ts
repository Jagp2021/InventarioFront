import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { FuentesExternasStateService } from 'src/app/domain/service/adm/fuentes-externas/fuentes-externas-state.service';
import { FrmFuentesExternasComponent } from '../frm-fuentes-externas/frm-fuentes-externas.component';
import { UtilsService } from 'src/app/core/services/utils.service';

import { IFuenteExterna } from 'src/app/domain/interface/adm/fuentes-externas/fuentes-externas.interface';
import { ADM } from 'src/app/core/constant/adm.constants';

@Component({
  selector: 'app-fuentes-externas',
  templateUrl: './fuentes-externas.component.html',
  styleUrls: ['./fuentes-externas.component.scss'],
  providers: [DialogService],
})
export class FuentesExternasComponent implements OnInit {
  /**
   * TODO: VALIDACIONES
   *  1. Validar que el usuario pertenece a la unidad ejecutora MHCP
   */
  public lItemsBreadcrumb: MenuItem[] = [];
  public aFuentesExternas: IFuenteExterna[] = [];
  public bMostrarLoading: boolean = true;
  public ref!: DynamicDialogRef;

  constructor(
    private _fuentesExternasStateService: FuentesExternasStateService,
    private _dialogService: DialogService,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Fuentes externas' },
    ];

    this.fnValidarUsuario();
  }

  async fnValidarUsuario(): Promise<void> {
    await this.fnCargarFuentesExternas();
  }

  /**
   * @description Consulta las Fuentes Externas
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarFuentesExternas(): Promise<void> {
    this.aFuentesExternas = (
      await this._fuentesExternasStateService.consultarFuentesExternas({})
    ).data;

    if (this.aFuentesExternas.length > 0) {
      this.bMostrarLoading = false;
    }
  }

  /**
   * @description Consulta las Fuentes Externas
   * @param {number} nIndice Índice de la tabla
   * @param {IFuenteExterna} oFuente data de la tabla seleccionada
   * @return {Promise<void>} No retorna datos
   */
  async fnEditarFuenteExterna(
    nIndice: number,
    oFuente: IFuenteExterna
  ): Promise<void> {
    this.ref = this._dialogService.open(FrmFuentesExternasComponent, {
      header: 'Fuente externa: ' + oFuente.codigo,
      width: '50%',
      data: { nIndice, oFuente },
    });

    this.ref.onClose.subscribe(async (resp) => {
      if (resp?.estado) {
        await this.fnCargarFuentesExternas();
      }
    });
  }

  fnCancelarProceso() {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._router.navigateByUrl('adm/pagina404');
      },
    });
  }

  fnGuardarProceso() {}

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
