import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  firstName: string = '';
  role: string = '';
  passw: string = '';
  constructor(
    private _fb: FormBuilder,
    /* private _userService: UserService, */
    /* private _sharedService: SharedService, */
    /* private _loginService: LoginService, */
    /* private _cookieService: CookieService, */
    private router: Router
  ) {
    this.loginForm = this._fb.group({
      /* user: ['', [Validators.required]],
      password: ['', [Validators.required]], */
      user: ['', []],
      password: ['', []],
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      //Obtenemos los valores del formulario
      let userSearch: string = this.loginForm.value.user;
      let passwSearch: string = this.loginForm.value.password;
      //Buscamos al usuario en la base de datos.
      /* this._loginService.getUser(userSearch).subscribe({
        next: (res: any) => {
          if (res.length > 0) {
            let userFound = new loginUserModel(res[0].firstName, res[0].passw);
            this._cookieService.set('token', userFound.token);
            let tokenPayload = JSON.parse(atob(userFound.token.split('.')[1]));
            this.firstName = tokenPayload.firstName;
            this.role = tokenPayload.role;
            this.passw = tokenPayload.passw;
            if (passwSearch !== this.passw) {
              this._sharedService.openSnackBar(
                'Error: Usuario o contraseña incorrectos.'
              );
            } else {
              this._sharedService.openSnackBar('Bienvenido, ' + this.firstName);
              if (this.role == 'usuario') {
                this.router.navigate(['/home']);
              } else {
                this.router.navigate(['/users']);
              }
            }
          } else {
            this._sharedService.openSnackBar('Error: Usuario no encontrado.');
          }
        },
        error: console.log,
      }); */
      //Si el usuario no está, devuelve error.
      //Si está:
      //Obtenemos el nombre de usuario y el token y lo guardamos en una variable de tipo LoginUser
      //Desencriptamos el token y comparamos el password introducido con el existente en el token
      //Si son el mismo, entonces almacenamos el token en la cookie correspondiente y navegamos
      //hacia la página correspondiente:
      //Si el tipo de usuario es: usuario
      //Home.
      //Si el tipo de usuario es: administrador
      //list-users
      //En el nav, cambiamos el valor que debe mostrarse.
      //Si no son el mismo, mandamos un mensaje de error de login.
    }
  }
}
