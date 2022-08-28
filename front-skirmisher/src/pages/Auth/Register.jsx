import { useEffect } from "react";
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

export default function Register() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    //Override data to add roles
    data.role = 1;
    console.log(data);
    dispatch(authRegister(data));
  }

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


  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <AuthenticationCard>
        <div className="text-center">
          <h2 className="text-3xl">Register</h2>
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
            <Label htmlFor="email">Email</Label>
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
            <label className="flex items-center">
              <Checkbox
                name="remember"
                // checked={form.data.remember === "on"}
                // onChange={(e) =>
                //   form.setData("remember", e.currentTarget.checked ? "on" : "")
                // }
              />
              <span className="ml-2 text-sm text-gray-600">I agree to Terms and Conditions</span>
            </label>
            <div className="flex items-center justify-end">
              <Link to='/login'
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
