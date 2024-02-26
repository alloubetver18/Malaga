import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceModel } from '../models/place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private _http: HttpClient) {}

  //obtener listado de usuario
  getPlacesList(): Observable<PlaceModel[]> {
    return this._http.get<PlaceModel[]>('http://localhost:3000/lugares');
  }

  getPlaceInfo(id: string): Observable<PlaceModel> {
    return this._http.get<PlaceModel>('http://localhost:3000/lugares/' + id);
  }
}
