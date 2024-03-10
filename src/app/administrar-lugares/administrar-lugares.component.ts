import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PlaceModel } from '../models/place.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PlacesService } from '../service/places.service';
import { SharedService } from '../shared/shared.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddEditPlaceComponent } from '../add-edit-place/add-edit-place.component';
import { RatingService } from '../service/rating.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-lugares',
  templateUrl: './administrar-lugares.component.html',
  styleUrls: ['./administrar-lugares.component.css'],
})
export class AdministrarLugaresComponent {
  /* displayedColumns: string[] = ['id', 'Name', 'Resumen', 'images', 'actions']; */
  displayedColumns: string[] = ['Name', 'actions'];

  dataSource!: MatTableDataSource<PlaceModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _placesService: PlacesService,
    private _ratingService: RatingService,
    private _sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPlacesList();
  }

  getPlacesList(): any {
    this._placesService.getPlacesList().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  deletePlace(place: any): any {
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    //Comprobamos si, para ese lugar, existe alguna calificación

    //Si la cantidad de rating es 0, solo borra el lugar.

    //Si no, borra el lugar y los ratings
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let ratingService = this._ratingService.getRatingPerPlace(place);
        ratingService.subscribe({
          next: (res: any) => {
            if (res.lenght == 0) {
              let placesService = this._placesService.deletePlace(place);
              placesService.subscribe({
                next: (res: any) => {
                  this._sharedService.openSnackBar('Lugar Borrado.');
                  this.getPlacesList();
                },
                error: console.log,
              });
            } else {
              let placesService = this._placesService.deletePlace(place);
              let ratingService =
                this._ratingService.deleteRatingsByPlace(place);
              forkJoin({
                lugar: placesService,
                valoraciones: ratingService,
              }).subscribe({
                next: (res: any) => {
                  this._sharedService.openSnackBar('Lugar Borrado.');
                  this.getPlacesList();
                },
                error: console.log,
              });
            }
            this.getPlacesList();
          },
          error: console.log,
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditPlaceDialog(data?: PlaceModel) {
    let dialogRef;

    if (data) {
      dialogRef = this._dialog.open(AddEditPlaceComponent, { data });
    } else {
      dialogRef = this._dialog.open(AddEditPlaceComponent);
    }
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this._sharedService.openSnackBar('Lugar Añadido correctamente.');
          this.getPlacesList();
          this.refreshComponent();
        }
      },
    });
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/lugares', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/administrar-lugares']);
      });
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
}
