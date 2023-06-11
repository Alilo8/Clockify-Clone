// import { useEffect } from 'react';
import React from 'react';
import { logo, menuIcon, help, notification } from '../assets';
// import { useStateContext } from '../contexts/ContextProvider.jsx';
import { useState } from 'react';
import { useStateContext  } from '../contexts/ContextProvider';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    // console.log(useStateContext)
    const { activeMenu, setActiveMenu } = useStateContext(false);
    function navigate(location){
        window.location.href = location;
    }
    const jsonObj = localStorage.getItem('access')
    let check = JSON.parse(jsonObj)['check'];
    
    function changeAccess(){
        const jsonObj = JSON.stringify({check: false})
        localStorage.setItem('access',jsonObj);
    }
    return (
        <nav className='sticky top-0 overflow-auto'>
            {check &&
            <div className='mx-20 my-5'>
                <div className='flex justify-between items-center text-sm'>
                    <div className='flex gap-8'>
                        <a href="/"><img src={logo} alt='Clockify'/></a>
                        <ul className="list-none hidden lg:flex flex-row gap-8 justify-start items-center">
                            <li className='hover:text-blue-400'><button type='button' onClick={() => navigate("/")}>FEATURES</button></li>
                            <li className='hover:text-blue-400'><button type='button' onClick={() => navigate("/")}>DOWNLOAD</button></li>
                        </ul>
                    </div>
                    <ul className='list-none hidden lg:flex flex-row gap-8 justify-end items-center'>
                            <li className='hover:text-blue-400'><a onClick={changeAccess} href="/tracker">LOG IN</a></li>
                            <li><button type='button' className='relative border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white p-3 '>SIGN UP FREE</button></li>
                    </ul>
                    <div className='flex lg:hidden'>
                            <button onClick={() => setMenuOpen(!menuOpen)} className='hover:bg-slate-200 rounded-md '><img src={menuIcon} alt="menu" /></button>
                    </div>
                </div>
                <div className='justify-center flex lg:hidden bg-slate-100 '>
                    {menuOpen && 
                        <ul className='list-none justify-center flex-col items-center text-center'>
                            <li className='m-5 hover:text-blue-400'><a href="">Features</a></li>
                            <li className='m-5 hover:text-blue-400'><a href="">Download</a></li>
                            <li className='m-5 hover:text-blue-400'><a href=''>Log In</a></li>
                            <li className='m-5'><button type='button' className='relative border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white p-3 '>SIGN UP FREE</button></li>
                        </ul>
                    }
                </div>
            </div>
            }
            {!check &&
                <div className="bg-white border-2 border-l-4 border-l-blue-400 flex justify-between items-center px-4 text-xs">
                    <div className="flex gap-10 items-center">
                        <ul className="flex gap-5 items-center">
                            <button onClick={() => setActiveMenu(!activeMenu)} className='hover:bg-slate-200 rounded-md'><img className="w-6" src={menuIcon} alt="menu" /></button>
                            <a className="w-24" href=""><img src={logo}/></a>
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
            }
        </nav>
    )
}

export default Navbar;