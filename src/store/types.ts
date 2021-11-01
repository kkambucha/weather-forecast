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

interface OpenWeatherError {
  status: number
  data: {
    cod: string
    message: string
  }
}

export const isOpenWeatherErrorType = (
  error: unknown
): error is OpenWeatherError => {
  if (typeof error === 'object') {
    Boolean(error && 'status' in error)
  }
  return false
}
