import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reporte-relaciones-listas',
  templateUrl: './reporte-relaciones-listas.component.html',
  styleUrls: ['./reporte-relaciones-listas.component.scss'],
})
export class ReporteRelacionesListasComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Reportes' },
      { label: 'Parametrizaciones' },
      { label: 'Relaciones entre listas' },
    ];

    localStorage.setItem('idUsuario', '1');
  }
}
