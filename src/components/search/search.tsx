import React, { FC, ChangeEvent } from 'react'

export const Search: FC = () => {
  const [value, setValue] = React.useState('')
  return (
    <input
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  )
}
