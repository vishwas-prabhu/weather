import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { HomeComponent } from './components/home/home.component';
import { RecentComponent } from './components/recent/recent.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'recent', component: RecentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
