import React, {
  FC,
  ChangeEvent,
  FormEvent,
  useState,
  useCallback,
  useEffect,
} from 'react'

import { useAppDispatch, useAppSelector } from 'store'
import { addCityId } from 'store/slices/cities.slice'
import { cityApiSlice } from 'store/slices/cityApi.slice'
import { OutsideClickWatcher } from 'components/OutsideClickWatcher'
import { SearchResult } from './SearchResult'
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
  const isEmptySearch = Boolean(
    !isFetching && isSuccess && lastCityName && result && !result.length
  )
  const isSearchError = Boolean(error)
  const addedCitiesIds = useAppSelector((state) => state.cities)

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

  const handleOnSelect = useCallback(
    (id: number) => {
      dispatch(addCityId({ id }))
    },
    [dispatch]
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
            tabIndex={0}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
          <button className="Search_button" title="Search">
            <img src={searchIcon} alt="" />
          </button>
        </form>
        {isResultsOpened && (
          <SearchResult
            error={error}
            cityName={lastCityName}
            added={addedCitiesIds}
            isError={isSearchError}
            isFetching={isFetching}
            isEmpty={isEmptySearch}
            result={result}
            onSelect={handleOnSelect}
          />
        )}
      </OutsideClickWatcher>
    </div>
  )
}
