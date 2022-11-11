import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import GuestLayout from './Layout/Guest'
import { axiosInstance as API } from '../api/axiosInstance'
import { useEffect } from 'react'

export const ContactPage = () => {
  const { register, handleSubmit } = useForm()

  //Apply for Job
  const contactMutation = useMutation(async (data) => await API.post('v1/contact/', data))

  const submitForm = (data) => {
    if (data.name === '' || data.email === '' || data.message === '') {
      return toast.error('Please fill all the fields')
    }
    //Name less than 4 characters is not allowed
    if (data.name.length < 4) {
      return toast.error('Name must be at least 4 characters')
    }
    //Email must be valid
    if (!validateEmail(data.email)) {
      return toast.error('Email is not valid')
    }
    //Message must be at least 10 characters
    if (data.message.length < 10) {
      return toast.error('Message must be at least 10 characters')
    }
    contactMutation.mutate(data)
  }

  useEffect(() => {
    if (contactMutation.isSuccess) {
      toast.success('Message sent successfully')
    }
  }, [contactMutation.isSuccess])

  const isDisabled =
    contactMutation.isLoading || contactMutation.isSuccess || contactMutation.isError

  return (
    <GuestLayout>
      <div className="flex min-h-screen w-full flex-col bg-white font-sans">
        <div>
          <div className="bg-gray-700 md:overflow-hidden">
            <div className="px-4 py-16">
              <div className="relative w-full text-center md:mx-auto md:max-w-2xl">
                <h1 className="mb-6 text-xl font-bold leading-tight text-gray-300 sm:text-2xl md:mt-20 md:text-5xl">
                  Help - Contact Us - Support - FAQ - Terms and Conditions
                </h1>
                <p className="mb-6 text-base text-gray-300 sm:text-lg md:text-xl">
                  We are here to help you. Please contact us if you have any questions or concerns.
                </p>

                <p className="md:px-18 text-gray-400 md:text-xl">
                  A simple and smart solution that will help allocating human resources as well as
                  improving both business growth and productivity
                </p>

                <div className="absolute right-0 bottom-0 -mb-64 -mr-48 hidden h-40 w-40 rounded-full bg-blue-800 md:block"></div>

                <div className="absolute top-0 right-0 -mr-40 mt-32 hidden h-5 w-5 rounded-full bg-yellow-500 md:block"></div>
              </div>
            </div>

            <svg
              className="hidden bg-gray-700 fill-current text-white md:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fillOpacity="1"
                d="M0,64L120,85.3C240,107,480,149,720,149.3C960,149,1200,107,1320,85.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div className="relative z-20 mx-auto -mt-80 hidden max-w-4xl rounded-3xl bg-white shadow-lg md:block">
            <div className="absolute top-0 left-0 -z-10 -ml-10 -mt-10 h-20 w-20 rounded-full bg-yellow-500"></div>

            <div className="absolute top-0 left-0 -z-10 -ml-32 mt-12 h-5 w-5 rounded-full bg-blue-500"></div>

            <div className="h-10 rounded-t-lg border-b border-gray-100 bg-white"></div>
            <div className="flex h-[550px] border-2 border-red-500 ">
              <div className="px-8 text-lg text-gray-700">
                Before you contacting us, please check our <a href="#faq"> FAQ </a> to see if your
                question is already answered. If not, please contact us using the form below.
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
                    <ButtonPrimary
                      className={classNames('ml-4 ', {
                        'opacity-25': isLoading,
                      })}
                      disabled={isLoading}
                    >
                      Create my Account
                    </ButtonPrimary>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}
