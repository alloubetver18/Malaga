import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NavbarService } from '../service/navbar.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAdmin: boolean = false;
  logged: boolean = false;
  userName: string = '';

  constructor(
    /* private _dialog: MatDialog, */
    private _cookieService: CookieService,
    private router: Router,
    private _sharedService: SharedService,
    private _navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    //Cuando se inicia el componente, se subscribe al servicio navbarService, el cual se llamará cada vez
    //que se cambie de ruta (y con ello se active el evento NavigationEnd), lo cual ejecutará la función
    //checkUser(), la cual comprobará las cookies y verá si existe el token.
    this._navbarService.getRouteChange().subscribe((route) => {
      // Aquí puedes cambiar la apariencia de tu Navbar en función de la ruta y las cookies
      this.checkUser();
    });
  }

  checkUser() {
    let token = this._cookieService.get('token'); // Obtener el token de la cookie

    if (!token) {
      // Si no hay token, redirige al login
      /* this.router.navigate(['/login']); */
      return false;
    } else {
      // Decodifica el token para extraer la parte llamada "carga útil" (payload), que contiene cualquier
      // tipo de información que desees transmitir de manera segura entre el cliente y el servidor
      this.logged = true;
      let tokenPayload = JSON.parse(atob(token.split('.')[1]));
      let role = tokenPayload.role;
      this.userName = tokenPayload.firstname;
      if (role == 'administrador') {
        this.isAdmin = true;
      }
      return true;
    }
  }

  logOut() {
    this._cookieService.delete('token');
    this.isAdmin = false;
    this.logged = false;
    this._sharedService.openSnackBar('Hasta la próxima, ' + this.userName);
    this.userName = '';

    this.router.navigate(['/home']);
  }
}
