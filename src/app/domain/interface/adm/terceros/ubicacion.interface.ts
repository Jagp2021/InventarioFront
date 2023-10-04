import { IMediosContactos } from './datos-basicos.interface';

export interface IUbicacion {
  tipoDocumento?: string;
  numeroDocumento?: string;
  tipoPersona?: string;
  designacion_contacto?: string;
  nombre_contacto?: string;
  mediosContactosPersonas?: IMediosContactos[];
  ubicacionesPersonas?: IUbicacionesPersona[];
}

export interface IUbicacionesPersona {
  id: number;
  tipoDireccion: string;
  direccion: string;
  idCiudad: number;
  id_Pais?: number;
  id_Region?: number;
  codigoPostal: string;
  tipoDocumento: string;
  numeroDocumento: string;
  activo: true;
  mediosContactosPersonas: IMediosContactos[];
  descripcion_Ciudad?: string;
  descripcion_Region?: string;
  descripcion_Pais?: string;
  descripcionTipoDireccion?: string;
}
