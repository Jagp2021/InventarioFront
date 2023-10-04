export interface IDocumento {
  id?: number;
  sigla?: string;
  descripcion?: string;
}

export interface IDocumentoSoporte {
  id?: number;
  idFuncionalidad?: number;
  categoria?: string | null;
  tipoDocumentoSoporte?: string;
  activo?: boolean;
  fechaRegistro: string;
  hMovientosDocumentosSoportes: [];
}

export interface IHistoricoMovimiento {
  movimiento?: string;
  fechaMovimiento?: Date;
}
