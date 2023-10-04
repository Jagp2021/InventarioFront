import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  constructor(private http: HttpClient) {}

  /**
   *  Return request POST
   * @param url
   * @param obj
   * @returns
   */
  post<T>(url: string, obj: any): Observable<any> {
    return this.http.post<T>(url, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    });
  }

  /**
  * Return request GET
  * @param url 
  * @param obj 
  * @returns 
  */
  get<T>(url: string, obj?: any): Observable<any> {
    let queryParameters = '';
    if(obj !== null && obj !== undefined ) { 
      queryParameters = '?' + Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    }
    return this.http.get<T>(url + queryParameters, 
      { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) }
    );
  }

  put<T>(url: string, obj: any): Observable<any> {
    return this.http.put<T>(url, obj, 
      { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) }
    );
    }

  delete<T>(url: string, obj: any): Observable<any> {
      return this.http.delete<T>(url, { 
        headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),
        body: obj} 
      );
      }
}
