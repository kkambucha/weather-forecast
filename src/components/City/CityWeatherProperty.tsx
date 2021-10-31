import React, { FC } from 'react'

import './CityWeatherProperty.scss'

interface CityWeatherPropertyProps {
  iconPath: string
  caption: number
  unit: string
}

export const CityWeatherProperty: FC<CityWeatherPropertyProps> = ({
  iconPath,
  caption,
  unit,
}) => {
  return (
    <div className="CityWeatherProperty">
      <img
        className="CityWeatherProperty_icon"
        src={iconPath}
        alt={caption.toString()}
      />
      <span className="CityWeatherProperty_caption">
        {caption}
        {unit}
      </span>
    </div>
  )
}
