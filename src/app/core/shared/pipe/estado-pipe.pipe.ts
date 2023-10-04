import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoPipe'
})
export class EstadoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? "Activo" : "Inactivo";
  }

}
