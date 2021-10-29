import React, { FC, ChangeEvent } from 'react'

interface InputProps {
  value: string
  onChange: (value: string) => void
}

const Input: FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  )
}

export default Input
