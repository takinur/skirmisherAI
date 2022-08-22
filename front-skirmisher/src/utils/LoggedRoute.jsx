import { Navigate, Outlet } from "react-router-dom";

//TODO: AUTHENTICATION
const useAuth=()=>{
  const authToken = localStorage.getItem('authToken')
  if(authToken){
    return true
  } else {
    return false
  }
}

const LoggedRoutes=(props) =>{

  const auth=useAuth()

  return auth ? <Navigate to="/login"/> : <Outlet/>
}

export default LoggedRoutes;