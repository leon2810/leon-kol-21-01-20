import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageUrl(iconNumber) {
    if (+iconNumber >= 1 && +iconNumber < 10) {
      iconNumber = "0" + iconNumber;
    }
    return `${environment.apiImage}/${iconNumber}-s.png`;
  }
  getImgByTime(forcast) {
    const hours = new Date().getHours()
    return hours > 6 && hours < 18 ? this.imageUrl(forcast.Day.Icon) : this.imageUrl(forcast.Night.Icon)
  }
}
