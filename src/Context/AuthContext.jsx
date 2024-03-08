// @ts-nocheck
import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("El useAuth deberia estar dentro de un AuthProvider")
    }
    return context;
}


export const AuthProvider = ({ children }) => {

    const [isAuthen, setIsAuthen] = useState(false);
    return (
        <AuthContext.Provider value={{ isAuthen, setIsAuthen }}>
            {children}
        </AuthContext.Provider>
    )
}