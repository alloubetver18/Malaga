import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private _http: HttpClient) {}

  //obtener listado de usuario
  getPlacesList(): Observable<any> {
    return this._http.get('http://localhost:3000/lugares');
  }

  getPlaceInfo(id: string): Observable<any> {
    return this._http.get('http://localhost:3000/lugares/' + id);
  }
}
