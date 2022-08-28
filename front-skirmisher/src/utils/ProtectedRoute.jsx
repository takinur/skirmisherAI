import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const ProtectedRoute = (role) => {
  const { user } = useSelector((state) => state.auth)
  console.log(role)
  // show unauthorized screen if no user is found in redux store
  if (!user ) {
    return (
      <div className='h-screen bg-green-600 text-center'>
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to='/login'>Login</NavLink> to gain access
        </span>
      </div>
    )
  }
  //Check user role and show appropriate page



  // returns child route elements
  // return <Outlet />
}
export default ProtectedRoute