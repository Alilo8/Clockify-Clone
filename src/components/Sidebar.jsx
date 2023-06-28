import React from "react";
import { SidebarData, logout_icon } from "../assets";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
    const handleLogout = () => {
        const jsonObj = JSON.stringify({loggedIn: false})
        localStorage.setItem('access',jsonObj);
        window.location.reload();
    }
const {activeMenu, setActiveMenu} = useStateContext(false);
    return (
            <div>
                {activeMenu && <div className="w-full lg:hidden fixed h-full bg-black bg-opacity-50 z-10">&nbsp;</div>}
                <div className="h-full z-10 top-14 left-0 w-fit fixed bg-white border-r border-r-gray-300 border-l-4 border-l-blue-400 text-sm">
                    {activeMenu ? <div className="flex h-5/6 flex-col justify-between">
                            <div>
                                {SidebarData.map((item) => (
                                    <NavLink to={item.link} key={item.name} onClick={() => setActiveMenu(false)}>
                                        <div className="px-5 py-2 border-r border-r-white hover:bg-gray-200 flex gap-3 items-center ">
                                            <img className="my-1" src={item.icon} />
                                            <span className="mr-1.5">{item.name}</span>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                            <div onClick={handleLogout} className="px-5 py-2 border-r border-r-white hover:bg-gray-200 hover:cursor-pointer hidden lg:flex gap-3 items-center ">
                                <img className="my-1" src={logout_icon} />
                                <span className="mr-1.5">Logout</span>
                            </div>
                        </div>: 
                        <div className="flex h-5/6 flex-col justify-between">
                            <div>
                                {SidebarData.map((item) => (
                                    <NavLink to={item.link} key={item.name}>
                                        <div className="px-5 py-2 border-r border-r-white hover:bg-gray-200 hidden lg:flex gap-3 items-center ">
                                            <img className="my-1" src={item.icon} />
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                            <div onClick={handleLogout} className="px-5 py-2 border-r border-r-white hover:bg-gray-200 hover:cursor-pointer hidden lg:flex gap-3 items-center ">
                                <img className="my-1" src={logout_icon} />
                            </div>
                        </div>
                    }
                </div>
            </div>
    )
}

export default Sidebar;