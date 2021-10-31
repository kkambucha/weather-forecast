import React, {
  FC,
  ChangeEvent,
  FormEvent,
  useState,
  useCallback,
  useEffect,
} from 'react'

import { City, isOpenWeatherErrorType, useAppDispatch } from 'store'
import { addCityId } from 'store/slices/cities.slice'
import { OutsideClickWatcher } from 'components/OutsideClickWatcher'
import { cityApiSlice } from 'store/slices/cityApi.slice'
import searchIcon from 'assets/icons/search.svg'
import './Search.scss'

export const Search: FC = () => {
  const dispatch = useAppDispatch()
  const [searchText, setSearchText] = useState('')
  const [isResultsOpened, setIsResultsOpened] = useState(false)
  const [
    fetchCities,
    { data: result, originalArgs: lastCityName, error, isFetching, isSuccess },
  ] = cityApiSlice.useLazyFetchCitiesByNameQuery()
  const isEmptySearch =
    !isFetching && isSuccess && lastCityName && result && !result.length
  const isSearchError = Boolean(error)

  const handleOnSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (searchText) {
        fetchCities(searchText)
        setIsResultsOpened(true)
      }
    },
    [searchText, fetchCities]
  )

  useEffect(() => {
    setIsResultsOpened(false)
  }, [searchText])

  return (
    <div className="Search">
      <OutsideClickWatcher onClickOutside={() => setIsResultsOpened(false)}>
        <form onSubmit={handleOnSubmit}>
          <input
            className="Search_input"
            value={searchText}
            placeholder="Search"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
          <button className="Search_button" title="Search">
            <img src={searchIcon} alt="" />
          </button>
        </form>
        {isResultsOpened && (
          <div>
            {isSearchError && (
              <span>
                {isOpenWeatherErrorType(error) &&
                  error.data &&
                  `Search error: ${error.data.message}`}
              </span>
            )}
            {isEmptySearch && <span>No {lastCityName} city found</span>}
            {isFetching ? (
              <span>Loading...</span>
            ) : (
              <>
                {!isSearchError && (
                  <ul>
                    {result &&
                      result.map((city: City, index: number) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => dispatch(addCityId({ city }))}
                        >
                          {city.name}
                        </button>
                      ))}
                  </ul>
                )}
              </>
            )}
          </div>
        )}
      </OutsideClickWatcher>
    </div>
  )
}
