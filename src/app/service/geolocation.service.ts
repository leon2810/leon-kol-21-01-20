import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getCurrentPosition(): Observable<any>{
    return this.getCurrentPosition$;
  }

  getCurrentPosition$ = new Observable(observer => {
     navigator.geolocation.getCurrentPosition(
       position => {
         observer.next(position);
         observer.complete();
       },
       err => {
         observer.error(err);
       }
     );
    });

}

