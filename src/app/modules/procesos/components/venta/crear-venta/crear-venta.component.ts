import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IVenta } from 'src/app/domain/interface/procesos/venta.interface';
import { ClienteStateService } from 'src/app/domain/service/parametrizacion/cliente-state.service';
import { DominioStateService } from 'src/app/domain/service/parametrizacion/dominio-state.service';
import { VentaStateService } from 'src/app/domain/service/procesos/venta-state.service';
import { ModalVentaComponent } from '../modal-venta/modal-venta.component';
import {CellConfig, jsPDF} from 'jspdf';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.scss']
})
export class CrearVentaComponent implements OnInit {
  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef;
  visibleGuardar = true;
  titulo = ' Registrar Venta';
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
    visibleGuardado: false,
    id: ['0', [Validators.required]],
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
      if(this.id !== 0){
        this.titulo = 'Ver Venta ' + this.id;
        this.visibleGuardar = false;
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
    this.router.navigate(['/procesos/venta']);
  }

  fnAgregarProducto() {
    const ref = this.dialogService.open(ModalVentaComponent, {
      header: 'Nuevo Producto',
      width: '70%',
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
    const ref = this.dialogService.open(ModalVentaComponent, {
      header: 'Editar Producto ' + model.nombreProducto,
      width: '70%',
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
      if(resp.estado){
        this.visibleGuardar = false;
        this.frmVenta.controls['cliente'].disable();
        this.frmVenta.controls['tipoPago'].disable();
        this.frmVenta.controls['fecha'].disable();
      }
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

  public downloadAsPDF() {
    const filename = "Factura" + this.frmVenta.controls['numeroFactura'].value + ".pdf";
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Factura de Venta No. " + this.frmVenta.controls['numeroFactura'].value, 55, 15);
    doc.addImage("assets/layout/images/logoNew.jpeg","JPEG", 10, 2, 20, 20);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Fecha: " + (this.frmVenta.controls['id'].value == '0' ? this.frmVenta.controls['fecha'].value : 
            this.frmVenta.controls['fecha'].value.toLocaleString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit' })), 10, 30);
    doc.text("Tipo de Pago: " + this.selectedTipoPago.descripcion, 60, 30);
    doc.text("Identificación Cliente: " + this.selectedCliente.descripcionTipoDocumento + " - " + this.selectedCliente.numeroDocumento, 10, 40);
    doc.text("Nombre Cliente: " + this.selectedCliente.nombre, 10, 50);
    doc.text("Teléfono: " + this.selectedCliente.telefono, 10, 60);
    doc.text("Email: " + this.selectedCliente.email, 60, 60);
    doc.table(10,70,this.fnGenerarData(),this.fncreateHeaders(),{ autoSize: false });
    doc.setFont("helvetica", "bold");
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(138, 90+(this.lista.length*10), 60, 15, 3, 3, "FD");
    doc.text("Total: " + this.totalVenta.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }), 143, 99+(this.lista.length*10));
    doc.save(filename);
  }

  private fnGenerarData(){
    const result = [];
    for (const item of this.lista) {
      let data = {
        producto: item.nombreProducto,
        cantidad: item.cantidad.toString(),
        valorUnitario: item.valorUnitario.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
        valorTotal: item.valorTotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
      }; 
      result.push({ ...data });
    }
    return result;
  }

  fncreateHeaders() {
    const keys:CellConfig[] = [
      {name:'producto', prompt: "Producto", width: 110, align: "center", padding: 0},
      {name:'cantidad', prompt: "Cantidad", width: 40, align: "center", padding: 0},
      {name:'valorUnitario', prompt: "Valor Unitario", width: 50, align: "center", padding: 0},
      {name:'valorTotal', prompt: "Valor Total", width: 50, align: "center", padding: 0}
    ];
    return keys;
  }



}
