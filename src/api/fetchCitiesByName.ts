import { AxiosResponse } from 'axios'

import { OpenWeatherResponse } from './types'
import { request } from './request'

interface Params {
  q: string
  units: 'standard' | 'metric' | 'imperial'
  appid: string
}

export const fetchCitiesByName = async (
  name: string
): Promise<AxiosResponse> => {
  return request<OpenWeatherResponse, Params>('GET', 'find', {
    q: name,
    appid: `${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
    units: 'metric',
  })
}
