import React from 'react'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import ButtonDefault from './ButtonDefault'
import { FaChalkboardTeacher, FaRegNewspaper } from 'react-icons/fa'

export default function AuthRoleSelection({ selectedRole, setSelectedRole, roles, setStep, step }) {
  return (
    <>
      <h3 className="my-4 text-2xl font-semibold text-gray-700"> Onboard with Us! </h3>
      <h5 className="my-4 text-lg font-normal text-gray-500"> Sign up as Employer or Candidate</h5>
      <div className="mx-auto my-10 w-full justify-center sm:flex ">
        <RadioGroup value={selectedRole} onChange={setSelectedRole}>
          <RadioGroup.Label className="sr-only">Choose Role</RadioGroup.Label>
          <div className="space-y-2">
            {roles.map((role) => (
              <RadioGroup.Option
                key={role.name}
                value={role}
                className={({ active, checked }) => `${
                  active
                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                    : ''
                }
                ${checked ? 'bg-green-600 bg-opacity-75 text-white' : 'bg-gray-200 '}
                  relative mx-auto flex h-40 w-60 cursor-pointer rounded-sm px-5 py-4 shadow-md focus:outline-none`}
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between ">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                          >
                            <span className="flex h-full w-full justify-center">
                              {role.id === 1 ? (
                                <FaChalkboardTeacher className="h-10 w-10" />
                              ) : (
                                <FaRegNewspaper className={`h-10 w-10`} />
                              )}
                            </span>
                            <span className="mt-5 ml-5 text-lg">
                              {role.id === 1 ? 'Employer' : 'Job Seeker'}
                            </span>
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="flex items-center justify-center text-center">
        <ButtonDefault
          className={classNames('ml-4')}
          disabled={selectedRole === null}
          onClick={() => setStep(step + 1)}
        >
          {selectedRole ? `Join as a ${selectedRole.name}` : 'Create account'}
        </ButtonDefault>
      </div>
    </>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
