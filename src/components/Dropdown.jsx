import React, { useState} from "react";
import { dropdownIcon } from "../assets";

const Dropdown = ({items, setItem, defaultItem, title}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div onBlur={() => setTimeout(() => setIsOpen(false),180)}  className='bg-white divide-y divide-gray-100 flex-col w-full relative'>
            <button className='flex justify-between py-5 px-3 items-center' onClick={() => setIsOpen(!isOpen)}>
                    {title}:&nbsp; <span className="text-primary">{defaultItem}</span> <img src={dropdownIcon}/> 
            </button>
            {isOpen &&
                <div className='absolute bg-white shadow-xl overflow-hidden border border-primary w-44 z-50'>
                    <button className='w-full flex hover:bg-bgColor p-1 px-3' onClick={() => {setIsOpen(false); setItem('All');}}>
                        All
                    </button>
                    {
                        !items ? <div>Loading...</div> :
                        items.map((item) => (
                            <button key={item._id} className='w-full flex hover:bg-bgColor p-1 px-3' onClick={() => {setIsOpen(false); setItem(item._id);}}>
                                {item._id}
                            </button>
                            )
                        )
                    }
                </div>
            }
        </div>
    )
}

export default Dropdown;