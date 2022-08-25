import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!user) {
    return (
      <div className='h-screen bg-green-600 text-center'>
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to='/login'>Login</NavLink> to gain access
        </span>
      </div>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute