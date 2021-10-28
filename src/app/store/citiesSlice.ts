import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as _ from 'lodash'

import { RootState } from './index'

import { fetchCitiesByName } from '../api'

type ApiStatus = 'idle' | 'loading' | 'failed'

type City = {
  id: number
  name: string
  weather: {
    description: string
    icon: string
    temp: number
    pressure: number
    windSpeed: number
    humidity: number
  }
}

interface CitiesState {
  cities: City[]
  status: ApiStatus
}

const initialState: CitiesState = {
  cities: [],
  status: 'idle',
}

// Actions
export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (name: string) => {
    const data = await fetchCitiesByName(name)
    console.log('data', data)
  }
)

// Selectors
export const citiesSelector = (state: RootState): City[] => state.cities.cities

// Slice

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      state.cities.push(action.payload)
    },
    deleteCity: (state, action: PayloadAction<number>) => {
      _.remove(
        state.cities,
        (city: City): boolean => city.id === action.payload
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state, action) => {
        // both `state` and `action` are now correctly typed
        // based on the slice state and the `pending` action creator
        console.log(state, action, 'cities pending')
      })
      .addCase(fetchCities.fulfilled, () => {
        console.log('fetch cities fulfilled')
      })
  },
})

export const { addCity, deleteCity } = citiesSlice.actions
export default citiesSlice.reducer
