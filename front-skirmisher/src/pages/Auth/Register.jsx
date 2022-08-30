import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register as authRegister, reset } from "../../features/auth/authSlice";
import { FaSignInAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Label from "../../components/Label";
import classNames from "classnames";
import AuthenticationCard from "../../components/AuthenticationCard";
import ButtonDefault from "../../components/ButtonDefault";
import Checkbox from "../../components/Checkbox";
import { RadioGroup } from "@headlessui/react";

// const roles = ["startup", "business", "enterprise"];
const roles = [
  {
    name: "Employer",
    id: 1,
    title: "Find Talents",
  },
  {
    name: "Candidate",
    id: 2,
    title: "Find Work",
  },
];

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [selectedRole, setSelectedRole] = useState(null);
  const [step, setStep] = useState(1);

  console.log(selectedRole, step);
  const submitForm = (data) => {
    //Override data to add roles
    data.role = selectedRole.id;
    console.log(data);
    // dispatch(authRegister(data));
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // console.log(user, isLoading, isError, isSuccess, message);

  //Redirect Registered user to Login
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  //Conditionally Render form




  return (
    <>
      <section className="register min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div className="w-full md:max-w-2xl mt-6 px-12 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <h1 className="font-serif text-3xl w-full text-center">
            Join as a Employer or Job Seeker
          </h1>
          <div className="mx-auto sm:flex justify-center w-full my-16 ">
            <RadioGroup value={selectedRole} onChange={setSelectedRole}>
              <RadioGroup.Label className="sr-only">
                Choose Role
              </RadioGroup.Label>
              <div className="space-y-2 md:space-y-0 md:space-x-4 md:flex ">
                {roles.map((role) => (
                  <RadioGroup.Option
                    key={role.name}
                    value={role}
                    className={({ active, checked }) =>
                      `${
                        active
                          ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                          : ""
                      }
                  ${
                    checked
                      ? "bg-sky-900 bg-opacity-75 text-white"
                      : "bg-gray-200 "
                  }
                    relative flex cursor-pointer rounded-sm px-5 py-4 shadow-md focus:outline-none h-48 w-80`
                    }
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
              onClick={() => setStep(step + 1) }
            >
              {selectedRole ? `Join as ${selectedRole.name}` : "Create account"}
            </ButtonDefault>
          </div>
        </div>
      </section>
      <AuthenticationCard>
        <div className="text-center">
          <h2 className="text-3xl">Join as a Employer or </h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="mt-4">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              className="mt-1 block w-full"
              {...register("name")}
              required
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1 block w-full"
              {...register("email")}
              required
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="mt-1 block w-full"
              {...register("password")}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                // checked={form.data.remember === "on"}
                // onChange={(e) =>
                //   form.setData("remember", e.currentTarget.checked ? "on" : "")
                // }
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to Terms and Conditions
              </span>
            </label>
            <div className="flex items-center justify-end">
              <Link
                to="/login"
                className="underline text-sm text-gray-600 hover:text-gray-900"
              >
                Already have an account?
              </Link>

              <ButtonDefault
                className={classNames("ml-4", { "opacity-25": isLoading })}
                disabled={isLoading}
              >
                Sign UP
              </ButtonDefault>
            </div>
          </div>
        </form>
      </AuthenticationCard>
    </>
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
