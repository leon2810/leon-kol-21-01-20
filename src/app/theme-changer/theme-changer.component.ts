import { ThemeService } from '../service/themeService';
import { Component, OnInit } from '@angular/core';
import { debug } from 'util';


@Component({
  selector: 'app-theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: ['./theme-changer.component.scss']
})
export class ThemeChangerComponent implements OnInit {
    theme$: any;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.theme$ = this.themeService.getTheme();
  }

  changeTheme(event) {
    event.checked ?
      this.themeService.setTheme(1) : this.themeService.setTheme(2)
  }

}
