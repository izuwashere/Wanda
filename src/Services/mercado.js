import axios from './axios';
import authHeader from './auth_Header';

export const  ventaMercado = (item)=> axios.post("/allUser/create", item,{headers:authHeader()});  



