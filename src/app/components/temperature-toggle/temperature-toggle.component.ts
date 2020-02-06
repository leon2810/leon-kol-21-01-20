import { Component, OnInit, OnDestroy} from '@angular/core';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Tempereture } from '../../state/weather.model';
import { SetTempType } from '../../state/weather.actions';


@Component({
  selector: 'app-temperature-toggle',
  templateUrl: './temperature-toggle.component.html',
  styleUrls: ['./temperature-toggle.component.scss'],
  animations: [
    trigger('zoomIn', [
      state('initial', style({
        transform: 'scale(1)'
      })),
      state('final', style({
        transform: 'scale(1.5)'
      })),
      state('void', style({
        transform: 'scale(1)'
      })),
      transition('void => *', animate('2s')),
      transition('final=>initial', animate('1000ms')),
      transition('initial=>final', animate('1000ms'))
    ]),
  ]
})
export class TemperatureToggleComponent implements OnInit, OnDestroy  {

  temperature$: Observable<Tempereture>
  Tempereture = Tempereture;
  subsribtion: Subscription
  currentState: string = "final";
    tempType: Tempereture;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.temperature$ = this.store.select("tempType");
    this.subsribtion = this.temperature$.subscribe(x => {
      this.tempType = x
    })
    this.triggerAnimation()
  }

  tempChanged(event) {
    if (this.tempType ==1) {
      this.store.dispatch(SetTempType({ key: Tempereture.Fur }))
    }
    else {
      this.store.dispatch(SetTempType({ key: Tempereture.Celceuse }))
    }

    this.currentState = 'final';
    this.triggerAnimation();
  }

  triggerAnimation() {
    setTimeout(function () {
      this.currentState = "initial";
    }.bind(this), 1000)
  }

  ngOnDestroy(): void {
    this.subsribtion.unsubscribe()
  }
}
