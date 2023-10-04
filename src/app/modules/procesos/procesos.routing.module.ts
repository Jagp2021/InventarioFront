import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/core/page404/page404.component';
import { VentaComponent } from './components/venta/venta.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { GarantiaComponent } from './components/garantia/garantia.component';

const routes: Routes = [
    {path: 'venta', component: VentaComponent},
    {path: 'ingreso', component: IngresoComponent},
    {path: 'garantia', component: GarantiaComponent},
    { path: '**',pathMatch: 'full',component: Page404Component},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcesosRoutingModule {}
