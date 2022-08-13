import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    localStorage.setItem("user", "test");
    navigate("/about");
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
