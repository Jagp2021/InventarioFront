import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { UtilsService } from 'src/app/core/services/utils.service';
import { RelacionesListasStateService } from 'src/app/domain/service/adm/relaciones-listas/relaciones-listas-state.service';

import { ADM } from 'src/app/core/constant/adm.constants';
import {
  IDominioRelacionado,
  IValoresRelacionados,
} from 'src/app/domain/interface/adm/relaciones-listas/relaciones-listas.interface';

@Component({
  selector: 'app-com-tabla-relaciones-listas',
  templateUrl: './com-tabla-relaciones-listas.component.html',
  styleUrls: ['./com-tabla-relaciones-listas.component.scss'],
})
export class ComTablaRelacionesListasComponent implements OnInit {
  public bMostrarLoading: boolean = true;
  @Input() nIdRelacionCrud!: number;
  @Input() nTotalRegistros!: number;
  @Input() aValoresRelacionados: IValoresRelacionados[] = [];
  @Output() bEstadoEliminar = new EventEmitter<boolean>();

  constructor(
    private _relacionesListasStateService: RelacionesListasStateService,
    private _utilsService: UtilsService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.fnCargarValoresRelacionados();
  }

  /**
   * @description Carga los valores ya relacionados por el usuario
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarValoresRelacionados(): Promise<void> {
    this._relacionesListasStateService
      .consultarValoresRelacionados({
        IdRelacionCrud: this.nIdRelacionCrud,
      })
      .then((oResp) => {
        this.aValoresRelacionados = oResp.data;
        this.bMostrarLoading = false;
      });
  }

  /**
   * @description Crea la relación seleccionada por el usuario para eliminar
   * @param {IValoresRelacionados} oValorRelacionado Elemento del table con la información a eliminar
   * @return {void} No retorna datos
   */
  fnCrearEliminacion(oValorRelacionado: IValoresRelacionados): void {
    let dominioRelacionado: IDominioRelacionado = {
      id: 0,
      dominio: null,
      siglaDominio: null,
      idDominioRelacion: null,
      idPadre: 0,
    };

    switch (this.nTotalRegistros) {
      case 2:
        dominioRelacionado = {
          ...dominioRelacionado,
          id: oValorRelacionado.id2,
          dominio: oValorRelacionado.lista2,
          siglaDominio: oValorRelacionado.valor2,
          idDominioRelacion: oValorRelacionado.idDominioRelacion2,
        };

        break;

      case 3:
        dominioRelacionado = {
          ...dominioRelacionado,
          id: oValorRelacionado.id3,
          dominio: oValorRelacionado.lista3,
          siglaDominio: oValorRelacionado.valor3,
          idDominioRelacion: oValorRelacionado.idDominioRelacion3,
        };

        break;

      case 4:
        dominioRelacionado = {
          ...dominioRelacionado,
          id: oValorRelacionado.id4,
          dominio: oValorRelacionado.lista4,
          siglaDominio: oValorRelacionado.valor4,
          idDominioRelacion: oValorRelacionado.idDominioRelacion4,
        };

        break;
    }

    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.delete,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this.fnEliminarRelacion(dominioRelacionado);
      },
    });
  }

  /**
   * @description Elimina una relación seleccionada por el usuario
   * @param {IDominioRelacionado} dominioRelacionado Información con el objeto a eliminar
   * @return {Promise<void>} No retorna datos
   */
  async fnEliminarRelacion(
    dominioRelacionado: IDominioRelacionado
  ): Promise<void> {
    let respuesta =
      await this._relacionesListasStateService.eliminarValoresRelacionados(
        dominioRelacionado
      );

    if (!respuesta.estado) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: respuesta.mensaje,
      });
    } else {
      this.fnCargarValoresRelacionados();
    }
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
    this._utilsService.fnMostrarOcultarBotonesSecundario(
      oEvento,
      nIndice,
      bMostrar,
      sId
    );
  }
}
