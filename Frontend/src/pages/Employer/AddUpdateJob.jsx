import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import classNames from 'classnames'

import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { SelectListBox } from '../../components/SelectDropdown'

import AuthLayout from '../Layout/Auth'
import Label from '../../components/Label'
import Input from '../../components/Input'
import ButtonDefault from '../../components/ButtonDefault'
import TextArea from '../../components/TextArea'
import { FaChevronLeft } from 'react-icons/fa'
import { useTitle } from '../../hooks/useTitle'

const expLevel = [
  { name: 'Freshers are encourged' },
  { name: 'Nice to have any' },
  { name: 'Nice to have 1 Years' },
  { name: 'More than 1 Year is required' },
  { name: 'More than 2 Years is required' },
  { name: 'More than 3 Years is required' },
  { name: 'More than 4 Years is required' },
  { name: 'More than 5 Years is required' },
  { name: 'More than 6 Years is required' },
]
// TODO: Sklls should be fetched from the backend
const skills = [
  { name: 'HTML', id: 1 },
  { name: 'CSS', id: 2 },
  { name: 'JavaScript', id: 3 },
  { name: 'React', id: 4 },
  { name: 'Node', id: 5 },
  { name: 'Python', id: 6 },
  { name: 'Django', id: 7 },
  { name: 'Flask', id: 8 },
  { name: 'Java', id: 9 },
  { name: 'C++', id: 10 },
  { name: 'C#', id: 11 },
  { name: 'C', id: 12 },
  { name: 'PHP', id: 13 },
  { name: 'Ruby', id: 14 },
  { name: 'Go', id: 15 },
  { name: 'Swift', id: 16 },
  { name: 'Kotlin', id: 17 },
  { name: 'Rust', id: 18 },
  { name: 'SQL', id: 19 },
  { name: 'NoSQL', id: 20 },
  { name: 'MongoDB', id: 21 },
  { name: 'PostgreSQL', id: 22 },
  { name: 'MySQL', id: 23 },
  { name: 'Firebase', id: 24 },
  { name: 'AWS', id: 25 },
  { name: 'Azure', id: 26 },
  { name: 'GCP', id: 27 },
  { name: 'Docker', id: 28 },
  { name: 'Kubernetes', id: 29 },
  { name: 'Git', id: 30 },
  { name: 'GitHub', id: 31 },
  { name: 'GitLab', id: 32 },
  { name: 'BitBucket', id: 33 },
  { name: 'Linux', id: 34 },
  { name: 'Windows', id: 35 },
  { name: 'Laravel', id: 36 },
]

