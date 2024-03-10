import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private _snackbar: MatSnackBar) {}

  openSnackBar(message: string) {
    this._snackbar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
