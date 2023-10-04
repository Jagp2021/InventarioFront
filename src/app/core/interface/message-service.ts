export interface IMensaje {
  key?: string;
  severity?: string | ETipos;
  summary?: string;
  detail?: string;
  life?: number;
  params?: any;
  exception?: Error;
  styleClass?: string;
  sticky?: boolean;
  data?: any;
}

export interface IBandera {
  tipo: ETipos;
  encabezado: string;
  icono: string;
  mensaje: string;
}

export type ETipos = 'success' | 'info' | 'warn' | 'error';

export type TOrdenar = 'sAcentuado' | 'sNormal' | 'nNumerico';
