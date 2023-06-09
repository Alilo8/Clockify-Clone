import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar } from './components';
import { FirstPage, Settings, Tracker, Calendar, Dashboard, Projects, Clients, Tags } from'./pages';
import { useStateContext } from "./contexts/ContextProvider";

function App() {
  const { activeMenu } = useStateContext();
  const jsonObj = localStorage.getItem('access')
  const check = JSON.parse(jsonObj)['check'];
  return (
    <div className=" text-slate-600">
      <BrowserRouter>
        <div className="relative z-0 bg-primary">
          <Navbar />
          <Sidebar />
          <div className={`${check ? "": (activeMenu ? 'lg:ml-44 ' : 'lg:ml-16')}`}>
            <Routes>
              <Route path="/" element={<FirstPage />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/settings" element={<Settings />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
