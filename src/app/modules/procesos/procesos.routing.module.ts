import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/core/page404/page404.component';
import { VentaComponent } from './components/venta/venta.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { GarantiaComponent } from './components/garantia/garantia.component';
import { CrearVentaComponent } from './components/venta/crear-venta/crear-venta.component';
import { CrearIngresoComponent } from './components/ingreso/crear-ingreso/crear-ingreso.component';
import { CrearGarantiaComponent } from './components/garantia/crear-garantia/crear-garantia.component';

const routes: Routes = [
    {path: 'venta', component: VentaComponent},
    {path: 'venta/crearVenta/:id', component: CrearVentaComponent},
    {path: 'ingreso', component: IngresoComponent},
    {path: 'ingreso/crearIngreso/:id', component: CrearIngresoComponent},
    {path: 'garantia', component: GarantiaComponent},
    {path: 'garantia/crearGarantia/:id/:accion', component: CrearGarantiaComponent},
    { path: '**',pathMatch: 'full',component: Page404Component},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcesosRoutingModule {}
