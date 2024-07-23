import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import '@/styles/app.css'
import { router } from './router/routes'
import lightTheme from './themes/Light'

function App() {
  return (
    <ConfigProvider theme={lightTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
