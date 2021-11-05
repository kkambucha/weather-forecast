import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { City, OpenWeatherResponse } from 'store/types'
import { Geolocation } from 'libs/geolocation'

const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'

const commonApiParams = {
  appid: `${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
  units: 'metric',
}

const transformOpenweatherResponse = (response: OpenWeatherResponse): City[] =>
  response.list

export const cityApiSlice = createApi({
  reducerPath: 'cityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: OPEN_WEATHER_API_URL,
  }),
  endpoints: (build) => ({
    fetchCitiesByName: build.query({
      query: (cityName: string) => ({
        url: 'find',
        method: 'GET',
        params: {
          q: cityName,
          ...commonApiParams,
        },
      }),
      transformResponse: transformOpenweatherResponse,
    }),
    fetchCitiesByIds: build.query({
      query: (ids: string) => ({
        url: 'group',
        method: 'GET',
        params: {
          id: ids,
          ...commonApiParams,
        },
      }),
      transformResponse: transformOpenweatherResponse,
    }),
    fetchCitiesByCoords: build.query({
      query: ({ latitude, longitude }: Geolocation) => ({
        url: 'find',
        method: 'GET',
        params: {
          lat: latitude?.toString(),
          lon: longitude?.toString(),
          ...commonApiParams,
        },
      }),
      transformResponse: transformOpenweatherResponse,
    }),
  }),
})
