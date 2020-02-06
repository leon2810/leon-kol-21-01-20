// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiForecast: "http://dataservice.accuweather.com/forecasts/v1/daily/5day/",
  apiDaily: "http://dataservice.accuweather.com/currentconditions/v1/",
  apiKey: "szqJWNZdd1Wi6XSZZ5GRLqiDZGIwhe4A",
  apiImage: "http://developer.accuweather.com/sites/default/files",
  apiAutoComplete: "http://dataservice.accuweather.com/locations/v1/cities/autocomplete",
  currentCityUrl: "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search"
};
