import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { LayoutService } from './core/services/ui/app.layout.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private layoutService: LayoutService
  ) {
    const tituloMhcp = <HTMLTitleElement>document.getElementById('titulo-mhcp');
    tituloMhcp.textContent = environment.titleApp;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true; //enables core ripple functionality

    //optional configuration with the default configuration
    this.layoutService.config = {
      ripple: false, //toggles ripple on and off
      inputStyle: 'outlined', //default style for input elements
      menuMode: 'static', //layout mode of the menu, valid values are "static" and "overlay"
      colorScheme: 'dark', //color scheme of the template, valid values are "light" and "dark"
      theme: 'bootstrap4-dark-blue', //default component theme for PrimeNG
      scale: 14, //size of the body font size to scale the whole application
    };
  }
}
