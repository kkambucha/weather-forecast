import React, { FC } from 'react'

import { Logo } from 'components/Logo'
import { Search } from 'components/Search'
import { Cities } from 'components/Cities'
import 'styles/index.scss'
import './App.scss'

const App: FC = () => {
  return (
    <div className="App">
      <header className="App_header">
        <div className="row">
          <div className="col-1">
            <div className="App_logo">
              <Logo />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-1">
            <h1 className="App_h1">Weather forecast</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <p className="App_p">
              Simple but powerful weather forcasting service based on
              OpenWeatherMap API
            </p>
          </div>
          <div className="col-4 pull-right pull-bottom">
            <div className="App_search">
              <Search />
            </div>
          </div>
        </div>
      </header>
      <Cities />
    </div>
  )
}

export default App
