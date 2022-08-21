import { Navigate, Outlet } from "react-router-dom";

//TODO: AUTHENTICATION
const useAuth=()=>{
  const authToken =localStorage.getItem('authToken')
  if(authToken){
    return true
  } else {
    return false
  }
}

const ProtectedRoutes=(props:any) =>{

  const auth=useAuth()

  return auth ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes;