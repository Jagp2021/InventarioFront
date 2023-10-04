export interface ICuentasBancarias {
  id?: number;
  tipoDocumentoEntidadFinanciera?: string;
  numeroDocumentoEntidadFinanciera?: string;
  tipoCuenta?: string;
  numeroCuenta?: string;
  tipoMoneda?: string;
  fechaCreacion?: string | Date;
  activo?: boolean;
  tipoDocumentoTercero?: string;
  numeroDocumentoTercero?: string;
  idPersona?: number;
  descripcionTipoCuenta?: string;
  descripcionEstadoCuentaBancaria?: string;
  estado?: string;
  estadoCuentaBancaria?: string;
  nombreEntidadFinanciera?: string;
  esTemporal?: boolean;
  esActualizado?: boolean;
}

export interface IEstado {
  id?: string;
  valor?: boolean | string;
}

// TODO: TEMPORAL ELIMINAR
export interface ITerceros {
  tipoDocumento: string;
  numeroDocumento: string;
  digitoVerificacionPersona?: string;
  tipoPersona?: string;
  tipoNaturaleza: string;
  tipoTerceroJuridico?: string;
  digitoVerificacion?: string;
  razonSocial?: string;
  descripcionActividadEconomica?: string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  activo?: boolean;
  nitPersona?: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  validacionDian?: boolean;
  validacionExitosaDian?: boolean;
  designacion_contacto?: string;
  nombre_contacto?: string;
  mediosContactosPersonas?: any[];
  participantesColaboracionEmpresarialPersonas?: any[];
}
