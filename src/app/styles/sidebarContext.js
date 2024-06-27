import { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isCollapsedSideBar, setIsCollapsedSideBar] = useState(false);

    const toggleSidebarCollapseHandler = () => {
        setIsCollapsedSideBar((prev) => !prev);
    };

    return (
        <SidebarContext.Provider value={{ isCollapsedSideBar, toggleSidebarCollapseHandler }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    return useContext(SidebarContext);
};
