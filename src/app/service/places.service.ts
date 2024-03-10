import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceModel } from '../models/place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private _http: HttpClient) {}
  /* private baseUrl = 'https://tranquil-sunset-screen.glitch.me/lugares'; */

  //obtener listado de lugares

  addPlace(place: PlaceModel): Observable<PlaceModel> {
    return this._http.post<PlaceModel>(`http://localhost:3000/lugares`, place);
    /* return this._http.post<PlaceModel>(
      `https://tranquil-sunset-screen.glitch.me/lugares`,
      place
    ); */
  }

  getPlacesList(): Observable<PlaceModel[]> {
    return this._http.get<PlaceModel[]>('http://localhost:3000/lugares');
    /* return this._http.get<PlaceModel[]>(
      'https://tranquil-sunset-screen.glitch.me/lugares'
    ); */
  }

  getPlaceInfo(id: string): Observable<PlaceModel> {
    return this._http.get<PlaceModel>('http://localhost:3000/lugares/' + id);
    /* return this._http.get<PlaceModel>(
      'https://tranquil-sunset-screen.glitch.me/lugares/' + id
    ); */
  }

  editPlace(id: string, place: PlaceModel): Observable<PlaceModel> {
    return this._http.put<PlaceModel>(
      `http://localhost:3000/lugares/${id}`,
      place
    );
    /* return this._http.put<PlaceModel>(
      `https://tranquil-sunset-screen.glitch.me/lugares/${id}`,
      place
    ); */
  }

  deletePlace(id: string): Observable<PlaceModel> {
    return this._http.delete<PlaceModel>('http://localhost:3000/lugares/' + id);
    /* return this._http.delete<PlaceModel>(
      'https://tranquil-sunset-screen.glitch.me/lugares/' + id
    ); */
  }
}
