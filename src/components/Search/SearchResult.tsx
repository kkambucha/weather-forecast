import React, { FC } from 'react'

import { City, isOpenWeatherErrorType } from 'store'
import addIcon from 'assets/icons/add.svg'
import './SearchResult.scss'

interface SearchResultProps {
  error: unknown
  cityName: string | undefined
  isError: boolean
  isFetching: boolean
  isEmpty: boolean
  result: City[] | undefined
  onSelect: (id: number) => void
}

export const SearchResult: FC<SearchResultProps> = ({
  error,
  cityName,
  isError,
  isFetching,
  isEmpty,
  result,
  onSelect,
}) => {
  return (
    <div className="SearchResult">
      <div className="SearchResult_container">
        {isError && (
          <span>
            {isOpenWeatherErrorType(error) &&
              error.data &&
              `Search error: ${error.data.message}`}
          </span>
        )}
        {isEmpty && <span>No {cityName} city found</span>}
        {isFetching ? (
          <span>Loading...</span>
        ) : (
          <>
            {!isError && (
              <ul className="SearchResult_list">
                {result &&
                  result.map((city: City) => (
                    <li key={city.id} className="SearchResult_listItem">
                      <button
                        type="button"
                        className="SearchResult_button"
                        onClick={() => onSelect(city.id)}
                      >
                        <span className="SearchResult_buttonContent">
                          <span className="SearchResult_description">
                            <span className="SearchResult_cityName">
                              {city.name}, {city.sys.country}
                            </span>
                            <span className="SearchResult_coords">
                              {city.coord.lat} {city.coord.lon}
                            </span>
                          </span>
                          <img src={addIcon} alt="Add" />
                        </span>
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  )
}
