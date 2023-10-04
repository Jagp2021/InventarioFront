import { Pipe, PipeTransform } from '@angular/core';
import { ADM } from '../../constant/adm.constants';

@Pipe({
  name: 'fechaText',
})
export class FechaTextPipe implements PipeTransform {
  transform(fecha: any): unknown {
    let fechaConvertida: any = '';
    fechaConvertida = new Date(fecha.split('T')[0]);
    let mm = fechaConvertida.getMonth() + 1;
    let dd = fechaConvertida.getDate();
    let yy = fechaConvertida.getFullYear();
    dd = dd >= 1 && dd <= 9 ? (dd = '0' + dd) : dd;
    mm = mm >= 1 && mm <= 9 ? (mm = '0' + mm) : mm;

    return yy + '-' + mm + '-' + dd;
  }
}
