import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import  * as api  from 'src/app/core/constant/url-api';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClasificadorService {
    constructor(private _apiRequest: ApiRequestService) { 

    }

    /**
     * Descripción: Servicio que obtiene los clasificadores
     * Autor: Asesoftware - Javier Gonzalez
     * Fecha: 10/03/2023
     * @param model 
     * @returns 
     */
    public getClasificador<T>(model: any): Observable<T> {
        let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.clasificador}/${api.URLACCION.obtenerClasificador}`;
        return this._apiRequest.get<T>(route, model);
      }

      /**
       * Descripción: Servicio que crea los clasificadores
       * Autor: Asesoftware - Javier Gonzalez
       * Fecha: 10/03/2023
       * @param model 
       * @returns 
       */
    public createClasificador<T>(model: any): Observable<T> {
        let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.clasificador}/${api.URLACCION.crearClasificador}`;
    
        return this._apiRequest.post<T>(route, model);
        // .pipe(map(response => {
        //   return (response);
        // }));
      }

      /**
       * Descripción: Servicio que actualiza los clasificadores
       * Autor: Asesoftware - Javier Gonzalez
       * Fecha: 10/03/2023 
       * @param model 
       * @returns 
       */
      public updateClasificador<T>(model: any): Observable<T> {
        let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.clasificador}/${api.URLACCION.editarClasificador}`;
    
        return this._apiRequest.put<T>(route, model).pipe(map(response => {
          return (response);
        }));
      }

      /**
       * Descripción: Servicio que copia los clasificadores
       * Autor: Asesoftware - Javier Gonzalez
       * Fecha: 10/03/2023 
       * @param model 
       * @returns 
       */
      public copyClasificador<T>(model: any): Observable<T> {
        let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.clasificador}/${api.URLACCION.copiarClasificador}`;
    
        return this._apiRequest.post<T>(route, model);
      }

      /**
       * Descripción: Servicio que consulta niveles de clasificador
       * Autor: Asesoftware - Javier Gonzalez
       * Fecha: 10/03/2023 
       * @param model 
       * @returns 
       */
      public getNivelClasificador<T>(model: any): Observable<T> {
        let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.clasificador}/${api.URLACCION.obtenerNivelClasificador}`;
        return this._apiRequest.get<T>(route, model);
      }

      /**
       * Descripción: Servicio que crea nivel de clasificador
       * Autor: Asesoftware - Javier Gonzalez
       * Fecha: 10/03/2023 
       * @param model 
       * @returns 
       */
      public createNivelClasificador<T>(model: any): Observable<T> {
        let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.clasificador}/${api.URLACCION.crearNivelClasificador}`;
        return this._apiRequest.post<T>(route, model);
      }

      /**
       * Descripción: Servicio que actualiza nivel de clasificador
       * Autor: Asesoftware - Javier Gonzalez
       * Fecha: 30/03/2023 
       * @param model 
       * @returns 
       */
      public updateNivelClasificador<T>(model: any): Observable<T> {
        let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.clasificador}/${api.URLACCION.editarNivelClasificador}`;
        return this._apiRequest.put<T>(route, model);
      }

      /**
       * Descripción: Servicio que elimina nivel de clasificador
       * Autor: Asesoftware - Javier Gonzalez
       * Fecha: 30/03/2023 
       * @param model 
       * @returns 
       */
      public deleteNivelClasificador<T>(model: any): Observable<T> {
        let route = `${environment.apiAdmProcesos}/${api.URLCONTROLADOR.clasificador}/${api.URLACCION.eliminarNivelClasificador}`;
        return this._apiRequest.delete<T>(route, model);
      }
}