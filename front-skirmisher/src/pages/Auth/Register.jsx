import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register as authRegister, reset } from "../../features/auth/authSlice";
import { FaSignInAlt } from "react-icons/fa";
import { set, useForm } from "react-hook-form";
import Input from "../../components/Input";
import Label from "../../components/Label";
import classNames from "classnames";
import AuthenticationCard from "../../components/AuthenticationCard";
import ButtonDefault from "../../components/ButtonDefault";
import Checkbox from "../../components/Checkbox";
import AuthRoleSelection from "../../components/AuthRoleSelection";

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
        );

      case 2:
        return (
          <RegisterForm
            handleSubmit={handleSubmit}
            submitForm={submitForm}
            register={register}
            classNames={classNames}
            isLoading={isLoading}
            selectedRole={selectedRole}
          />
        );

      default:
        return (
          <AuthRoleSelection
            roles={roles}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            step={step}
            setStep={setStep}
          />
        );
    }
  };
  //Main return statement
  return <>{conditionalComponent()}</>;
}

function RegisterForm({
  handleSubmit,
  submitForm,
  register,
  classNames,
  isLoading,
  selectedRole,
}) {
  return (
    <>
      <AuthenticationCard>
        <div className="text-center">
          <h2 className="text-3xl">Ara ara {selectedRole.name} </h2>
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
            <Label htmlFor="email">
              {selectedRole.id === 1 ? "Work Email Address" : "Email Address"}
            </Label>
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
                  <a
                    target="_blank"
                    href="/terms"
                    className="underline text-sm text-gray-600 hover:text-gray-900 mx-1"
                  >
                    Terms of Service
                  </a>
                  and
                  <a
                    target="_blank"
                    href="/"
                    className="underline text-sm text-gray-600 hover:text-gray-900 mx-1"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </Label>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-end">
              <Link
                to="/login"
                className="underline text-sm text-gray-600 hover:text-gray-900"
              >
                Already have an account?
              </Link>

              <ButtonDefault
                className={classNames("ml-4", {
                  "opacity-25": isLoading,
                })}
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
