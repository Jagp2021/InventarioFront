import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IVenta } from 'src/app/domain/interface/procesos/venta.interface';
import { ClienteStateService } from 'src/app/domain/service/parametrizacion/cliente-state.service';
import { DominioStateService } from 'src/app/domain/service/parametrizacion/dominio-state.service';
import { VentaStateService } from 'src/app/domain/service/procesos/venta-state.service';
import { ModalVentaComponent } from '../../venta/modal-venta/modal-venta.component';
import { IngresoStateService } from 'src/app/domain/service/procesos/ingreso-state.service';
import { GarantiaStateService } from 'src/app/domain/service/procesos/garantia-state.service';
import { ModalGarantiaComponent } from '../modal-garantia/modal-garantia.component';

@Component({
  selector: 'app-crear-garantia',
  templateUrl: './crear-garantia.component.html',
  styleUrls: ['./crear-garantia.component.scss']
})
export class CrearGarantiaComponent implements OnInit {
  accion = '';
  titulo = ' Registrar Garantia';
  public lista: any[] = [];
  listaVenta: any[] = [];
  listaIngresos: any[] = [];
  listaTipoGarantia: any[] = [];
  selectedTipoGarantia: any = null;
  selectedVenta: any = null;
  selectedIngreso: any = null;
  id = 0;
  totalGarantia = 0;
  loadingTabla = false;

  constructor(
    private _utilsService: UtilsService,
    private _formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private ventaService: VentaStateService,
    private router: Router,
    public dialogService: DialogService,
    private _messageService: MessageService,
    private dominioService: DominioStateService,
    private ingresoService: IngresoStateService,
    private garantiaService: GarantiaStateService 
  ) { 

  }

  frmVenta: FormGroup = this._formBuilder.group({
    id: [0, [Validators.required]],
    numeroGarantia: ["0", [Validators.required]],
    tipoGarantia: [null, [Validators.required]],
    idIngreso: [null,[]],
    idFactura: [null,[]],
    estadoGarantia: ['REGI', [Validators.required]],
    fecha: [null, [Validators.required]],
    usuarioRegistro: [localStorage.getItem('sesion'), [Validators.required]],
  });

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();
    this.fnConsultarVentas();
    this.fnConsultarIngresos();
    this.fnConsultarTipoGarantia();
    this.activateRouter.params.subscribe((params) => {
      this.id = Number(params['id']);
      this.accion = params['accion'];
      if(this.id !== 0){
        this.titulo = 'Ver Garantia ' + this.id;
        this.fnConsultarVenta();
      }
    }
    );
  }

  fnConsultarVenta(): void {
    const filter: any = {id: this.id};
    this.garantiaService.fnListarGarantias(filter).then((data) => {
      this.lista = data.data[0].detalleGarantia;
      this.fnCalcularTotal();
      this.fnCargarDatos(data.data[0]);
    });
  }

  fnCalcularTotal(): void {
    this.totalGarantia = 0;
    this.lista.forEach((item) => {
      console.log(item);
      this.totalGarantia += item.cantidad * item.valorProducto;
    });
  }

  fnConsultarVentas(): void {
    const filter: any = {};
    this.ventaService.fnListarVentas(filter).then((data) => {
      this.listaVenta = data.data;
      this.listaVenta.forEach(e => {
        e.fechaFactura = new Date(e.fecha);
        e.displayLabel = `${e.numeroFactura} - ${e.fechaFactura.toISOString().split('T')[0]} - ${e.nombreCliente}`
    
    });
    this.listaVenta.sort((a, b) => b.fechaFactura.getTime() - a.fechaFactura.getTime());
    });
  }

  fnConsultarIngresos(): void {
    const filter: any = {};
    this.ingresoService.fnListarIngresos(filter).then((data) => {
      this.listaIngresos = data.data;
      this.listaIngresos.forEach(e => {
        e.fechaFactura = new Date(e.fecha);
        e.displayLabel = `${e.id} - ${e.fechaFactura.toISOString().split('T')[0]} - ${e.nombreProveedor}`
    
    });
    this.listaIngresos.sort((a, b) => b.fechaFactura.getTime() - a.fechaFactura.getTime());
    });
  }

  fnConsultarTipoGarantia(): void {
    this.dominioService.fnConsultarDominios({dominio1: 'TIPOGARANTIA'}).then((data) => {
      this.listaTipoGarantia = data.data;
    });
  }

  fnCargarDatos(data: any): void {
    this.selectedTipoGarantia = this.listaTipoGarantia.find(x => x.sigla === data.tipoGarantia);
    this.frmVenta.controls['id'].setValue(this.id);
    this.frmVenta.controls['fecha'].setValue(new Date(data.fecha));
    this.frmVenta.controls['numeroGarantia'].setValue(data.id);
    this.frmVenta.controls['usuarioRegistro'].setValue(data.usuarioRegistro);
    this.frmVenta.controls['tipoGarantia'].setValue(this.selectedTipoGarantia);
    if(data.tipoGarantia === 'INGR'){
      this.selectedIngreso = this.listaVenta.find(x => x.id === data.idIngreso);
      this.frmVenta.controls['idIngreso'].setValue(this.selectedIngreso);
    } else {
      this.selectedVenta = this.listaVenta.find(x => x.id === data.idFactura);
      this.frmVenta.controls['idVenta'].setValue(this.selectedVenta);
    }
  }

  fnCancelar(): void {
    this.router.navigate(['/procesos/garantia']);
  }

  fnAgregarProducto() {
    const ref = this.dialogService.open(ModalGarantiaComponent, {
      header: 'Nuevo Producto',
      width: '70%',
      data: {
        index: -1,
        lista : this.lista,
        productos: this.frmVenta.controls['tipoGarantia'].value?.sigla === 'INGR' ? this.selectedIngreso.detalleIngreso : this.selectedVenta.detalleFactura
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          console.log(resp);
          this.lista.push(resp);
          this.fnCalcularTotal();
        }
      },
    });
  }

  editarFila(model: any) {
    const index = this.lista.indexOf(model);
    const ref = this.dialogService.open(ModalGarantiaComponent, {
      header: 'Editar Producto ' + model.nombreProducto,
      width: '70%',
      data: {
        lista : this.lista,
        model : model,
        productos: this.frmVenta.controls['tipoGarantia'].value?.sigla === 'INGR' ? this.selectedIngreso.detalleIngreso : this.selectedVenta.detalleFactura
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {         
          this.lista[index] = resp;
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
    const model: IVenta = {
      id: this.id,
      numeroFactura: this.frmVenta.controls['numeroFactura'].value,
      cliente: this.selectedVenta.id,
      fecha: this.frmVenta.controls['fecha'].value,
      usuarioRegistro: this.frmVenta.controls['usuarioRegistro'].value,
      tipoPago: this.selectedTipoGarantia.sigla,
      detalleFactura: this.lista,
      total: this.totalGarantia
      };

    this.ventaService.fnGuardarVenta(model).then((resp) => {
      this._messageService.add({
        severity: resp.estado ? 'success' : 'error',
        summary: 'Venta',
        detail: resp.estado
          ? `Venta exitoso`
          : 'Ocurrió un error ingresando el producto. Intentelo nuevamente',
      });
      setTimeout(()=> {
        this.router.navigate(['/procesos/venta']);
      },2000);
    });

    }

  onChangeTipoGarantia(value: any){
    console.log(value);
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
