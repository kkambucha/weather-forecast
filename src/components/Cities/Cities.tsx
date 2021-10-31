import React, { FC } from 'react'

import { isOpenWeatherErrorType, useAppDispatch, useAppSelector } from 'store'
import { cityApiSlice } from 'store/slices/cityApi.slice'
import { deleteCityId } from 'store/slices/cities.slice'

const MINUTES_POLLING_INTERVAL = 15 * 60 * 1000
// const MINUTES_POLLING_INTERVAL = 5 * 1000

export const Cities: FC = () => {
  const dispatch = useAppDispatch()
  const { ids } = useAppSelector((state) => state.cities)
  const queryCitiesIds: string = ids.join(',')

  // TODO: Spread operator looks strange in this place
  const { data, error } = cityApiSlice.useFetchCitiesByIdsQuery(
    queryCitiesIds,
    {
      ...(!ids.length
        ? { skip: true }
        : { pollingInterval: MINUTES_POLLING_INTERVAL }),
    }
  )
  const isEmpty = !data || !data.length || !ids.length

  return (
    <div>
      {error ? (
        <div>
          {isOpenWeatherErrorType(error) &&
            error.data &&
            `Error: ${error.data.message}`}
          <h1>Error</h1>
        </div>
      ) : (
        <div>
          {isEmpty ? (
            <div>Empty</div>
          ) : (
            <div>
              {data &&
                data.map((city) => (
                  <span key={city.id}>
                    <button
                      onClick={() => dispatch(deleteCityId({ id: city.id }))}
                    >
                      {city.id}
                    </button>
                    {city.name}
                  </span>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
