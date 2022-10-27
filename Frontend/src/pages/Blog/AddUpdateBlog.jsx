import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import TextArea from '../../components/TextArea'
import { FaChevronLeft } from 'react-icons/fa'

export const CreateUpdateBlog = () => {
  const navigate = useNavigate()
  const API = useAxiosPrivate()

  const { slug } = useParams() //Parameter from Route
  const isAddMode = !slug

  const { user } = useSelector((state) => state.auth)

  //React hook form
  const { register, handleSubmit, setValue } = useForm()

  //React query mutations
  const addMutation = useMutation(async (data) => await API.post('/v1/blog/', data))
  const updateMutation = useMutation(async (data) => await API.put(`/v1/blog/${slug}/`, data))

  //Handle form submit event
  const submitForm = (data) => {
    return isAddMode ? createPost(data) : updatePost(data)
  }

  function createPost(data) {
    data.author = user.id
    //Generate slug from title
    data.slug = data.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

    // console.log('Create this data: ', data)

    return addMutation.mutate(data)
  }
  function updatePost(data) {
    data.author = user.id
    data.slug = data.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

    // console.log('Update this data: ', data)

    return updateMutation.mutate(data)
  }

  useEffect(() => {
    if (!isAddMode) {
      //Fetch data with ID
      const fetchJob = async () => {
        const { data } = await API.get(`/v1/blog/${slug}/`)

        // console.log('Data: ', data)

        const fields = ['title', 'tags', 'description']

        //Set form values from returned data
        fields.forEach((field) => setValue(field, data[field]))
      }
      // Call the async function
      fetchJob()
    }

    if (addMutation.isSuccess) {
      toast.success('Post Published successfully')
      setTimeout(() => {
        navigate(-1)
      }, 1000)
    }
    if (updateMutation.isSuccess) {
      toast.success('Post updated successfully')
      //Navigate after 2 seconds
      setTimeout(() => {
        navigate(-1)
      }, 1000)
    }
    //TODO: Handle errors
    if (addMutation.isError) {
      toast.error('Something went wrong')
    }
    if (updateMutation.isError) {
      toast.error('Something went wrong')
      console.log(updateMutation.error)
    }
  }, [updateMutation.isError, updateMutation.isSuccess, addMutation.isError, addMutation.isSuccess])
  //Loading state //Disabled state
  const isLoading = addMutation.isLoading || updateMutation.isLoading
  const isDisabled = isLoading || addMutation.isSuccess || updateMutation.isSuccess

  return (
    <AuthLayout title="Publish New Community Post">
      <ButtonDefault
        onClick={() => navigate(-1)}
        className={classNames('ml-5 !bg-gray-700 md:mt-2')}
      >
        <FaChevronLeft className="mr-1" />
        Go Back
      </ButtonDefault>
      <div className="mt-6 grid-cols-2 pt-6 sm:pt-0 md:grid">
        <div className="px-2 pt-4 md:px-6">
          <h3 className="font-mono text-lg font-semibold text-gray-700">General Information</h3>
          <p className="text-base font-light">
            Add a interesting title and description to your post. This will help others to find your
            post. You can also add tags to your post to make it more searchable.
          </p>
        </div>

        <div className="mt-4 w-full overflow-hidden bg-gray-200 px-6 py-4 shadow-md dark:bg-gray-900 sm:max-w-2xl sm:rounded-lg md:mt-0 ">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="mt-1 flex-auto">
              <Label htmlFor="title">Title </Label>
              <Input
                id="title"
                type="text"
                className="mt-1 block w-full"
                {...register('title')}
                required
              />
              <span className="text-sm text-gray-500 dark:text-slate-400">
                <b>Example:</b> How to get Started with React
              </span>
            </div>
            <div className="mt-4 flex-auto">
              <Label htmlFor="tags">Tags </Label>
              <Input
                id="tags"
                type="text"
                className="mt-1 block w-full"
                {...register('tags')}
                required
              />
              <span className="text-sm text-gray-500 dark:text-slate-400">
                <b>Example:</b> react, javascript, frontend (separate by comma)
              </span>
            </div>
            <div className="mt-4 flex-auto">
              <Label htmlFor="description">Description </Label>
              <TextArea
                id="description"
                className="mt-1 block w-full"
                {...register('description')}
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
                {isAddMode ? 'Publish Post' : 'Update Post'}
              </ButtonDefault>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}
