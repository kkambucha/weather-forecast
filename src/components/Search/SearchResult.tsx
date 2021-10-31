import React, { FC } from 'react'
import { City, isOpenWeatherErrorType } from 'store'

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
    <div className="Search_result">
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
            <ul>
              {result &&
                result.map((city: City, index: number) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => onSelect(city.id)}
                  >
                    {city.name}
                  </button>
                ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
