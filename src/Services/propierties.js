import authHeader from "./auth_Header";
import axios from "./axios";

export const RegisterRequest = (property) => axios.post("/allUser/register", property,{headers:authHeader()});
export const listUsers = () => axios.get("/allUser/listusers", {headers:authHeader()});
export const updatedUser = (property) => axios.put("/allUser/updatedUser", property, {headers:authHeader()});
export const deleteUser = (userId) => {
return axios.delete(`/allUser/deleteUser/${userId}`, { headers: authHeader() });
};