// import { useEffect } from 'react';
import React from 'react';
import { menuIcon, help, notification } from '../assets';
// import { useStateContext } from '../contexts/ContextProvider.jsx';
import { useStateContext  } from '../contexts/ContextProvider';


const Navbar = () => {
    const { activeMenu, setActiveMenu } = useStateContext(false);
    return (
        <nav className='fixed w-full h-fit z-20 top-0'>            
            <div className="bg-white border-2 border-l-4 border-l-blue-400 flex justify-between items-center px-4 text-xs">
                <div className="flex gap-10 items-center">
                    <ul className="flex gap-5 items-center">
                        <button onClick={() => setActiveMenu(!activeMenu)} className='hover:bg-slate-200 rounded-md'><img className="w-6" src={menuIcon} alt="menu" /></button>
                    </ul>
                </div>
                <div className="flex gap-5 justify-end items-center">
                    <div className='hidden lg:inline'>Alo's workspace</div>
                        
                    <ul className="flex items-center">
                        <li className="border-dotted border-l-2 px-5 py-2 hidden lg:inline"><img className="py-2" src={help} alt="help" /></li>
                        <li className="border-dotted border-l-2 px-5 py-2"><img className="py-2" src={notification} alt="notification" /></li>
                        <li className="border-dotted border-l-2 px-5 py-2"><div className="bg-blue-600 rounded-3xl p-2 text-white">AL</div></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;