import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.sass'],
})
export class Page404Component {
  public bMostrar404: boolean = true;

  constructor(private _location: Location) {}

  fnRegresar() {
    this._location.back();
  }
}
