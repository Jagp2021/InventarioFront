import { Pipe, PipeTransform } from '@angular/core';

const PADDING = '000000';

@Pipe({
  name: 'convertirCifras',
})
export class ConvertirCifrasPipe implements PipeTransform {
  private SEPARADOR_DECIMAL: string = ',';
  private SEPARADOR_MILES: string = '.';

  constructor() {}

  transform(value: number | string, nFraccion: number = 2): string {
    let [integer, sFraccion = ''] = (value || '')
      .toString()
      .split(this.SEPARADOR_DECIMAL);

    sFraccion =
      nFraccion > 0
        ? this.SEPARADOR_DECIMAL + (sFraccion + PADDING).substring(0, nFraccion)
        : '';

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.SEPARADOR_MILES);

    return integer + sFraccion;
  }
}
