import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horaText',
})
export class HoraTextPipe implements PipeTransform {
  transform(hora: any) {
    let horaConvertida: any;
    let zona: any;
    let horaInicial = new Date('2020-05-12T' + hora)
      .toLocaleTimeString('en-US')
      .split(':');
    zona = horaInicial[2].split(' ');
    horaConvertida = horaInicial[0] + ':' + horaInicial[1] + ' ' + zona[1];
    return horaConvertida;
  }
}
