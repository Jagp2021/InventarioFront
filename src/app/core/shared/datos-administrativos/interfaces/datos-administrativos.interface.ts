export interface IDatosAdministrativos {
  id?: number;
  codigoFuncionalidad?: string;
  tablaOrigen?: string;
  idRegistro?: number;
  fechaIngreso?: string;
  documentoSoporte?: string;
  numeroDocumentoSoporte?: string;
  nombreFuncionario?: string;
  cargoFuncionario?: string;
  expedidor?: string;
  observaciones?: string;
}

export interface IDatosAdministrativosAcciones {
  guardar?: boolean;
  editar?: boolean;
  eliminar?: boolean;
}
