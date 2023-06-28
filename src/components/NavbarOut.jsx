import React, { useState } from 'react'
import { menuIcon } from '../assets';

const NavbarOut = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className='sticky z-10 top-0 overflow-auto'>
            <div className='mx-20 my-5'>
                <div className='flex justify-between items-center text-sm'>
                    <div className='flex gap-8'>
                        <ul className="list-none hidden lg:flex flex-row gap-8 justify-start items-center">
                            <li className='hover:text-blue-400'><button type='button' onClick={() => {}}>FEATURES</button></li>
                            <li className='hover:text-blue-400'><button type='button' onClick={() => {}}>DOWNLOAD</button></li>
                        </ul>
                    </div>
                    <ul className='list-none hidden lg:flex flex-row gap-8 justify-end items-center'>
                            <li className='hover:text-blue-400'><a onClick={() => {}} href="/tracker">LOG IN</a></li>
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
        </nav>
    )
}

export default NavbarOut