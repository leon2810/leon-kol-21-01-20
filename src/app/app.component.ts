import { Component, Output, EventEmitter } from '@angular/core';
import { ThemeService } from './service/themeService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Best Weather App';
  theme$: any;
  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.theme$ = this.themeService.getTheme()
  }
}
