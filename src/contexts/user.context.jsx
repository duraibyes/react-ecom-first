import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, authSignOut } from '../utils/firebase/firebase.utils';

export const userContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    // authSignOut();
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log( user );
        });
        
        return unsubscribe;
    }, []);

    return <userContext.Provider value={value}>{children}</userContext.Provider>
};
