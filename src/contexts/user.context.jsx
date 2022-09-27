import { useEffect } from 'react';
import { createContext, useState } from 'react'

export const UserContext = createContext(
    {
    currentUser: null,
    setCurrentUser: () => null,
    }
);

export const UserProvider = ({children}) => {
    useEffect(() => {
        const sessionUser = JSON.parse(window.localStorage.getItem('session-user'))
        console.log(sessionUser)
        setCurrentUser(sessionUser)
    }, [])
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

