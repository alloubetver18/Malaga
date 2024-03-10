import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LugaresComponent } from './lugares/lugares.component';
import { InfoLugarComponent } from './info-lugar/info-lugar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AdministrarLugaresComponent } from './administrar-lugares/administrar-lugares.component';
import { UserGuardGuard } from './utils/user-guard.guard';

const routes: Routes = [
  { path: 'lugares', component: LugaresComponent },
  { path: 'lugares/:lugar', component: InfoLugarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'administrar-lugares',
    component: AdministrarLugaresComponent,
    canActivate: [UserGuardGuard],
  },
  { path: '', redirectTo: 'lugares', pathMatch: 'full' },
  { path: '**', redirectTo: 'lugares', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
