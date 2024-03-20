import authHeader from './auth_Header';
import axios from './axios';


export const LoginRequest = (user) => axios.post("/allUser/login", user);
export const verityTokenRequest = () => axios.get("/allUser/verify", {headers:authHeader()});
export const RegisterRequest = (user) => axios.post("/allUser/register", user);
export const listUsers = () => axios.get("/allUser/listusers");
export const updateUser = (userId, data) =>  axios.put(`/allUser/updateduser/${userId}`, data);
export const deleteUser = async(userId) => axios.delete(`/allUser/users/${userId}`);

   