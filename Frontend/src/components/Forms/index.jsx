import React, { useState } from "react";
import classNames from "classnames";
import Label from "../Label";
import Input from "../Input";
import ButtonDefault from "../ButtonDefault";
import { SelectDropDown } from "../SelectDropdown";

const companies =[
  {
    id: 1, name: 'Facebook'
  },
  {
    id: 2, name: 'Google'
  },
  {
    id: 3, name: 'Amazon'
  },
  {
    id: 4, name: 'Microsoft'
  },
]

export const EmpProfileForm = ({handleSubmit, submitForm, register, isLoading}) => {
  const [selectedCompany, setSelectedCompany] = useState(companies[0])

  console.log(selectedCompany)

  const addNewCompany = () => {
    companies.push({id: companies.length + 1, name: 'New Company'})
    console.log({companies})
  }

  return (
    <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
      <div className="w-full sm:max-w-lg mt-6 px-6 py-4 bg-gray-200 shadow-md overflow-hidden sm:rounded-lg">
        <div className="text-center mb-7">
          <h2 className="text-3xl">Finish confirming the details!</h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <Label htmlFor="designation">Organization / Company</Label>
            <SelectDropDown selected={selectedCompany} setSelected={setSelectedCompany} items={companies} addNewItem={addNewCompany}/>
          </div>
          <div className="mt-4">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              type="text"
              className="mt-1 block w-full"
              {...register("designation")}
              required
              autoFocus
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="text"
              className="mt-1 block w-full"
              {...register("phone")}
              required
            />
          </div>
          <div className="mt-4 flex justify-end">
            <ButtonDefault
              className={classNames("ml-4", {
                "opacity-25": isLoading,
              })}
              disabled={isLoading}
            >
              Save Changes
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};
