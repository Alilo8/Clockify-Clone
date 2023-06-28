import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import { Navbar, Sidebar } from './components';
import { Settings, Tracker, Calendar, Dashboard, Projects, Project, Clients, Tags, Login, Signup } from'./pages';
import { useStateContext } from "./contexts/ContextProvider";

function App() {
  const { activeMenu } = useStateContext();
  let jsonObj = localStorage.getItem('access')
  let loggedIn;
  if(!jsonObj){
    jsonObj = JSON.stringify({loggedIn: false})
    localStorage.setItem('access',jsonObj);
    loggedIn = false;
  }
  else{
    loggedIn = JSON.parse(jsonObj)['loggedIn'];
  }
  
  return (
    <div className=" text-slate-600 overflow-visible">
      <BrowserRouter>
        <div className="absolute w-full h-screen -z-10 bg-bgColor"></div>
        {loggedIn && <><Navbar /><Sidebar/></>}
        <div className={ `relative z-0 bg-bgColor ${loggedIn ? 'mt-14 '+(activeMenu ? 'lg:ml-44 ' : 'lg:ml-16'): ''}`}>
        <Routes>
            {loggedIn ?              
            <Route path="/">
              <Route index element={<Tracker />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="project" element={<Project />} />
              <Route path="clients" element={<Clients />} />
              <Route path="tags" element={<Tags />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            :
            <Route path="/">
                <Route index element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
            }
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
