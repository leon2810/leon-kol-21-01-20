import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../service/weather-service.service';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, of, zip, Subscription } from 'rxjs';
import { Favorite, Weather, IWeather } from '../../state/weather.model';
import { flatMap, take } from 'rxjs/operators';
import { AddtWeatherToFavorites, RemoveWeatherFromFavorites } from '../../state/weather.actions';
import { ImageService } from '../../service/image-service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {

  
  currentWeather$: Observable<IWeather>;
  currentLocation$: Observable<Favorite>
  isFavorite$
  favorites$: Observable<Favorite[]>;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(private store: Store<AppState>, private imgService: ImageService) {
    this.currentLocation$ = store.select("currentLocation")
    this.currentWeather$ = store.select("currentWeather");
    this.favorites$ = store.select("favorites");
    this.isFavorite$ = combineLatest(this.favorites$, this.currentLocation$).pipe(flatMap(res => {
      return of(res[0].filter((x) => x.key == res[1].key).length > 0)
    }))
  }

  AddToFavorites() {
    this.subscriptions.push(zip(this.currentLocation$, this.isFavorite$).pipe(take(1)).subscribe(res => {
      !res[1] ?
        this.store.dispatch(AddtWeatherToFavorites({ key: res[0].key, name: res[0].name })) :
        this.store.dispatch(RemoveWeatherFromFavorites({ key: res[0].key }))
    }))
  }

  getImage(img: string) {
    return this.imgService.imageUrl(img);
  }

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe())
  }
}
