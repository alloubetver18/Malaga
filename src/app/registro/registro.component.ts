import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* import { UserService } from '../service/user.service'; */
import { MatDialogRef } from '@angular/material/dialog';
/* import { SharedService } from '../shared/shared.service'; */
import { UserModel } from '../models/user.model';
import { SharedService } from '../shared/shared.service';
import { ValidatorService } from '../shared/validators/validator.service';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  communities: string[] = [
    'Andalucía',
    'Aragón',
    'Principado de Asturias',
    'Islas Baleares',
    'Canarias',
    'Cantabria',
    'Castilla-La Mancha',
    'Castilla y León',
    'Cataluña',
    'Extremadura',
    'Galicia',
    'Comunidad de Madrid',
    'Murcia',
    'Navarra',
    'Pais Vasco',
    'La Rioja',
    'Comunidad Valenciana',
  ];

  roles_list: string[] = ['usuario', 'administrador'];

  regForm: FormGroup;
  equalpass = false;

  firstNameValue: string = '';
  constructor(
    private _fb: FormBuilder /*  private _userService: UserService, */,
    private _sharedService: SharedService,
    private _loginService: LoginService,
    private _userService: UserService,
    private router: Router,
    private _validatorService: ValidatorService /*private _dialogRef: MatDialogRef<AddEditUserComponent>, */ /* @Inject(MAT_DIALOG_DATA) public data: UserModel */ //Inject sirve para que, si recibe datos como parámetro en el constructor, haga la operación de modificación
  ) {
    this.regForm = this._fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        birthdate: [''],
        email: ['', [Validators.required, Validators.email]],
        telephone: ['', [Validators.required]],
        gender: [null],
        community: [null],
        passw: ['', [Validators.required]],
        repeatpassw: ['', [Validators.required]],
        //Añadir role en el objeto directamente. role: ['usuario', [Validators.required]],
      },
      {
        validators: [
          this._validatorService.camposIguales('passw', 'repeatpassw'),
        ],
      }
    );
  }

  ngOnInit(): void {
    //Si hay datos, los añade al formulario
    /* this.regForm.patchValue(this.data); */
  }

  submitRegForm() {
    if (this.regForm.valid && this.checkPasswrd()) {
      /* if (this.regForm.valid) { */
      let userData: UserModel = new UserModel(
        this.regForm.value.email,
        this.regForm.value.firstName,
        this.regForm.value.lastName,
        this.regForm.value.telephone,
        this.regForm.value.passw,
        this.regForm.value.repeatpassw,
        this.regForm.value.birthdate,
        this.regForm.value.gender,
        this.regForm.value.community,
        'usuario',
        this.regForm.value.id
      );
      //Hacemos una llamada a LoginService, comprobando si existe el email introducido
      this._loginService.getUser(userData.email).subscribe({
        next: (res: any) => {
          if (res.length > 0) {
            this._sharedService.openSnackBar(
              'Email de usuario ya introducido.'
            );
          } else {
            this._userService.addUser(userData).subscribe({
              next: (val: any) => {
                this._sharedService.openSnackBar(
                  'El usuario se ha añadido correctamente.'
                );
                this.router.navigate(['/home']);
              },
              error: console.log,
            });
          }
        },
        error: console.log,
      });
    } else {
      this._sharedService.openSnackBar('Error de registro');
    }
  }

  clearInput(field: string) {
    this.regForm.get(field)?.setValue('');
  }

  checkPasswrd() {
    if (
      this.regForm.get('passw')?.value ==
        this.regForm.get('repeatpassw')?.value &&
      this.regForm.get('passw')?.touched &&
      this.regForm.get('repeatpassw')?.touched &&
      this.regForm.get('passw')?.value.length > 0
    ) {
      return true;
    } else {
      return false;
    }
    /*  return (
      (this.regForm.get('passw')?.invalid &&
      this.regForm.get('passw')?.touched &&
      this.regForm.get('repeatpassw')?.invalid &&
      this.regForm.get('repeatpassw')?.touched) ||
      (this.regForm.get('passw')?.touched &&
      this.regForm.get('repeatpassw')?.touched &&
      this.regForm.get('passw')?.value != this.regForm.get('repeatpassw')?.value)
    ); */
  }
}
