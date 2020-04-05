import axios from 'axios'

export default axios.create({
  baseURL:
    (process.static && process.server) || process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : '/',
})