export const CreateUpdateJob = () => {
  useTitle('Create Job | Job Update')
  const navigate = useNavigate()
  const API = useAxiosPrivate()

  const { id } = useParams() //Parameter from Route
  const isAddMode = !id

  const location = useLocation()
  const employerId = location.state?.employer //Employer ID from the state

  //State for the form
  const [selectedExp, setselectedExp] = useState(expLevel[0])
  const [selectedSkill, setselectedSkill] = useState([skills[0], skills[1]])

  //React hook form
  const { register, handleSubmit, setValue } = useForm()

  //React query mutations
  const addMutation = useMutation(async (data) => await API.post('/jobs/', data))
  const updateMutation = useMutation(async (data) => await API.put(`/jobs/${id}/`, data))

  //Handle form submit event
  const submitForm = (data) => {
    return isAddMode ? createJob(data) : updateJob(id, data)
  }

  function createJob(data) {
    data.employer = employerId
    data.level = selectedExp.name

    //Unique skills array
    let uniqueSkills = [...new Set(selectedSkill.map((item) => item.name))]
    //Combine skills array
    data.qualifications = uniqueSkills.join(', ')

    // console.log("Create this data: ", data);

    return addMutation.mutate(data)
  }
  function updateJob(id, data) {
    data.employer = employerId
    // console.log("Update this data: ", data);

    return updateMutation.mutate(data)
  }

  useEffect(() => {
    if (!isAddMode) {
      //Fetch data with ID
      const fetchJob = async () => {
        const { data } = await API.get(`/jobs/${id}/`)
        // console.log("FETCHED DATA", data);
        const fields = ['title', 'type', 'work_location', 'benefits', 'description', 'salary']
        // const tempexp = expLevel.find(
        //   // (item) => item.name === data['level']
        // );
        // setselectedExp(tempexp);
        setselectedSkill([skills[2], skills[3]])
        //Set form values from returned data
        fields.forEach((field) => setValue(field, data[field]))
      }
      // Call the async function
      fetchJob()
    }

    if (addMutation.isSuccess) {
      toast.success('Job Posted successfully')
      setTimeout(() => {
        navigate(-1)
      }, 1000)
    }
    if (updateMutation.isSuccess) {
      toast.success('Job updated successfully')
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

  const handleContinue = (e) => {
    e.preventDefault()
    //Scroll to next Section
    const nextSection = document.getElementById('formsection2')
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <AuthLayout title="Post new job for talent hiring">
      <ButtonDefault
        onClick={() => navigate(-1)}
        className={classNames('ml-5 !bg-gray-700 md:mt-2')}
      >
        <FaChevronLeft className="mr-1" />
        Go Back
      </ButtonDefault>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mt-6 grid-cols-2 pt-6 sm:pt-0 md:grid">
          <div className="px-2 pt-4 md:px-6">
            <h3 className="font-mono text-lg font-semibold text-gray-700">General Information</h3>
            <p className="text-base font-light">
              Add a interesting title to your post. This will help candidates to find your post
              easily. Also add what type of job you are offering. You can also add the location of
              the job and the expected salary range.
            </p>
          </div>
          <div className=" mt-4 w-full overflow-hidden bg-gray-200 px-6  py-4 shadow-md dark:bg-gray-900  sm:max-w-2xl sm:rounded-lg md:mt-0">
            <div className="mt-1 flex-auto">
              <Label htmlFor="title">Enter the name of your Job post </Label>
              <Input
                id="title"
                type="text"
                className="mt-1 block w-full"
                {...register('title')}
                required
              />
              <span className="text-sm text-gray-500 dark:text-slate-400">
                <b>Example:</b> MERN Stack Developer
              </span>
            </div>
            <div className="mt-4 flex-auto">
              <Label htmlFor="type">What type of Job you offer </Label>
              <Input
                id="type"
                type="text"
                className="mt-1 block w-full"
                {...register('type')}
                required
              />
              <span className="text-sm text-gray-500 dark:text-slate-400">
                <b>Example:</b> Full-Time / Remote / Part-Time
              </span>
            </div>
            <div className="wrapper md:flex">
              <div className="mt-4 flex-auto md:mr-2">
                <div className="wrapper">
                  <Label htmlFor="salary">Salary (Optional)</Label>
                  <Input
                    id="salary"
                    type="text"
                    className="mt-1 block w-full"
                    {...register('salary')}
                  />
                  <span className="text-sm text-gray-500 dark:text-slate-400">
                    <b>Example:</b> $60000 - $80000 / Year
                  </span>
                </div>
              </div>
              <div className="mt-4 flex-auto">
                <Label htmlFor="work_location">Location </Label>
                <Input
                  id="work_location"
                  type="text"
                  className="mt-1 block w-full"
                  {...register('work_location')}
                  required
                />
                <span className="text-sm text-gray-500 dark:text-slate-400">
                  Add regions or Cities
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <ButtonDefault onClick={handleContinue} className="ml-4">
                Continue
              </ButtonDefault>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div id="formsection2" className="grid-cols-2 sm:pt-0  md:mt-6 md:grid md:pt-6">
          <div className="px-2 pt-4 md:px-6">
            <h3 className="font-mono text-lg font-semibold text-gray-700">
              Additional Information
            </h3>
            <p className="text-base font-light">
              Benefits are the perks that you offer to your employees. You can add multiple benefits
              to your post. Experience level is the level of experience that you are looking for in
              your candidates. Qualifications are the skills that you are looking for in your
              candidates.
            </p>
          </div>
          <div className="mt-4 w-full overflow-hidden bg-gray-200 px-6  py-4 shadow-md dark:bg-gray-900  sm:max-w-2xl sm:rounded-lg md:mt-0">
            <div className="wrapper grid-cols-2 md:grid">
              <div className="mt-4 md:mr-2">
                <Label htmlFor="benefits">Benefits</Label>
                <Input
                  id="benefits"
                  type="text"
                  className="mt-1 block w-full"
                  {...register('benefits')}
                />
                <span className="text-sm text-gray-500 dark:text-slate-400">
                  <b>Example:</b> 401K, Health Insurance
                </span>
              </div>
              <div className="mt-4 ">
                <Label htmlFor="expLevel">Experience</Label>
                <SelectListBox
                  items={expLevel}
                  selected={selectedExp}
                  setSelected={setselectedExp}
                />
              </div>
            </div>
            <div className="mt-4 ">
              <Label htmlFor="skills">Qualifications for Job</Label>
              <SelectListBox
                items={skills}
                selected={selectedSkill}
                setSelected={setselectedSkill}
                isMultiple={true}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="description">Other details about the job</Label>
              <TextArea
                id="description"
                rows="4"
                className="mt-2"
                {...register('description')}
                placeholder="Ex: Responsibilites, Skills, etc"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <ButtonDefault
                className={classNames('ml-4', {
                  'opacity-25': isDisabled,
                })}
                disabled={isDisabled}
              >
                {isAddMode ? 'Post Job' : 'Update Job'}
              </ButtonDefault>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}
