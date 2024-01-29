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

@Component({
  selector: 'app-crear-garantia',
  templateUrl: './crear-garantia.component.html',
  styleUrls: ['./crear-garantia.component.scss']
})
export class CrearGarantiaComponent implements OnInit {
  accion = '';
  titulo = ' Registrar Garantia';
  public lista: any[] = [];
  listaCliente: any[] = [];
  listaTipoPago: any[] = [];
  selectedTipoPago: any = null;
  selectedCliente: any = null;
  id = 0;
  totalVenta = 0;
  loadingTabla = false;

  constructor(
    private _utilsService: UtilsService,
    private _formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private ventaService: VentaStateService,
    private clienteService: ClienteStateService,
    private router: Router,
    public dialogService: DialogService,
    private _messageService: MessageService,
    private dominioService: DominioStateService
  ) { 

  }

  frmVenta: FormGroup = this._formBuilder.group({
    id: [0, [Validators.required]],
    numeroFactura: ["2024-00001", [Validators.required]],
    cliente: [null, [Validators.required]],
    fecha: [null, [Validators.required]],
    usuarioRegistro: [localStorage.getItem('sesion'), [Validators.required]],
    tipoPago: [null, [Validators.required]]
  });

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();
    this.fnConsultarClientes();
    this.fnConsultarTipoPago();
    this.activateRouter.params.subscribe((params) => {
      this.id = Number(params['id']);
      this.accion = params['accion'];
      if(this.id !== 0){
        this.titulo = 'Ver Venta ' + this.id;
        this.fnConsultarVenta();
      }
    }
    );
  }

  fnConsultarVenta(): void {
    const filter: any = {id: this.id};
    this.ventaService.fnListarVentas(filter).then((data) => {
      this.lista = data.data[0].detalleFactura;
      this.fnCalcularTotal();
      this.fnCargarDatos(data.data[0]);
    });
  }

  fnCalcularTotal(): void {
    this.totalVenta = 0;
    this.lista.forEach((item) => {
      this.totalVenta += item.cantidad * item.valorUnitario;
    });
  }

  fnConsultarClientes(): void {
    this.clienteService.fnConsultarClientes({}).then((data) => {
      this.listaCliente = data.data;
    });
  }

  fnConsultarTipoPago(): void {
    this.dominioService.fnConsultarDominios({dominio1: 'TIPOPAGO'}).then((data) => {
      this.listaTipoPago = data.data;
    });
  }

  fnCargarDatos(data: any): void {
    this.selectedCliente = this.listaCliente.find(x => x.id === data.cliente);
    this.selectedTipoPago = this.listaTipoPago.find(x => x.sigla === data.tipoPago);
    this.frmVenta.controls['id'].setValue(this.id);
    this.frmVenta.controls['numeroFactura'].setValue(data.numeroFactura);
    this.frmVenta.controls['usuarioRegistro'].setValue(data.usuarioRegistro);
    this.frmVenta.controls['cliente'].setValue(this.selectedCliente);
    this.frmVenta.controls['tipoPago'].setValue(this.selectedTipoPago);
    this.frmVenta.controls['fecha'].setValue(new Date(data.fecha));
  }

  fnCancelar(): void {
    this.router.navigate(['/procesos/garantia']);
  }

  fnAgregarProducto() {
    const ref = this.dialogService.open(ModalVentaComponent, {
      header: 'Nuevo Producto',
      width: '40%',
      data: {
        index: -1,
        lista : this.lista
      },
    });

    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          this.lista.push(resp);
          this.fnCalcularTotal();
        }
      },
    });
  }

  editarFila(model: any) {
    
  }

  fnGuardar(): void {
    const model: IVenta = {
      id: this.id,
      numeroFactura: this.frmVenta.controls['numeroFactura'].value,
      cliente: this.selectedCliente.id,
      fecha: this.frmVenta.controls['fecha'].value,
      usuarioRegistro: this.frmVenta.controls['usuarioRegistro'].value,
      tipoPago: this.selectedTipoPago.sigla,
      detalleFactura: this.lista,
      total: this.totalVenta
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
