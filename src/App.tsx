import '@/styles/app.css'
import { ConfigProvider, message } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { router } from './router/routes'
import lightTheme from './themes/Light'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { ApiError } from './models/common'

axios.interceptors.request.use((config) => {
  return { ...config, formSerializer: { ...config.formSerializer, dots: true } }
})

const isAccessTokenExpired = (err: AxiosError) => {
  return (
    err.response?.status === 401 && (err.response.data as ApiError).code === 'EXPIRED_ACCESS_TOKEN'
  )
}

axios.interceptors.response.use(
  (resp) => resp,
  async (err) => {
    if (!(err instanceof AxiosError)) return Promise.reject(err)

    if (isAccessTokenExpired(err)) {
      try {
        // refresh token
        await axios.post('/api/auth/refresh')
        return axios(err.config as AxiosRequestConfig)
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      // show error message
      message.error((err.response?.data as ApiError)?.message || 'An error occurred')
    }

    return Promise.reject(err)
  }
)

function App() {
  return (
    <AuthContextProvider>
      <ConfigProvider theme={lightTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AuthContextProvider>
  )
}

export default App
