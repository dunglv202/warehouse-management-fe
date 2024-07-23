import { createBrowserRouter } from 'react-router-dom'
import Login from '@/views/Login'
import AuthLayout from '@/layouts/AuthLayout'
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout'
import Dashboard from '@/views/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
        ],
      },
      {
        path: '',
        element: <DefaultLayout />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
])
