import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IIngreso } from 'src/app/domain/interface/procesos/ingreso.interface';
import { ProveedorStateService } from 'src/app/domain/service/parametrizacion/proveedor-state.service';
import { IngresoStateService } from 'src/app/domain/service/procesos/ingreso-state.service';
import { ModalIngresoComponent } from '../modal-ingreso/modal-ingreso.component';
import { MessageService } from 'primeng/api';
import { IDetalleIngreso } from 'src/app/domain/interface/procesos/detalle-ingreso.interface';

@Component({
  selector: 'app-crear-ingreso',
  templateUrl: './crear-ingreso.component.html',
  styleUrls: ['./crear-ingreso.component.scss']
})
export class CrearIngresoComponent implements OnInit {
  titulo = ' Registrar Ingreso';
  lista: IDetalleIngreso[] = [];
  listaProveedor: any[] = [];
  selectedProveedor: any = null;
  id = 0;
  totalIngreso = 0;
  loadingTabla = false;
  constructor(
    private _utilsService: UtilsService,
    private _formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private ingresoService: IngresoStateService,
    private proveedorService: ProveedorStateService,
    private router: Router,
    public dialogService: DialogService,
    private _messageService: MessageService) { }

    frmIngreso: FormGroup = this._formBuilder.group({
      id: new FormControl(0, [Validators.required]),
      idProveedor: new FormControl(0, [Validators.required]),
      fecha: new FormControl(null, [Validators.required]),
    });

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();
    this.fnConsultarProveedores();
    this.activateRouter.params.subscribe((params) => {
      this.id = Number(params['id']);
      if(this.id !== 0){
        this.titulo = 'Ver Ingreso ' + this.id;
        this.fnConsultarIngreso();
      }
    }
    );
  }

  fnConsultarIngreso(): void {
    const filter: IIngreso = {id: this.id};
    this.ingresoService.fnListarIngresos(filter).then((data) => {
      this.lista = data.data[0].detalleIngreso;
      this.fnCalcularTotal();
      this.fnCargarDatos(data.data[0]);
    });
  }

  fnCalcularTotal(): void {
    this.totalIngreso = 0;
    this.lista.forEach((item) => {
      this.totalIngreso += (item.cantidad ?? 0) * (item.valor ?? 0);
    });
  }

  fnConsultarProveedores(): void {
    this.proveedorService.fnConsultarProveedores({}).then((data) => {
      this.listaProveedor = data.data;
    });
  }

  fnCargarDatos(data: any): void {
    this.selectedProveedor = this.listaProveedor.find(x => x.id === data.idProveedor);
    this.frmIngreso.controls['id'].setValue(this.id);
    this.frmIngreso.controls['idProveedor'].setValue(this.selectedProveedor);
    this.frmIngreso.controls['fecha'].setValue(new Date(data.fecha));
  }

  fnCancelar(): void {
    this.router.navigate(['/procesos/ingreso']);
  }

  fnAgregarProducto() {
    const ref = this.dialogService.open(ModalIngresoComponent, {
      header: 'Nuevo Producto',
      width: '60%',
      data: {
        index: -1,
        lista : this.lista
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          if(resp.mensaje !== undefined){
            this._messageService.add({
              severity: 'error',
              summary: 'Producto Repetido',
              detail: resp.mensaje,
            });
          } else {
            this.lista.push(resp.objeto);
            this.fnCalcularTotal();
          }
        }
      },
    });
  }

  editarFila(model: any) {
    const index = this.lista.indexOf(model);
    const ref = this.dialogService.open(ModalIngresoComponent, {
      header: 'Editar Producto ' + model.nombre,
      width: '60%',
      data: {
        lista : this.lista,
        model : model
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {         
          this.lista[index] = resp.objeto;
          this.fnCalcularTotal();
        }
      },
    });
  }

  eliminarFila(model: any) {
    this.lista = this.lista.filter(x => x.idProducto !== model.idProducto);
    this.fnCalcularTotal();
  }

  fnGuardar(): void {
    const model: IIngreso = {
      id: this.id,
      idProveedor: this.selectedProveedor.id,
      fecha: this.frmIngreso.value.fecha,
      detalleIngreso: this.lista
    };
    
    this.ingresoService.fnGuardarIngreso(model).then((resp) => {
      this._messageService.add({
        severity: resp.estado ? 'success' : 'error',
        summary: 'Ingreso',
        detail: resp.estado
          ? `Ingreso exitoso`
          : 'Ocurrió un error ingresando el producto. Intentelo nuevamente',
      });
      setTimeout(()=> {
        this.router.navigate(['/procesos/ingreso']);
      },2000);
      
    });
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

  get controlsForm(): FormGroup['controls'] {
    return this.frmIngreso.controls;
  }


   campoNoValido(sCampo: string): boolean | undefined {
    return (
      this.controlsForm[sCampo].invalid && this.controlsForm[sCampo]?.touched
    );
  }

  listaErroresMensajes(sCampo: string): string {
    const errors = this.controlsForm[sCampo].errors;
    if (errors?.['required']) return 'Campo requerido';
    return '';
  }

}
