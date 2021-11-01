import React, { FC } from 'react'

import { City } from 'store'
import { useFocus } from './hooks'
import './SearchResultItem.scss'
import addIcon from 'assets/icons/add.svg'

interface SearchResultItemProps {
  index: number
  city: City
  activeCursor: number
  onSelect: (cityId: number) => void
}

export const SearchResultItem: FC<SearchResultItemProps> = ({
  index,
  city,
  activeCursor,
  onSelect,
}) => {
  const myRef = useFocus(activeCursor === index)
  return (
    <li key={city.id} className="SearchResultItem">
      <button
        type="button"
        className="SearchResultItem_button"
        onClick={() => onSelect(city.id)}
        ref={myRef}
      >
        <span className="SearchResultItem_buttonContent">
          <span className="SearchResultItem_description">
            <span className="SearchResultItem_cityName">
              {city.name}, {city.sys.country}
            </span>
            <span className="SearchResultItem_coords">
              {city.coord.lat} {city.coord.lon}
            </span>
          </span>
          <img src={addIcon} alt="Add" />
        </span>
      </button>
    </li>
  )
}
