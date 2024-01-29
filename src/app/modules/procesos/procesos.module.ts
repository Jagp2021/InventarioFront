import { NgModule } from '@angular/core';
import { ProcesosRoutingModule } from './procesos.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'primeng/blockui';
import { PrimengModule } from 'src/app/core/primeng/primeng.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { VentaComponent } from './components/venta/venta.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { GarantiaComponent } from './components/garantia/garantia.component';
import { CrearGarantiaComponent } from './components/garantia/crear-garantia/crear-garantia.component';
import { CrearIngresoComponent } from './components/ingreso/crear-ingreso/crear-ingreso.component';
import { CrearVentaComponent } from './components/venta/crear-venta/crear-venta.component';
import { ModalIngresoComponent } from './components/ingreso/modal-ingreso/modal-ingreso.component';
import { ModalVentaComponent } from './components/venta/modal-venta/modal-venta.component';
import { ModalGarantiaComponent } from './components/garantia/modal-garantia/modal-garantia.component';


@NgModule({
    exports: [],
    declarations: [
    VentaComponent,
    IngresoComponent,
    GarantiaComponent,
    CrearGarantiaComponent,
    CrearIngresoComponent,
    CrearVentaComponent,
    ModalIngresoComponent,
    ModalVentaComponent,
    ModalGarantiaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    ProcesosRoutingModule,
    ReactiveFormsModule,
    BlockUIModule,
    SharedModule,
],
})
export class ProcesosModule { }
