import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Observable, delay } from 'rxjs';
import { Clasificador } from 'src/app/domain/interface/adm/clasificador/clasificador.interface';
import { ClasificadorStateService } from 'src/app/domain/service/adm/clasificador/clasificador-state.service';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { CrearClasificadorComponent } from '../crear-clasificador/crear-clasificador.component';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-tabla-clasificador',
  templateUrl: './tabla-clasificador.component.html',
  styleUrls: ['./tabla-clasificador.component.scss'],
  providers: [MessageService],
})
export class TablaClasificadorComponent implements OnInit {
  @Input() listaClasificadoresObservable!: Observable<Clasificador[]>;
  lista: any[] = [];
  listaFuncionCatalogo: any[] = [];
  loadingTabla = false;
  selectedItem: any = {};
  @ViewChild('dt') dt: Table | undefined;
  constructor(
    private _clasificadorStateService: ClasificadorStateService,
    private _dominioStateService: ListaSeccionStateService,
    private _messageService: MessageService,
    private router: Router,
    public dialogService: DialogService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.loadingTabla = true;
    this.consultarFuncionCatalogo();
    this.listaClasificadoresObservable.pipe(delay(500)).subscribe({
      next: (e: any[]) => {
        this.lista = e;
        this.lista.forEach((item) => {
          item.DescripcionFuncionCatalogo = this.seleccionarFuncionRegistro(
            item.funcionCatalogo
          );
        });
        this.loadingTabla = false;
      },
    });
  }

  consultarFuncionCatalogo() {
    let filtroDominio = { Dominio1: 'FUNCIONCATALOGO' };
    this._dominioStateService.consultarListaSeleccion(filtroDominio);
    this._dominioStateService
      .select((e) => e.oListaSeleccion)
      .subscribe({
        next: (resp) => {
          this.listaFuncionCatalogo = resp;
        },
      });
  }

  /**
   * Descripción: Servicio que crea los clasificadores
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 10/03/2023
   */
  consultarClasificador(filtro?: Clasificador) {
    var filtroClasificador: any = {};
    this._clasificadorStateService.getClasificador(filtroClasificador);
    this._clasificadorStateService
      .select((e) => e.clasificadores)
      .subscribe({
        next: (resp) => {
          setTimeout(() => {
            this.lista = resp;
            this.loadingTabla = false;
          }, 1000);
        },
      });
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  editarFila(model: any) {
    this._clasificadorStateService.selectRow(model);
    this.router.navigate(['adm/clasificador/detalleClasificador', model.id]);
  }

  copiarFila(model: any) {
    const ref = this.dialogService.open(CrearClasificadorComponent, {
      header: 'Copiar clasificador ' + model.nombre,
      width: '80%',
      data: {
        data: model,
        tipo: 'copiar',
        observable: this.listaClasificadoresObservable,
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          this._messageService.add({
            severity: resp.estado ? 'success' : 'error',
            summary: resp.estado ? 'Copia Clasificador' : 'Copia Clasificador',
            detail: resp.estado
              ? `Registro exitoso del clasificador ${resp.mensaje}`
              : 'Ocurrió un error realizando la copia del clasificador. Intentelo nuevamente',
          });
          this.consultarClasificador();
        }
      },
    });
  }

  seleccionarFuncionRegistro(valor?: string) {
    var retorno: any;
    if (this.listaFuncionCatalogo.length == 0) {
      return '';
    }
    var valores = this.listaFuncionCatalogo[0].valoresDominios;
    retorno = valores.filter((e: { sigla: string }) => e.sigla === valor);
    if (retorno.length > 0) {
      return retorno[0].descripcion;
    }
    return '';
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
}
