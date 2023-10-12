import { IDetalleVenta } from "./detalle-venta.interface";

export interface IVenta {
    id?: number;
    numeroFactura?: string;
    fecha?: Date;
    cliente?: number;
    usuarioRegistro?: number;
    tipoPago?: string;
    total?: number;
    nombreCliente?: string;
    identificacionUsuario?: string;
    nombreUsuario?: string;
    usernameUsuario?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    detalleFactura?: IDetalleVenta[];
}
