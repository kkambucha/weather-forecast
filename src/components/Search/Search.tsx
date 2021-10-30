import React, {
  FC,
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react'
import { debounce } from 'lodash'

import { City } from 'api/types'
import { useAppSelector, useAppDispatch } from 'store'
import { fetchCities, clearResult } from 'store/slices/search.slice'
import { OutsideClickWatcher } from 'components/OutsideClickWatcher'

const FETCH_DEBOUNCE_TIME = 400

export const Search: FC = () => {
  const dispatch = useAppDispatch()
  const [searchText, setSearchText] = useState('')
  const { result, status } = useAppSelector((state) => state.search)

  // useRef for creating function just once
  const dispatchFetchCitiesDebounced = useRef(
    debounce((cityName: string) => {
      if (cityName) {
        dispatch(fetchCities(cityName))
      }
    }, FETCH_DEBOUNCE_TIME)
  )

  const handleOnSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatchFetchCitiesDebounced.current(searchText)
    },
    [searchText]
  )

  const handleClearResult = () => {
    dispatch(clearResult())
  }

  useEffect(handleClearResult, [searchText, dispatch])

  return (
    <div>
      <OutsideClickWatcher onClickOutside={handleClearResult}>
        <form onSubmit={handleOnSubmit}>
          <input
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
          <button>v</button>
        </form>
        {status === 'pending' && <span>loading...</span>}
        {Boolean(result.length) && (
          <ul>
            {result.map((city: City, index: number) => (
              <li key={index}>{city.name}</li>
            ))}
          </ul>
        )}
      </OutsideClickWatcher>
    </div>
  )
}
