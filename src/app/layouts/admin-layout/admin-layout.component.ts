import { Component, HostListener, OnInit } from '@angular/core';
import { LayoutService } from '../../core/services/ui/app.layout.service';
import { environment } from '../../../environments/environment';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  public showHeader: boolean = environment.showHeader;
  public showMenu: boolean = environment.showMenu;
  public showFooter: boolean = environment.showFooter;
  public lItemsBreadcrumb: MenuItem[] = [];

  public bMostrar: boolean = false;
  public bMostrar404: boolean = false;
  public nTopPosToStartShowing = 600;

  @HostListener('window:scroll')
  verificarScroll() {
    const nScrollPosition: number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (nScrollPosition >= this.nTopPosToStartShowing) {
      this.bMostrar = true;
    } else {
      this.bMostrar = false;
    }
  }

  constructor(public layoutService: LayoutService, private _router: Router) {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Pendiente URL' },
    ];

    this.bMostrar404 = false;
  }

  fnCargar404(evento: any) {
    setTimeout(() => {
      this.bMostrar404 = evento.bMostrar404;
    }, 300);
  }

  public get containerClass(): any {
    return {
      'layout-theme-light': this.layoutService.config.colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple,
    };
  }

  fnIrArriba() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
