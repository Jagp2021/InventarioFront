import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdmRoutingModule } from './adm.routing.module';

import { SharedModule } from 'src/app/core/shared/shared.module';
import { PrimengModule } from 'src/app/core/primeng/primeng.module';
import { ComTablaListaSeleccionComponent } from './lista-seleccion/com-tabla-lista-seleccion/com-tabla-lista-seleccion.component';
import { FrmMarcasCrearComponent } from './marcas/frm-marcas-crear/frm-marcas-crear.component';
import { ComTablaMarcasComponent } from './marcas/com-tabla-marcas/com-tabla-marcas.component';
import { ClasificadorComponent } from './clasificador/clasificador/clasificador.component';
import { CrearClasificadorComponent } from './clasificador/crear-clasificador/crear-clasificador.component';
import { TablaClasificadorComponent } from './clasificador/tabla-clasificador/tabla-clasificador.component';
import { ListaSeleccionComponent } from './lista-seleccion/lista-seleccion/lista-seleccion.component';
import { ComTablaListaValoresComponent } from './lista-seleccion/com-tabla-lista-valores/com-tabla-lista-valores.component';
import { FrmCrearListaSeleccionComponent } from './lista-seleccion/frm-crear-lista-seleccion/frm-crear-lista-seleccion.component';
import { TransaccionesComponent } from './transacciones/transacciones/transacciones.component';
import { ComTablaTransaccionesComponent } from './transacciones/com-tabla-transacciones/com-tabla-transacciones.component';
import { FrmCrearTransaccionesComponent } from './transacciones/frm-crear-transacciones/frm-crear-transacciones.component';
import { ReporteTransaccionesComponent } from './reporte-transaccion/reporte-transacciones/reporte-transacciones.component';
import { FrmReporteTransaccionesComponent } from './reporte-transaccion/frm-reporte-transacciones/frm-reporte-transacciones.component';
import { FrmCrearCategoriaComponent } from './categoria/frm-crear-categoria/frm-crear-categoria.component';
import { CategoriaComponent } from './categoria/categoria/categoria.component';
import { NivelClasificadorComponent } from './clasificador/nivel-clasificador/nivel-clasificador.component';
import { DelimitarDocumentoComponent } from './delimitar-documento/delimitar-documento/delimitar-documento.component';
import { ComTablaHistoricoDocumentoComponent } from './delimitar-documento/com-tabla-historico-documento/com-tabla-historico-documento.component';
import { HorarioSistemaComponent } from './horarioSistema/horario-sistema/horario-sistema.component';
import { ComTablaHorarioSistemaComponent } from './horarioSistema/com-tabla-horario-sistema/com-tabla-horario-sistema.component';
import { FrmHorarioSistemaComponent } from './horarioSistema/frm-horario-sistema/frm-horario-sistema.component';
import { FrmConfiguracionConsecutivoComponent } from './consecutivos/frm-configuracion-consecutivo/frm-configuracion-consecutivo.component';
import { ComTablaConfiguracionConsecutivoComponent } from './consecutivos/com-tabla-configuracion-consecutivo/com-tabla-configuracion-consecutivo.component';
import { FrmFiltroRestriccionDisponibilidadComponent } from './disponibilidad/frm-filtro-restriccion-disponibilidad/frm-filtro-restriccion-disponibilidad.component';
import { RestriccionDisponibilidadComponent } from './disponibilidad/restriccion-disponibilidad/restriccion-disponibilidad.component';
import { ComTablaRestriccionTransaccionComponent } from './disponibilidad/com-tabla-restriccion-transaccion/com-tabla-restriccion-transaccion.component';
import { ComTablaRestriccionFechasComponent } from './disponibilidad/com-tabla-restriccion-fechas/com-tabla-restriccion-fechas.component';
import { ComTablaRestriccionPerfilesComponent } from './disponibilidad/com-tabla-restriccion-perfiles/com-tabla-restriccion-perfiles.component';
import { ComTablaRestriccionUsuariosComponent } from './disponibilidad/com-tabla-restriccion-usuarios/com-tabla-restriccion-usuarios.component';
import { ComTablaRestriccionUnidadSubunidadesComponent } from './disponibilidad/com-tabla-restriccion-unidad-subunidades/com-tabla-restriccion-unidad-subunidades.component';
import { ComTablaRestriccionHorarioComponent } from './disponibilidad/com-tabla-restriccion-horario/com-tabla-restriccion-horario.component';
import { FuentesExternasComponent } from './fuentes-externas/fuentes-externas/fuentes-externas.component';
import { FrmFuentesExternasComponent } from './fuentes-externas/frm-fuentes-externas/frm-fuentes-externas.component';
import { RelacionesListasComponent } from './relaciones-listas/relaciones-listas/relaciones-listas.component';
import { FrmRelacionesListasComponent } from './relaciones-listas/frm-relaciones-listas/frm-relaciones-listas.component';
import { ComTablaRelacionesListasComponent } from './relaciones-listas/com-tabla-relaciones-listas/com-tabla-relaciones-listas.component';
import { LineaGraficaComponent } from './linea-grafica/linea-grafica/linea-grafica.component';
import { LineaGrafica2Component } from './linea-grafica/linea-grafica2/linea-grafica2.component';
import { ReporteRelacionesListasComponent } from './reporte-relaciones-listas/reporte-relaciones-listas/reporte-relaciones-listas.component';
import { FrmReporteRelacionesListasComponent } from './reporte-relaciones-listas/frm-reporte-relaciones-listas/frm-reporte-relaciones-listas.component';
import { ReporteListasSeleccionComponent } from './reporte-listas-seleccion/reporte-listas-seleccion/reporte-listas-seleccion.component';
import { FrmReporteListasSeleccionComponent } from './reporte-listas-seleccion/frm-reporte-listas-seleccion/frm-reporte-listas-seleccion.component';
import { FrmCalendarioComponent } from './calendario/frm-calendario/frm-calendario.component';
import { FrmReporteDisponibilidadComponent } from './reporte-disponibilidad/frm-reporte-disponibilidad/frm-reporte-disponibilidad.component';
import { ListarTercerosComponent } from './terceros/listar-terceros/listar-terceros.component';
import { CrearTerceroComponent } from './terceros/crear-tercero/crear-tercero.component';
import { FrmInformacionBasicaComponent } from './terceros/frm-informacion-basica/frm-informacion-basica.component';
import { FrmInformacionTributariaComponent } from './terceros/frm-informacion-tributaria/frm-informacion-tributaria.component';
import { FrmInformacionUbicacionComponent } from './terceros/frm-informacion-ubicacion/frm-informacion-ubicacion.component';
import { FrmDatosAdministrativosComponent } from './terceros/frm-datos-administrativos/frm-datos-administrativos.component';
import { BlockUIModule } from 'primeng/blockui';
import { CuentasBancariasComponent } from './cuentas-bancarias/cuentas-bancarias/cuentas-bancarias.component';
import { ComDatosTercerosComponent } from './cuentas-bancarias/com-datos-terceros/com-datos-terceros.component';
import { FrmCrearCuentaComponent } from './cuentas-bancarias/frm-crear-cuenta/frm-crear-cuenta.component';
import { ComTablaCuentasComponent } from './cuentas-bancarias/com-tabla-cuentas/com-tabla-cuentas.component';
import { DependenciaAfectacionComponent } from './dependencia-afectacion/dependencia-afectacion/dependencia-afectacion.component';
import { FrmCrearDependenciaComponent } from './dependencia-afectacion/frm-crear-dependencia/frm-crear-dependencia.component';
import { FrmBuscarDependenciaComponent } from './dependencia-afectacion/frm-buscar-dependencia/frm-buscar-dependencia.component';
import { ComDependenciaAfectacionComponent } from './dependencia-afectacion/com-dependencia-afectacion/com-dependencia-afectacion.component';
import { ModalCoincidenciaExtranjeroComponent } from './terceros/modal-coincidencia-extranjero/modal-coincidencia-extranjero.component';
import { ModalValidacionErroresComponent } from './terceros/modal-validacion-errores/modal-validacion-errores.component';
import { TableComponent } from './linea-grafica/linea-grafica/components/table/table.component';
import { NavegadoresComponent } from './linea-grafica/linea-grafica/components/navegadores/navegadores.component';
import { NotificadoresComponent } from './linea-grafica/linea-grafica/components/notificadores/notificadores.component';
import { BotonesComponent } from './linea-grafica/linea-grafica/components/botones/botones.component';
import { FiltrosGenericosComponent } from './linea-grafica/linea-grafica/components/filtros-genericos/filtros-genericos.component';
import { FiltrosComponent } from './linea-grafica/linea-grafica/components/filtros/filtros.component';
import { ModalesComponent } from './linea-grafica/linea-grafica/components/modales/modales.component';
import { FormulariosComponent } from './linea-grafica/linea-grafica/components/formularios/formularios.component';
import { OtrosComponent } from './linea-grafica/linea-grafica/components/otros/otros.component';

