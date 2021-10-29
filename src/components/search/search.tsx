import React, { FC } from 'react'

import Input from 'ui_kit/input'

export const Search: FC = () => {
  const [value, setValue] = React.useState('')
  return <Input value={value} onChange={setValue} />
}
