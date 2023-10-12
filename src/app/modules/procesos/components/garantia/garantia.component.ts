import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Clasificador } from 'src/app/domain/interface/adm/clasificador/clasificador.interface';
import { GarantiaStateService } from 'src/app/domain/service/procesos/garantia-state.service';

@Component({
  selector: 'app-garantia',
  templateUrl: './garantia.component.html',
  styleUrls: ['./garantia.component.scss'],
  providers: [MessageService]
})
export class GarantiaComponent implements OnInit {
  @Input() listaClasificadoresObservable!: Observable<Clasificador[]>;
  lista: any[] = [];
  listaFuncionCatalogo: any[] = [];
  loadingTabla = false;
  selectedItem: any = {};
  @ViewChild('dt') dt: Table | undefined;
  constructor(private _utilsService: UtilsService,
    private _formBuilder: FormBuilder,
    private _garantiaService: GarantiaStateService) { }
  frmGarantia: FormGroup = this._formBuilder.group({
    id_factura: null,
    Pcis: null,
    id_usuario_solicitante: localStorage.getItem('idUsuario'),
  });

  ngOnInit(): void {
    this.fnConsultarGarantias();
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  fnMostrarOcultarBotones(
    oEvento: any,
    nIndice: number,
    bMostrar: boolean,
    sId?: string
  ): void {
    this._utilsService.fnMostrarOcultarBotonesPrimario(
      oEvento,
      nIndice,
      bMostrar,
      sId
    );
  }

  async fnConsultarGarantias(): Promise<void> {
    this.loadingTabla = true;
    const oModel = {
    };
    const response = await this._garantiaService.fnListarGarantias(oModel);
    if (response.estado) {
      console.log(response.data);
      this.lista = response.data;
    }
    this.loadingTabla = false;
  }

}
