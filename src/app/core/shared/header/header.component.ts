import { Component, Inject, OnInit } from '@angular/core';
import { LayoutService } from '../../services/ui/app.layout.service';
import { environment } from '../../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/data/local/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public titulo: string;
  public version: string;
  public fecha?: Date;
  public overlayVisible: boolean = false;
  public bSeleccionarTheme: boolean = false;
  nombreUsuario: string = '';
  usuario: string = '';
  perfil: string = '';
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    public layoutService: LayoutService,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {
    this.titulo = environment.titleApp;
    this.version = environment.version;

    let sTheme = window.localStorage.getItem('theme');
    if (sTheme) {
      this.bSeleccionarTheme = sTheme === 'dark' ? false : true;
      this.fnCambiarTheme(this.bSeleccionarTheme);
    }
  }

  ngOnInit(): void {
    this.fecha = new Date();
    this.cargarUsuario();
  }
  cargarUsuario(){
    let sesion = this._localStorageService.getKey('sesion');
    if(sesion){
      let sesionJson = JSON.parse(sesion);
      this.usuario = sesionJson.usuario;
      this.nombreUsuario = sesionJson.nombreUsuario;
      this.perfil = sesionJson.rolUsuario;
    }
  }
  

  toogleOverlay() {
    this.overlayVisible = !this.overlayVisible;
  }

  fnCambiarTheme(bEvento: boolean) {
    let sTheme = bEvento ? 'light' : 'dark';
    window.localStorage.setItem('theme', sTheme);
    let sThemeAcceso = this._document.getElementById(
      'theme-css'
    ) as HTMLLinkElement;
    sThemeAcceso.href = `bootstrap4-${sTheme}-blue.css`;
  }

  logOut(){
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
