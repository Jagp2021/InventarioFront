export interface ICalendarioPais {
  id?: number;
  annoFiscal?: string;
  diaNoHabilFinanciero?: boolean;
  diaNoLaboral?: boolean;
  fecha?: string | undefined;
  idPais?: number;
  tipoDia?: string;
}

export interface IUbicacionGeografica {
  codigo?: string;
  codigoPostal?: string;
  gentilicio?: string;
  id?: number;
  idUbicacionPadre?: number;
  idiomaPrincipal?: string;
  latitud?: null;
  longitud?: null;
  monedaPrincipal?: string;
  nombre?: string;
  tipoUbicacion?: string;
  usuarioAuditoria?: null;
}
