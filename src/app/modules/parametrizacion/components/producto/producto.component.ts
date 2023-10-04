import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Clasificador } from 'src/app/domain/interface/adm/clasificador/clasificador.interface';
import { PruductoStateService } from 'src/app/domain/service/parametrizacion/producto-state.service';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [MessageService]
})
export class ProductoComponent implements OnInit {
  @Input() listaClasificadoresObservable!: Observable<Clasificador[]>;
  lista: any[] = [];
  listaFuncionCatalogo: any[] = [];
  loadingTabla = false;
  selectedItem: any = {};
  @ViewChild('dt') dt: Table | undefined;
  constructor(private _utilsService: UtilsService,
    private _productoService: PruductoStateService,
    public dialogService: DialogService,
    private _messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.consultarProductos();
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

  consultarProductos(){
    this._productoService.fnListarProductos({}).then((res => {
      this.lista = res.data;
    }));
  }

  crear() {
    const ref = this.dialogService.open(ProductoCrearComponent, {
      header: 'Crear producto',
      width: '80%',
      data: {
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp !== undefined) {
          this._messageService.add({
            severity: resp.estado ? 'success' : 'error',
            summary: resp.estado ? 'Crear Producto' : 'Crear Producto',
            detail: resp.estado
              ? `Registro exitoso del producto ${resp.data.nombre}`
              : 'Ocurrió un error ingresando el producto. Intentelo nuevamente',
          });
          this.consultarProductos();
        }
      },
    });
  }

  editarFila(model: any) {
    const ref = this.dialogService.open(ProductoCrearComponent, {
      header: 'Editar Producto ' + model.nombre,
      width: '80%',
      data: {
        producto: model
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          this._messageService.add({
            severity: resp.estado ? 'success' : 'error',
            summary: resp.estado ? 'Editar Producto' : 'Editar Producto',
            detail: resp.estado
              ? `Edición exitosa del producto ${resp.data.nombre}`
              : 'Ocurrió un error editando el producto. Intentelo nuevamente',
          });
          this.consultarProductos();
        }
      },
    });
  }

}
