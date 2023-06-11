import React from "react";
import { SidebarData } from "../assets";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
const {activeMenu} = useStateContext(false);
    const jsonObj = localStorage.getItem('access')
    let check = JSON.parse(jsonObj)['check'];
    return (
        <div>
            {!check &&
                <div className="h-full top-15 left-0 w-fit hidden lg:inline fixed  bg-white border-r border-r-gray-300 border-l-4 border-l-blue-400 text-sm">
                    {SidebarData.map((item) => (
                        <NavLink to={item.link} key={item.name}>
                            <div className="px-5 py-2 border-r border-r-white  hover:bg-gray-200 flex gap-3 items-center ">
                                <img className="my-1" src={item.icon} />
                                {activeMenu && <span className="mr-1.5">{item.name}</span>}
                            </div>
                        </NavLink>
                    ))}
            </div>
                
                    
            }
        </div>
    )
}

export default Sidebar;