import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { UtilsService } from 'src/app/core/services/utils.service';
import { RelacionesListasStateService } from 'src/app/domain/service/adm/relaciones-listas/relaciones-listas-state.service';

import { ADM } from 'src/app/core/constant/adm.constants';
import { RELACIONESCRUD } from 'src/app/core/constant/adm/relaciones-listas';
import {
  IDominioRelacionado,
  IDominiosRelacionados,
  ValoresDominioDto,
} from 'src/app/domain/interface/adm/relaciones-listas/relaciones-listas.interface';

@Component({
  selector: 'app-frm-relaciones-listas',
  templateUrl: './frm-relaciones-listas.component.html',
  styleUrls: ['./frm-relaciones-listas.component.scss'],
})
export class FrmRelacionesListasComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];
  public aRelacionesLista: any[] = [];
  public aDominiosRelacionados: IDominiosRelacionados[] = [];
  public aRelacionSeleccionada: IDominioRelacionado[] = [];
  public nIdRelacionCrud!: number;
  public nTotalRegistros!: number;
  public nActiveIndex: number = 0;
  public nActiveIndex2: number = 0;
  public aDatosRelacionados: any[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _utilsService: UtilsService,
    private _relacionesListasStateService: RelacionesListasStateService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Relaciones entre listas de selección' },
    ];

    this._route.params.subscribe(async ({ codigo }) => {
      if (codigo) {
        const sCodigo = this._utilsService.fnDesencryptar(codigo) as string;
        this.nIdRelacionCrud = Number(sCodigo);
        await this.fnCargarRelacionLista(Number(sCodigo));
      } else {
        this._router.navigate(['adm/relacionesListas/']);
      }
    });
  }

  /**
   * @description Carga las listas de Dominio de la Relación Crud
   * @param {number} nIdRelacionCrud Código de la Relación Crud
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarRelacionLista(nIdRelacionCrud: number): Promise<void> {
    this.aDominiosRelacionados = (
      await this._relacionesListasStateService.consultarDominioRelacionados({
        IdRelacionCrud: nIdRelacionCrud,
      })
    ).data;

    if (this.aDominiosRelacionados.length > 0) {
      this.nTotalRegistros = this.aDominiosRelacionados.length;
      this.fnOrdenarLista();
    }
  }

  /**
   * @description Ordena las listas en orden númerico
   * @return {void} No retorna datos
   */
  fnOrdenarLista(): void {
    this.aDominiosRelacionados.sort(
      (v1, v2) => (v1.orden as number) - (v2.orden as number)
    );
  }

  /**
   * @description Desplaza automáticamente entre los accordeons
   * @param {IDominiosRelacionados} oRelacion Extrae la información de la lista a relacionar
   * @param {ValoresDominioDto} oValores Extrae la información de los valores de lista a relacionar
   * @param {number} nIndice Índice de posición
   * @return {void} No retorna datos
   */
  fnCambiarRelacion(
    oRelacion: IDominiosRelacionados,
    oValores: ValoresDominioDto,
    nIndice: number
  ): void {
    if (this.nActiveIndex < this.aDominiosRelacionados.length - 1) {
      this.nActiveIndex += 1;
    }

    if (this.nActiveIndex2 < this.aDominiosRelacionados.length) {
      this.aDatosRelacionados.push(this.aDominiosRelacionados[nIndice]);
    }

    let dominioRelacionado: IDominioRelacionado = {
      dominio: oValores.dominio,
      siglaDominio: oValores.sigla,
      idDominioRelacion: oRelacion.id,
      idPadre: null,
    };

    this.fnValidarSeleccion(nIndice, oValores, dominioRelacionado);
  }

  /**
   * @description Valida la selección de información para impedir perdida o duplicidad
   * @param {number} nIndice Índice de posición
   * @param {IDominioRelacionado} oRelacion Extrae la información de la lista a relacionar
   * @param {ValoresDominioDto} oValores Extrae la información de los valores de lista a relacionar
   * @return {void} No retorna datos
   */
  fnValidarSeleccion(
    nIndice: number,
    oValores: ValoresDominioDto,
    oDominio: IDominioRelacionado
  ): void {
    if (this.aRelacionSeleccionada[nIndice] === undefined) {
      this.aRelacionSeleccionada.push(oDominio);
    } else {
      if (this.aRelacionSeleccionada[nIndice].siglaDominio !== oValores.sigla) {
        this.aRelacionSeleccionada[nIndice] = oDominio;
      }
    }
  }

  /**
   * @description Cancela todos los cambios que se hubieran realizado de forma temporal
   * @return {void} No retorna datos
   */
  fnCancelarProceso(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._router.navigateByUrl('adm/relacionesListas');
      },
    });
  }

  /**
   * @description Guarda la relación seleccionada por el usuario
   * @return {Promise<void>} No retorna datos
   */
  async fnGuardarRelacion(): Promise<void> {
    const aCopiaDominios = this.aDominiosRelacionados.slice();

    if (
      this.aDominiosRelacionados.length === this.aRelacionSeleccionada.length
    ) {
      let respuesta =
        await this._relacionesListasStateService.crearListaValoresRelacionados(
          this.aRelacionSeleccionada
        );

      if (respuesta.estado) {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.creado,
          summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
          detail: RELACIONESCRUD.MSG_OK,
        });
        await this._utilsService.fnSleep(600);
        this._utilsService.fnReloadPage();
      } else {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail: respuesta.mensaje,
        });
      }
    } else {
      if (this.aDatosRelacionados.length > 0) {
        for (const iterator2 of this.aDatosRelacionados) {
          let nIndex = aCopiaDominios
            .map((data) => data.descripcionLista)
            .indexOf(iterator2.descripcionLista);

          aCopiaDominios.splice(nIndex, 1);
        }
      }

      for (const iterator of aCopiaDominios) {
        this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail: RELACIONESCRUD.MSG_INCOMPLETO + iterator.descripcionLista,
        });
      }
    }
  }
}
