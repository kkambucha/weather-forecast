import React, { FC } from 'react'

import { useAppSelector } from 'store'
import { cityApiSlice } from 'store/slices/cityApi.slice'

const MINUTES_POLLING_INTERVAL = 15 * 60 * 1000

export const Cities: FC = () => {
  const { ids } = useAppSelector((state) => state.cities)
  const queryCitiesIds: string = ids.join(',')
  const { data } = cityApiSlice.useFetchCitiesByIdsQuery(queryCitiesIds, {
    ...(!ids.length
      ? { skip: true }
      : { pollingInterval: MINUTES_POLLING_INTERVAL }),
  })
  const isEmpty = !data || !data.length

  return (
    <div>
      {isEmpty ? (
        <div>Empty</div>
      ) : (
        <div>
          {data && data.map((city) => <span key={city.id}>{city.id}</span>)}
        </div>
      )}
    </div>
  )
}
