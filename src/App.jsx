import { useState } from "react"
import useFetch from "./Hooks/useFetch"

export default function App() {

  const apiKey = import.meta.env.VITE_APIKEY
  const baseGeoUrl = import.meta.env.VITE_GEOCODING
  const baseWeatherUrl = import.meta.env.VITE_CURRENTWEATHER

  let geoURL = ""
  let weatherURL = ""
  // const weatherUrl = new URL(baseWeatherUrl)

  const [city, setCity] = useState("")

  function handleForm(event) {

    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const cityName = formData.get("cityName")


    setCity(cityName)

  }

  if (city) {
    const geoUrl = new URL(baseGeoUrl)

    geoUrl.searchParams.set("q", city)
    geoUrl.searchParams.set("appid", apiKey)

    geoURL = geoUrl
  }

  const geoData = useFetch(geoURL)

  if (geoData) {
    const lon = geoData[0].lon
    const lat = geoData[0].lat

    const weatherUrl = new URL(baseWeatherUrl)

    weatherUrl.searchParams.set("lon", lon)
    weatherUrl.searchParams.set("lat", lat)
    weatherUrl.searchParams.set("appid", apiKey)
    weatherUrl.searchParams.set("units", "metric")
    weatherUrl.searchParams.set("lang", "da")

    weatherURL = weatherUrl
  }

  const weatherData = useFetch(weatherURL)




  return (
    <>
      <form action="" onSubmit={handleForm}>
        <input type="text" name="cityName" />
        <button type="submit">Søg</button>
      </form>
      <div>
        {weatherData ?
          (
            <>
              <h2>{weatherData.name}</h2>
              <p>Det er {weatherData.main.temp} grader.</p>
              <p>Vejret er {weatherData.weather[0].description}</p>
            </>
          )
          :
          (
            <>
              <h2>Søg på en by for Helve da!</h2>
              <p>Gør det. Nu.</p>
            </>
          )
        }
      </div>
    </>
  )
}
