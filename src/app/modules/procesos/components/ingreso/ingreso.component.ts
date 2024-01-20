import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IngresoStateService } from 'src/app/domain/service/procesos/ingreso-state.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {
  lista: any[] = [];
  listaProveedor: any[] = [];
  selectedProveedor: any = {};
  listaProducto: any[] = [];
  selectedProducto: any = {};
  loadingTabla = false;
  selectedItem: any = {};
  @ViewChild('dt') dt: Table | undefined;

  frmIngreso: FormGroup = this._formBuilder.group({
    fechaInicio: null,
    fechaFin: null,
    id: null,
    idProducto: null,
    idProveedor: null,
  });
  
  constructor(
    private _formBuilder: FormBuilder,
    private _utilsService: UtilsService,
    private ingresoService: IngresoStateService) { }

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();
    this.fnConsultaringresos();
  }

  fnConsultaringresos(){
    this.ingresoService.fnListarIngresos({}).then((response => {
      if (response.estado) {
        this.lista = response.data;
        console.log(this.lista);
      }
      this.loadingTabla = false;
    }));
  }

  pplyFilterGlobal($event: any, stringVal: string) {
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

  crear(){

  }
}
