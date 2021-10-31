import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { isLocalStorageAvaliable } from 'libs/localstorage'
import citiesSlice, { hydrate } from './slices/cities.slice'
import { cityApiSlice } from './slices/cityApi.slice'

export const LS_KEY_NAME = 'weather-forecast'

const store = configureStore({
  reducer: {
    cities: citiesSlice,
    [cityApiSlice.reducerPath]: cityApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cityApiSlice.middleware),
})

if (isLocalStorageAvaliable()) {
  store.subscribe(() => {
    localStorage.setItem(LS_KEY_NAME, JSON.stringify(store.getState()))
  })

  const getCitiesFromLocalStorage = () => {
    try {
      const persistedState = localStorage.getItem(LS_KEY_NAME)
      if (persistedState) {
        const state: RootState = JSON.parse(persistedState)
        return state.cities
      }
    } catch (e) {
      console.log(e)
    }
  }
  const cities = getCitiesFromLocalStorage()

  if (cities) {
    store.dispatch(hydrate(cities))
  }
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export default store
