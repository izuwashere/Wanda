import React, { createContext, useContext, useState } from 'react'
import { deleteUser, listUsers, updateUser } from '../Services/user';

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("El ProductContext deberia estar dentro de un AuthProvider")
    }
    return context;
}

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const _getUsers = async () => {
        try {
            const resProduct = await listUsers();
            setUsers(resProduct.data)
            return resProduct
        } catch (error) {
            console.log(error)
        }
    }

    // para cuando se solucione problema de tokens

    // const _postUser = async (user) => {
    //     try {
    //         const res = await RegisterRequest(user);
    //         await _getUsers();
    //         return res.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const _putUser = async (userId, data) => {
        try {
            const res = await updateUser(userId, data);
            await listUsers();
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    const _deleteUser = async (id) => {
        try {
            const res = await deleteUser(id)
            await listUsers()
            if (res.status === 200) setUsers(users.filter((user) => user.id !== id))
        } catch (error) {
            console.log(error)
        }
    }   

    return (
        <UserContext.Provider value={{ _getUsers ,_putUser, _deleteUser, users }}>
            {children}  
        </UserContext.Provider>
    )
}