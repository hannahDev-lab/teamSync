import axios from 'axios'

export const apiCilent = axios.create({
  baseURL: 'http://localhost:3001/api',
})
