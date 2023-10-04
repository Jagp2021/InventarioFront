import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ConfirmationService,
  Message,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { ADM } from 'src/app/core/constant/adm.constants';
import { IMensaje, TOrdenar } from 'src/app/core/interface/message-service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  /**
   * SEVERITY INFORMATION FOR MESSAGES
   * success | info | warn | error
   */

  public messages!: Message[];

  constructor(
    private _configPrimeNG: PrimeNGConfig,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._configPrimeNG.ripple = true;
  }

  fnCambiarIdiomaCalendario(): void {
    this._configPrimeNG.setTranslation({
      ...ADM.TRANSLATE_CALENDAR,
    });
  }

  /**
   * @description Genera el mensaje de la acción ejecutada
   * @param {string} severity Título del toast
   * @param {string} summary Mensaje del toast
   * @param {string} detail Mensaje de la validación
   * @return {void} No retorna datos
   */
  fnMostrarMensaje({ severity, summary, detail }: IMensaje): void {
    this._messageService.add({
      severity,
      summary,
      detail,
    });
  }

  fnMostrarBandera({ severity, summary, detail }: IMensaje): Message[] {
    return (this.messages = [
      {
        severity,
        summary,
        detail,
      },
    ]);
  }

  fnMostrarConfirm(sAccion: string | number) {
    let oAccion = {};
    console.log(sAccion);

    switch (sAccion) {
      case 1:
      case 'delete':
        oAccion = { ...ADM.ACCIONES_CONFIRM.delete };
        break;
      case 2:
      case 'cancel':
        oAccion = { ...ADM.ACCIONES_CONFIRM.cancel };
        break;
      case 3:
      case 'confirm':
        oAccion = { ...ADM.ACCIONES_CONFIRM.confirm };
        break;
    }

    console.log(oAccion);

    this._confirmationService.confirm({
      ...oAccion,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {},
      reject: () => {},
    });
  }

  fnSubirToScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  fnReloadPage() {
    window.location.reload();
  }

  async fnSleep(nTimeValue: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, nTimeValue));
  }

  fnEncryptar(sData: string): string {
    return CryptoJS.AES.encrypt(sData, environment.keyEncrypt).toString();
  }

  fnDesencryptar(sValor: string): string | null {
    return CryptoJS.AES.decrypt(sValor, environment.keyEncrypt).toString(
      CryptoJS.enc.Utf8
    );
  }

  fnMostrarOverlay(oEventoMouse: MouseEvent, oOverlayPanel: OverlayPanel) {
    oOverlayPanel.toggle(oEventoMouse);
  }

  fnModificarVaciosForm(oModel: any) {
    for (const iterator in oModel) {
      if (oModel[iterator] === '') {
        oModel[iterator] = null;
      }
    }

    return oModel;
  }

  /**
   * @description Funcion que permite eliminar las propiedades vacias o nulas de un array
   * @param oModel array al que se desea eliminar sus propiedades
   * @returns array con valores en sus propiedades
   */
  fnEliminarVaciosForm(oModel: any) {
    for (const iterator in oModel) {
      if (oModel[iterator] === '' || oModel[iterator] === null) {
        delete oModel[iterator];
      }
    }
    return oModel;
  }

  fnModificarObject(oModel: any, bCambiarBoolean: boolean = false): string {
    let oNuevoModelo = '';

    for (const iterator in oModel) {
      if (oModel[iterator] === null || oModel[iterator] === '') {
        delete oModel[iterator];
      } else if (bCambiarBoolean) {
        if (typeof oModel[iterator] === 'boolean') {
          if (oModel[iterator] === false) {
            oModel[iterator] = 0;
          } else {
            oModel[iterator] = 1;
          }
        }
      }
    }

    oNuevoModelo =
      '&' +
      Object.keys(oModel)
        .map((key) => key + '=' + oModel[key])
        .join('&');

    return oNuevoModelo;
  }

  fnOrdenarListas(aLista: any[], sTipo: TOrdenar, sCampo: string): any[] {
    switch (sTipo) {
      case 'sAcentuado':
        aLista.sort((v1: any, v2: any) => {
          return v1[sCampo].localeCompare(v2[sCampo]);
        });
        break;

      case 'sNormal':
        aLista.sort((v1: any, v2: any) => {
          if (v1[sCampo] > v2[sCampo]) {
            return 1;
          }
          if (v1[sCampo] < v2[sCampo]) {
            return -1;
          }

          return 0;
        });
        break;

      case 'nNumerico':
        aLista.sort(
          (v1, v2) => (v1[sCampo] as number) - (v2[sCampo] as number)
        );
        break;
    }

    return aLista;
  }

  fnMostrarOcultarBotonesPrimario(
    oEvento: any,
    nIndice: number,
    bMostrar: boolean,
    sId: string = '-'
  ): void {
    let sBotonNombre =
      sId === '-' ? `button-${nIndice}` : `button-${nIndice}-${sId}`;

    let button: HTMLElement | null = document.getElementById(sBotonNombre);

    if (bMostrar) {
      button?.classList.remove('ocultar-botones', 'no-mostrar');
      button?.classList.add('mostrar-botones');
    } else {
      button?.classList.remove('mostrar-botones');
      button?.classList.add('ocultar-botones');
    }
  }

  fnMostrarOcultarBotonesSecundario(
    oEvento: any,
    nIndice: number,
    bMostrar: boolean,
    sId: string = '-'
  ) {
    let sBotonNombre =
      sId === '-' ? `button-${nIndice}` : `button-${nIndice}-${sId}`;

    let button: HTMLElement | null = document.getElementById(sBotonNombre);

    if (bMostrar) {
      button?.classList.remove('ocultar-botones', 'no-mostrar');
      button?.classList.add('mostrar-botones-sec');
    } else {
      button?.classList.remove('mostrar-botones-sec');
      button?.classList.add('ocultar-botones');
    }
  }

  /**
   * @description Metodo que permite calcular el digito de verificacion de un numero de documento
   * @param myNit numero de documento
   * @returns digito de verificacion
   */
  public calcularDigitoVerificacion(myNit: any) {
    let vpri, x, y, z; // Se limpia el Nit

    myNit = myNit.replace(/\s/g, ''); // Espacios
    myNit = myNit.replace(/,/g, ''); // Comas
    myNit = myNit.replace(/\./g, ''); // Puntos
    myNit = myNit.replace(/-/g, ''); // Guiones // Se valida el nit

    if (isNaN(myNit)) {
      return '';
    } // Procedimiento

    vpri = new Array(16);

    z = myNit.length;

    vpri[1] = 3;
    vpri[2] = 7;
    vpri[3] = 13;
    vpri[4] = 17;
    vpri[5] = 19;
    vpri[6] = 23;
    vpri[7] = 29;
    vpri[8] = 37;
    vpri[9] = 41;
    vpri[10] = 43;
    vpri[11] = 47;
    vpri[12] = 53;
    vpri[13] = 59;
    vpri[14] = 67;
    vpri[15] = 71;

    x = 0;
    y = 0;

    for (let i = 0; i < z; i++) {
      y = myNit.substr(i, 1);
      x += y * vpri[z - i];
    }

    y = x % 11;
    return y > 1 ? 11 - y : y;
  }

  public emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegExp = RegExp(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,4})+(?:\.[a-zA-Z]{2})*$/
    );

    if (control.value && !emailRegExp.test(control.value)) {
      return { emailInvalido: true };
    }
    return null;
  }

  /**
   * @description función que permite validar la existencia de un valor en un arreglo de objetos
   * @param sValorValidar valor que se desea validad
   * @param sCampoValidar propiedad o campo que se desea validar
   * @param oArreglo arreglo frente al cual se desea validar
   * @returns retorna el estado ya sea true o false
   */
  public validarExistencia(
    sValorValidar: string,
    sCampoValidar: string,
    oArreglo: any
  ): boolean {
    let bExisteData = false;
    // if (sAccion === ADM.ACCION_CREAR) {
    bExisteData = oArreglo.some((valor: any) => {
      return valor[sCampoValidar] === sValorValidar;
    });
    return bExisteData;
  }

  fnSetLocalStorage(sNombre: string, aElemento: any[] | any) {
    localStorage.setItem(sNombre, JSON.stringify(aElemento));
  }

  fnCortarTexto(
    sTexto: string,
    nIndice: number,
    nLimit: number = 50,
    sEllipsis: string = ' ...'
  ) {
    let bMostrarOverlay: HTMLElement | null = document.getElementById(
      'overlay_' + nIndice
    );

    if (sTexto.length > nLimit) {
      bMostrarOverlay?.setAttribute(
        'style',
        'display: inline-block;  cursor: pointer'
      );
    }

    return sTexto.length > nLimit ? `${sTexto.substring(0, nLimit)}` : sTexto;
  }
}
