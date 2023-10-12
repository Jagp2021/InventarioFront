import { IDetalleIngreso } from "./detalle-ingreso.interface";

export interface IIngreso {
    id?: number;
    fecha?: Date;
    idProveedor?: number;
    nombreProveedor?: string;
    identificacionProveedor?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    idProducto?: number;
    detalleIngreso?: IDetalleIngreso[];
}
