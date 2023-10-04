import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { PrimengModule } from 'src/app/core/primeng/primeng.module';
import { ReportesRoutingModule } from './reportes.routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        PrimengModule,
        ReportesRoutingModule,
        ReactiveFormsModule,
        BlockUIModule,
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class ReportesModule { }
