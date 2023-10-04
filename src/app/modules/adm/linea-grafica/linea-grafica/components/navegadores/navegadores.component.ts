import { Component, OnInit } from '@angular/core';
import { dataTree } from './data';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navegadores',
  templateUrl: './navegadores.component.html',
  styleUrls: ['./navegadores.component.scss'],
})
export class NavegadoresComponent implements OnInit {
  /** Treeview */
  public aResultados: any[] = [];
  public aPosicionesTomadas: any[] = [];

  /** Stepper */
  public items!: MenuItem[];
  public activeIndex: number = 0;
  public completed = 0;

  constructor() {}

  ngOnInit(): void {
    this.aResultados = dataTree;

    this.items = [
      {
        label: 'Datos Básicos',
        routerLink: 'step-informacion-basica',
      },
      {
        label: 'Información Tributaria',
        routerLink: 'step-informacion-tributaria',
      },
      {
        label: 'Ubicación',
        routerLink: 'step-informacion-ubicacion',
      },
      {
        label: 'Datos Administrativos',
        routerLink: 'step-datos-administrativos',
      },
    ];
  }

  onActiveIndexChange(event: any) {
    this.activeIndex = event;
  }

  fnVerificarMovimientoDocumento(oEvent: any) {}

  fnEditarMovimientoDocumento(oEvent: any) {}
}
