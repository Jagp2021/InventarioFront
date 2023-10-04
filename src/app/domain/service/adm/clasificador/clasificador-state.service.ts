import { Injectable } from '@angular/core';
import { State } from 'src/app/core/store/State';
import { UserStateService } from '../../configuration/user-state.service';
import { ClasificadorService } from 'src/app/data/remote/adm/clasificador/clasificador.service';
import { Clasificador } from 'src/app/domain/interface/adm/clasificador/clasificador.interface';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { NivelClasificador } from 'src/app/domain/interface/adm/clasificador/nivelclasificador.interface';
export interface StateGlobal {
  clasificadores: Clasificador[]; 
  clasificadorRow: Clasificador;
  nivelesClasificadorRow: NivelClasificador;
  clasificadorExiste: boolean;
  copiar?: boolean;
  editar?: boolean;
  insertar?: boolean;
  nivelesClasificador: NivelClasificador[];
  insertarNivel?: boolean;
  editarNivel?: boolean;
  eliminarNivel?: boolean;
}

const initialState: StateGlobal = {
  clasificadores: [],
  clasificadorRow: {},
  nivelesClasificadorRow: {},
  clasificadorExiste: false,
  nivelesClasificador: [],
  copiar: undefined,
  editar: undefined,
  insertar: undefined,
  insertarNivel: undefined,
  eliminarNivel: undefined,
  editarNivel: undefined
  };
  @Injectable({
    providedIn: 'root'
  })
  export class ClasificadorStateService extends State<StateGlobal> {
  
    constructor(private _clasificadorService: ClasificadorService, private _user: UserStateService) {
      super(initialState);
    }
  
    /**
     * Descripción: Servicio que consulta los clasificadores
     * Autor: Asesoftware - Javier Gonzalez
     * Fecha: 10/03/2023
     * @param model 
     */
    public getClasificador(model? : Clasificador): void {
      this._clasificadorService.getClasificador<IRespuestaApi>(model).subscribe({
        next: (res) => {
           this.setState({clasificadores: <Clasificador[]>res.data});
        }
      });
    }

    /**
     * Descripción: Servicio que Crea los clasificadores
     * Autor: Asesoftware - Javier Gonzalez
     * Fecha: 10/03/2023
     * @param model 
     */
    public saveClasificador(model: Clasificador): void {
      this._clasificadorService.createClasificador<IRespuestaApi>(model).subscribe({
        next:(resp) => {
          if(resp.estado){
            this.setState({insertar: resp.estado, clasificadorRow: <Clasificador>resp.data});
          }
        }
      });
    }

    /**
     * Descripción: Servicio que Actualiza los clasificadores
     * Autor: Asesoftware - Javier Gonzalez
     * Fecha: 10/03/2023
     * @param model 
     */
    public updateClasificador(model: Clasificador): void{
      this._clasificadorService.updateClasificador<IRespuestaApi>(model).subscribe({
        next: (resp) => {
          if(resp.estado){
            this.setState({editar:resp.estado});
          }
        }
      });
    }

    /**
     * Descripción: Servicio que Copia los clasificadores
     * Autor: Asesoftware - Javier Gonzalez
     * Fecha: 10/03/2023
     * @param model 
     */
    public copyClasificador(model: Clasificador): void {
      this._clasificadorService.copyClasificador<IRespuestaApi>(model).subscribe({
        next: (resp) => {
          if(resp.estado){
            this.setState({copiar:resp.estado});
          }
        }
      });
    }

    public selectRow(model: Clasificador): void {
      this.setState({clasificadorRow: model});
    }

    public resetNiveles(): void {
      this.setState({nivelesClasificadorRow : {}});
    }

    public getnivelClasificador(model :NivelClasificador){
      this._clasificadorService.getNivelClasificador<IRespuestaApi>(model).subscribe({
        next: (response) => {
          if(response.estado){
            this.setState({nivelesClasificador: <NivelClasificador[]>response.data});
          }
        }
      });
    }

    public saveNivelClasificador(model: NivelClasificador){
      this._clasificadorService.createNivelClasificador<IRespuestaApi>(model).subscribe({
        next: (response) => {
          if(response.estado){
            this.setState({eliminarNivel: response.estado , nivelesClasificadorRow : response.data});
          }
        }
      });
    }

    public updateNivelClasificador(model: NivelClasificador){
      this._clasificadorService.updateNivelClasificador<IRespuestaApi>(model).subscribe({
        next: (response) => {
          if(response.estado){
            this.setState({editarNivel: response.estado});
          }
        }
      });
    }

    public deleteNivelClasificador(model: NivelClasificador){
      this._clasificadorService.deleteNivelClasificador<IRespuestaApi>(model).subscribe({
        next: (response) => {
          if(response.estado){
            this.setState({eliminarNivel: response.estado});
          }
        }
      });
    }
  }
  