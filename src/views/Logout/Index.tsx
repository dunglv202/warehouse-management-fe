import Loading from '@/components/Loading'
import AuthContext from '@/context/AuthContext'
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

  return <Loading fullscreen />
}

export default Logout
