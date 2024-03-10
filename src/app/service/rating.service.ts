import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RatingModel } from '../models/rating.model';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private baseUrl = 'http://localhost:3000/rating';
  /* private baseUrl = 'https://tranquil-sunset-screen.glitch.me/rating'; */

  constructor(private _http: HttpClient) {}

  getRatingList(): Observable<RatingModel[]> {
    return this._http.get<RatingModel[]>(this.baseUrl);
  }

  getRatingPerPlace(place: string): Observable<RatingModel[]> {
    return this._http.get<RatingModel[]>(`${this.baseUrl}?id_place=${place}`);
  }

  getRatingPerPlaceAndUser(
    user: string,
    place: string
  ): Observable<RatingModel[]> {
    return this._http.get<RatingModel[]>(
      `${this.baseUrl}?id_user=${user}&id_place=${place}`
    );
  }

  postNewRating(rating: RatingModel): Observable<RatingModel> {
    return this._http.post<RatingModel>(`${this.baseUrl}`, rating);
  }

  deleteRatingsByPlace(place: string): Observable<any> {
    return this._http
      .get<RatingModel[]>(`${this.baseUrl}?id_place=${place}`)
      .pipe(
        switchMap((records) => {
          const deleteObservables = records.map((record) =>
            this._http.delete(`${this.baseUrl}/${record.id}`)
          );
          return forkJoin(deleteObservables);
        })
      );
  }
}
