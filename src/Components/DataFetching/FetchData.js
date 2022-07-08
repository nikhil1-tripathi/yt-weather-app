import { data } from "autoprefixer";
import { DateTime } from "luxon";
// https://api.openweathermap.org/data/2.5
const API_KEY = "d57de3908707ebffa206ae82ed90f3ba";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

export const CityNameWeatherData = (data) => {
  // if (data.name === infoType) {
  //   console.log("dffdfd");
  // }
  // console.log("data");

  // console.log(data);
  if (data.message == "city not found") {
    var { message } = data;
  } else {
    var {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
    } = data;
    var { main: details, icon } = weather[0];
  }

  return data.message
    ? { message }
    : {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
      };
};

const OneCallForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(0, 8).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
      weather: d.weather[0].main,
    };
  });

  hourly = hourly.slice(0, 25).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

export const FinalFormatedWeatherData = async (searchParams) => {
  let errorMessage;
  const CityFormatedWeatherData = await getWeatherData(
    "weather",
    searchParams
  ).then((data) => CityNameWeatherData(data));
  errorMessage = CityFormatedWeatherData.message;
  const { lat, lon } = CityFormatedWeatherData;
  let OneCallformattedForecastWeather;
  if (!errorMessage) {
    OneCallformattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    }).then((data) => OneCallForecastWeather(data));
  }
  const finalOutput = errorMessage
    ? { ...CityFormatedWeatherData }
    : {
        ...CityFormatedWeatherData,
        ...OneCallformattedForecastWeather,
      };
  console.log("finalOutput");
  console.log(finalOutput);
  return finalOutput;
};

export const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;
