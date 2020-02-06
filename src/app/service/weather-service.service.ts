import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';
import { GeolocationService } from './geolocation.service';
import { environment } from '../../environments/environment'
import { Weather } from '../state/weather.model'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  constructor(private http: HttpClient, private geoservice: GeolocationService) {  }

  getCurrentWeather(locationKey: number) {
    const uri = environment.apiDaily + locationKey;
    return this.getData(uri, new HttpParams()).pipe(switchMap(x => {
      return of(new Weather(locationKey, new Date(x[0].LocalObservationDateTime),
        x[0].WeatherIcon, x[0].Temperature.Metric.Value, x[0].WeatherText))
    }));
  }

  getLocations(query: string) {
    //return of([{ "Version": 1, "Key": "215854", "Type": "City", "Rank": 31, "LocalizedName": "Tel Aviv", "Country": { "ID": "IL", "LocalizedName": "Israel" }, "AdministrativeArea": { "ID": "TA", "LocalizedName": "Tel Aviv" } }, { "Version": 1, "Key": "3431644", "Type": "City", "Rank": 45, "LocalizedName": "Telanaipura", "Country": { "ID": "ID", "LocalizedName": "Indonesia" }, "AdministrativeArea": { "ID": "JA", "LocalizedName": "Jambi" } }, { "Version": 1, "Key": "300558", "Type": "City", "Rank": 45, "LocalizedName": "Telok Blangah New Town", "Country": { "ID": "SG", "LocalizedName": "Singapore" }, "AdministrativeArea": { "ID": "05", "LocalizedName": "South West" } }, { "Version": 1, "Key": "325876", "Type": "City", "Rank": 51, "LocalizedName": "Telford", "Country": { "ID": "GB", "LocalizedName": "United Kingdom" }, "AdministrativeArea": { "ID": "TFW", "LocalizedName": "Telford and Wrekin" } }, { "Version": 1, "Key": "169072", "Type": "City", "Rank": 51, "LocalizedName": "Telavi", "Country": { "ID": "GE", "LocalizedName": "Georgia" }, "AdministrativeArea": { "ID": "KA", "LocalizedName": "Kakheti" } }, { "Version": 1, "Key": "230611", "Type": "City", "Rank": 51, "LocalizedName": "Telsiai", "Country": { "ID": "LT", "LocalizedName": "Lithuania" }, "AdministrativeArea": { "ID": "TE", "LocalizedName": "Telšiai" } }, { "Version": 1, "Key": "2723742", "Type": "City", "Rank": 55, "LocalizedName": "Telégrafo", "Country": { "ID": "BR", "LocalizedName": "Brazil" }, "AdministrativeArea": { "ID": "PA", "LocalizedName": "Pará" } }, { "Version": 1, "Key": "186933", "Type": "City", "Rank": 55, "LocalizedName": "Tela", "Country": { "ID": "HN", "LocalizedName": "Honduras" }, "AdministrativeArea": { "ID": "AT", "LocalizedName": "Atlántida" } }, { "Version": 1, "Key": "3453754", "Type": "City", "Rank": 55, "LocalizedName": "Telaga Asih", "Country": { "ID": "ID", "LocalizedName": "Indonesia" }, "AdministrativeArea": { "ID": "JB", "LocalizedName": "West Java" } }, { "Version": 1, "Key": "3453755", "Type": "City", "Rank": 55, "LocalizedName": "Telagamurni", "Country": { "ID": "ID", "LocalizedName": "Indonesia" }, "AdministrativeArea": { "ID": "JB", "LocalizedName": "West Java" } }]);
    const uri = environment.apiAutoComplete;
    let params = new HttpParams();
    params = params.append('q', query);
    return this.getData(uri, params);
  }

  getWeaklyWeather(locationKey: any) {
   // return of({ "Headline": { "EffectiveDate": "2020-01-23T19:00:00+02:00", "EffectiveEpochDate": 1579798800, "Severity": 3, "Text": "Expect rainy weather Thursday evening through Friday morning", "Category": "rain", "EndDate": "2020-01-24T13:00:00+02:00", "EndEpochDate": 1579863600, "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us" }, "DailyForecasts": [{ "Date": "2020-01-23T07:00:00+02:00", "EpochDate": 1579755600, "Temperature": { "Minimum": { "Value": 51.0, "Unit": "F", "UnitType": 18 }, "Maximum": { "Value": 60.0, "Unit": "F", "UnitType": 18 } }, "Day": { "Icon": 14, "IconPhrase": "Partly sunny w/ showers", "HasPrecipitation": true, "PrecipitationType": "Rain", "PrecipitationIntensity": "Light" }, "Night": { "Icon": 18, "IconPhrase": "Rain", "HasPrecipitation": true, "PrecipitationType": "Rain", "PrecipitationIntensity": "Light" }, "Sources": ["AccuWeather"], "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us" }, { "Date": "2020-01-24T07:00:00+02:00", "EpochDate": 1579842000, "Temperature": { "Minimum": { "Value": 48.0, "Unit": "F", "UnitType": 18 }, "Maximum": { "Value": 57.0, "Unit": "F", "UnitType": 18 } }, "Day": { "Icon": 13, "IconPhrase": "Mostly cloudy w/ showers", "HasPrecipitation": true, "PrecipitationType": "Rain", "PrecipitationIntensity": "Moderate" }, "Night": { "Icon": 38, "IconPhrase": "Mostly cloudy", "HasPrecipitation": false }, "Sources": ["AccuWeather"], "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us" }, { "Date": "2020-01-25T07:00:00+02:00", "EpochDate": 1579928400, "Temperature": { "Minimum": { "Value": 45.0, "Unit": "F", "UnitType": 18 }, "Maximum": { "Value": 60.0, "Unit": "F", "UnitType": 18 } }, "Day": { "Icon": 2, "IconPhrase": "Mostly sunny", "HasPrecipitation": false }, "Night": { "Icon": 33, "IconPhrase": "Clear", "HasPrecipitation": false }, "Sources": ["AccuWeather"], "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us" }, { "Date": "2020-01-26T07:00:00+02:00", "EpochDate": 1580014800, "Temperature": { "Minimum": { "Value": 47.0, "Unit": "F", "UnitType": 18 }, "Maximum": { "Value": 62.0, "Unit": "F", "UnitType": 18 } }, "Day": { "Icon": 4, "IconPhrase": "Intermittent clouds", "HasPrecipitation": false }, "Night": { "Icon": 38, "IconPhrase": "Mostly cloudy", "HasPrecipitation": false }, "Sources": ["AccuWeather"], "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us" }, { "Date": "2020-01-27T07:00:00+02:00", "EpochDate": 1580101200, "Temperature": { "Minimum": { "Value": 49.0, "Unit": "F", "UnitType": 18 }, "Maximum": { "Value": 65.0, "Unit": "F", "UnitType": 18 } }, "Day": { "Icon": 3, "IconPhrase": "Partly sunny", "HasPrecipitation": false }, "Night": { "Icon": 36, "IconPhrase": "Intermittent clouds", "HasPrecipitation": false }, "Sources": ["AccuWeather"], "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us" }] })
    const uri = environment.apiForecast + locationKey;
    let params = new HttpParams();
    params = params.append('metric', 'true');
    return this.getData(uri, params);
  }

  getCurrentCity() {

    //return of({ "Version": 1, "Key": "215854", "Type": "City", "Rank": 31, "LocalizedName": "Tel Aviv", "EnglishName": "Tel Aviv", "PrimaryPostalCode": "", "Region": { "ID": "MEA", "LocalizedName": "Middle East", "EnglishName": "Middle East" }, "Country": { "ID": "IL", "LocalizedName": "Israel", "EnglishName": "Israel" }, "AdministrativeArea": { "ID": "TA", "LocalizedName": "Tel Aviv", "EnglishName": "Tel Aviv", "Level": 1, "LocalizedType": "District", "EnglishType": "District", "CountryID": "IL" }, "TimeZone": { "Code": "IST", "Name": "Asia/Jerusalem", "GmtOffset": 2.0, "IsDaylightSaving": false, "NextOffsetChange": "2020-03-27T00:00:00Z" }, "GeoPosition": { "Latitude": 32.045, "Longitude": 34.77, "Elevation": { "Metric": { "Value": 34.0, "Unit": "m", "UnitType": 5 }, "Imperial": { "Value": 111.0, "Unit": "ft", "UnitType": 0 } } }, "IsAlias": false, "SupplementalAdminAreas": [], "DataSets": ["AirQualityCurrentConditions", "AirQualityForecasts", "Alerts"] })
    const uri = environment.currentCityUrl;
    return this.geoservice.getCurrentPosition().pipe(switchMap(pos => {
      let params = new HttpParams();
      params = params.append('q', `${pos.coords.latitude},${pos.coords.longitude}`);
      params = params.append('toplevel', "true");
      return this.getData(uri, params);
    }));

  }


  private getData(url: string, params: HttpParams) {
    params = params.append('apikey', environment.apiKey);
    return this.http.get<any>(url, { params });
  }
}






