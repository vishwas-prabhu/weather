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
import { MatIconModule } from '@angular/material/icon';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';

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
    BrowserAnimationsModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
