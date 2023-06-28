import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { readManagerRequest } from "../api";

const login = () => {
  const [loginPressed, setLoginPressed] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading, data: manager, refetch} = useQuery(['manager', email, 'email'],
    readManagerRequest,
    {
      enabled: false
    }
  );
  useEffect(() => {
    if(loginPressed)
        if(manager !== undefined && password === manager.password){
          const jsonObj = JSON.stringify({
            loggedIn: true, 
            username: manager._id})
          console.log(jsonObj)
          localStorage.setItem('access',jsonObj);
          window.location.reload();
          }
  }, [loginPressed, manager])
  const handleLogin = () => {
      setLoginPressed(true)
      refetch()
  }

  return (
    <div className="flex justify-center items-center sm:h-screen">
      <div className="bg-white shadow-xl border border-primaryBorder h-fit">
        <h3 className="text-xl p-5">Login</h3>
        <hr />
          <form onSubmit={e => {
            e.preventDefault()
            handleLogin()
          }} className="flex flex-col gap-4 p-5">
              <input
                type="text"
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="w-80 hover:border-primaryBorder border focus:outline-primaryBorder p-2"
                required
              />
              <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-80 hover:border-primaryBorder border focus:outline-primaryBorder p-2"
                required
              />
            <div className="pass" style={{ margin: "auto 0 10px 5px", color: "#a6a6a6", cursor: "pointer", textAlign: "end"}}>
            <NavLink className="text-primary hover:cursor-pointer hover:underline" to = {"/reset"}>Forgot Password?</NavLink>
            </div>
            <div className="w-80 flex justify-center">
              <input type="submit" value="LOG IN" className="bg-primary py-3 px-32 text-white hover:bg-primaryHover hover:cursor-pointer"/>
            </div>
          </form>
          <div className="px-5 pb-5">
            Don't have an account? <NavLink className="text-primary hover:underline" to = {"/signup"}>Sign Up</NavLink>
          </div>
        </div>
    </div>
  );
}

export default login;
