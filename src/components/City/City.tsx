import React, { FC } from 'react'

import { City as ICity } from 'store'
import { CityWeatherProperty } from './CityWeatherProperty'
import './City.scss'
import deleteIcon from 'assets/icons/delete.svg'
import windIcon from 'assets/icons/wind.svg'
import humidityIcon from 'assets/icons/humidity.svg'
import pressureIcon from 'assets/icons/pressure.svg'

interface CityProps {
  city: ICity
  onDelete: (cityId: number) => void
}

const OPENWEATHER_ICON_URL = 'https://openweathermap.org/img/wn/'

function getOpenWeatherIconURL(icon: string): string {
  return `${OPENWEATHER_ICON_URL}${icon}@2x.png`
}

export const City: FC<CityProps> = ({ city, onDelete }) => {
  return (
    <div className="City" key={city.id}>
      <div className="City_info">
        <div className="City_weather">
          <div className="City_name">{city.name.toUpperCase()}</div>
          <div className="City_temp">
            {Math.trunc(city.main.temp)}°C
            <img
              className="City_icon"
              src={getOpenWeatherIconURL(city.weather[0].icon)}
              alt={city.weather[0].description}
            />
          </div>
          <div className="City_description">{city.weather[0].description}</div>
        </div>
        <div className="City_actions">
          <button
            className="City_button"
            title="Delete"
            onClick={() => onDelete(city.id)}
          >
            <img src={deleteIcon} alt="delete" />
          </button>
        </div>
      </div>
      <div className="City_weatherProperties">
        <CityWeatherProperty
          iconPath={windIcon}
          caption={city.wind.speed}
          unit=" m/s"
        />
        <CityWeatherProperty
          iconPath={humidityIcon}
          caption={city.main.humidity}
          unit="%"
        />
        <CityWeatherProperty
          iconPath={pressureIcon}
          caption={city.main.pressure}
          unit=" hPa"
        />
      </div>
    </div>
  )
}
