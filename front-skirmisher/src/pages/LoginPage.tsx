import React from 'react'

export const LoginPage = () => {
  return (
    <div>
        <h1>Login Page</h1>
        <form>
           <input type="text" name="username" id="username" placeholder='Enter username' />
            <input type="password" name="password" id="password" placeholder='Enter password' />
            <button type="submit">Login</button>
        </form>

    </div>
  )
}
