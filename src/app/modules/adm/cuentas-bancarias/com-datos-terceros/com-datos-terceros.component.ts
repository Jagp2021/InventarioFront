import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UtilsService } from 'src/app/core/services/utils.service';
import { ITerceros } from 'src/app/domain/interface/adm/cuentas-bancarias/cuentas-bancarias.interface';

@Component({
  selector: 'app-com-datos-terceros',
  templateUrl: './com-datos-terceros.component.html',
  styleUrls: ['./com-datos-terceros.component.scss'],
})
export class ComDatosTercerosComponent implements OnInit {
  /** TODO: REEMPLAZAR POR INTERFAZ DE TERCEROS PROPIA +1 */
  @Input() aTercero: ITerceros[] = []; /** +1 */

  frmDatosTercero: FormGroup = this._formBuilder.group({
    tipoPersona: { value: null, disabled: true },
    tipoPersona1: { value: null, disabled: true },
    naturaleza: { value: null, disabled: true },
    naturaleza1: { value: null, disabled: true },
    tipoIdentificacion: { value: null, disabled: true },
    numIdentificacion: { value: null, disabled: true },
    razonSocial: { value: null, disabled: true },
    primerNombre: { value: null, disabled: true },
    segundoNombre: { value: null, disabled: true },
    primerApellido: { value: null, disabled: true },
    segundoApellido: { value: null, disabled: true },
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _utilsService: UtilsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this._utilsService.fnSleep(2000);
  }

  async ngOnChanges(cambioEstado: SimpleChanges) {
    if (cambioEstado['aTercero']) {
      if (cambioEstado['aTercero'].currentValue !== undefined) {
        await this.fnCargarInformacion(cambioEstado['aTercero'].currentValue);
      }
    }
  }

  /**
   * @description Carga los datos en el formulario para mostrarle al usuario los datos cargados
   * @param {ITerceros} aTercero Array de información del tercero
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarInformacion(aTercero: ITerceros[]): Promise<void> {
    if (aTercero.length > 0) {
      this.frmDatosTercero.patchValue({
        tipoPersona: true,
        tipoPersona1: aTercero[0].tipoPersona,
        naturaleza: true,
        naturaleza1: aTercero[0].tipoNaturaleza,
        tipoIdentificacion: aTercero[0].tipoDocumento,
        numIdentificacion: aTercero[0].numeroDocumento,
        razonSocial: aTercero[0].razonSocial,
        primerNombre: aTercero[0].primerNombre,
        segundoNombre: aTercero[0].segundoNombre,
        primerApellido: aTercero[0].primerApellido,
        segundoApellido: aTercero[0].segundoApellido,
      });
    }
  }
}
