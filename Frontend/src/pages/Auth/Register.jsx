import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { register as authRegister, reset } from '../../features/auth/authSlice'
import { useForm } from 'react-hook-form'
import Input from '../../components/Input'
import Label from '../../components/Label'
import classNames from 'classnames'
import Checkbox from '../../components/Checkbox'
import AuthRoleSelection from '../../components/AuthRoleSelection'
import ButtonSecondary from '../../components/ButtonSecondary'
import Header from '../../components/Header'
import { useTitle } from '../../hooks/useTitle'

const roles = [
  {
    name: 'Employer',
    id: 1,
    title: 'Find Talents',
  },
  {
    name: 'Candidate',
    id: 2,
    title: 'Find Work',
  },
]

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useTitle('Sign Up ')

  const { register, handleSubmit } = useForm()
  const [selectedRole, setSelectedRole] = useState(null)
  const [step, setStep] = useState(1)

  //State
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const submitForm = (data) => {
    //Override data to add roles
    data.role = selectedRole.id
    dispatch(authRegister(data))
  }

  //Redirect Registered user to Dashboard
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/dashboard')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  //Conditionally Render form
  const conditionalComponent = () => {
    switch (step) {
      case 1:
        return (
          <AuthRoleSelection
            roles={roles}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            step={step}
            setStep={setStep}
          />
        )

      case 2:
        return (
          <RegisterForm
            handleSubmit={handleSubmit}
            submitForm={submitForm}
            register={register}
            classNames={classNames}
            isLoading={isLoading}
            selectedRole={selectedRole}
          />
        )

      default:
        return (
          <AuthRoleSelection
            roles={roles}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            step={step}
            setStep={setStep}
          />
        )
    }
  }
  //Main return statement
  return (
    <>
      <Header>
        <Link
          to="/login"
          className="-mt-1 block rounded-full border-2 border-[#7510F7] py-2 px-6 text-sm font-semibold text-[#7510F7] shadow-md hover:bg-[#7510F7] hover:text-white md:inline-block"
        >
          Sign In
        </Link>
      </Header>
      <section className="register flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
        <div className="mt-6 w-full overflow-hidden bg-white px-12 py-4 shadow-md sm:rounded-lg md:max-w-2xl">
          {conditionalComponent()}
          <div className="mt-4 flex justify-center">
            <p>
              {' '}
              Already have an account?
              <Link
                to="/login"
                className="ml-1 text-sm text-green-600 underline hover:text-gray-900"
              >
                Login
              </Link>
            </p>
          </div>
          {/*TODO: same to greenwich update pass <p>Other password stuff</p> */}
        </div>
      </section>
    </>
  )
}

function RegisterForm({ handleSubmit, submitForm, register, classNames, isLoading, selectedRole }) {
  return (
    <>
      <div className="pt-6 text-center">
        <h2 className="font-serif text-3xl">
          Sign Up to {selectedRole.id === 1 ? 'Hire Talent' : 'Find work'}
        </h2>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mt-4">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            className="mt-1 block w-full"
            {...register('name')}
            required
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="email">
            {selectedRole.id === 1 ? 'Work Email Address' : 'Email Address'}
          </Label>
          <Input
            id="email"
            type="email"
            className="mt-1 block w-full"
            {...register('email')}
            required
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
          <Label htmlFor="terms">
            <div className="flex items-center">
              <Checkbox
                name="terms"
                id="terms"
                required
                // checked={form.data.terms}
                // onChange={e => form.setData('terms', e.currentTarget.checked)}
              />

              <div className="ml-2">
                I agree to the
                <a
                  target="_blank"
                  href="/terms"
                  className="mx-1 text-sm text-gray-600 underline hover:text-gray-900"
                >
                  Terms of Service
                </a>
                and
                <a
                  target="_blank"
                  href="/"
                  className="mx-1 text-sm text-gray-600 underline hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </Label>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-center ">
            <ButtonSecondary
              className={classNames('ml-4 ', {
                'opacity-25': isLoading,
              })}
              disabled={isLoading}
            >
              Create my Account
            </ButtonSecondary>
          </div>
        </div>
      </form>
    </>
  )
}
