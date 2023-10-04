import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { SharedModule } from '../../core/shared/shared.module';
import { PrimengModule } from '../../core/primeng/primeng.module';

@NgModule({
  declarations: [PerfilComponent],
  imports: [CommonModule, PerfilRoutingModule, SharedModule, PrimengModule],
})
export class PerfilModule {}
