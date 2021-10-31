import React, { FC } from 'react'

import { Logo } from 'components/Logo'
import { Search } from 'components/Search'
import { Cities } from 'components/Cities'
import 'styles/index.scss'

const App: FC = () => {
  return (
    <div className="App">
      <header className="App_pageContainer">
        <div className="App_logo">
          <Logo />
        </div>
      </header>
      <section className="App_pageContainer">
        <h1 className="App_h1">Weather forecast</h1>
        <p className="App_p">
          Simple but powerful weather forcasting service based on OpenWeatherMap
        </p>
        <Search />
        <Cities />
      </section>
      {/*<p>Regular</p>*/}
      {/*<p className="medium">Medium</p>*/}
      {/*<p className="bold">Bold</p>*/}
      {/*<p className="merriweather">*/}
      {/*  Simple but powerful weather forcasting service based on OpenWeatherMap*/}
      {/*  API*/}
      {/*</p>*/}
    </div>
  )
}

export default App
