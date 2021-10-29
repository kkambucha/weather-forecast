import React, { FC, ChangeEvent, useState } from 'react'

export const Search: FC = () => {
  const [value, setValue] = useState('')
  return (
    <input
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  )
}
