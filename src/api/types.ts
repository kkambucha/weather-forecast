export interface OpenWeatherResponse {
  list: Array<{
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
  }>
}
