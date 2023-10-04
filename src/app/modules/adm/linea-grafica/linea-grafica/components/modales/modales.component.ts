import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ADM } from 'src/app/core/constant/adm.constants';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-modales',
  templateUrl: './modales.component.html',
  styleUrls: ['./modales.component.scss'],
})
export class ModalesComponent implements OnInit {
  public bAbrirModal: boolean = false;

  constructor(
    private _confirmationService: ConfirmationService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  fnAbrilModal() {
    this.bAbrirModal = true;
  }

  fnCerrarModal() {
    this.bAbrirModal = false;
  }

  fnAbrilConfirmacion() {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._utilsService.fnMostrarMensaje({
          severity: 'success',
          summary: 'Mensaje Éxito',
          detail: 'Mensaje de prueba Toast',
        });
      },
    });
  }
}
