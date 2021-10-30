import { AxiosResponse } from 'axios'

import { OpenWeatherResponse, RequestParams } from './types'
import { request } from './request'

interface Params extends RequestParams {
  q: string
}

export const fetchCitiesByName = async (
  name: string
): Promise<AxiosResponse> => {
  return await request<OpenWeatherResponse, Params>('GET', 'find', {
    q: name,
    appid: `${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
    units: 'metric',
  })
}
