import '@/styles/app.css'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { router } from './router/routes'
import lightTheme from './themes/Light'
import axios from 'axios'

axios.interceptors.request.use((config) => {
  return { ...config, formSerializer: { ...config.formSerializer, dots: true } }
})

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
