export interface IProducto{
    id?:number;
    codigo?:string;
    nombre?:string;
    descripcion?:string;
    estado?:boolean;
    cantidadDisponible?: number;
    tipoProducto?: string;
    descripcionTipoProducto?: string;
    estiloTag?: string;
    textoTag?: string;
} 