/**
 * De
 */
export const URLCONTROLADOR = {
  Security: 'SecurityController/api',
  apiDominio: 'Dominio',
  apiTransaccion: 'Funcionalidades',
  producto: 'producto',
  marca: 'marca',
  clasificador: 'Clasificador',
  apiProcesos: 'Procesos',
  datosAdministrativos: 'DatosAdministrativos',
  horarioSistema: 'HorarioSistema',
  secuenciaDocumentoSoporte: 'SecuenciaDocumentoSoporte',
  privilegios: 'Privilegios',
  apiFiltros: 'FiltroGenerico',
  apiUbicacion: 'UbicacionGeografica',
  restriccionDisponibilidad: 'RestriccionDisponibilidad',
  apiFuentesExternas: 'FuentesExternas',
  apiRelacionesCrud: 'RelacionesCrud',
  apiEntidadesPci: 'EntidadesPci',
  calendarioSistema: 'CalendarioSistema',
  apiPerfil: 'Perfil',
  tercero: 'Tercero',
  dian: 'Dian',
  bonosPensionales: 'BonosPensionales',
  apiCuentasBancarias: 'CuentasBancarias',
  apiTerceros: 'Tercero',
  apiDependenciaAfectacion: 'DependenciaAfectacion',
  apiParametrosSistema: 'ParametrosSistema',
};