@NgModule({
  declarations: [
    ComTablaListaSeleccionComponent,
    ListaSeleccionComponent,
    ComTablaListaValoresComponent,
    FrmCrearListaSeleccionComponent,
    FrmMarcasCrearComponent,
    ComTablaMarcasComponent,
    ClasificadorComponent,
    CrearClasificadorComponent,
    TablaClasificadorComponent,
    ListaSeleccionComponent,
    ComTablaListaValoresComponent,
    FrmCrearListaSeleccionComponent,
    TransaccionesComponent,
    ComTablaTransaccionesComponent,
    FrmCrearTransaccionesComponent,
    ReporteTransaccionesComponent,
    FrmReporteTransaccionesComponent,
    FrmCrearCategoriaComponent,
    CategoriaComponent,
    CrearClasificadorComponent,
    TablaClasificadorComponent,
    NivelClasificadorComponent,
    DelimitarDocumentoComponent,
    ComTablaHistoricoDocumentoComponent,
    HorarioSistemaComponent,
    ComTablaHorarioSistemaComponent,
    FrmHorarioSistemaComponent,
    FrmConfiguracionConsecutivoComponent,
    ComTablaConfiguracionConsecutivoComponent,
    FrmFiltroRestriccionDisponibilidadComponent,
    RestriccionDisponibilidadComponent,
    ComTablaRestriccionTransaccionComponent,
    ComTablaRestriccionFechasComponent,
    ComTablaRestriccionPerfilesComponent,
    ComTablaRestriccionUsuariosComponent,
    ComTablaRestriccionUnidadSubunidadesComponent,
    ComTablaRestriccionHorarioComponent,
    FuentesExternasComponent,
    FrmFuentesExternasComponent,
    RelacionesListasComponent,
    FrmRelacionesListasComponent,
    ComTablaRelacionesListasComponent,
    LineaGraficaComponent,
    LineaGrafica2Component,
    ReporteRelacionesListasComponent,
    FrmReporteRelacionesListasComponent,
    ReporteListasSeleccionComponent,
    FrmReporteListasSeleccionComponent,
    FrmCalendarioComponent,
    FrmReporteDisponibilidadComponent,
    ListarTercerosComponent,
    CrearTerceroComponent,
    FrmInformacionBasicaComponent,
    FrmInformacionTributariaComponent,
    FrmInformacionUbicacionComponent,
    FrmDatosAdministrativosComponent,
    CuentasBancariasComponent,
    ComDatosTercerosComponent,
    FrmCrearCuentaComponent,
    ComTablaCuentasComponent,
    DependenciaAfectacionComponent,
    FrmCrearDependenciaComponent,
    FrmBuscarDependenciaComponent,
    ComDependenciaAfectacionComponent,
    ModalCoincidenciaExtranjeroComponent,
    ModalValidacionErroresComponent,
    TableComponent,
    NavegadoresComponent,
    NotificadoresComponent,
    BotonesComponent,
    FiltrosGenericosComponent,
    FiltrosComponent,
    ModalesComponent,
    FormulariosComponent,
    OtrosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PrimengModule,
    AdmRoutingModule,
    ReactiveFormsModule,
    BlockUIModule,
  ],
})
export class AdmModule {}
