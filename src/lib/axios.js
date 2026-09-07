import axios from 'axios'

/**
 * Shared axios instance.
 *
 * For server-side usage (Server Components, Route Handlers) the request must
 * use an absolute URL, so we read NEXT_PUBLIC_BASE_URL from the environment.
 * Make sure this variable is set in your .env file.
 *
 * For client-side usage the baseURL defaults to '/' so that relative paths
 * work automatically in the browser.
 */
const baseURL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : ''

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

export default axiosInstance
