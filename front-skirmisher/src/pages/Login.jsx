import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { FaSignInAlt } from "react-icons/fa";
import Input from "../components/Input";
import Label from "../components/Label";
import classNames from "classnames";
import AuthenticationCard from "../components/AuthenticationCard";
import ButtonDefault from "../components/ButtonDefault";
import Checkbox from "../components/Checkbox";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // console.log(user, isLoading, isError, isSuccess, message);

  //Redirect to home if user is logged in

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <AuthenticationCard>
        <form onSubmit={onSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1 block w-full"
              onChange={onChange}
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
              onChange={onChange}
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
              <a
                href="/"
                className="underline text-sm text-gray-600 hover:text-gray-900"
              >
                Need an account?
              </a>

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
