import axios from 'axios'

interface City {
  name: string
  type: string
}

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
})

export const fetchCitiesByName = async (name: string): Promise<any> => {
  return await axiosInstance.get<City[]>('find', {
    params: {
      q: name || 'london',
      type: 'like',
      sort: 'population',
      appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
      units: 'metric',
    },
  })
}
