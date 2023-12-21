import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Clasificador } from 'src/app/domain/interface/adm/clasificador/clasificador.interface';
import { ProveedorStateService } from 'src/app/domain/service/parametrizacion/proveedor-state.service';
import { ProveedorCrearComponent } from './proveedor-crear/proveedor-crear.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss'],
  providers: [MessageService]
})
export class ProveedorComponent implements OnInit {
  @Input() listaClasificadoresObservable!: Observable<Clasificador[]>;
  lista: any[] = [];
  listaFuncionCatalogo: any[] = [];
  loadingTabla = false;
  selectedItem: any = {};
  @ViewChild('dt') dt: Table | undefined;
  constructor(private _utilsService: UtilsService,
      private _proveedorService: ProveedorStateService,
      private _messageService: MessageService,
      public dialogService: DialogService) { }

  ngOnInit(): void {
    this.fnConsultarProveedores();
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

  fnConsultarProveedores() {
    this._proveedorService.fnConsultarProveedores({}).then((res => {
      this.lista = res.data;
    }));
  }

  crear() {
    const ref = this.dialogService.open(ProveedorCrearComponent, {
      header: 'Crear Proveedor',
      width: '80%',
      data: {
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          this._messageService.add({
            severity: resp.estado ? 'success' : 'error',
            summary: 'Crear Proveedor',
            detail: resp.estado
              ? `Registro exitoso del proveedor ${resp.data.nombre}`
              : 'Ocurrió un error ingresando el proveedor. Intentelo nuevamente',
          });
          this.fnConsultarProveedores();
        }
      },
    });
  }

  editarFila(model: any) {
    const ref = this.dialogService.open(ProveedorCrearComponent, {
      header: 'Editar Proveedor ' + model.nombre,
      width: '80%',
      data: {
        usuario: model
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          this._messageService.add({
            severity: resp.estado ? 'success' : 'error',
            summary: 'Editar proveedor',
            detail: resp.estado
              ? `Edición exitosa del proveedor ${resp.data.nombre}`
              : 'Ocurrió un error editando el proveedor. Intentelo nuevamente',
          });
          this.fnConsultarProveedores();
        }
      },
    });
  }

}
