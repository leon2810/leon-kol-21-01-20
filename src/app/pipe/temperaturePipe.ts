import { Pipe, PipeTransform } from '@angular/core';
import { Tempereture, IWeather } from '../state/weather.model';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';


@Pipe({ name: 'tempereture' })
export class TempereturePipe implements PipeTransform {
  private cachedData: any = null;
  constructor(private store: Store<AppState>) { }

  transform(temp: number): any {
    return this.store.select("tempType").pipe(map(x => {
      this.cachedData = x == Tempereture.Celceuse ? temp : this.calculateFur(temp);
      return this.cachedData;
    }))
  }

  calculateFur(cel: number) {
    return (cel * 1.8) + 32
  }
}
