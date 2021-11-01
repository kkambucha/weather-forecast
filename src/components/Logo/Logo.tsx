import React, { FC } from 'react'

import logoIcon from 'assets/logo.svg'
import './Logo.scss'

export const Logo: FC = () => {
  return (
    <div className="Logo_container">
      <div className="Logo_imageContainer">
        <a href="/" title="Weather App" tabIndex={0}>
          <img className="Logo_image" src={logoIcon} alt="logo" />
        </a>
      </div>
    </div>
  )
}
