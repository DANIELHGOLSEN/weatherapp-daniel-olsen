// disse imports importere "hooks" fra de forskellige sider. Hooks er funktioner og lignene der kan genbruges igen og igen.
import { useState } from "react"
import useFetch from "./Hooks/useFetch"

export default function App() {

  // Her importerer vi de forskellige apier fra env filen så de kan bruges her i koden.
  const apiKey = import.meta.env.VITE_APIKEY
  const baseGeoUrl = import.meta.env.VITE_GEOCODING
  const baseWeatherUrl = import.meta.env.VITE_CURRENTWEATHER

  //Her laves en variabel som starter med at være en tom streng, så vi senere hen kan fylde i den.
  let geoURL = ""
  let weatherURL = ""

  //Her gør vi så city variablen tilsvarer byen som brugeren har indtastet i input feltet.
  const [city, setCity] = useState("")

  function handleForm(event) {

    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const cityName = formData.get("cityName")


    setCity(cityName)

  }
  //Hvis brugeren har skrevet en by ind så starter den her if statement.
  if (city) {
    //Her laver vi en ny url til byen som indholder byens navn og apikey.
    const geoUrl = new URL(baseGeoUrl)

    geoUrl.searchParams.set("q", city)
    geoUrl.searchParams.set("appid", apiKey)

    //Her tager vi den nye url og sender den videre til det andede kode der nu skal bruge den.
    geoURL = geoUrl
  }

  const geoData = useFetch(geoURL)

  //Den her if statement starter når vi har den url fra if statementen over den.
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
