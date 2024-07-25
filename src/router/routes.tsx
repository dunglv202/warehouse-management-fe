import AuthLayout from '@/layouts/AuthLayout/AuthLayout'
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout'
import Category from '@/views/Category/Index'
import Dashboard from '@/views/Dashboard/Index'
import Inventory from '@/views/Inventory/Index'
import Login from '@/views/Login/Index'
import Logout from '@/views/Logout/Index'
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
          {
            path: 'category',
            element: <Category />,
          },
        ],
      },
    ],
  },
])
