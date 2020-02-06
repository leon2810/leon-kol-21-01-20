import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, zip, of, combineLatest, Subscription } from 'rxjs';
import { SetcurrentWeather, AddtWeatherToFavorites, SetcurrentLocation, RemoveWeatherFromFavorites } from '../state/weather.actions';
import { Weather, Favorite } from '../state/weather.model';
import { WeatherService } from '../service/weather-service.service';
import { AppState } from '../app.state';
import { flatMap, take, switchMap, tap, catchError } from 'rxjs/operators';
import { ImageService } from '../service/image-service';
import { debug } from 'util';
import { NotificationService } from '../service/notification-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy  {
  
  cityToSearch: string = "Tel Aviv";
  currentWeather$: Observable<Weather>;
  currentLocation$: Observable<Favorite>
  isFavorite$: Observable<boolean>
  favorites$;
  forecust: any;
  isLoading = true;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  ngOnInit(): void {
    this.currentWeather$= this.currentLocation$.pipe(switchMap(location => {
      if (location && location.key) {
        this.cityToSearch = location.name;
        return this._weatherService.getCurrentWeather(location.key).pipe(tap(
          current => {
            this.updateLoadingStatus(false);
            this.store.dispatch(SetcurrentWeather({ weather: current }))
          }))
      }
      else {
        return this._weatherService.getCurrentCity().pipe(tap(city => {
          this.store.dispatch(SetcurrentLocation(Object.assign({}, { key: city.Key, name: city.LocalizedName })));
        }), catchError(err => {
          //@ts-ignore-start
          if (err instanceof GeolocationPositionError) {
          //@ts-ignore-end
            return this._weatherService.getLocations(this.cityToSearch).pipe(tap(data => {
              this.store.dispatch(SetcurrentLocation(Object.assign({}, { key: data[0].Key, name: data[0].EnglishName })))
            }), catchError(secError => {
              this.updateLoadingStatus(false);
              return of(null)
            }))
          }
          this.updateLoadingStatus( false);
          return of(null)
        }))
      }
    }))
  }



  constructor(private _weatherService: WeatherService,
    private store: Store<AppState>,
    private imageService: ImageService,
    private notificationService: NotificationService) {
    this.currentLocation$ = store.select("currentLocation")
    this.currentWeather$ = store.select("currentWeather");
    this.favorites$ = store.select("favorites");
    this.isFavorite$ = combineLatest(this.favorites$, this.currentLocation$).pipe(flatMap((res:any) => {
      return of(res[0].filter(x => x.key == res[1].key).length > 0)
    }))
  }

  citySelected(data) {
    this.store.dispatch(SetcurrentLocation({ key: data.Key, name: data.LocalizedName }))
  }

  updateLoadingStatus(status) {
    setTimeout(() => {
      this.isLoading = status;
    });
  }

  AddToFavorites() {
    this.subscriptions.push(zip(this.currentLocation$, this.isFavorite$).pipe(take(1)).subscribe(res => {
      !res[1] ?
        this.store.dispatch(AddtWeatherToFavorites({ key: res[0].key, name: res[0].name })) :
        this.store.dispatch(RemoveWeatherFromFavorites({ key: res[0].key }))
    }))
  }

  getImage(img: string) {
    return this.imageService.imageUrl(img);
  }

  getImgByTime(forcast) {
    const hours = new Date().getHours()
    return hours > 6 && hours < 18 ? this.getImage(forcast.Day.Icon) : this.getImage(forcast.Night.Icon) 
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }
}
