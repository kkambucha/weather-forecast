export type ApiStatus = 'idle' | 'pending' | 'rejected'

export interface City {
  id: number
  name: string
  main: {
    temp: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
  coord: {
    lat: number
    lon: number
  }
  sys: {
    country: string
  }
}

export interface OpenWeatherResponse {
  list: City[]
}

export interface RequestParams {
  units: 'standard' | 'metric' | 'imperial'
  appid: string
}
