import { Component, Output, EventEmitter } from '@angular/core';
import { ThemeService } from '../service/themeService';
import { OverlayContainer } from '@angular/cdk/overlay';
import { tap, take } from 'rxjs/operators';
import { debug } from 'util';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  @Output() public sidenavToggle = new EventEmitter();
    theme$: any;

  constructor(private overlayContainer: OverlayContainer, private themeService: ThemeService) {
    this.theme$ = this.themeService.getTheme()
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
