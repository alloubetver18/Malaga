import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  //Creamos un Subject, un observable que permitirá realizar comunicación con varios subscribers a la vez.
  private routeChange: Subject<string> = new Subject<string>();
  //En el constructor del servicio, controlamos que se ha finalizado la navegación a la ruta
  //de destino mediante el evento de Router llamado NavigationEnd
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      //Cuando se llega a dicho evento, se subscribe al Subject routeChange.
      .subscribe((event: NavigationEnd) => {
        this.routeChange.next(event.urlAfterRedirects);
      });
  }
  //Función del servicio que devuelve el Subject como un Onservable para que el usuario se
  //subscriba cada vez que se llega a la URL de destino (y por tanto, se alcanza el evento NavigationEnd).
  getRouteChange() {
    return this.routeChange.asObservable();
  }
}
