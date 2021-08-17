import axios from 'axios'
import { headers, apiBaseUrl } from './apiBaseUrl'

axios.interceptors.request.use(
  (config) => {
    // perform a task before the request is sent
    console.log('Request was sent')

    return config
  },
  (error) => {
    // handle the error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    // do something with the response data
    console.log('Response was received', response)

    return response
  },
  (error) => {
    // handle the response error
    return Promise.reject(error)
  }
)

export function CreateAxiosInstantAPI() {
  const instance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 20000,
    headers: { ...headers },
  })
  return instance
}
