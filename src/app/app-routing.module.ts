import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LugaresComponent } from './lugares/lugares.component';
import { InfoLugarComponent } from './info-lugar/info-lugar.component';

const routes: Routes = [
  { path: 'lugares', component: LugaresComponent },
  { path: 'lugares/:lugar', component: InfoLugarComponent },
  { path: '', redirectTo: 'lugares', pathMatch: 'full' },
  { path: '**', redirectTo: 'lugares', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
