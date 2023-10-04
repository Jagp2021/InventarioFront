import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { DelimitarDocumentoStateService } from 'src/app/domain/service/adm/delimitar-documento/delimitar-documento-state.service';

import { IHistoricoMovimiento } from 'src/app/domain/interface/adm/delimitar-documento/delimitar-documento.interface';
import { ITransacciones } from 'src/app/domain/interface/adm/transacciones/transacciones.interface';
import { IValoresDominio } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { ADM } from 'src/app/core/constant/adm.constants';

@Component({
  selector: 'app-com-tabla-historico-documento',
  templateUrl: './com-tabla-historico-documento.component.html',
  styleUrls: ['./com-tabla-historico-documento.component.scss'],
})
export class ComTablaHistoricoDocumentoComponent implements OnInit {
  @Input()
  get oTransaccion() {
    return this._oTransaccion;
  }
  set oTransaccion(oValue: ITransacciones[]) {
    this._oTransaccion = oValue;
    oValue.length > 0 ? this.cargarMovimientosHistoricosDocumentos() : '';
  }
  @Input() aDocumentos!: IValoresDominio[];
  private _oTransaccion!: ITransacciones[];
  public bMostrarLoading: boolean = true;
  public oHMovimientosDocumentos: IHistoricoMovimiento[] = [];
  public dateValue = '';

  constructor(
    private _delimitarDocumentoState: DelimitarDocumentoStateService
  ) {}

  ngOnInit(): void {}

  /**
   * @description Carga el listado de los movimientos históricos de la transacción
   * @return {void} No retorna datos
   */
  cargarMovimientosHistoricosDocumentos(): void {
    this._delimitarDocumentoState
      .obtenerHMovimientosDocumentosSoporteLS({
        idFuncionalidad: this.oTransaccion[0]?.id,
      })
      .pipe(
        map((oRaw) => {
          return oRaw.map((element: any) => {
            return {
              movimiento: element.accion
                ? `Se Vincula el tipo de documento ${this.obtenerNombreDocumento(
                    element.tipoDocumentoSoporte
                  )} a la transacción`
                : `se Desvincula  el tipo de documento ${this.obtenerNombreDocumento(
                    element.tipoDocumentoSoporte
                  )} a la transacción`,
              fechaMovimiento: new Date(element.fechaMovimiento).toLocaleString(
                ADM.LOCALE_CO
              ),
            };
          });
        })
      )
      .subscribe((oResp: IHistoricoMovimiento[]) => {
        this.oHMovimientosDocumentos = oResp;
        this.bMostrarLoading = false;
      });
  }

  /**
   * @description Filtrar el nombre de la lista de selección de documentos
   * @param {string} sSigla Determina el tipo de documento
   * @return {string | undefined} Retorna el nombre del documento de lista
   */
  obtenerNombreDocumento(sSigla: string): string {
    return this.aDocumentos.filter((e) => e.sigla === sSigla)[0]?.descripcion!;
  }
}