export const URLACCION = {
  getInfo: 'getInfo',

  //Url para las acciones de Marcas
  obtenerCoincidenciaMarca: 'ObtenerCoincidenciaMarca',
  listarValoresMarcasFuncion: 'ListarValoresMarcaxFuncion',
  obtenerMarca: 'ObtenerMarca',
  crearMarca: 'CrearMarca',
  editarMarca: 'editarMarca',
  eliminarMarca: 'EliminarMarca',
  obtenerValorMarca: 'ObtenerValorMarca',
  listarValoresMarcaFuncion: 'ListarValoresMarcaxFuncion',
  crearValorMarca: 'CrearValorMarca',
  editarValorMarca: 'EditarValorMarca',
  eliminarValorMarca: 'EliminarValorMarca',

  // Url para Dominios
  obtenerDominio: 'ObtenerDominio',
  crearDominio: 'CrearDominio',
  obtenerDominiosExistentes: 'ObtenerDominiosExistentes',
  crearValoresDominio: 'CrearValoresDominio',
  editarDominio: 'EditarDominio',
  editarValoresDominio: 'EditarValoresDominio',
  eliminarValorDominio: 'EliminarValoresDominio',
  obtenerValoresDominio: 'ObtenerValoresDominio',

  // Url para Clasificador
  obtenerClasificador: 'ObtenerClasificador',
  crearClasificador: 'CrearClasificador',
  editarClasificador: 'EditarClasificador',
  copiarClasificador: 'CopiarClasificador',
  obtenerNivelClasificador: 'ObtenerNivelesClasificador',
  crearNivelClasificador: 'CrearNivelClasificador',
  editarNivelClasificador: 'EditarNivelClasificador',
  eliminarNivelClasificador: 'eliminarNivelClasificador',

  // Url para Delimitar Documentos
  obtenerDocumentosSoportexFuncionalidad:
    'ObtenerDocumentosSoportexFuncionalidad',
  crearDocumentosSoportexFuncionalidad: 'crearDocumentosSoportexFuncionalidad',
  obtenerHMovimientosDocumentosSoporte: 'ObtenerHMovientosDocumentosSoporte',
  editarDocumentosSoportexFuncionalidad:
    'EditarDocumentosSoportexFuncionalidad',

  //Url para DatosAdministrativos
  obtenerDatosAdministrativos: 'ObtenerDatosAdministrativos',
  crearDatosAdministrativos: 'CrearDatosAdministrativos',
  editarDatosAdministrativos: 'ActualizarDatosAdministrativos',

  //Url Horario sistema
  obtenerHorarioSistema: 'ObtenerHorarioSistema',
  crearHorarioSistema: 'GuardarHorarioSistema',
  editarHorarioSistema: 'ModificarHorarioSistema',
  eliminarHorarioSistema: 'EliminarHorariosistema',
  validarExistenciaHorarioSistema: 'ValidarExistenciarHorarioSistema',

  // url para Transacción
  obtenerTransacciones: 'ObtenerFuncionalidades',
  crearTransaccion: 'CrearFuncionalidad',
  editarTransaccion: 'EditarFuncionalidad',

  //Url configuración consecutivos
  obtenerSecuenciaDocumentoSoporte: 'ObtenerSecuenciaDocumentoSoporte',
  validarActualizacionConsecutivoSecuenciaDocumentoSoporte:
    'ValidarActualizacionConsecutivoSecuenciaDocumentoSoporte',

  cambiarEstadoPrivilegios: 'ActualizarEstadoPrivilegios',

  //Url Reporte Transacciones
  generarReporteTransacciones: 'xxx',

  //Url Filtros
  obtenerFGPerfiles: 'ObtenerPerfiles',
  obtenerFGTransacciones: 'ObtenerTransacciones',
  obtenerFGUsuarios: 'ObtenerUsuarios',
  obtenerFGPosiciones: 'ObtenerPosicionesCatalogo',
  obtenerFGPosicionesArbol: 'ObtenerPosicionesCatalogoArbol',
  obtenerFGPaises: 'ObtenerPais',
  obtenerFGRegiones: 'ObtenerRegion',
  obtenerFGCiudades: 'ObtenerCiudad',
  obtenerFGUbicacionGeo: 'ObtenerUbicacionGeografica',
  obtenerFGCatalogos: 'ObtenerCatalogoInstitucional',
  obtenerFGPerfil: 'ObtenerPerfil',
  obtenerFGEntidades: 'ObtenerEntidadesFinancieras',
  obtenerJerarquiaCiudadTercero: 'ObtenerJerarquiaCiudadTercero',

  //Url Restriccion Disponibilidad
  obtenerRestriccion: 'GetRestriccion',
  crearRestriccion: 'CrearRestriccion',
  editarRestriccion: 'EditarRestriccion',

  //Url Fuentes Externas
  obtenerFuenteExterna: 'ObtenerFuenteExterna',
  editarFuenteExterna: 'EditarFuenteExterna',
  editarListaFuenteExterna: 'EditarListaFuenteExterna',
  eliminarListaFuenteExterna: 'EliminarListaFuenteExterna',

  //Url Relaciones CRUD
  obtenerRelacionesCRUD: 'ObtenerRelacionesCRUD',
  obtenerDominiosRelacionados: 'ObtenerDominiosRelacionados',
  obtenerValoresRelacionadosH: 'ObtenerValoresDominiosRelacionadosHorizontal',
  crearListaValoresRelacionados: 'CrearListaValoresRelacionados',
  eliminarValoresRelacionados: 'EliminarValoresDominioRelacionado',
  obtenerValoresDominiosRelacionadosSegundoCriterio:
    'ObtenerValoresDominiosRelacionadosSegundoCriterio',

  //Url Calendario
  obtenerCalendarioSistema: 'ObtenerCalendarioSistema',
  guardarCalendarioSistema: 'GuardarCalendarioSistema',
  ActualizarListaCalendarioSistema: 'ActualizarListaCalendarioSistema',
  eliminarCalendarioPais: 'EliminarCalendarioPais',

  //Url Terceros
  obtenerPersonas: 'ObtenerPersonas',
  obtenerUbicacionesGeograficasPersonas:
    'ObtenerUbicacionesGeograficasPersonas',
  obtenerInformacionTributaria: 'ObtenerInformacionTributaria',
  obtenerActividadesEconomicasCIIU: 'ObtenerActividadesEconomicasCIIU',
  obtenerResponsabilidadesTributariasPersonas:
    'ObtenerResponsabilidadesTributariasPersonas',
  obtenerParticipantesColaboracion: 'ObtenerParticipantesColaboracion',
  crearPersonaInformacionBasica: 'CrearPersonaInformacionBasica',
  crearInformacionTributaria: 'CrearInformacionTributaria',
  crearUbicacionGeograficaPersona: 'CrearUbicacionGeograficaPersona',
  actualizarPersonaInformacionBasica: 'ActualizarPersonaInformacionBasica',
  actualizarInformacionTributaria: 'ActualizarInformacionTributaria',
  actualzarUbicacionGeograficaPersona: 'ActualzarUbicacionGeograficaPersona',
  actualzarDireccionUbicacionGeograficaPersona:
    'ActualzarDireccionUbicacionGeograficaPersona',
  crearDireccionUbicacionGeograficaPersona:
    'CrearDireccionUbicacionGeograficaPersona',

  //Url Dian
  obtenerPersonaJuridica: 'ObtenerPersonaJuridica',
  //Url Bonos Pensionales
  obtenerPersona: 'ObtenerPersona',
  //Url Cuentas Bancarias
  obtenerTerceros: 'ObtenerPersonas',
  obtenerCuentasBancarias: 'ObtenerCuentasBancarias',
  obtenerConfiguracionCuenta: 'ObtenerConfiguracionTipoCuenta',
  guardarCuentasBancarias: 'GuardarCuentasBancarias',
  actualizarCuentasBancarias: 'ActualizarCuentasBancarias',

  //Url Dependencias Afectación
  obtenerVinculacionDependencias: 'ObtenerVinculacionDependencias',
  guardarDependenciaAfectacion: 'GuardarDependenciaAfectacion',
  actualizarDependenciaAfectacion: 'ActualizarDependenciaAfectacion',
  vincularDependenciasAfectacion: 'VincularDependenciasAfectacion',
  desvincularDependenciasAfectacion: 'DesvincularDependenciasAfectacion',
  eliminarDependenciaAfectacion: 'EliminarDependenciaAfectacion',

  //url parámetros Sistema
  obtenerParametroSistema: 'GetParametrosSistema',
};
