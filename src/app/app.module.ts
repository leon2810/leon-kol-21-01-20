import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { SharedModule } from './shared.module';
import { currentWeatherReducer, favoritesReducer, currentLocationReducer, tempTypeReducer} from './reducers/weather.reducer';
import { HttpErrorInterceptor } from './interceptor/HttpConfigInterceptor';
import { NotificationService } from './service/notification-service';
import { MatSnackBar } from '@angular/material';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CurrentWeatherComponent } from './home/current-weather/current-weather.component';
import { ForecustComponent } from './home/forecust/forecust.component';
import { TemperatureToggleComponent } from './components/temperature-toggle/temperature-toggle.component';
import { TempereturePipe } from './pipe/temperaturePipe';
import { ThemeChangerComponent } from './theme-changer/theme-changer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FavoritesComponent,
    NotFoundComponent,
    AutocompleteComponent,
    SideNavComponent,
    TempereturePipe,
    CurrentWeatherComponent,
    ForecustComponent,
    TemperatureToggleComponent,
    ThemeChangerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'favorites', component: FavoritesComponent },
      { path: '**', component: NotFoundComponent },
    ]),
    BrowserAnimationsModule,
    StoreModule.forRoot({
      currentWeather: currentWeatherReducer,
      favorites: favoritesReducer,
      currentLocation: currentLocationReducer,
      tempType: tempTypeReducer
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, deps: [NotificationService, MatSnackBar]}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
