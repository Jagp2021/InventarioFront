import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reporte-transacciones',
  templateUrl: './reporte-transacciones.component.html',
  styleUrls: ['./reporte-transacciones.component.scss'],
})
export class ReporteTransaccionesComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Reportes' },
      { label: 'Parametrizaciones' },
      { label: 'Transacciones del sistema' },
    ];

    localStorage.setItem('idUsuario', '1');
  }
}
