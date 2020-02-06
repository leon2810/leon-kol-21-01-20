export interface IWeather {
  key?: number;
  date: Date;
  image?: number;
  temp: number;
  text?: string;
  name?: string;
}

export class Weather implements IWeather {
  key?: number;
  date: Date;
  image?: number;
  temp: number;
  text?: string;
  name?: string;

  constructor(key: number, date?: Date, image?: number, temp?: number, text?: string, name?: string) {
    this.key = key;
    this.date = date;
    this.image = image;
    this.temp = temp
    this.text = text
    this.name = name
  }

}

export interface Forecust {
  date: Date,
  minTemp: number,
  maxTemp: number,
  image: string
}

//export class Forecust implements IForecust {
//    date: Date;
//    minTemp: number;
//    maxTemp: number;
//  image: string;

//  constructor(date?, minTemp?, maxTemp?, image?) {
//    this.date = date
//    this.minTemp = minTemp
//    this.maxTemp = maxTemp
//    this.image = image;
//  }
//}

export interface Favorite {
  key: number,
  name:string
}

export enum Tempereture {
  Celceuse = 1,
  Fur = 2,
}
