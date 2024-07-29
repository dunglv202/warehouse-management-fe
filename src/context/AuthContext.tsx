import Loading from '@/components/Loading'
import { AuthResult, Credential } from '@/models/auth'
import { User } from '@/models/user'
import { login as doLogin, logout as doLogout } from '@/services/auth-service'
import { getMyInfo } from '@/services/user-service'
import { createContext, ReactNode, useEffect, useState } from 'react'

const KEY_AUTHENTICATED = 'authenticated'

const AuthContext = createContext<{
  user?: User
  login: (credential: Credential) => Promise<AuthResult>
  logout: () => Promise<void>
}>({
  user: undefined,
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
})

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authenticated = Boolean(localStorage.getItem(KEY_AUTHENTICATED))

    const fetchUser = async () => {
      if (authenticated && Boolean(authenticated)) {
        try {
          setUser(await getMyInfo())
        } finally {
          setLoading(false)
        }
      }
    }

    if (authenticated) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (credential: Credential) => {
    const authResult = await doLogin(credential)
    localStorage.setItem(KEY_AUTHENTICATED, 'true')
    setUser(await getMyInfo())
    return authResult
  }

  const logout = async () => {
    await doLogout()
    setUser(undefined)
    localStorage.removeItem(KEY_AUTHENTICATED)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Loading loading={loading} fullscreen>
        {children}
      </Loading>
    </AuthContext.Provider>
  )
}

export default AuthContext
