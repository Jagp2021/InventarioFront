export interface IListaSeleccionFG {
  dominio1?: string;
  descripcion?: string;
  activo?: boolean;
  administrable?: boolean;
  administrableSolo?: boolean;
  universal?: boolean;
  mostrarCodigo?: boolean;
  dominioPadre?: string | null;
  perfil?: string;
  valoresDominios?: IValoresDominioFG[];
}

export interface IValoresDominioFG {
  indice?: number;
  dominio?: string;
  sigla?: string;
  codigo?: string;
  descripcion?: string;
  activo?: boolean;
  valorAdministrable?: boolean;
  dominioPadre?: string | null;
  siglaPadre?: string | null;
  orden?: number;
  entidadPciRegistra?: number;
  entidadPciRegistraPadre?: number;
  idPerfilRegistra?: number;
  usoSecuencia?: boolean;
}

export interface ICatalogosFG {
  id?: number;
  idClasificador?: number;
  nombre?: string;
  descripcion?: string;
  estadoPlantilla?: string;
  tipoPlantilla?: string;
  usoPlantilla?: string;
  idVigencia?: number;
  rubrosPlantillaCuenta?: string | null;
}

export interface IEstadoGeneral {
  id?: string;
  valor?: boolean;
}

export interface IEstadosTransaccionFG {
  estado?: string;
  valor?: boolean;
}

export interface ITransaccionesFG {
  id?: number;
  codigo?: string;
  categoria?: string;
  nombre?: string;
  descripcion?: string;
  funcionNegocio?: string;
  tipoTransaccion?: string;
  opcionMenu?: boolean;
  codigoCasoUso?: string;
  nivelSeguridadAlto?: string;
  requiereLogAuditoria?: boolean;
  requiereDatosAdministrativos?: boolean;
  consultaAsincrona?: boolean;
  contabiliza?: boolean;
  contabilizaAutomaticamente?: boolean;
  cantidadMaxCargaMasiva?: number;
  cantidadMaxRegistroLinea?: number;
  cantidadMaxCargaAsincrona?: number;
  ruta?: string;
  orden?: number;
  activo?: boolean;
  idFuncionalidadPadre?: number;
  estadoFuncionalidad?: string;
}

export interface IUbucacionGeograficaFG {
  id?: number;
  nombre?: string;
  codigo?: string;
  tipoUbicacion?: string | null;
  idiomaPrincipal?: string | null;
  monedaPrincipal?: string | null;
  latitud?: number | null;
  longitud?: number | null;
  codigoPostal?: string | null;
  gentilicio?: string | null;
  idUbicacionPadre?: number | null;
}

export interface IUsuariosFG {
  id: number;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
  digitoVerificacion: string;
  direccionInstitucional: string;
  idCiudad: number;
  usuario1: string;
  estado: string;
  tipoAutenticacion: string;
  entidadPciUsuario: number;
  entidadPci?: any[] | null;
  valorAmbitoEntidadPci?: any[] | null;
  registroSeleccionado?: boolean;
}

export interface IFormTransaccionesFG {
  codigoCategoria: string | null;
  nombreCategoria: string | null;
  tipoTransaccion: string | null;
  funcionNegocio: string | null;
  estado: boolean | null;
  nombreTransaccion: string | null;
  codigoTransaccion: string | null;
  registrosSeleccionados?: any[] | null;
}

export interface IFormPosicionesFG {
  funcionCatalogo: string | null;
  idCatalogo: number | null;
  codigoEntidadPci: string | null;
  descripcion: string | null;
  registrosSeleccionados?: any[] | null;
}

export interface IFormPerfilesFG {
  codigoPerfil: number | null;
  nombrePerfil: string | null;
  descripcionPerfil: string | null;
  rolNegocio: string | null;
  tipoPerfil: string | null;
  estado: boolean | null;
  registrosSeleccionados?: any[] | null;
}

export interface IFormUsuariosFG {
  login: string | null;
  tipoDocumento: string | null;
  numeroDocumento: string | null;
  primerNombre: string | null;
  segundoNombre: string | null;
  primerApellido: string | null;
  segundoApellido: string | null;
  idPais: number | null;
  idRegion: number | null;
  idCiudad: number | null;
  registrosSeleccionados?: any[] | null;
}

export interface IBancosFG {
  id?: number;
  descripcionTipoEntidad?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  nombre?: string;
  activo?: boolean;
  tipoEntidad?: string;
}
