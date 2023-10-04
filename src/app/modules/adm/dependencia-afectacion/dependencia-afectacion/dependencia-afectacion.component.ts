import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FrmCrearDependenciaComponent } from '../frm-crear-dependencia/frm-crear-dependencia.component';
import { UtilsService } from '../../../../core/services/utils.service';
import { IDependenciasAfectacion } from 'src/app/domain/interface/adm/dependencia-afectacion/dependencia-afectacion.interface';
import { DEPENDENCIAS } from 'src/app/core/constant/adm/dependencia-afectacion';

@Component({
  selector: 'app-dependencia-afectacion',
  templateUrl: './dependencia-afectacion.component.html',
  styleUrls: ['./dependencia-afectacion.component.scss'],
})
export class DependenciaAfectacionComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];
  public oBusquedaDependencias!: IDependenciasAfectacion;
  public oRef: DynamicDialogRef | undefined;
  public bTieneSecciones: boolean = true;
  public bTieneBotones: boolean = false;

  constructor(
    public dialogService: DialogService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Cuentas bancarias' },
    ];

    /** TODO: Remover con datos de sesión */
    this._utilsService.fnSetLocalStorage('IdEntidadesPci', 183);
  }

  ngOnDestroy() {
    if (this.oRef) {
      this.oRef.close();
    }
  }

  fnEnviarDatosBusqueda(oBusqueda: IDependenciasAfectacion) {
    this.oBusquedaDependencias = oBusqueda;
  }

  fnAbrirCrearDependencia() {
    this.oRef = this.dialogService.open(FrmCrearDependenciaComponent, {
      header: DEPENDENCIAS.MSG_CREAR_DEPENDENCIA,
      width: '55vw',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        sTipo: DEPENDENCIAS.TIPO_CREAR,
      },
    });
  }
}
