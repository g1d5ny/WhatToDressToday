import kelvinToCelsius from "kelvin-to-celsius"
import { FahrenheitToCelsius } from "../common/CommonFunction"

export const CallAllWeather = (latitude, longitude, setCurrentWeatherInfo, setHourWeatherInfo, setWeekWeatherInfo) => {
    try {
        const key = "GJCA9EEEAQ642FRTTWQ6HDBWE"
        const xobj = new XMLHttpRequest()
        xobj.open("GET", "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + latitude + "," + longitude + "/next7days?key=" + key + "&lang=ko") //  + "&lang=ko"

        xobj.onreadystatechange = function () {
            if (xobj.readyState !== 4) {
                return
            }
            console.log("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + latitude + "," + longitude + "/next7days?key=" + key + "&lang=ko")
            const { days } = JSON.parse(xobj.response)

            setCurrentWeatherInfo({
                sunrise: days[0].sunrise,
                sunset: days[0].sunset,
                currentTemp: parseInt(FahrenheitToCelsius(days[0].temp)),
                feelsLike: parseInt(FahrenheitToCelsius(days[0].feelslike)),
                max: parseInt(FahrenheitToCelsius(days[0].tempmax)),
                min: parseInt(FahrenheitToCelsius(days[0].tempmin)),
                description: days[0].description //  jsonResponse.current.weather[0].description
            })

            let daysCnt = 0
            let hoursCnt = 0
            let timeWeatherList = []
            while (timeWeatherList.length < 12) {
                if (days[daysCnt].hours[hoursCnt].datetimeEpoch * 1000 >= new Date().getTime()) {
                    days[daysCnt].hours[hoursCnt].temp = FahrenheitToCelsius(days[daysCnt].hours[hoursCnt].temp)
                    timeWeatherList.push(days[daysCnt].hours[hoursCnt])
                    if (days[daysCnt].hours[hoursCnt].datetime.split(":")[0] === 23) {
                        daysCnt++
                    } else {
                        hoursCnt++
                    }
                } else {
                    daysCnt++
                    hoursCnt++
                }
            }
            setHourWeatherInfo(timeWeatherList)

            let weekWeatherList = []
            for (let i = 0; i < 7; i++) {
                weekWeatherList.push(days[i])
            }
            setWeekWeatherInfo(weekWeatherList)
        }

        xobj.send("")
    } catch (e) {
        console.error(e)
    }
}

export const CallYesterdaySunset = (latitude, longitude, setYesterdaySunset) => {
    try {
        const key = "GJCA9EEEAQ642FRTTWQ6HDBWE"
        const xobj = new XMLHttpRequest()
        xobj.open("GET", "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + latitude + "," + longitude + "/yesterday?key=" + key + "&lang=ko")

        xobj.onreadystatechange = function () {
            if (xobj.readyState !== 4) {
                return
            }
            const { days } = JSON.parse(xobj.response)

            setYesterdaySunset(days[0].sunset.slice(":", -3))
        }

        xobj.send("")
    } catch (e) {
        console.error(e)
    }
}

export const CurrentWeatherFunction = (latitude, longitude, setWeatherInfo) => {
    try {
        const key = "15904c4392a25fceafe9fa2a2824f2c5"
        const xobj = new XMLHttpRequest()
        xobj.open("GET", "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + key)
        console.log(latitude, longitude)

        xobj.onreadystatechange = function () {
            if (xobj.readyState !== 4) {
                return
            }
            const { current, daily } = JSON.parse(xobj.response)

            setWeatherInfo({
                sunrise: current.sunrise * 1000,
                sunset: current.sunset * 1000,
                currentTemp: parseInt(kelvinToCelsius(current.temp)),
                feelsLike: parseInt(kelvinToCelsius(current.feels_like)),
                max: parseInt(kelvinToCelsius(daily[0].temp.max)),
                min: parseInt(kelvinToCelsius(daily[0].temp.min)),
                description: daily[0].weather[0].description //  jsonResponse.current.weather[0].description
            })
        }

        xobj.send("")
    } catch (e) {}
}

export const WeekWeatherFunction = (latitude, longitude, setWeekWeatherInfo) => {
    try {
        const key = "15904c4392a25fceafe9fa2a2824f2c5"
        const xobj = new XMLHttpRequest()

        xobj.open("GET", "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&cnt=" + 7 + "&appid=" + key)
        xobj.onreadystatechange = function () {
            if (xobj.readyState !== 4) {
                return
            }
            const list = JSON.parse(xobj.response).list
            const weekWeatherInfo = list.map(({ sunrise, temp, humidity, speed, weather }) => {
                return {
                    sunrise,
                    max: parseInt(kelvinToCelsius(temp.max)),
                    min: parseInt(kelvinToCelsius(temp.min)),
                    humidity,
                    speed,
                    description: weather[0].description
                }
            })
            setWeekWeatherInfo(weekWeatherInfo)
        }

        xobj.send("")
    } catch (e) {
        console.error(e)
    }
}

export const HourWeatherFunction = (latitude, longitude, setHourWeatherInfo) => {
    try {
        const key = "15904c4392a25fceafe9fa2a2824f2c5"
        const xobj = new XMLHttpRequest()

        xobj.open("GET", "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + key)

        xobj.onreadystatechange = function () {
            if (xobj.readyState !== 4) {
                return
            }
            const list = JSON.parse(xobj.response).list
            list.length = 12

            const hourWeatherInfo = list.map(({ dt_txt, main, weather }) => {
                return {
                    id: weather[0].id,
                    time: dt_txt,
                    temp: parseInt(kelvinToCelsius(main.temp)),
                    description: weather[0].description
                }
            })
            setHourWeatherInfo(hourWeatherInfo)
        }

        xobj.send("")
    } catch (e) {
        console.error(e)
    }
}
