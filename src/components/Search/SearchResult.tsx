import React, { FC } from 'react'

import { City, isOpenWeatherErrorType } from 'store'
import { SearchResultItem } from './SearchResultItem'
import { useKeyboardNavigation } from './hooks'
import spinnerIcon from 'assets/icons/spinner.svg'
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
  const [activeCursor] = useKeyboardNavigation(result ? result.length : 0)

  return (
    <div className="SearchResult">
      <div className="SearchResult_container">
        {isError ? (
          <span className="SearchResult_text">
            <span className="SearchResult_textTitle">Something went wrong</span>
            <span className="SearchResult_textDescription">
              {isOpenWeatherErrorType(error) && error.data
                ? `${error.data.message}`
                : 'Try to check connection'}
            </span>
          </span>
        ) : (
          <>
            {isEmpty && (
              <span className="SearchResult_text">
                <span className="SearchResult_textTitle">
                  City called &laquo;{cityName}&raquo; was not found
                </span>
                <span className="SearchResult_textDescription">
                  Try different city name
                </span>
              </span>
            )}
            {isFetching ? (
              <div className="SearchResult_spinner">
                <img
                  className="SearchResult_spinnerIcon"
                  src={spinnerIcon}
                  alt=""
                />
              </div>
            ) : (
              <>
                {result && (
                  <ul className="SearchResult_list">
                    {result.map((city: City, index) => (
                      <SearchResultItem
                        key={city.id}
                        city={city}
                        index={index}
                        activeCursor={activeCursor}
                        onSelect={onSelect}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
