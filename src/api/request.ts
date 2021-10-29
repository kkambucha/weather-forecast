import axios, { Method, AxiosResponse } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
})

export const request = <T, P>(
  method: Method,
  url: string,
  params: P
): Promise<AxiosResponse<T>> => {
  return axiosInstance.request<T>({
    method,
    url,
    params,
  })
}
