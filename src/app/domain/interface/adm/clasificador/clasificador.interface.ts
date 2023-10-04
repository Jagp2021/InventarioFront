import { NivelClasificador } from "./nivelclasificador.interface";

export interface Clasificador{
    Id?	:number;
    Nombre?	:string;
    Descripcion?:	string;
    Activo?:	boolean;
    FuncionCatalogo?:	string;
    TopeCaracteres?: number;	
    NivelesClasificador?: NivelClasificador[];
    DescripcionFuncionCatalogo? : string;
}