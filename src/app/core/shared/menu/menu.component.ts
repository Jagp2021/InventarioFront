import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/ui/app.layout.service';
import { PermisosStateServiceService } from 'src/app/domain/service/parametrizacion/permisos-state-service.service';
import { LocalStorageService } from 'src/app/data/local/local-storage.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public model: MenuItem[] = [];
  constructor(public layoutService: LayoutService,
    private _permisosService: PermisosStateServiceService,
    private _localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    // this.model = [
    //   {
    //     label: 'Home',
    //     items: [
    //       {
    //         label: 'Home',
    //         icon: 'pi pi-fw pi-home',
    //         routerLink: ['/home'],
    //       },
    //     ],
    //   },
    //   {
    //     label: 'Parametrización',
    //     items: [
    //       {
    //         label: 'Usuarios',
    //         icon: 'pi pi-fw pi-id-card',
    //         routerLink: ['/parametrizacion/usuario'],
    //       },
    //       {
    //         label: 'Proveedores',
    //         icon: 'pi pi-fw pi-book',
    //         routerLink: ['/parametrizacion/proveedor'],
    //       },
    //       {
    //         label: 'Productos',
    //         icon: 'pi pi-bookmark',
    //         routerLink: ['/parametrizacion/producto'],
    //       },
    //       {
    //         label: 'Clientes',
    //         icon: 'pi pi-fw pi-id-card',
    //         routerLink: ['/parametrizacion/cliente'],
    //       },
          
    //     ],
    //   },
    //   {
    //     label: 'Proceso',
    //     items: [
    //       {
    //         label: 'Venta',
    //         icon: 'pi pi-fw pi-id-card',
    //         routerLink: ['/procesos/venta'],
    //       },
    //       {
    //         label: 'Ingreso',
    //         icon: 'pi pi-fw pi-book',
    //         routerLink: ['/procesos/ingreso'],
    //       },
    //       {
    //         label: 'Garantia',
    //         icon: 'pi pi-bookmark',
    //         routerLink: ['/procesos/garantia'],
    //       },
          
    //     ],
    //   },
    // ];
    this.fnConsultarMenu();
  }

  fnConsultarMenu(){
    let sesion = this._localStorageService.getKey('sesion');
    if(sesion){
    let sesionJson = JSON.parse(sesion);
    this._permisosService.fnCargarmenu({idUsuario: sesionJson.idUsuario}).then((res) => {
      this.model = res.data;
      this.model.forEach((element) => {
        this.fnAjustarToggleHijos(element);
      });
    });
  }
  }

  fnAjustarToggleHijos(menu: MenuItem) {
    if (menu.items) {
      menu.items.forEach((element) => {

        if (element.items && element.items.length > 0) {
          this.fnAjustarToggleHijos(element);
        } else {
          element.items = undefined;
        }
      });
    }
  }

}
