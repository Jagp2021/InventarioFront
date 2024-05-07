import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PrimengModule } from '../primeng/primeng.module';
import { AppMenuitemComponent } from './menu/app.menuitem.component';
import { LblSubtituloComponent } from './lbl-subtitulo/lbl-subtitulo.component';
import { LblTituloComponent } from './lbl-titulo/lbl-titulo.component';
import { BooleanTextPipe } from './pipe/boolean-text.pipe';
import { EstadoPipe } from './pipe/estado-pipe.pipe';
import { HoraTextPipe } from './pipe/hora-text.pipe';
import { FechaTextPipe } from './pipe/fecha-text.pipe';
import { ConvertirCifrasPipe } from './pipe/convertir-cifras.pipe';
import { OverlayTablePipe } from './pipe/overlay-table.pipe';
import { LblToastAccionesComponent } from './lbl-toast-acciones/lbl-toast-acciones.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    AppMenuitemComponent,
    LblSubtituloComponent,
    LblTituloComponent,
    BooleanTextPipe,
    EstadoPipe,
    HoraTextPipe,
    FechaTextPipe,
    ConvertirCifrasPipe,
    OverlayTablePipe,
    LblToastAccionesComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    LblTituloComponent,
    LblSubtituloComponent,
    BooleanTextPipe,
    EstadoPipe,
    HoraTextPipe,
    FechaTextPipe,
    ConvertirCifrasPipe,
    OverlayTablePipe,
    LblToastAccionesComponent,
  ],
})
export class SharedModule {}
