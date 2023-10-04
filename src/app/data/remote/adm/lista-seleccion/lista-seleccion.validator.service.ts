import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { URLCONTROLADOR, URLACCION } from '../../../../core/constant/url-api';

@Injectable({
  providedIn: 'root',
})
export class ListaSeleccionValidatorService implements AsyncValidator {
  private _urlBase: string = environment.apiAdmDominio;
  private _controlador: string = URLCONTROLADOR.apiDominio;
  private _accion: string = URLACCION.obtenerDominio;

  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const nombreLista = control.value;

    return this.http
      .get<any[]>(
        `${this._urlBase}/${this._controlador}/${this._accion}?Dominio1=${nombreLista}`
      )
      .pipe(
        map((resp: any) => {
          return resp?.data?.length === 0 ? null : { listaRegistrada: true };
        })
      );
  }
}
