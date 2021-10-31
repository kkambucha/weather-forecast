import React, { FC } from 'react'

import logo from 'assets/logo.svg'
import './Logo.scss'

export const Logo: FC = () => {
  return (
    <div className="Logo_container">
      <div className="Logo_imageContainer">
        <img className="Logo_image" src={logo} alt="logo" />
      </div>
    </div>
  )
}
