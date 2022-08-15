import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import { registerUser } from '../__helpers/userActions'

const RegisterScreen = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/login')
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user-profile')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch')
      return
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase()
    dispatch(registerUser(data))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* form markup... */}
    </form>
  )
}
export default RegisterScreen