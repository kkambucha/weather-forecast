import React, {
  FC,
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useCallback,
} from 'react'

import { City } from 'api/types'
import { useAppSelector, useAppDispatch } from 'store'
import { fetchCitiesThunk } from 'store/slices/search.slice'
import { debounce } from 'lodash'

const FETCH_DEBOUNCE_TIME = 400

export const Search: FC = () => {
  const dispatch = useAppDispatch()
  const [searchText, setSearchText] = useState('')
  const { result, status } = useAppSelector((state) => state.search)

  // useRef for creating function just once
  const dispatchFetchCitiesDebounced = useRef(
    debounce((cityName: string) => {
      dispatch(fetchCitiesThunk(cityName))
    }, FETCH_DEBOUNCE_TIME)
  )

  const handleOnSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatchFetchCitiesDebounced.current(searchText)
    },
    [searchText]
  )

  return (
    <div>
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
    </div>
  )
}
