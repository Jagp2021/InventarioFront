import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  fnModificarVaciosForm(oModel: any) {
    for (const iterator in oModel) {
      if (oModel[iterator] === '') {
        oModel[iterator] = null;
      }
    }

    return oModel;
  }

  async fnSleep(nTimeValue: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, nTimeValue));
  }
}
