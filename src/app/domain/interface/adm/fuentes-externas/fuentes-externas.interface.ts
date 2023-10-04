export interface IFuenteExterna {
  codigo?: string;
  descripcion?: string;
  activo?: boolean;
  requeridoFuenteExterna?: boolean;
  requiereAutenticacion?: boolean;
  usuario?: string;
  contrasena?: string;
}

export interface IDatosAutenticar {
  usuario?: string | null;
  contrasena?: string | null;
}
