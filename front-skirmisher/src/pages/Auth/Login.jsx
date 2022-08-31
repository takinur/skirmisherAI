import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../features/auth/authSlice";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Label from "../../components/Label";
import classNames from "classnames";
import AuthenticationCard from "../../components/AuthenticationCard";
import ButtonDefault from "../../components/ButtonDefault";
import Checkbox from "../../components/Checkbox";

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    dispatch(login(data));
  }

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //Redirect authenticated user to Dashboard
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

  }, [user, isError, isSuccess, message, navigate]);


  return (
    <>
      <AuthenticationCard>
      <div className="text-center">
          <h2 className="text-3xl">Login </h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1 block w-full"
              {...register('email')}
              required
              autoFocus
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
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <div className="flex items-center justify-end">
              <Link to='/register' className="underline text-sm text-gray-600 hover:text-gray-900"
              >
                Need an account?
              </Link>

              <ButtonDefault
                className={classNames("ml-4", { "opacity-25": isLoading })}
                disabled={isLoading}
              >
                Log in
              </ButtonDefault>
            </div>
          </div>
        </form>
      </AuthenticationCard>
    </>
  );
}
