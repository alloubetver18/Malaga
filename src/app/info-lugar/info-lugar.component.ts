import { Component } from '@angular/core';
import { PlacesService } from '../service/places.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-lugar',
  templateUrl: './info-lugar.component.html',
  styleUrls: ['./info-lugar.component.css'],
})
export class InfoLugarComponent {
  placeInfo: any = {};
  placeId: string | null = '';
  placeInfo$: any = null;

  constructor(
    private _placesService: PlacesService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.placeId = this._route.snapshot.paramMap.get('lugar');

    this.getPlaceInfo(this.placeId!);
  }

  getPlaceInfo(placeId: string): any {
    this._placesService.getPlaceInfo(placeId).subscribe({
      next: (res: any) => {
        this.placeInfo = res;
      },
      error: console.log,
    });
  }

  cambiarImagen(id: number) {
    document.getElementById('img-grande')!.style.background =
      "url('" +
      this.placeInfo.images[id] +
      "') no-repeat center center / cover";
  }
}
