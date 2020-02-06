import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Favorite, Tempereture, Forecust } from '../../state/weather.model';
import { WeatherService } from '../../service/weather-service.service';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { ImageService } from '../../service/image-service';
import { map, switchMap, toArray, tap, take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '../../service/notification-service';

@Component({
  selector: 'app-forecust',
  templateUrl: './forecust.component.html',
  styleUrls: ['./forecust.component.scss']
})
export class ForecustComponent implements OnInit {
  currentLocation$: Observable<Favorite>
  forecust$: Observable<Array<Forecust>>
  tempType$: Observable<Tempereture>

  constructor(private _weatherService: WeatherService, private store: Store<AppState>, private imageService: ImageService, private notification : NotificationService) {
    this.currentLocation$ = store.select("currentLocation")
  }

  ngOnInit() {
    this.forecust$ = this.currentLocation$.pipe(switchMap(x => {
      if (x && x.key) {
        return this._weatherService.getWeaklyWeather(x.key).pipe(switchMap(res => res.DailyForecasts)
            , map((x: any) => ({
              date: x.Date,
              minTemp: x.Temperature.Minimum.Value,
              maxTemp: x.Temperature.Maximum.Value,
              image: this.imageService.getImgByTime(x)
            })), toArray(), catchError(err => {
              this.notification.showError("Error Server")
              return of([])
            }));
      }
      return of([])
    }))
  }


  getImage(img: string) {
    return this.imageService.imageUrl(img);
  }

  getImgByTime(forcast) {
    return this.imageService.getImgByTime(forcast);
  }

}
