import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IFormTransaccionesFG } from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';
import { IRestriccionFuncionalidad } from 'src/app/domain/interface/adm/disponibilidad/restriccion-funcionalidad.interface';
import { IRestriccionSistema } from 'src/app/domain/interface/adm/disponibilidad/restriccion-sistema.interface';

@Component({
  selector: 'app-com-tabla-restriccion-transaccion',
  templateUrl: './com-tabla-restriccion-transaccion.component.html',
  styleUrls: ['./com-tabla-restriccion-transaccion.component.scss'],
})
export class ComTablaRestriccionTransaccionComponent
  implements OnInit, OnChanges
{
  @Input() oRestriccionDisponibilidadId: IRestriccionSistema[] = [];
  @Output() oListaTransaccionEmitter = new EventEmitter<
    IRestriccionFuncionalidad[]
  >();
  public oRestriccionTransaccion: IRestriccionFuncionalidad[] = [];
  public oListaTransaccionEmit: IRestriccionFuncionalidad[] = [];
  public oListaTransaccionAgregar: IRestriccionFuncionalidad[] = [];
  public nIdRestriccion: number = 0;

  public oCamposFormularioTransaccion: IFormTransaccionesFG[] = [];
  public aTransacciones: any[] = [];
  public bAbrirFiltroTransaccion: boolean = false;

  public transaccion: any = {
    id: 0,
    idRestriccion: 0,
    idFuncionalidadSistema: 3,
    activo: true,
    valorFuncionalidad: {
      codigo: 'G3CUSISADM001',
      nombre: 'Crear Clasificador',
    },
  };

  constructor(private _utilsService: UtilsService) {}

  ngOnInit(): void {}

  ngOnChanges(cambio: SimpleChanges) {
    let respuesta =
      cambio['oRestriccionDisponibilidadId'].currentValue[
        'restriccionesFuncionalidad'
      ];
    if (respuesta != undefined) {
      this.oRestriccionTransaccion = respuesta;
      this.nIdRestriccion =
        cambio['oRestriccionDisponibilidadId'].currentValue.id;
      this.oListaTransaccionEmitter.emit(this.oRestriccionTransaccion);
    }
  }

  public buscarTransaccion() {
    this.oRestriccionTransaccion.push(this.transaccion);
    this.oListaTransaccionEmitter.emit(this.oRestriccionTransaccion);
  }

  public eliminarRestriccionTransaccion(
    oRestriccionFuncionalidad: IRestriccionFuncionalidad,
    nIndice: number
  ) {
    this.oRestriccionTransaccion.splice(nIndice, 1);
    const listaTransacciones = this.oListaTransaccionEmit.concat(
      this.oRestriccionTransaccion
    );
    this.oListaTransaccionEmitter.emit(listaTransacciones);
  }

  public eliminarRestriccionTransaccionFiltro(valor: any, nIndice: number) {
    this.aTransacciones.splice(nIndice, 1);
    this.oListaTransaccionEmit.splice(nIndice, 1);
    const listaTransacciones = this.oListaTransaccionEmit.concat(
      this.oRestriccionTransaccion
    );
    this.oListaTransaccionEmitter.emit(listaTransacciones);
  }

  /** *********************
   *  FILTROS GENÉRICOS  **
   * **********************/

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnAbrirFiltroTransaccion(): void {
    this.bAbrirFiltroTransaccion = true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltroTransaccion(bCerrarFiltro: boolean): void {
    this.bAbrirFiltroTransaccion = bCerrarFiltro;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltroTransaccion(aTransacciones: any): void {
    this.oListaTransaccionAgregar = [];
    this.oListaTransaccionEmit = [];
    this.aTransacciones = aTransacciones;
    this.aTransacciones.forEach((valorAgregar: any) => {
      let bIgual = false;
      this.oRestriccionTransaccion.forEach((valorExistente: any) => {
        if (valorAgregar.id === valorExistente.idFuncionalidadSistema)
          bIgual = true;
      });
      if (!bIgual) {
        let transaccionAgregar: IRestriccionFuncionalidad = {
          id: 0,
          idFuncionalidadSistema: valorAgregar.id,
          idRestriccion: this.nIdRestriccion,
          activo: true,
        };
        this.oListaTransaccionAgregar.push(valorAgregar);
        this.oListaTransaccionEmit.push(transaccionAgregar);
      }
      this.aTransacciones = this.oListaTransaccionAgregar;
    });
    const listaTransacciones = this.oListaTransaccionEmit.concat(
      this.oRestriccionTransaccion
    );
    this.oListaTransaccionEmitter.emit(listaTransacciones);
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
