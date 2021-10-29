import { AxiosResponse } from 'axios'

import { OpenWeatherResponse } from './types'
import { request } from './request'

interface Params {
  id: string
  units: 'standard' | 'metric' | 'imperial'
  appid: string
}

export const fetchWeatherByCityIds = async (
  ids: string
): Promise<AxiosResponse> => {
  return request<OpenWeatherResponse, Params>('GET', 'group', {
    id: ids,
    appid: `${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
    units: 'metric',
  })
}
