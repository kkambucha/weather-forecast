import React, { FC, useCallback } from 'react'

import { isOpenWeatherErrorType, useAppDispatch, useAppSelector } from 'store'
import { cityApiSlice } from 'store/slices/cityApi.slice'
import { deleteCityId } from 'store/slices/cities.slice'
import { City } from 'components/City'
import './Cities.scss'

const MINUTES_POLLING_INTERVAL = 15 * 60 * 1000

export const Cities: FC = () => {
  const dispatch = useAppDispatch()
  const { ids } = useAppSelector((state) => state.cities)
  const queryCitiesIds: string = ids.join(',')
  const fetchParams = !ids.length
    ? { skip: true }
    : { pollingInterval: MINUTES_POLLING_INTERVAL }
  const { data, error } = cityApiSlice.useFetchCitiesByIdsQuery(
    queryCitiesIds,
    fetchParams
  )
  const isEmpty = !data || !data.length || !ids.length

  const handleOnCityDelete = useCallback(
    (cityId: number) => {
      dispatch(deleteCityId({ id: cityId }))
    },
    [dispatch]
  )

  return (
    <div>
      {error ? (
        <div className="col-1">
          <div className="Cities_empty">
            <div className="Cities_emptyTitle">Something went wrong</div>
            {isOpenWeatherErrorType(error) &&
              error.data &&
              `${error.data.message}`}
          </div>
        </div>
      ) : (
        <div className="row">
          {isEmpty ? (
            <div className="col-1">
              <div className="Cities_empty">
                <div className="Cities_emptyTitle">
                  There is no city selected
                </div>
                Just find and add some
              </div>
            </div>
          ) : (
            <>
              {data.map((city) => (
                <div className="col-4 Cities_city" key={city.id}>
                  <City city={city} onDelete={handleOnCityDelete} />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
