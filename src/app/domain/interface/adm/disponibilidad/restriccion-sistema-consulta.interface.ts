export interface IRestriccionSistemaConsulta {
  id?: number;
  descripcion?: string;
  activo?: boolean;
  idPerfil?: number;
  idUsuario?: number;
  idEntidadPci?: number;
  fechaInicial?: string;
  fechaFinal?: string;
  horaInicial?: string;
  horaFinal?: string;
}
