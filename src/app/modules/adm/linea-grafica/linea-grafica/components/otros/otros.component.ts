import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.scss'],
})
export class OtrosComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Línea Gráfica' },
      { label: 'Nuevos Cambios' },
    ];
  }
}
