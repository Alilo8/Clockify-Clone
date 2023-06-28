import React, { createContext, useContext, useState } from 'react';

export const StateContext = createContext();
export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [openProjectWindow, setOpenProjectWindow] = useState(false);
    const [managerID, setManagerID] = useState('');
    return (
        <section>
        <StateContext.Provider value={{
            activeMenu,
            setActiveMenu,
            openProjectWindow,
            setOpenProjectWindow,
            managerID,
            setManagerID
            }}> 
            {children}
        </StateContext.Provider>      
        </section>  
    )
}

export const useStateContext = () => useContext(StateContext);