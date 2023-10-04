import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  jwt: string;
  user: UserClass;
}

export interface UserClass {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  public loginUser(data: any): Observable<User> {
    return this._http.post<User>('http://localhost:1337/api/auth/local', data);
  }
}
