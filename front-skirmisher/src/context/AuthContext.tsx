import React, { createContext, useState, useEffect } from "react";
// import { IAuthContext, Iuser } from "../types";

interface IAuth {
  loggedIn: boolean;
  role: string;
  logIn: () => void;
  logOut: () => void;
}

interface IProviderProps {
  children: React.ReactNode;
}

// export const AuthContext = createContext<IUser | null>(null);
export const AuthContext = createContext<IAuth>(null);

 export const AuthContextProvider = ({ children }: IProviderProps) => {
  const [auth, setAuth] = useState({
    loggedIn: false,
    role: "",
  });

  // const [user, setUser] = useState<Iuser | null>();
  const [authTokens, setAuthTokens] = useState<string | null>(null);
  const logIn = (e) => {
    e.preventDefault();
    console.log("logged in");

    setAuth((prevState) => ({
      ...prevState,

      loggedIn: true,
    }));
  };

  const logOut = () => {
    setAuth((prevState) => ({
      ...prevState,
      loggedIn: false,
    }));
  };
  // const loginUser = async (user: Iuser) => {
  //   // e.preventDefault();
  //   console.log("forme");

  //   // // let response = await fetch("http://localhost:8000/api/auth/login", {
  //   // let response = await fetch("http://localhost:8000/api/token/", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     'content-type': 'application/json'
  //   //   },
  //   //   body: JSON.stringify({'username': null, 'password': null})
  //   // });
  // };

  // const contextData = {
  //   loginUser: loginUser,
  //   username: 'nothin',
  //   password: 'nothin',
  // }

  return (
    <AuthContext.Provider value={{ ...auth, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// interface IThemeContext {
//     dark: boolean;
//     toggleTheme?: () => void;
// }

// const defaultState = {
//     dark: false,
// }
// export const ThemeContext = createContext <IThemeContext | null>(null);

// export const ThemeProvid
