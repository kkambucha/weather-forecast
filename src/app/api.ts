import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
})

export const fetchCitiesByName = async (name: string): Promise<any> => {
  const res = await axiosInstance.get('find', {
    params: {
      q: name || 'london',
      type: 'like',
      sort: 'population',
      appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
      units: 'metric',
    },
  })
  return res.data
}
