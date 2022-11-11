import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

import AuthLayout from '../Layout/Auth'
import Label from '../../components/Label'
import Input from '../../components/Input'
import ButtonDefault from '../../components/ButtonDefault'
import { FaChevronLeft } from 'react-icons/fa'
import { useTitle } from '../../hooks/useTitle'

const UserSetting = () => {
  useTitle('User Setting')
  const navigate = useNavigate()
  const API = useAxiosPrivate()

  const { user } = useSelector((state) => state.auth)

  //React hook form
  const { register, handleSubmit } = useForm()

  //React query mutation
  const updateMutation = useMutation(async (data) => await API.put(`/auth/change-password/`, data))

  //Handle form submit event
  const submitForm = (data) => {
    return updateMutation.mutate(data)
  }

  useEffect(() => {
    if (updateMutation.isError) {
      let message = updateMutation.error.response.data
      //Show first error message from object
      const err = message.non_field_errors
        ? 'Current password did not matched'
        : Object.values(message)[0][0]
      toast.error(err)
    }

    if (updateMutation.isSuccess) {
      toast.success('Password updated successfully')
      //Navigate after 2 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    }
  }, [updateMutation.isError, updateMutation.isSuccess])

  const isDisabled = updateMutation.isSuccess || updateMutation.isLoading

  return (
    <AuthLayout title=" Change your Password ">
      <ButtonDefault
        onClick={() => navigate(-1)}
        className={classNames('ml-5 !bg-gray-700 md:mt-2 md:mt-6')}
      >
        <FaChevronLeft className="mr-1" />
        Go Back
      </ButtonDefault>
      <div className="mt-6 grid-cols-2 pt-6 sm:pt-0 md:grid">
        <div className="px-2 pt-4 md:px-6">
          <h3 className="font-roboto text-lg font-semibold text-green-700">
            Important Information{' '}
          </h3>
          <p className="font-saira text-base font-light text-gray-600">
            Password must be at least 8 characters long and must contain at least one uppercase
            letter, one lowercase letter, one number, and one special character.
          </p>
          <p className="mt-6 font-saira text-base font-light text-gray-600">
            Password must not be the same as your username, email, or other personal information.
          </p>

          <p className="mt-4 font-saira text-base font-light text-gray-600">
            Password must not be a commonly used password.
          </p>
        </div>

        <div className="mt-4 w-full overflow-hidden bg-gray-200 px-6 py-4 shadow-md dark:bg-gray-900 sm:max-w-2xl sm:rounded-lg md:mt-0 ">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="mt-1 flex-auto">
              <Label htmlFor="cpass">Current Password </Label>
              <Input
                id="cpass"
                type="password"
                className="mt-1 block w-full"
                {...register('old_password')}
                required
              />
            </div>
            <div className="mt-1 flex-auto">
              <Label htmlFor="npass">New Password </Label>
              <Input
                id="npass"
                type="text"
                className="mt-1 block w-full"
                {...register('new_password')}
                required
              />
            </div>

            <div className="mt-4 flex justify-end">
              <ButtonDefault
                className={classNames('ml-4', {
                  'opacity-25': isDisabled,
                })}
                disabled={isDisabled}
              >
                {isDisabled ? 'Updating...' : 'Update'}
              </ButtonDefault>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default UserSetting
