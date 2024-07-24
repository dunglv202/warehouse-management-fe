import AuthLayout from '@/layouts/AuthLayout/AuthLayout'
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout'
import Dashboard from '@/views/Dashboard/Dashboard'
import Inventory from '@/views/Inventory/Inventory'
import Login from '@/views/Login/Login'
import Logout from '@/views/Logout/Logout'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/logout',
        element: <Logout />,
      },
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
          {
            path: 'inventory',
            element: <Inventory />,
          },
        ],
      },
    ],
  },
])
