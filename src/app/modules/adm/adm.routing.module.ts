import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Page404Component } from './../../../app/core/page404/page404.component';
import { FrmMarcasCrearComponent } from './marcas/frm-marcas-crear/frm-marcas-crear.component';
import { ClasificadorComponent } from './clasificador/clasificador/clasificador.component';
import { ListaSeleccionComponent } from './lista-seleccion/lista-seleccion/lista-seleccion.component';
import { TransaccionesComponent } from './transacciones/transacciones/transacciones.component';
import { ReporteTransaccionesComponent } from './reporte-transaccion/reporte-transacciones/reporte-transacciones.component';
import { CategoriaComponent } from './categoria/categoria/categoria.component';
import { CrearClasificadorComponent } from './clasificador/crear-clasificador/crear-clasificador.component';
import { FrmCrearCategoriaComponent } from './categoria/frm-crear-categoria/frm-crear-categoria.component';
import { HorarioSistemaComponent } from './horarioSistema/horario-sistema/horario-sistema.component';
import { FrmCrearTransaccionesComponent } from './transacciones/frm-crear-transacciones/frm-crear-transacciones.component';
import { FrmCrearListaSeleccionComponent } from './lista-seleccion/frm-crear-lista-seleccion/frm-crear-lista-seleccion.component';
import { DelimitarDocumentoComponent } from './delimitar-documento/delimitar-documento/delimitar-documento.component';
import { ComTablaMarcasComponent } from './marcas/com-tabla-marcas/com-tabla-marcas.component';
import { RestriccionDisponibilidadComponent } from './disponibilidad/restriccion-disponibilidad/restriccion-disponibilidad.component';
import { FrmFiltroRestriccionDisponibilidadComponent } from './disponibilidad/frm-filtro-restriccion-disponibilidad/frm-filtro-restriccion-disponibilidad.component';
import { FuentesExternasComponent } from './fuentes-externas/fuentes-externas/fuentes-externas.component';
import { ComTablaConfiguracionConsecutivoComponent } from './consecutivos/com-tabla-configuracion-consecutivo/com-tabla-configuracion-consecutivo.component';
import { RelacionesListasComponent } from './relaciones-listas/relaciones-listas/relaciones-listas.component';
import { FrmRelacionesListasComponent } from './relaciones-listas/frm-relaciones-listas/frm-relaciones-listas.component';
import { LineaGraficaComponent } from './linea-grafica/linea-grafica/linea-grafica.component';
import { LineaGrafica2Component } from './linea-grafica/linea-grafica2/linea-grafica2.component';
import { ReporteRelacionesListasComponent } from './reporte-relaciones-listas/reporte-relaciones-listas/reporte-relaciones-listas.component';
import { ReporteListasSeleccionComponent } from './reporte-listas-seleccion/reporte-listas-seleccion/reporte-listas-seleccion.component';
import { FrmCalendarioComponent } from './calendario/frm-calendario/frm-calendario.component';
import { FrmReporteDisponibilidadComponent } from './reporte-disponibilidad/frm-reporte-disponibilidad/frm-reporte-disponibilidad.component';
import { ListarTercerosComponent } from './terceros/listar-terceros/listar-terceros.component';
import { CrearTerceroComponent } from './terceros/crear-tercero/crear-tercero.component';
import { FrmInformacionBasicaComponent } from './terceros/frm-informacion-basica/frm-informacion-basica.component';
import { FrmInformacionTributariaComponent } from './terceros/frm-informacion-tributaria/frm-informacion-tributaria.component';
import { FrmInformacionUbicacionComponent } from './terceros/frm-informacion-ubicacion/frm-informacion-ubicacion.component';
import { FrmDatosAdministrativosComponent } from './terceros/frm-datos-administrativos/frm-datos-administrativos.component';
import { CuentasBancariasComponent } from './cuentas-bancarias/cuentas-bancarias/cuentas-bancarias.component';
import { DependenciaAfectacionComponent } from './dependencia-afectacion/dependencia-afectacion/dependencia-afectacion.component';

