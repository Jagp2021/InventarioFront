import { NgModule } from '@angular/core';
import { ParametrizacionRoutingModule } from './parametrizacion.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'primeng/blockui';
import { PrimengModule } from 'src/app/core/primeng/primeng.module';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ProductoCrearComponent } from './components/producto/producto-crear/producto-crear.component';


@NgModule({
    declarations: [
        UsuarioComponent,
        ProductoComponent,
        ProveedorComponent,
        ClienteComponent,
        ProductoCrearComponent,
      ],
    imports: [
        CommonModule,
        FormsModule,
        PrimengModule,
        ParametrizacionRoutingModule,
        ReactiveFormsModule,
        BlockUIModule,
        SharedModule,
    ],

    
})
export class ParametrizacionModule { }
