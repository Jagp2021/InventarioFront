import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertirBoolean',
})
export class BooleanTextPipe implements PipeTransform {
  transform(bEstado: boolean, sTipoConversion: string) {
    switch (sTipoConversion) {
      case 'sn':
        return bEstado ? 'Si' : 'No';

      case 'ai':
        return bEstado ? 'Activo' : 'Inactivo';

      default:
        return bEstado;
    }
  }
}
