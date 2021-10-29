import React, { FC } from 'react'

import { useAppSelector, useAppDispatch } from 'app/store'
import {
  citiesSelector,
  addCity,
  deleteCity,
  fetchCities,
} from 'app/store/cities.slice'

import { Search } from 'components/search'
import logo from 'assets/logo.svg'
import 'styles/index.scss'

const App: FC = () => {
  const cities = useAppSelector(citiesSelector)
  const dispatch = useAppDispatch()
  console.log('cities', cities)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Search />
      <button
        onClick={() =>
          dispatch(
            addCity({
              id: 12,
              name: 'London',
              weather: {
                description: 'Cloudy',
                icon: '121d',
                temp: 12,
                pressure: 200,
                windSpeed: 3,
                humidity: 40,
              },
            })
          )
        }
      >
        Add city 12
      </button>
      <button
        onClick={() =>
          dispatch(
            addCity({
              id: 13,
              name: 'London',
              weather: {
                description: 'Cloudy',
                icon: '121d',
                temp: 12,
                pressure: 200,
                windSpeed: 3,
                humidity: 40,
              },
            })
          )
        }
      >
        Add city 13
      </button>
      <button
        onClick={() => {
          dispatch(fetchCities('moscow'))
        }}
      >
        Fetch cities
      </button>
      <button onClick={() => dispatch(deleteCity(12))}>Remove 12</button>
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
