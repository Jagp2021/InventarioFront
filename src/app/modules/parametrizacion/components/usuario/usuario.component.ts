import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Clasificador } from 'src/app/domain/interface/adm/clasificador/clasificador.interface';
import { UsuarioStateService } from 'src/app/domain/service/parametrizacion/usuario-state.service';
import { UsuarioCrearComponent } from './usuario-crear/usuario-crear.component';
import { IUsuario } from 'src/app/domain/interface/parametrizacion/usuario.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [MessageService]
})
export class UsuarioComponent implements OnInit {
  @Input() listaClasificadoresObservable!: Observable<Clasificador[]>;
  lista: IUsuario[] = [];
  loadingTabla = false;
  selectedItem: any = {};
  @ViewChild('dt') dt: Table | undefined;
  constructor(private _utilsService: UtilsService,
    public dialogService: DialogService,
    private _messageService: MessageService,
    private usuarioService: UsuarioStateService) { }

  ngOnInit(): void {
    this.fnConsultarUsuarios();
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

  fnConsultarUsuarios() {
    this.usuarioService.fnConsultarUsuarios({}).then((res => {
      this.lista = res.data;
    }));
  }

  crear() {
    const ref = this.dialogService.open(UsuarioCrearComponent, {
      header: 'Crear usuario',
      width: '80%',
      data: {
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          this._messageService.add({
            severity: resp.estado ? 'success' : 'error',
            summary: 'Crear Usuario',
            detail: resp.estado
              ? `Registro exitoso del usuario ${resp.data.nombre}`
              : 'Ocurrió un error ingresando el usuario. Intentelo nuevamente',
          });
          this.fnConsultarUsuarios();
        }
      },
    });
  }

  editarFila(model: any) {
    const ref = this.dialogService.open(UsuarioCrearComponent, {
      header: 'Editar Usuario ' + model.nombre,
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
            summary: 'Editar Usuario',
            detail: resp.estado
              ? `Edición exitosa del usuario ${resp.data.nombre}`
              : 'Ocurrió un error editando el usuario. Intentelo nuevamente',
          });
          this.fnConsultarUsuarios();
        }
      },
    });
  }

}
