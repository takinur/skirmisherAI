import React, { createContext, useState, useEffect } from "react";
import { IAuthContext, Iuser } from "../types";

type AuthContextProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<Iuser | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  return <AuthContext.Provider value={{ 'id' : 1,  'name' : 'dead' }}> {children}</AuthContext.Provider>;
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
