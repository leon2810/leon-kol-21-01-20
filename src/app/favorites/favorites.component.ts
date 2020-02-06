import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.state';
import { Store, select } from '@ngrx/store';
import { Observable, zip, from, forkJoin, of, pipe } from 'rxjs';
import { Weather, Favorite } from '../state/weather.model';
import { map, switchMap, every, combineLatest, flatMap, mergeMap } from 'rxjs/operators';
import { SetcurrentLocation } from '../state/weather.actions';
import { Router } from '@angular/router';
import { WeatherService } from '../service/weather-service.service';
import { environment } from '../../environments/environment'
import { ImageService } from '../service/image-service';
import { debug } from 'util';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit  {

  favorites$: Observable<Array<Favorite>>;
  favoritesWeather$: Observable<any>;
  favorites: any[] =[];

  constructor(private store: Store<AppState>, private router: Router, private imageService: ImageService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.favorites$ = this.store.pipe(select("favorites"))

    this.favoritesWeather$ = this.favorites$.pipe(
      switchMap((locationList) => {
        const weatherLocationZip$List = locationList.map((location) => {
          return this.weatherService.getCurrentWeather(location.key).pipe(
            map((weather) => ({ weather, location }))
          );
        })
        return forkJoin(weatherLocationZip$List);
      })
    )
  }

  setCurrentLocation(fav: any) {
    this.store.dispatch(SetcurrentLocation({ key: fav.key, name: fav.name }));
    this.router.navigate(['/']);
  }

  getImage(img: string) {
    return this.imageService.imageUrl(img);
  }
}
