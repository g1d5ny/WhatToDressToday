import kelvinToCelsius from "kelvin-to-celsius"

export const CurrentWeatherFunction = (latitude, longitude, setWeatherInfo) => {
    try {
        const key = "15904c4392a25fceafe9fa2a2824f2c5"
        const xobj = new XMLHttpRequest()
        xobj.open("GET", "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + key)

        xobj.onreadystatechange = function () {
            if (xobj.readyState !== 4) {
                return
            }
            const { current, daily } = JSON.parse(xobj.response)

            setWeatherInfo({
                sunrise: current.sunrise,
                sunset: current.sunset,
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
