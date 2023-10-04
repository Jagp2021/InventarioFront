import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  Terceros,
  nombreIdSteppers,
} from 'src/app/core/constant/adm/terceros.constants';
import { TerceroStateService } from 'src/app/domain/service/adm/terceros/tercero-state.service';

@Component({
  selector: 'app-crear-tercero',
  templateUrl: './crear-tercero.component.html',
  styleUrls: ['./crear-tercero.component.scss'],
})
export class CrearTerceroComponent implements OnInit {
  public items!: MenuItem[];
  public activeIndex: number = 0;
  public completed = 0;
  public sAccion: string = Terceros.CREAR;
  public sTipoAccion: string = Terceros.ACCION_CREAR;
  public sTipoTercero: string = '';
  public readonly nombreEtiquetaStep = nombreIdSteppers.STEPPER_CREAR_TERCERO;
  public blockedDocument: boolean = false;
  public bRequiereDatosAdministrativos!: boolean;
  public sTipo: any = '';
  public oAccionTerceroStorage: any[] = [];
  constructor(private _tercerosServiceState: TerceroStateService) {}

  async ngOnInit(): Promise<void> {
    this.obtenerTipoTercero();
    await this.consultarTransacciones(this.sTipo);

    if (this.bRequiereDatosAdministrativos) {
      this.items = [
        {
          label: 'Datos Básicos',
          routerLink: 'step-informacion-basica',
        },
        {
          label: 'Información Tributaria',
          routerLink: 'step-informacion-tributaria',
        },
        {
          label: 'Ubicación',
          routerLink: 'step-informacion-ubicacion',
        },
        {
          label: 'Datos Administrativos',
          routerLink: 'step-datos-administrativos',
        },
      ];
    } else {
      this.items = [
        {
          label: 'Datos Básicos',
          routerLink: 'step-informacion-basica',
        },
        {
          label: 'Información Tributaria',
          routerLink: 'step-informacion-tributaria',
        },
        {
          label: 'Ubicación',
          routerLink: 'step-informacion-ubicacion',
        },
      ];
    }
  }

  onActiveIndexChange(event: any) {
    this.activeIndex = event;
  }

  public async consultarTransacciones(sTipoTercero: string): Promise<void> {
    let oRespuesta;
    let sCodigo;
    console.log(sTipoTercero);

    if (sTipoTercero === Terceros.JURIDICA) {
      if (this.sTipoAccion === Terceros.ACCION_CREAR) {
        sCodigo = 'ADM019';
      } else {
        sCodigo = 'ADM020';
      }
    } else if (sTipoTercero === Terceros.NATURAL) {
      if (this.sTipoAccion === Terceros.ACCION_CREAR) {
        sCodigo = 'ADM021';
      } else {
        sCodigo = 'ADM022';
      }
    }
    console.log(sCodigo);

    let oData = {
      Codigo: sCodigo,
    };
    console.log(oData);

    oRespuesta = (
      await this._tercerosServiceState.consultarTransacciones(oData)
    ).data[0].requiereDatosAdministrativos;
    this.bRequiereDatosAdministrativos = oRespuesta;
  }

  public obtenerTipoTercero() {
    let oAccionTerceroStorage = JSON.parse(
      localStorage.getItem('accionTercero') as string
    );
    this.sTipo = oAccionTerceroStorage.tipoPersona;
    this.sAccion = oAccionTerceroStorage.accion;
    this.sTipoAccion = oAccionTerceroStorage.accion2;

    if (this.sTipo === Terceros.NATURAL) {
      this.sTipoTercero = Terceros.TEXTO_NATURAL;
    } else if (this.sTipo === Terceros.JURIDICA) {
      this.sTipoTercero = Terceros.TEXTO_JURIDICA;
    }
  }
}
