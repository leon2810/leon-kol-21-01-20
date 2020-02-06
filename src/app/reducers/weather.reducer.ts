import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action,
  createReducer,
  on,
  props
} from '@ngrx/store';
import { Favorite, Tempereture, Weather } from '../state/weather.model';
import { SetcurrentWeather, GetcurrentWeather, AddtWeatherToFavorites, RemoveWeatherFromFavorites, GetCurrentLocation, SetcurrentLocation, GetTempType, SetTempType
} from '../state/weather.actions';
import { debug } from 'util';


const favoritesInitialState = new Array<Favorite>();
const initialWeather = new Weather(0)
const initialTempType = Tempereture.Celceuse
const initialLocation: { key: number, name?: string } = {key:0,name:""}

const _tempTypeReducer = createReducer(initialTempType,
  on(SetTempType, (state, props) => {
    state = props.key;
    return state;
  }),
  on(GetTempType, (state, props) => {
    return state;
  })
);

export function tempTypeReducer(state, action) {
  return _tempTypeReducer(state, action);
}

const _currentWeatherReducer = createReducer(initialWeather,
  on(GetcurrentWeather, state => state),
  on(SetcurrentWeather, (state, props) => {
    state = Object.assign({}, props.weather);
    return state;
  })
);

const _currentLocationReducer = createReducer(initialLocation,
  on(GetCurrentLocation, state => state),
  on(SetcurrentLocation, (state, props) => {
    state = Object.assign({}, props);
    return state;
  })
);

export function currentLocationReducer(state, action) {
  return _currentLocationReducer(state, action);
}

export function currentWeatherReducer(state, action) {
  return _currentWeatherReducer(state, action);
}

const _favoritesReducer = createReducer(favoritesInitialState,
  on(AddtWeatherToFavorites, (state, props) => {
    let favorites = [...state];
    favorites.push(props);
    state = favorites;
    return state;
  }),
  on(RemoveWeatherFromFavorites, (state, props) => {
    state = state.filter(x => x.key != props.key)
    return state;
  })
);

export function favoritesReducer(state, action) {
  return _favoritesReducer(state, action);
}



