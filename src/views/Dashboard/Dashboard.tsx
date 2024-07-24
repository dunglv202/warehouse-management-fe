import useGuard from '@/hooks/useGuard'

const Dashboard = () => {
  useGuard()
  return <h1>Hello</h1>
}

export default Dashboard
