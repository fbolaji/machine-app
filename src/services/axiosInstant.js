import axios from 'axios'
import { headers, apiBaseUrl } from './apiBaseUrl'

export function CreateAxiosInstantAPI() {
  const instance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 1000,
    headers: { ...headers },
  })
  return instance
}
