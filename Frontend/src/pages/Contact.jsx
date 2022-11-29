import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import GuestLayout from './Layout/Guest'
import { axiosInstance as API } from '../api/axiosInstance'
import { useEffect } from 'react'
import Input from '../components/Input'
import Button from '../components/ButtonDefault'
import Label from '../components/Label'
import TextArea from '../components/TextArea'
import Checkbox from '../components/Checkbox'
import { useTitle } from '../hooks/useTitle'

export const ContactPage = () => {
  useTitle('Contact Us')
  const { register, handleSubmit, reset } = useForm()

  //Apply for Job
  const contactMutation = useMutation(async (data) => await API.post('v1/contact/', data))

  const submitForm = (data) => {
    if (data.name === '' || data.email === '' || data.message === '' || data.subject === '') {
      return toast.error('Please fill all the fields')
    }
    //Name less than 4 characters is not allowed
    if (data.name.length < 4) {
      return toast.error('Name must be at least 4 characters')
    }
    // Validate email with regex
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      return toast.error('Invalid email address')
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
      //Reset Hook Form after 5 seconds
      setTimeout(() => {
        reset()
      }, 5000)
    }
  }, [contactMutation.isSuccess])

  const isDisabled = contactMutation.isLoading || contactMutation.isSuccess

  return (
    <GuestLayout>
      <div className="flex min-h-screen w-full flex-col bg-white font-sans">
        <div>
          <div className="bg-gray-700 md:overflow-hidden">
            <div className="px-4 py-16">
              <div className="relative w-full text-center md:mx-auto md:max-w-2xl">
                <h1 className="mb-6 text-xl font-bold leading-tight text-gray-300 sm:text-2xl md:mt-20 md:text-5xl">
                  We are here to help you with any questions or concerns you may have.
                </h1>
                <p className="mb-6 text-base text-gray-400 sm:text-lg md:text-xl">
                  Before contacting us, please check our
                  <a className="mx-1 text-teal-500 underline hover:text-teal-700" href="#faq">
                    F.A.Q
                  </a>
                  to see if your question is already answered. If not, please contact us using the
                  form below.
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

          <div className="relative z-20 mx-auto max-w-4xl  rounded-3xl bg-white shadow-lg md:-mt-80 md:block">
            <div className="absolute top-0 left-0 -z-10 -ml-10 -mt-10 h-20 w-20 rounded-full bg-yellow-500"></div>

            <div className="absolute top-0 left-0 -z-10 -ml-32 mt-12 h-5 w-5 rounded-full bg-blue-500"></div>

            <div className="h-10 rounded-t-lg border-b border-gray-100 bg-white"></div>
            <div className="h-[550px] ">
              <form onSubmit={handleSubmit(submitForm)} className="mx-auto w-3/5">
                <div className="mt-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    className="mt-1 block w-full"
                    {...register('name')}
                    required
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    {...register('email')}
                    required
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    className="mt-1 block w-full"
                    {...register('subject')}
                    required
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor="message">Details</Label>
                  <TextArea
                    id="message"
                    type="text"
                    className="mt-1 block w-full"
                    {...register('message')}
                    required
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor="terms">
                    <div className="flex items-center">
                      <Checkbox name="terms" id="terms" required />

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
                    <Button
                      className={classNames('ml-4 ', {
                        'opacity-25': isDisabled,
                      })}
                      disabled={isDisabled}
                    >
                      Send Message
                    </Button>
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