const routes: Routes = [
  {
    path: 'listas-seleccion',
    component: ListaSeleccionComponent,
  },
  {
    path: 'listas-seleccion/crear',
    component: FrmCrearListaSeleccionComponent,
  },
  {
    path: 'listas-seleccion/editar/:id',
    component: FrmCrearListaSeleccionComponent,
  },
  {
    path: 'marcasFuncion',
    component: ComTablaMarcasComponent,
  },
  {
    path: 'marcasFuncion/crearMarca',
    component: FrmMarcasCrearComponent,
  },
  {
    path: 'marcasFuncion/editarMarca/:id',
    component: FrmMarcasCrearComponent,
  },
  {
    path: 'clasificador',
    component: ClasificadorComponent,
  },
  {
    path: 'clasificador/detalleClasificador/:id',
    component: CrearClasificadorComponent,
  },
  {
    path: 'transacciones',
    component: TransaccionesComponent,
  },
  {
    path: 'transacciones/detalleTransaccion/:codigo/:categoria',
    component: FrmCrearTransaccionesComponent,
  },
  {
    path: 'categorias',
    component: CategoriaComponent,
  },
  {
    path: 'categorias/detalleCategoria/:id',
    component: FrmCrearCategoriaComponent,
  },
  {
    path: 'delimitarDocumentos',
    component: DelimitarDocumentoComponent,
  },
  {
    path: 'horarioSistema',
    component: HorarioSistemaComponent,
  },
  {
    path: 'configuracionConsecutivo',
    component: ComTablaConfiguracionConsecutivoComponent,
  },
  {
    path: 'disponibilidad',
    component: FrmFiltroRestriccionDisponibilidadComponent,
  },
  {
    path: 'disponibilidad/restriccionDisponibilidadCrear',
    component: RestriccionDisponibilidadComponent,
  },
  {
    path: 'disponibilidad/restriccionDisponibilidadEditar/:id',
    component: RestriccionDisponibilidadComponent,
  },
  {
    path: 'fuentesExternas',
    component: FuentesExternasComponent,
  },
  {
    path: 'relacionesListas',
    component: RelacionesListasComponent,
  },
  {
    path: 'relacionesListas/editar/:codigo',
    component: FrmRelacionesListasComponent,
  },
  {
    path: 'linea-grafica',
    component: LineaGraficaComponent,
  },
  {
    path: 'linea-grafica-2',
    component: LineaGrafica2Component,
  },
  {
    path: 'calendario',
    component: FrmCalendarioComponent,
  },
  {
    path: 'personaJuridica',
    component: ListarTercerosComponent,
  },
  {
    path: 'personaNatural',
    component: ListarTercerosComponent,
  },
  {
    path: 'persona/crear',
    component: CrearTerceroComponent,
    children: [
      {
        path: 'step-informacion-basica/:tipoPersona',
        component: FrmInformacionBasicaComponent,
      },
      {
        path: 'step-informacion-tributaria/:tipoPersona',
        component: FrmInformacionTributariaComponent,
      },
      {
        path: 'step-informacion-ubicacion/:tipoPersona',
        component: FrmInformacionUbicacionComponent,
      },
      {
        path: 'step-datos-administrativos/:tipoPersona',
        component: FrmDatosAdministrativosComponent,
      },
    ],
  },
  {
    path: 'persona/editar',
    component: CrearTerceroComponent,
    children: [
      {
        path: 'step-informacion-basica/:tipoPersona/:tipoDocumento/:numeroDocumento/:estadoCuenta',
        component: FrmInformacionBasicaComponent,
      },
      {
        path: 'step-informacion-tributaria/:tipoPersona/:tipoDocumento/:numeroDocumento',
        component: FrmInformacionTributariaComponent,
      },
      {
        path: 'step-informacion-ubicacion/:tipoPersona/:tipoDocumento/:numeroDocumento',
        component: FrmInformacionUbicacionComponent,
      },
      {
        path: 'step-datos-administrativos/:tipoPersona/:tipoDocumento/:numeroDocumento',
        component: FrmDatosAdministrativosComponent,
      },
    ],
  },
  {
    path: 'cuentas-bancarias/:tipoDocumento/:numeroDocumento',
    component: CuentasBancariasComponent,
  },
  {
    path: 'dependencia-afectacion',
    component: DependenciaAfectacionComponent,
  },
  {
    path: 'reporte-relaciones-listas',
    component: ReporteRelacionesListasComponent,
  },
  {
    path: 'reporte-listas-seleccion',
    component: ReporteListasSeleccionComponent,
  },
  {
    path: 'reporteTransacciones',
    component: ReporteTransaccionesComponent,
  },
  {
    path: 'reporteDisponibilidad',
    component: FrmReporteDisponibilidadComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmRoutingModule {}
