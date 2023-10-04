import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/ui/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public model: any[] = [];
  constructor(public layoutService: LayoutService) {}

  ngOnInit(): void {
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/home'],
          },
        ],
      },
      {
        label: 'Parametrización',
        items: [
          {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/parametrizacion/usuario'],
          },
          {
            label: 'Proveedores',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/parametrizacion/proveedor'],
          },
          {
            label: 'Productos',
            icon: 'pi pi-bookmark',
            routerLink: ['/parametrizacion/producto'],
          },
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/parametrizacion/cliente'],
          },
          
        ],
      },
      {
        label: 'Proceso',
        items: [
          {
            label: 'Venta',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/procesos/venta'],
          },
          {
            label: 'Ingreso',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/procesos/ingreso'],
          },
          {
            label: 'Garantia',
            icon: 'pi pi-bookmark',
            routerLink: ['/procesos/garantia'],
          },
          
        ],
      },
      // {
      //   label: 'Reportes',
      //   items: [
      //   ],
      // },
    ];
  }
}
