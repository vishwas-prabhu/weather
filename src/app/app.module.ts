import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { RecentComponent } from './components/recent/recent.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { DrawerDirective } from './directives/drawer.directive';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { CountryNamePipe } from './pipes/country-name.pipe';
import { ConversionPipe } from './pipes/conversion.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavouritesComponent,
    RecentComponent,
    DrawerComponent,
    DrawerDirective,
    SearchComponent,
    CountryNamePipe,
    ConversionPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
