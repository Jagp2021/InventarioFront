import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../core/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { PrimengModule } from '../../core/primeng/primeng.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, PrimengModule],
})
export class HomeModule {}
