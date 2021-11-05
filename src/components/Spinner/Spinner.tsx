import React, { FC } from 'react'

import spinnerIcon from 'assets/icons/spinner.svg'
import './Spinner.scss'

export const Spinner: FC = () => {
  return (
    <div className="Spinner">
      <img className="Spinner_icon" src={spinnerIcon} alt="" />
    </div>
  )
}
