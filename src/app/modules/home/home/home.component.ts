import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VALOR_MAXIMO_CARACTERES_CLASIFICADOR, VALOR_MAXIMO_CARACTERES_NIVEL_CLASIFICADOR } from 'src/app/core/constant/adm/constants';
import { LocalStorageService } from 'src/app/data/local/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _localStorage: LocalStorageService,
    private _router: Router) { }

  ngOnInit(): void {
   const sesion = this._localStorage.getKey("sesion");
   console.log(sesion);
   if(sesion === null){
    this._router.navigate(['/login']);
   }
  }

}
