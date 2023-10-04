export interface IListaSeleccion {
  dominio1?: string;
  descripcion?: string;
  activo?: boolean;
  administrable?: boolean;
  administrableSolo?: boolean;
  universal?: boolean;
  mostrarCodigo?: boolean;
  dominioPadre?: string | null;
  perfil?: string;
  valoresDominios?: IValoresDominio[];
}

export interface IValoresDominio {
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

export interface IEstadoGeneral {
  id?: string;
  valor?: boolean;
}

export interface IModel {
  Dominio?: string;
  EntidadPciRegistra?: number;
  IdPerfilRegistra?: number;
}
