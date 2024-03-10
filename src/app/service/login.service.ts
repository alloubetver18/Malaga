import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private URL_API = 'http://localhost:3000';
  /* private URL_API = 'https://tranquil-sunset-screen.glitch.me'; */
  constructor(private _http: HttpClient) {}

  //obtener listado de usuario
  getUser(email: string): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(`${this.URL_API}/users?email=${email}`);
  }
}
