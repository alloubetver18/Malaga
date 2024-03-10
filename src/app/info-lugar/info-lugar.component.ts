import { Component } from '@angular/core';
import { PlacesService } from '../service/places.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RatingService } from '../service/rating.service';
import { PlaceModel } from '../models/place.model';
import { CookieService } from 'ngx-cookie-service';
import { RatingModel } from '../models/rating.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-lugar',
  templateUrl: './info-lugar.component.html',
  styleUrls: ['./info-lugar.component.css'],
})
export class InfoLugarComponent {
  placeInfo!: PlaceModel;
  valoracionUsuarioAMostrar: RatingModel = {
    id: '',
    id_user: '',
    id_place: '',
    rate: 0,
    comment: '',
  };

  arrayValoraciones: RatingModel[] = [];
  placeId: string = '';
  placeInfo$: any = null;
  usuarioActual: string = '';
  emailUsuario: string = '';
  rolUsuario: string = '';

  hayUsuarioLogueado = false;

  hayValoracionUsuario = false;

  hayValoracionesLugar = false;

  ratingForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _placesService: PlacesService,
    private _ratingService: RatingService,
    private _cookieService: CookieService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.ratingForm = this._fb.group({
      id_user: [''],
      id_place: [''],
      rate: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.placeId = this._route.snapshot.paramMap.get('lugar') || '';

    /* this.getPlaceInfo(this.placeId!); */
    this.getPlaceFullInfo(this.placeId!);
  }

  getPlaceFullInfo(placeId: string): any {
    let ratingUserPlaceService = null;
    //Tomamos los datos de la cookie
    let token = this._cookieService.get('token'); // Obtener el token de la cookie
    //Si los hay, obtenemos el email y el nombre de usuario
    if (token) {
      this.hayUsuarioLogueado = true;
      let tokenPayload = JSON.parse(atob(token.split('.')[1]));
      this.emailUsuario = tokenPayload.email;
      this.usuarioActual = tokenPayload.firstname;
      this.rolUsuario = tokenPayload.role;
    }

    let placesService = this._placesService.getPlaceInfo(placeId);
    let ratingService = this._ratingService.getRatingPerPlace(placeId);
    if (this.emailUsuario != '') {
      ratingUserPlaceService = this._ratingService.getRatingPerPlaceAndUser(
        this.emailUsuario,
        placeId
      );
    }

    if (ratingUserPlaceService != null) {
      forkJoin({
        lugar: placesService,
        valoraciones: ratingService,
        valoracionUsuario: ratingUserPlaceService,
      }).subscribe((responses) => {
        let infoLugar = responses.lugar;
        let valoraciones = responses.valoraciones;
        let valoracionUsuario = responses.valoracionUsuario;
        if (JSON.stringify(valoracionUsuario).length != 2) {
          this.hayValoracionUsuario = true;
        }

        if (JSON.stringify(valoraciones).length != 2) {
          this.hayValoracionesLugar = true;
        }
        let media = 0;
        let cantidad = 0;

        for (let valoracion of valoraciones) {
          if (valoracion.id_user != this.emailUsuario) {
            this.arrayValoraciones.push(valoracion);
          }
          media += valoracion.rate;
          cantidad++;
        }

        let mediaTotal = media / cantidad;

        // Ahora puedes recorrer tus lugares y valoraciones
        this.placeInfo = infoLugar;
        if (isNaN(mediaTotal)) {
          this.placeInfo.valoracion = 0;
        } else {
          this.placeInfo.valoracion = mediaTotal;
        }

        this.valoracionUsuarioAMostrar = {
          id: valoracionUsuario[0].id,
          id_user: valoracionUsuario[0].id_user,
          id_place: valoracionUsuario[0].id_place,
          rate: valoracionUsuario[0].rate,
          comment: valoracionUsuario[0].comment,
        };
      });
    } else {
      forkJoin({ lugar: placesService, valoraciones: ratingService }).subscribe(
        (responses) => {
          let infoLugar = responses.lugar;
          let valoraciones = responses.valoraciones;
          let media = 0;
          let cantidad = 0;

          if (JSON.stringify(valoraciones).length != 2) {
            this.hayValoracionesLugar = true;
          }

          for (let valoracion of valoraciones) {
            this.arrayValoraciones.push(valoracion);
            media += valoracion.rate;
            cantidad++;
          }

          let mediaTotal = media / cantidad;

          // Ahora puedes recorrer tus lugares y valoraciones
          this.placeInfo = infoLugar;
          if (isNaN(mediaTotal)) {
            this.placeInfo.valoracion = 0;
          } else {
            this.placeInfo.valoracion = mediaTotal;
          }
        }
      );
    }
  }

  cambiarImagen(id: number) {
    document.getElementById('img-grande')!.style.background =
      "url('" +
      this.placeInfo.images[id] +
      "') no-repeat center center / cover";
  }

  saveRating() {
    let rate: number = +this.ratingForm.value.rate;
    let comment: string = '' + this.ratingForm.value.comment;
    if (this.ratingForm.valid) {
      let newRating: RatingModel = new RatingModel(
        this.emailUsuario + '&' + this.placeId!,
        this.emailUsuario,
        this.placeId!,
        rate,
        comment
      );

      this._ratingService.postNewRating(newRating).subscribe({
        next: (val: any) => {
          alert('Opinión guardada correctamente.');
          this.refreshComponent(this.placeId);
        },
        error: console.log,
      });
    }
  }

  refreshComponent(placeId: string) {
    this.router
      .navigateByUrl('/lugares', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/lugares', placeId]);
      });
  }
}
