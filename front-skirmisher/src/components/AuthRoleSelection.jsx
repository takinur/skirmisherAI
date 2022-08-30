import React from "react";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import ButtonDefault from "./ButtonDefault";

export default function AuthRoleSelection({
  selectedRole,
  setSelectedRole,
  roles,
  setStep,
  step,
}) {
  return (
    <section className="register min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
      <div className="w-full md:max-w-2xl mt-6 px-12 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <h1 className="font-serif text-3xl w-full text-center">
          Join as a Employer or Job Seeker
        </h1>
        <div className="mx-auto sm:flex justify-center w-full my-16 ">
          <RadioGroup value={selectedRole} onChange={setSelectedRole}>
            <RadioGroup.Label className="sr-only">Choose Role</RadioGroup.Label>
            <div className="space-y-2 md:space-y-0 md:space-x-4 md:flex ">
              {roles.map((role) => (
                <RadioGroup.Option
                  key={role.name}
                  value={role}
                  className={({ active, checked }) => `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                ${
                  checked
                    ? "bg-sky-900 bg-opacity-75 text-white"
                    : "bg-gray-200 "
                }
                  relative flex cursor-pointer rounded-sm px-5 py-4 shadow-md focus:outline-none h-48 w-80`}
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between ">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {role.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            >
                              <span>plan.disk</span>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked ? (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        ) : (
                          <div className="shrink-0 bg-red-600">
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
        <div className="flex items-center text-center justify-center">
          <ButtonDefault
            className={classNames("ml-4")}
            disabled={selectedRole === null}
            onClick={() => setStep(step + 1)}
          >
            {selectedRole ? `Join as ${selectedRole.name}` : "Create account"}
          </ButtonDefault>
        </div>
      </div>
    </section>
  );
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
  );
}
