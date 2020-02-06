import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private subjectBehaviour = new BehaviorSubject(1);

  constructor() { }

  getTheme(): Observable<number> {
    return this.subjectBehaviour.asObservable();
  }

  setTheme(themeNumber: number) {
    this.subjectBehaviour.next(themeNumber);
  }

  toggleTheme() {
    if (this.subjectBehaviour.value == 1) {
      this.setTheme(2)
    }
    else {
      this.setTheme(1)
    }
  }

  

}
