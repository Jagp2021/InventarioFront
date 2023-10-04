import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { ReporteRelacionesListasStateService } from 'src/app/domain/service/adm/reporte-relaciones-listas/reporte-relaciones-listas-state.service';

import { ADM } from 'src/app/core/constant/adm.constants';
import { IRelacionesCRUD } from 'src/app/domain/interface/adm/relaciones-listas/relaciones-listas.interface';
import { RelacionesListasStateService } from 'src/app/domain/service/adm/relaciones-listas/relaciones-listas-state.service';

@Component({
  selector: 'app-frm-reporte-relaciones-listas',
  templateUrl: './frm-reporte-relaciones-listas.component.html',
  styleUrls: ['./frm-reporte-relaciones-listas.component.scss'],
})
export class FrmReporteRelacionesListasComponent implements OnInit {
  public aListasRelacion: IRelacionesCRUD[] = [];

  frmGenerarReporte: FormGroup = this._formBuilder.group({
    CodigosRelacionesCrud: null,
    id_usuario_solicitante: localStorage.getItem('idUsuario'),
  });

  get fnObtenerEstadoForm() {
    return (
      this.frmGenerarReporte.get('CodigosRelacionesCrud')?.value === null ||
      this.frmGenerarReporte.get('CodigosRelacionesCrud')?.value.length === 0
    );
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _reporteRelacionListas: ReporteRelacionesListasStateService,
    private _relacionesListasStateService: RelacionesListasStateService,
    private _confirmationService: ConfirmationService,
    private _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fnCargarRelacionesCrud();
  }

  /**
   * @description Consultar las relaciones CRUD ya generadas
   * @return {Promise<void>} No retorna datos
   */
  async fnCargarRelacionesCrud(): Promise<void> {
    this.aListasRelacion = (
      await this._relacionesListasStateService.consultarRelacionesCrud({})
    ).data;

    this.fnModificarLista();
  }

  fnModificarLista(): void {
    this.aListasRelacion = this.aListasRelacion.map((valor: any) => {
      return {
        ...valor,
        sOpcionConcatenada: valor.codigo + ' - ' + valor.descripcion,
      };
    });
  }

  /**
   * @description Envía la data recogida del formulario para generar el reporte
   * @return {void} No retorna datos
   */
  fnGenerarReporte(): void {
    const sValoresListas: string[] = [];
    for (const iterator of this.frmGenerarReporte.get('CodigosRelacionesCrud')
      ?.value) {
      sValoresListas.push(iterator.id);
    }

    const oListas = [
      {
        CodigosRelacionesCrud: sValoresListas.toString(),
        id_usuario_solicitante: localStorage.getItem('idUsuario'),
      },
    ];

    this._reporteRelacionListas.generarReporteRelacionListas(oListas[0]);
    this.fnLimpiarFormulario();
  }

  /**
   * @description Limpia el formulario, los campos que se haya ingresado
   * @return {void} No retorna datos
   */
  fnLimpiarFormulario(): void {
    this.frmGenerarReporte.reset({
      id_usuario_solicitante: localStorage.getItem('idUsuario'),
    });
  }

  /**
   * @description Cancela el proceso y redirige a Home
   * @return {void} No retorna datos
   */
  fnCancelarProceso(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._router.navigateByUrl('/home');
      },
    });
  }
}
