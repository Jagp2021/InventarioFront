export interface ITributaria {
  activo?: boolean;
  digitoVerificacion?: string;
  digitoVerificacionPersona?: string;
  nitPersona?: boolean;
  numeroDocumento?: string;
  tipoDocumento?: string;
  validacionDian?: boolean;
  validacionExitosaDian?: boolean;
  actividadesEconomicas?: IActividadesEconomicasCIIU[];
  responsabilidadTributaria?: IResponsabilidadTributaria[];
}

export interface IActividadesEconomicasCIIU {
  tipoDocumento?: string;
  numeroDocumento?: string;
  codigoActividadCiiu?: string;
  descripcionActividadCiiu?: string;
  activo?: boolean;
}
export interface IResponsabilidadTributaria {
  tipoDocumento?: string;
  numeroDocumento?: string;
  tipoResponsabilidadTributaria?: string;
  descripcionTipoResponsabilidadTributaria?: string;
  activo?: boolean;
}

//**Interfaces para listas */
export interface IActividadesEconomicas {
  activo?: boolean;
  codigo?: string;
  codigoPadre?: string;
  descripcion?: string;
}
