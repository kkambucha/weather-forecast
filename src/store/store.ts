import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import citiesSlice from './slices/cities.slice'

import { cityApiSlice } from './slices/cityApi.slice'

const store = configureStore({
  reducer: {
    cities: citiesSlice,
    [cityApiSlice.reducerPath]: cityApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cityApiSlice.middleware),
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
