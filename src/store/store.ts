import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import citiesSlice from './slices/cities.slice'
import searchSlice from './slices/search.slice'

const store = configureStore({
  reducer: {
    cities: citiesSlice,
    search: searchSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export default store
