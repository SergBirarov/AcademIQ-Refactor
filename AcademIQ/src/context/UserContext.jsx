import { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const login = (userData) => {
        
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    )

}

export function useUser() {
    return useContext(UserContext);
}