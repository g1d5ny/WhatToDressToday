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

            const { days } = JSON.parse(xobj.response)

            setCurrentWeatherInfo({
                month: days[0].datetime.split("-")[1],
                sunrise: days[0].sunrise,
                sunriseEpoch: days[0].sunriseEpoch * 1000,
                sunset: days[0].sunset,
                sunsetEpoch: days[0].sunsetEpoch * 1000,
                datetimeEpoch: days[0].datetimeEpoch * 1000,
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
                if (days[daysCnt].hours[hoursCnt].datetime.split(":")[0] >= new Date().getHours()) {
                    days[daysCnt].hours[hoursCnt].temp = FahrenheitToCelsius(days[daysCnt].hours[hoursCnt].temp)
                    days[daysCnt].hours[hoursCnt].sunriseEpoch *= 1000

                    timeWeatherList.push(days[daysCnt].hours[hoursCnt])

                    if (days[daysCnt].hours[hoursCnt].datetime.split(":")[0] === 23) {
                        daysCnt++
                    } else {
                        hoursCnt++
                    }
                } else {
                    // daysCnt++
                    hoursCnt++
                }
            }
            setHourWeatherInfo(timeWeatherList)

            let weekWeatherList = []
            for (let i = 0; i < 7; i++) {
                days[i].sunriseEpoch = days[i].sunriseEpoch * 1000
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

            setYesterdaySunset({
                sunset: days[0].sunset,
                sunsetEpoch: days[0].sunsetEpoch * 1000
            })
        }

        xobj.send("")
    } catch (e) {
        console.error(e)
    }
}
