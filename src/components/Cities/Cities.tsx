import React, { FC } from 'react'

import { useAppDispatch, useAppSelector } from 'store'
import { cityApiSlice } from 'store/slices/cityApi.slice'
import { deleteCityId } from 'store/slices/cities.slice'

const MINUTES_POLLING_INTERVAL = 15 * 60 * 1000

export const Cities: FC = () => {
  const dispatch = useAppDispatch()
  const { ids } = useAppSelector((state) => state.cities)
  const queryCitiesIds: string = ids.join(',')
  const { data } = cityApiSlice.useFetchCitiesByIdsQuery(queryCitiesIds, {
    ...(!ids.length
      ? { skip: true }
      : { pollingInterval: MINUTES_POLLING_INTERVAL }),
  })
  const isEmpty = !data || !data.length || !ids.length

  return (
    <div>
      {isEmpty ? (
        <div>Empty</div>
      ) : (
        <div>
          {data &&
            data.map((city) => (
              <span key={city.id}>
                <button onClick={() => dispatch(deleteCityId({ id: city.id }))}>
                  {city.id}
                </button>
                {city.name}
              </span>
            ))}
        </div>
      )}
    </div>
  )
}
