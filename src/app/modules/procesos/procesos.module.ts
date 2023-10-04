import { NgModule } from '@angular/core';
import { ProcesosRoutingModule } from './procesos.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { PrimengModule } from 'src/app/core/primeng/primeng.module';
import { VentaComponent } from './components/venta/venta.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { GarantiaComponent } from './components/garantia/garantia.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        PrimengModule,
        ProcesosRoutingModule,
        ReactiveFormsModule,
        BlockUIModule,
    ],
    exports: [],
    declarations: [
    VentaComponent,
    IngresoComponent,
    GarantiaComponent
  ],
    providers: [],
})
export class ProcesosModule { }
