import { Navigate, Outlet } from "react-router-dom";

//TODO: AUTHENTICATION
const useAuth=()=>{
  const user=localStorage.getItem('user')
  if(user){
    return true
  } else {
    return false
  }
}

const LoggedRoutes=(props:any) =>{

  const auth=useAuth()

  return auth ? <Navigate to="/login"/> : <Outlet/>
}

export default LoggedRoutes;