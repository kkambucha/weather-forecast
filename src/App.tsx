import React, { FC } from 'react'
import logo from './assets/logo.svg'
import './styles/index.scss'

const App: FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <p>Regular</p>
            <p className="medium">Medium</p>
            <p className="bold">Bold</p>
            <p className="merriweather">
                Simple but powerful weather forcasting service based on
                OpenWeatherMap API
            </p>
        </div>
    )
}

export default App
