import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { createManagerRequest } from "../api";
import { useMutation, useQueryClient } from "react-query";

const signup = () => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleLogin = () => {
    const jsonObj = JSON.stringify({loggedIn: true, username: username})
    localStorage.setItem('access',jsonObj);
  }

  const queryClient = useQueryClient();
  const { mutate: createManager } = useMutation(
    (newManager) => createManagerRequest(newManager), {
      onSettled: () => {
        queryClient.invalidateQueries('manager');
      }
    }
  );
  return (
    <div className="flex justify-center items-center sm:h-screen">
      <div className="bg-white shadow-xl border border-primaryBorder">
        <h3 className="text-xl px-10 py-5">Sign up</h3>
        <hr />
        <form onSubmit={(e) => {
              e.preventDefault();
              if(password === confirmPassword){
                createManager({_id:username, name:firstname+' '+lastname, email, password});
                handleLogin();
                window.location.replace('/');
              }
            }} className="px-10 py-5 flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              onChange={e => setFirstname(e.target.value)}
              type="text"
              placeholder="First Name"
              className="w-[156px] hover:border-primaryBorder border focus:outline-primaryBorder p-2"
              required
            />
            <input
              onChange={e => setLastname(e.target.value)}
              type="text"
              className="w-[156px] hover:border-primaryBorder border focus:outline-primaryBorder p-2"
              placeholder="Last Name"
            />
          </div>
          <input
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-80 hover:border-primaryBorder border focus:outline-primaryBorder p-2"
            required
          />
          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-80 hover:border-primaryBorder border focus:outline-primaryBorder p-2"
            required
          />
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-80 hover:border-primaryBorder border focus:outline-primaryBorder p-2"
            required
          />
          <input
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="w-80 hover:border-primaryBorder border focus:outline-primaryBorder p-2"
            required
          />
          <div className="w-80 flex justify-center">
            <input type="submit" value="SIGN UP" className="bg-primary py-3 px-5 text-white hover:bg-primaryHover hover:cursor-pointer"/>
          </div>
        </form>
        <div className="px-10 pb-5">
          Already have an account? <NavLink className="text-primary" to = {"/"}>Login</NavLink>
        </div>
      </div>
    </div>
  );
}

export default signup;
