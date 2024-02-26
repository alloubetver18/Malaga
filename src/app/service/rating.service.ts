import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingModel } from '../models/rating.model';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private _http: HttpClient) {}

  getRatingList(): Observable<RatingModel[]> {
    return this._http.get<RatingModel[]>('http://localhost:3000/rating');
  }
}
