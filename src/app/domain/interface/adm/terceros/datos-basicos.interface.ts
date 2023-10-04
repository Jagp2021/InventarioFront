export interface IDatosBasicos {
  activo?: boolean;
  descripcionActividadEconomica?: string;
  designacion_contacto?: string;
  digitoVerificacion?: string;
  digitoVerificacionPersona?: string;
  fechaActualizacion?: string;
  fechaCreacion?: string;
  mediosContactosPersonas?: IMediosContactos[];
  nitPersona?: string;
  nombre_contacto?: string;
  numeroDocumento?: string;
  participantesColaboracionEmpresarialPersonas?: IParticipantes[];
  primerApellido?: string;
  primerNombre?: string;
  razonSocial?: string;
  segundoApellido?: string;
  segundoNombre?: string;
  tipoDocumento?: string;
  tipoNaturaleza?: string;
  tipoPersona?: string;
  tipoTerceroJuridico?: string;
  validacionDian?: boolean;
  validacionExitosaDian?: boolean;
  estadoRegistro?: string | null;
  anterior?: boolean;
}
export interface IMediosContactos {
  id?: number;
  tipoDocumento?: string;
  numeroDocumento?: string;
  tipoContacto?: string;
  valorContacto?: string;
  telefono?: string;
  activo?: boolean;
  principal?: boolean;
  idUbicacionPersona?: number;
  idPersonasContacto?: number;
}

export interface IParticipantes {
  id?: number;
  tipoDocumentoColaboracionEmpresarial?: string;
  numeroDocumentoColaboracionEmpresarial?: string;
  tipoDocumentoParticipante?: string;
  numeroDocumentoParticipante?: string;
  participacion?: number;
  estadoTercero?: string;
}

export interface Datum {
  estadoTercero: string;
  id: number;
  numeroDocumentoColaboracionEmpresarial: string;
  numeroDocumentoParticipante: string;
  participacion: number;
  persona: null;
  personaNavigation: null;
  tipoDocumentoColaboracionEmpresarial: string;
  tipoDocumentoParticipante: string;
}

export interface IDatosNavegacion {
  tipoDocumento?: string;
  numeroDocumento?: string;
  tipoPersona?: string;
  anterior?: boolean;
}
