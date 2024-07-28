import AuthLayout from '@/layouts/AuthLayout/AuthLayout'
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout'
import Category from '@/views/Category/Index'
import Customer from '@/views/Customer/Index'
import NewCustomer from '@/views/Customer/NewCustomer'
import Dashboard from '@/views/Dashboard/Index'
import Import from '@/views/Import/Index'
import NewImport from '@/views/Import/NewImport'
import Inventory from '@/views/Inventory/Index'
import NewProduct from '@/views/Inventory/NewProduct'
import Login from '@/views/Login/Index'
import Logout from '@/views/Logout/Index'
import Provider from '@/views/Provider/Index'
import NewProvider from '@/views/Provider/NewProvider'
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
            children: [
              {
                path: '',
                element: <Inventory />,
              },
              {
                path: 'new',
                element: <NewProduct />,
              },
            ],
          },
          {
            path: 'category',
            element: <Category />,
          },
          {
            path: 'provider',
            children: [
              {
                path: '',
                element: <Provider />,
              },
              {
                path: 'new',
                element: <NewProvider />,
              },
            ],
          },
          {
            path: 'customer',
            children: [
              {
                path: '',
                element: <Customer />,
              },
              {
                path: 'new',
                element: <NewCustomer />,
              },
            ],
          },
          {
            path: 'import',
            children: [
              {
                path: '',
                element: <Import />,
              },
              {
                path: 'new',
                element: <NewImport />,
              },
            ],
          },
        ],
      },
    ],
  },
])
