import React, { FC } from 'react'

import { Counter } from './features/counter/Counter'
import logo from './assets/logo.svg'
import './styles/index.scss'

const App: FC = () => {
  // console.log(process.env.REACT_APP_OPEN_WEATHER_API_KEY)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Counter />
      <p>Regular</p>
      <p className="medium">Medium</p>
      <p className="bold">Bold</p>
      <p className="merriweather">
        Simple but powerful weather forcasting service based on OpenWeatherMap
        API
      </p>
    </div>
  )
}

export default App
