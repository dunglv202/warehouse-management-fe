import AuthContext from '@/context/AuthContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useGuard = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  useEffect(() => {
    if (!authContext.user) {
      navigate('/login')
    }
  }, [authContext.user, navigate])
}

export default useGuard
