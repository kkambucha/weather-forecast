import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

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
  async (cityName: string) => {
    try {
      const res = await fetchCitiesByName(cityName)
      return res.data.list
    } catch (err) {
      // handle error
    }
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
      .addCase(fetchCities.fulfilled, (state, { payload }) => {
        console.log('payload', payload)
        console.log('fetch cities fulfilled')
      })
      .addCase(fetchCities.rejected, () => {
        console.log('fetch cities rejected')
      })
  },
})

export const { addCity, deleteCity } = citiesSlice.actions
export default citiesSlice.reducer
