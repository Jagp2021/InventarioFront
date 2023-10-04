import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SharedModule } from '../core/shared/shared.module';
import { PrimengModule } from '../core/primeng/primeng.module';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [CommonModule, RouterModule, SharedModule, PrimengModule],
  exports: [AdminLayoutComponent],
})
export class LayoutsModule {}
