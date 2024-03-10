import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { PlaceModel } from '../models/place.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../service/places.service';
import { SharedService } from '../shared/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-place',
  templateUrl: './add-edit-place.component.html',
  styleUrls: ['./add-edit-place.component.css'],
})
export class AddEditPlaceComponent {
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;

  placeForm!: FormGroup;
  imagenes: string[] = [];

  firstNameValue: string = '';
  constructor(
    private _fb: FormBuilder,
    private _placesService: PlacesService,
    private _sharedService: SharedService,
    private _dialogRef: MatDialogRef<AddEditPlaceComponent>,
    //Inject sirve para que, si recibe datos como parámetro en el constructor, haga la operación de modificación
    @Inject(MAT_DIALOG_DATA) public data: PlaceModel
  ) {
    this.placeForm = this._fb.group({
      name: ['', [Validators.required]],
      resumen: ['', [Validators.required]],
      /* images: ['', [Validators.required]], */
      img1: ['', [Validators.required]],
      img2: ['', [Validators.required]],
      img3: ['', [Validators.required]],
      img4: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //Si hay datos, los añade al formulario
    this.placeForm.patchValue(this.data);
    if (this.data) {
      this.cargarImagenes();
    }
  }

  submitPlaceForm() {
    if (this.placeForm.valid) {
      let id = this.placeForm.value.name.toLowerCase().replace(/ /g, '-');

      if (this.data && this.data.id !== undefined) {
        let placeData: PlaceModel = new PlaceModel(
          id,
          this.placeForm.value.name,
          this.placeForm.value.resumen,
          0,
          [
            this.placeForm.value.img1,
            this.placeForm.value.img2,
            this.placeForm.value.img3,
            this.placeForm.value.img4,
          ]
        );
        this._placesService.editPlace(this.data.id, placeData).subscribe({
          next: (val: any) => {
            this._sharedService.openSnackBar(
              'El lugar se ha modificado correctamente.'
            );
            this._dialogRef.close(true);
          },
          error: console.log,
        });
      } else {
        let placeData: PlaceModel = new PlaceModel(
          id,
          this.placeForm.value.name,
          this.placeForm.value.resumen,
          0,
          [
            '../../assets/img/' + this.placeForm.value.img1,
            '../../assets/img/' + this.placeForm.value.img2,
            '../../assets/img/' + this.placeForm.value.img3,
            '../../assets/img/' + this.placeForm.value.img4,
          ]
        );
        this._placesService.addPlace(placeData).subscribe({
          next: (val: any) => {
            this._sharedService.openSnackBar(
              'El lugar se ha añadido correctamente.'
            );
            this._dialogRef.close(true);
          },
          error: console.log,
        });
      }
    } else {
      this._sharedService.openSnackBar('Error de registro de lugar');
    }
  }

  clearInput(field: string) {
    this.placeForm.get(field)?.setValue('');
  }

  cargarImagenes() {
    this.imagenes = this.data.images;
  }

  eliminarImagen(ruta: string) {
    //  Eliminar la imagen de la carpeta y del array de imágenes
  }

  addImagen(ruta: string, id: number) {
    //  Añadir una imagen nueva al array de imágenes temporal
  }

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      const file: File = target.files[0];

      if (file) {
        console.log(file.name);
        console.log(file.size);
        console.log(file.type);
      }
    }
  }

  /*   guardarNuevoLugar() {
    if (this.placeForm.valid) {
      let placeData: PlaceModel = new PlaceModel(
        this.formatString(this.placeForm.value.name),
        this.placeForm.value.name,
        this.placeForm.value.resumen,
        0,
        [
          '../../assets/img/' + this.placeForm.value.img1,
          '../../assets/img/' + this.placeForm.value.img2,
          '../../assets/img/' + this.placeForm.value.img3,
          '../../assets/img/' + this.placeForm.value.img4,
        ]
      );

      this._placesService.addPlace(placeData).subscribe({
        next: (val: any) => {
          this._sharedService.openSnackBar(
            'El Lugar se ha añadido correctamente.'
          );
          this._dialogRef.close(true);
        },
        error: console.log,
      });
    } else {
      this._sharedService.openSnackBar('Error de registro');
    }
  }

  modificarLugar() {
    console.log(this.data.id);
    console.log(this.formatString(this.placeForm.value.name));
  } */

  formatString(str: string): string {
    return str.toLowerCase().split(' ').join('-');
  }
}
