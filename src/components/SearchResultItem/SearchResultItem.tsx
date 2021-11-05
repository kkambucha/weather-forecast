import React, { FC } from 'react'
import cn from 'classnames'

import { City } from 'store'
import { useFocus } from 'components/Search/hooks'
import './SearchResultItem.scss'
import addIcon from 'assets/icons/add.svg'

interface SearchResultItemProps {
  index: number
  city: City
  disabled: boolean
  activeCursor?: number
  onSelect: (cityId: number) => void
}

export const SearchResultItem: FC<SearchResultItemProps> = ({
  index,
  city,
  disabled,
  activeCursor,
  onSelect,
}) => {
  const myRef = useFocus(activeCursor === index)
  return (
    <li key={city.id} className="SearchResultItem">
      <button
        type="button"
        className="SearchResultItem_button"
        disabled={disabled}
        onClick={() => onSelect(city.id)}
        ref={myRef}
      >
        <span className="SearchResultItem_buttonContent">
          <span
            className={cn('SearchResultItem_description', {
              disabled: disabled,
            })}
          >
            <span className="SearchResultItem_cityName">
              {city.name}, {city.sys.country}
            </span>
            <span className="SearchResultItem_coords">
              {city.coord.lat} {city.coord.lon}
            </span>
          </span>
          {!disabled && <img src={addIcon} alt="Add" />}
        </span>
      </button>
    </li>
  )
}
