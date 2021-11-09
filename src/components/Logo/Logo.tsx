import React, { FC } from 'react'

import logoIcon from 'assets/logo.svg'
import './Logo.scss'

export const Logo: FC = () => {
  return (
    <div className="Logo">
      <a href="/" title="Weather App" className="Logo_link" tabIndex={0}>
        <img src={logoIcon} alt="logo" />
      </a>
    </div>
  )
}
