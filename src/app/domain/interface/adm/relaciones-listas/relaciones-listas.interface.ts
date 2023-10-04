export interface IRelacionesCRUD {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface IDominiosRelacionados {
  id?: number;
  dominio?: string;
  orden?: number;
  idRelacionCrud?: number;
  descripcionLista?: string;
  valoresDominioDtos?: ValoresDominioDto[];
  valoresDominiosRelacionados?: any[];
}

export interface ValoresDominioDto {
  dominio?: string;
  sigla?: string;
  entidadPciRegistra?: number;
  codigo?: string;
  descripcion?: string;
  activo?: boolean;
  valorAdministrable?: boolean;
  orden?: number;
  idPerfilRegistra?: number;
  usoSecuencia?: number | null;
}

export interface IValoresRelacionados {
  id1?: number;
  lista1?: string;
  valor1?: string;
  idDominioRelacion?: number;
  descripcion?: string;
  id2?: number;
  lista2?: string;
  valor2?: string;
  idDominioRelacion2?: number;
  descripcion2?: string;
  id3?: number;
  lista3?: string;
  valor3?: string;
  idDominioRelacion3?: number;
  descripcion3?: string;
  id4?: number;
  lista4?: string;
  valor4?: string;
  idDominioRelacion4?: number;
  id_relacion_CRUD?: number;
  descripcion4?: string;
}

export interface IDominioRelacionado {
  id?: number | null;
  dominio?: string | null;
  siglaDominio?: string | null;
  idDominioRelacion?: number | null;
  idPadre?: number | null;
  dominioPadre?: string | null;
  siglaPadre?: string | null;
}
