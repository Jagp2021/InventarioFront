import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Clasificador } from 'src/app/domain/interface/adm/clasificador/clasificador.interface';
import { ClienteStateService } from 'src/app/domain/service/parametrizacion/cliente-state.service';
import { ClienteCrearComponent } from './cliente-crear/cliente-crear.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [MessageService]
})
export class ClienteComponent implements OnInit {
  @Input() listaClasificadoresObservable!: Observable<Clasificador[]>;
  lista: any[] = [];
  listaFuncionCatalogo: any[] = [];
  loadingTabla = false;
  selectedItem: any = {};
  @ViewChild('dt') dt: Table | undefined;
  constructor(private _utilsService: UtilsService,
    public dialogService: DialogService,
    private _messageService: MessageService,
    private clienteService: ClienteStateService
    ) { }

  ngOnInit(): void {
    this.fnConsultarClientes();
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

  fnConsultarClientes() {
    this.clienteService.fnConsultarClientes({}).then((res => {
      this.lista = res.data;
    }));
  }

  crear() {
    const ref = this.dialogService.open(ClienteCrearComponent, {
      header: 'Crear cliente',
      width: '80%',
      data: {
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          this._messageService.add({
            severity: resp.estado ? 'success' : 'error',
            summary: 'Crear Cliente',
            detail: resp.estado
              ? `Registro exitoso del cliente ${resp.data.nombre}`
              : 'Ocurrió un error ingresando el cliente. Intentelo nuevamente',
          });
          this.fnConsultarClientes();
        }
      },
    });
  }

  editarFila(model: any) {
    const ref = this.dialogService.open(ClienteCrearComponent, {
      header: 'Editar Cliente ' + model.nombre,
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
            summary: 'Editar Cliente',
            detail: resp.estado
              ? `Edición exitosa del cliente ${resp.data.nombre}`
              : 'Ocurrió un error editando el cliente. Intentelo nuevamente',
          });
          this.fnConsultarClientes();
        }
      },
    });
  }
}
