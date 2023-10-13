import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Page404Component } from 'src/app/core/page404/page404.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProductoComponent } from './components/producto/producto.component';



const routes: Routes = [
    {path: 'usuario', component: UsuarioComponent},
    {path: 'proveedor', component: ProveedorComponent},
    {path: 'cliente', component: ClienteComponent},
    {path: 'producto', component: ProductoComponent},
    {
        path: '**',
        pathMatch: 'full',
        component: Page404Component,
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParametrizacionRoutingModule {}
