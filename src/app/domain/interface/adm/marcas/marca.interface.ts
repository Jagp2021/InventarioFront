import { IValoresMarca } from './valores-marca.interface';

export interface IMarca {
  id?: number;
  nombre?: string;
  funcionCatalogo?: string;
  activo?: boolean;
  tipoDato?: string;
  caracteristicaUso?: boolean;
  tipoMarca?: string;
  valoresMarcas?: IValoresMarca[];
}
