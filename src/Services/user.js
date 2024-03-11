import axios from './axios';


export const LoginRequest = (user) => axios.post("/allUser/login", user);
export const RegisterRequest = (user) => axios.post("/allUser/register", user);
export const listUsers = () => axios.get("/allUser/listusers");
export const updateUser = async (userId, data) => axios.put(`/allUser/updateduser/${userId}`, data);
export const deleteUser = (userId) => axios.delete(`/allUser/users/${userId}`);

   