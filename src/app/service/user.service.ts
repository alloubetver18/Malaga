import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL_API = 'http://localhost:3000';
  /* private URL_API = 'https://tranquil-sunset-screen.glitch.me'; */
  constructor(private _http: HttpClient) {}

  //crear un usuario
  addUser(user: UserModel): Observable<UserModel> {
    return this._http.post<UserModel>(`${this.URL_API}/users`, user);
  }

  editUser(id: number, user: UserModel): Observable<UserModel> {
    return this._http.put<UserModel>(`${this.URL_API}/users/${id}`, user);
  }

  //obtener listado de usuario
  getUsersList(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(`${this.URL_API}/users`);
  }

  deleteUser(id: any): Observable<any> {
    return this._http.delete(`${this.URL_API}/users/${id}`);
  }
}
