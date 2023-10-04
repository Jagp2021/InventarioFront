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
import { FiltroTransaccionesComponent } from './filtros-genericos/filtro-transacciones/filtro-transacciones.component';
import { FiltroTransaccionesResultadoComponent } from './filtros-genericos/filtro-transacciones/components/filtro-transacciones-resultado/filtro-transacciones-resultado.component';
import { FiltroPerfilesComponent } from './filtros-genericos/filtro-perfiles/filtro-perfiles.component';
import { FiltroPerfilesResultadoComponent } from './filtros-genericos/filtro-perfiles/components/filtro-perfiles-resultado/filtro-perfiles-resultado.component';
import { FiltroUsuariosComponent } from './filtros-genericos/filtro-usuarios/filtro-usuarios.component';
import { FiltroUsuariosResultadoComponent } from './filtros-genericos/filtro-usuarios/components/filtro-usuarios-resultado/filtro-usuarios-resultado.component';
import { FiltroCatalogoComponent } from './filtros-genericos/filtro-catalogo/filtro-catalogo.component';
import { FiltroCatalogoResultadoComponent } from './filtros-genericos/filtro-catalogo/components/filtro-catalogo-resultado/filtro-catalogo-resultado.component';
import { ConvertirCifrasPipe } from './pipe/convertir-cifras.pipe';
import { OverlayTablePipe } from './pipe/overlay-table.pipe';
import { DatosAdministrativosComponent } from './datos-administrativos/datos-administrativos/datos-administrativos.component';
import { FiltroTercerosComponent } from './filtros-genericos/filtro-terceros/filtro-terceros.component';
import { FiltroTercerosResultadoComponent } from './filtros-genericos/filtro-terceros/components/filtro-terceros-resultado/filtro-terceros-resultado.component';
import { FiltroBancosComponent } from './filtros-genericos/filtro-bancos/filtro-bancos.component';
import { FiltroBancosResultadoComponent } from './filtros-genericos/filtro-bancos/components/filtro-bancos-resultado/filtro-bancos-resultado.component';
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
    FiltroTransaccionesComponent,
    FiltroTransaccionesResultadoComponent,
    FiltroPerfilesComponent,
    FiltroPerfilesResultadoComponent,
    FiltroUsuariosComponent,
    FiltroUsuariosResultadoComponent,
    FiltroCatalogoComponent,
    FiltroCatalogoResultadoComponent,
    ConvertirCifrasPipe,
    OverlayTablePipe,
    DatosAdministrativosComponent,
    FiltroTercerosComponent,
    FiltroTercerosResultadoComponent,
    FiltroBancosComponent,
    FiltroBancosResultadoComponent,
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
    FiltroTransaccionesComponent,
    FiltroPerfilesComponent,
    FiltroUsuariosComponent,
    FiltroCatalogoComponent,
    ConvertirCifrasPipe,
    OverlayTablePipe,
    DatosAdministrativosComponent,
    FiltroTercerosComponent,
    FiltroBancosComponent,
    LblToastAccionesComponent,
  ],
})
export class SharedModule {}
