import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reporte-listas-seleccion',
  templateUrl: './reporte-listas-seleccion.component.html',
  styleUrls: ['./reporte-listas-seleccion.component.scss'],
})
export class ReporteListasSeleccionComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Reportes' },
      { label: 'Parametrizaciones' },
      { label: 'Listas de Selección' },
    ];

    localStorage.setItem('idUsuario', '1');
    localStorage.setItem('tipoUsuario', 'DIRE'); //FUNC
  }
}
