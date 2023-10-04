export interface ITransacciones {
  id?: number;
  codigo?: string;
  categoria?: string;
  nombre?: string;
  descripcion?: string;
  funcionNegocio?: string;
  tipoTransaccion?: string;
  opcionMenu?: boolean;
  codigoCasoUso?: string;
  nivelSeguridadAlto?: string;
  requiereLogAuditoria?: boolean;
  requiereDatosAdministrativos?: boolean;
  consultaAsincrona?: boolean;
  contabiliza?: boolean;
  contabilizaAutomaticamente?: boolean;
  cantidadMaxCargaMasiva?: number;
  cantidadMaxRegistroLinea?: number;
  cantidadMaxCargaAsincrona?: number;
  ruta?: string;
  orden?: number;
  activo?: boolean;
  idFuncionalidadPadre?: number;
  estadoFuncionalidad?: string;
}

export interface IEstadosTransaccion {
  estado?: string;
  valor?: boolean;
}

export interface IHabilitarCampos {
  campo: string;
  habilitar?: boolean;
  required?: boolean;
}
