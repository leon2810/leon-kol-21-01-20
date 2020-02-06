"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_WEATHER = '[Weather] SetCurrent';
exports.GET_CURRENT = '[Weather] GetCurrent';
var SetcurrentWeather = /** @class */ (function () {
    function SetcurrentWeather(payload) {
        this.payload = payload;
        this.type = exports.SET_WEATHER;
    }
    return SetcurrentWeather;
}());
exports.SetcurrentWeather = SetcurrentWeather;
var GetcurrentWeather = /** @class */ (function () {
    function GetcurrentWeather() {
        this.type = exports.GET_CURRENT;
    }
    return GetcurrentWeather;
}());
exports.GetcurrentWeather = GetcurrentWeather;
//# sourceMappingURL=weather.actions.js.map