import { IDetalleGarantia } from "./detalle-garantia.interface";

export interface IGarantia {
    id?: number;
    tipoGarantia?: string;
    idFactura?: number;
    idIngreso?: number;
    fecha?: Date;
    estadoGarantia?: string;
    idCliente?: number;
    idProveedor?: number;
    fechaInicio?: Date;
    fechaFin?: Date;
    fechaInicioFactura?: Date;
    fechaFinFactura?: Date;
    nombreCliente?: string;
    identificacionCliente?: string;
    descripcionEstado?: string;
    detalleGarantia?: IDetalleGarantia[];
}
