import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
import { dataTable } from './data';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public bMostrarLoading = false;
  public oValores: any[] = [];
  public sidebarVisible2: boolean = false;

  public sValorBuscar: string = '';
  public aDatoSelected: any[] = [];
  public first: number = 0;
  public rows: number = 10;

  public aSelected1!: any[];
  public aSelected2!: any[];
  public aSelected3!: any[];
  public aSelected4!: any[];

  frmGenerarReporte: FormGroup = this._formBuilder.group({
    tipoTransaccion: null,
    funcionNegocio: null,
    codigoTransaccion: null,
    nombreTransaccion: null,
    categoriaTransaccion: null,
    estadoTransaccion: null,
    atributoLog: null,
    atributoAlto: null,
    atributoDatos: null,
    formatoSalida: 'pdf',
    hora: null,
    fecha: null,
  });

  frmGrillaMultiple: FormGroup = this._formBuilder.group({
    nombre: [{ value: null, disabled: true }],
    descripcion: null,
    cargo: null,
    numCuenta: null,
    dato5: null,
    dato6: null,
    otroDatoA: null,
    otroDatoB: null,
    otroDatoC: null,
    fecha1: new Date(),
    fecha2: new Date(),
    otroDatoD: null,
  });

  constructor(
    private _utilsService: UtilsService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.oValores = dataTable;
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

  fnMostrarOcultarBotones2(e: any, nIndice: number, bMostrar: boolean): void {
    let button: HTMLElement | null = document.getElementById(
      'button2-' + nIndice
    );
    if (bMostrar) {
      button?.setAttribute(
        'style',
        'background-color: #e4f2fb; position: sticky; right: 0px; box-shadow: -4px 0px 3px 0px rgba(187, 194, 200, 0.5); height: 2.5rem; padding: 7px; width: 68px'
      );
    } else {
      button?.setAttribute('style', 'display: none; background-color: #e4f2fb');
    }
  }

  fnMostrarOcultarBotones3(e: any, nIndice: number, bMostrar: boolean): void {
    let button: HTMLElement | null = document.getElementById(
      'button3-' + nIndice
    );
    if (bMostrar) {
      button?.setAttribute(
        'style',
        'position: sticky; right: 0px; box-shadow: -4px 0px 3px 0px rgba(187, 194, 200, 0.5);'
      );
    } else {
      button?.setAttribute('style', 'display: none; background-color: #e4f2fb');
    }
  }

  fnValidarLengthTexto(texto: string): string {
    if (texto.length > 60) {
      return texto
        .replace(/<[^>]*>/g, '')
        .split(' ')
        .splice(0, 6)
        .join(' ');
    }

    return texto;
  }

  fnCortarTexto(
    value: string,
    nIndice: number,
    nLimit: number = 25,
    sEllipsis: string = ' ...'
  ) {
    let bMostrarOverlay: HTMLElement | null = document.getElementById(
      'overlay_' + nIndice
    );

    if (value.length > nLimit) {
      bMostrarOverlay?.setAttribute(
        'style',
        'display: inline-block;  cursor: pointer'
      );
    }

    return value.length > nLimit ? `${value.substring(0, nLimit)}` : value;
  }

  fnCargarOverlay(event: any, overlayPanel: any) {
    this._utilsService.fnMostrarOverlay(event, overlayPanel);
  }

  fnEditarSidebar() {
    this.sidebarVisible2 = true;
  }

  fnFiltrar(oEvent: any) {
    return ['test', 'test2', 'test3'];
  }

  onRowSelect(oEvent: any) {}
  cancelUnselect(oEvent: any) {}
  test(oEevent: any) {}

  onPageChange(oEvent: any) {}
}
