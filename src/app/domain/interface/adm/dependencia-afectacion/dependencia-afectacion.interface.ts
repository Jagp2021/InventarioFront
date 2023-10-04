export interface IDependenciasAfectacion {
  idEntidadesPci?: number;
  codigoDependencia?: string;
  funcionDependencia?: string;
  idEntidadesPciDependencia?: number;
  entidadCreadora?: boolean;
  indicaVinculacion?: boolean;
  descripcionDependencia?: string;
  estadoDependencia?: boolean;
}

export interface IErroresDependencia {
  funcionNegocio?: string;
  codigoDependencia?: string;
  nombreDependencia?: string;
}

export interface IEstado {
  id?: string;
  valor?: boolean | string;
}
