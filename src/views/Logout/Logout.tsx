import AuthContext from '@/context/AuthContext'
import { Flex, Spin } from 'antd'
import { useCallback, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const doLogout = useCallback(async () => {
    try {
      await authContext.logout()
      navigate('/login')
    } catch (error) {
      console.error(error)
      navigate('/dashboard')
    }
  }, [authContext, navigate])

  useEffect(() => {
    doLogout()
  }, [doLogout])

  return (
    <Flex align='center' justify='center' style={{ width: '100vw', height: '100vh' }}>
      <Spin size='large' />
    </Flex>
  )
}

export default Logout
