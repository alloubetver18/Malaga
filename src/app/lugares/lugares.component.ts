import { Component } from '@angular/core';
import { PlacesService } from '../service/places.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
})
export class LugaresComponent {
  listPlaces: any[] = [];
  selectedPlace: string = '';
  constructor(private _placesService: PlacesService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPlacesList();
  }

  getPlacesList(): any {
    this._placesService.getPlacesList().subscribe({
      next: (res: any) => {
        this.listPlaces = res;
      },
      error: console.log,
    });
  }

  selectPlace(placeId: string) {
    this.selectedPlace = placeId;
  }
}
