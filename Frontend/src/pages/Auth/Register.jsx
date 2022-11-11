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
import { useTitle } from '../../hooks/useTitle'
import GuestLayout from '../Layout/Guest'
import AuthenticationCard from '../../components/AuthenticationCard'

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
    if (data.name === '' || data.email === '' || data.password === '') {
      return toast.error('Please fill all the fields')
    }
    //Name less than 4 characters is not allowed
    if (data.name.length < 4) {
      return toast.error('Name must be at least 4 characters')
    }

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
            setStep={setStep}
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
    <GuestLayout>
      <AuthenticationCard>
        <div className="bg-primary-gradient p-4 py-6  md:flex md:w-80 md:flex-shrink-0 md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-center text-4xl font-bold tracking-wider">
            <Link to="/" className="text-primary-gradient">
              SkirmisherAI
            </Link>
          </div>
          <p className="mt-6 text-center font-normal text-gray-300 md:mt-0">
            A platform that helps employers to find the right talent for their organization and
            helps job seekers to find the right job for them. Sign up to get started.
          </p>
          <p className="mt-10 flex flex-col items-center justify-center text-center text-gray-400">
            <span>Already have an account?</span>
            <Link to="/login" className="underline">
              Sign In
            </Link>
          </p>
          <p className="mt-6 text-center text-sm text-gray-300">
            Read our{' '}
            <Link to="/terms-and-condition" className="underline">
              terms
            </Link>{' '}
            and{' '}
            <Link to="/terms-and-condition" className="underline">
              conditions
            </Link>
          </p>
        </div>
        <div className="bg-white p-5 md:flex-1">{conditionalComponent()}</div>
      </AuthenticationCard>
    </GuestLayout>
  )
}

function RegisterForm({
  setStep,
  handleSubmit,
  submitForm,
  register,
  classNames,
  isLoading,
  selectedRole,
}) {
  return (
    <>
      <div className="relative pt-6">
        <div className="absolute -right-6 top-0 text-teal-500 underline md:right-0">
          <span className="cursor-pointer text-sm" onClick={() => setStep(1)}>
            Back to Role Selection
          </span>
        </div>

        <h3 className="my-4 text-2xl font-semibold text-gray-700">
          Sign Up to {selectedRole.id === 1 ? 'Hire Talent' : 'Find work'}
        </h3>
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
                <Link
                  target="_blank"
                  to="/terms-and-condition"
                  className="mx-1 text-sm text-gray-600 underline hover:text-gray-900"
                >
                  Terms of Service
                </Link>
                and
                <Link
                  target="_blank"
                  to="/terms-and-condition"
                  className="mx-1 text-sm text-gray-600 underline hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </Label>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-center ">
            <ButtonSecondary
              className={classNames('ml-4 uppercase ', {
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
