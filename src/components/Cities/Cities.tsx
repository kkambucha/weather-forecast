import React, { FC } from 'react'

import { City } from 'store/types'
import { useAppSelector } from 'store'

export const Cities: FC = () => {
  const { list } = useAppSelector((state) => state.cities)
  return (
    <div>
      {list.map((city: City, index: number) => (
        <span key={index}>{city.name}</span>
      ))}
    </div>
  )
}
