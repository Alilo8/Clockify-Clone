import React, { createContext, useContext, useState } from 'react';

export const StateContext = createContext();
export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [activeSidebar, setActiveSidebar] = useState(false);
    const [openProjectWindow, setOpenProjectWindow] = useState(false);

    return (
        <section>
        <StateContext.Provider value={{
            activeMenu,
            setActiveMenu,
            activeSidebar,
            setActiveSidebar,
            openProjectWindow,
            setOpenProjectWindow,
            }}> 
            {children}
        </StateContext.Provider>      
        </section>  
    )
}

export const useStateContext = () => useContext(StateContext);