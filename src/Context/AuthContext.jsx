
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { verityTokenRequest } from '../Services/user';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("El useAuth debería estar dentro de un AuthProvider");
    }
    return context;
}

// Función para remover el token de autenticación de las cookies


export const AuthProvider = ({ children }) => {
    const [isAuthen, setIsAuthen] = useState(false);
    const [user, setUser] = useState(false);

    const removeAuthToken = async() => {
        Cookies.remove('token');
        setIsAuthen(false);
        return;
      };

    useEffect(() => {
        async function checkLogin() {
            const token = Cookies.get('token');
            if (!token) {
                setIsAuthen(false);
                return;
            }
            try {
                const res = await verityTokenRequest();
                console.log(res);
                if (res.status !== 200) {
                    setIsAuthen(false);
                    return;
                }
                setIsAuthen(true);
                setUser(res.data?.user);
            } catch (error) {
                console.log(error);
                setIsAuthen(false);
                return;
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthen, setIsAuthen, user, setUser, removeAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
}


// // @ts-nocheck
// import React, { createContext, useContext, useState } from 'react'

// export const AuthContext = createContext();

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     if (!context) {
//         throw new Error("El useAuth deberia estar dentro de un AuthProvider")
//     }
//     return context;
// }

// export const AuthProvider = ({ children }) => {

//     const [isAuthen, setIsAuthen] = useState(false);
//     const [user, setUser] = useState(false);

//     useEffect(() => {
//         async function checkLogin() {
//             const cookies = Cookies.get()
//             if (!cookies.token) {
//                 setIsAuthen(false);
//                 return;

//             }
//             try {
//                 const res = await verityTokenRequest()
//                  console.log(res);
//                 if (res.status !== 200) {
//                     setIsAuthen(false);
//                     return;
//                 }
//                 setIsAuthen(true);
//                 setUser(res.data?.user);
//             } catch (error) {
//                 console.log(error)
//                 setIsAuthen(false);
//                 return;

//             }
//         }

//         checkLogin();
//     }, []);}

// export const AuthProvider = ({ children }) => {

//     const [isAuthen, setIsAuthen] = useState(false);
//     return (
//         <AuthContext.Provider value={{ isAuthen, setIsAuthen }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }