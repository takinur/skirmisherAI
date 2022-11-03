import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
import { useForm } from 'react-hook-form'
import Input from '../../components/Input'
import Label from '../../components/Label'
import classNames from 'classnames'
import AuthenticationCard from '../../components/AuthenticationCard'
import ButtonDefault from '../../components/ButtonDefault'
import Checkbox from '../../components/Checkbox'
import GuestLayout from '../Layout/Guest'
import { useTitle } from '../../hooks/useTitle'

export default function Login() {
  useTitle('Sign In')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const submitForm = (data) => {
    dispatch(login(data))
  }

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  //Redirect authenticated user to Dashboard
  useEffect(() => {
    if (isSuccess || user) {
      navigate('/dashboard')
    }
    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  return (
    <GuestLayout>
      <AuthenticationCard>
        <div className="mb-7 text-center">
          <h2 className="text-3xl">Log in to SkirmisherAI</h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1 block w-full"
              {...register('email')}
              required
              autoFocus
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="mt-1 block w-full"
              {...register('password')}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="mt-4">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                // checked={form.data.remember === "on"}
                // onChange={(e) =>
                //   form.setData("remember", e.currentTarget.checked ? "on" : "")
                // }
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <div className="flex items-center justify-end">
              <Link to="/signup" className="text-sm text-gray-600 underline hover:text-gray-900">
                Need an account?
              </Link>

              <ButtonDefault
                className={classNames('ml-4', { 'opacity-25': isLoading })}
                disabled={isLoading}
              >
                Log in
              </ButtonDefault>
            </div>
          </div>
        </form>
        <div className="mt-4">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 underline hover:text-gray-900"
          >
            Forgotten my password
          </Link>
        </div>
      </AuthenticationCard>
    </GuestLayout>
  )
}
