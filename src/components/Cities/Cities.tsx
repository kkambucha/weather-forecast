import React, { FC } from 'react'

import { City } from 'api/types'
import { useAppSelector, useAppDispatch } from 'store'

export const Cities: FC = () => {
  const { list, status } = useAppSelector((state) => state.cities)
  return (
    <div>
      {list.map((city: City, index: number) => (
        <span key={index}>{city.name}</span>
      ))}
    </div>
  )
}
