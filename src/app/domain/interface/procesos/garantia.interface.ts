import { IDetalleGarantia } from "./detalle-garantia.interface";

export interface IGarantia {
    id?: number;
    idFactura?: number;
    fecha?: Date;
    estadoGarantia?: string;
    idCliente?: number;
    fechaInicio?: Date;
    fechaFin?: Date;
    fechaInicioFactura?: Date;
    fechaFinFactura?: Date;
    nombreCliente?: string;
    identificacionCliente?: string;
    descripcionEstado?: string;
    detalleGarantia?: IDetalleGarantia[];
}
