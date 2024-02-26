import { Component } from '@angular/core';
import { PlacesService } from '../service/places.service';
import { PlaceModel } from '../models/place.model';
import { forkJoin } from 'rxjs';
import { RatingService } from '../service/rating.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
})
export class LugaresComponent {
  [x: string]: any;
  listPlaces: PlaceModel[] = [];
  selectedPlace: string = '';
  constructor(
    private _placesService: PlacesService,
    private _ratingService: RatingService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPlacesRatingList();
  }

  getPlacesRatingList(): any {
    // Supongamos que estos son tus servicios
    let placesService = this._placesService.getPlacesList();
    let ratingService = this._ratingService.getRatingList();

    forkJoin({ lugares: placesService, valoraciones: ratingService }).subscribe(
      (responses) => {
        let lugares = responses.lugares;
        let valoraciones = responses.valoraciones;

        // Ahora puedes recorrer tus lugares y valoraciones
        for (let lugar of lugares) {
          let valoracionesDelLugar = valoraciones.filter(
            (v) => v.id_place === lugar.id
          );

          let sumaValoraciones = valoracionesDelLugar.reduce(
            (sum, v) => sum + v.rate,
            0
          );
          let valoracionMedia = sumaValoraciones / valoracionesDelLugar.length;
          if (isNaN(valoracionMedia)) {
            lugar.valoracion = 0;
          } else {
            lugar.valoracion = valoracionMedia;
          }
          // Ahora puedes asignar la valoración media al lugar
        }
        this.listPlaces = lugares;
      }
    );
  }

  selectPlace(placeId: string) {
    this.selectedPlace = placeId;
  }

  obtenerPrimeras50Palabras(cadena: string): string {
    let palabras = cadena.split(' ');
    if (palabras.length > 50) {
      let primeras50Palabras = palabras.slice(0, 50).join(' ');
      return primeras50Palabras + '...';
    } else {
      return cadena;
    }
  }

  obtenerValoracionMedia(Places: PlaceModel[]) {}
}
