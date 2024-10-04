import { createContext, useContext } from 'react';

export const AuthContext = createContext({
    user: undefined,
    isLoading: false,
    fetchUser: () => {},
    setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
