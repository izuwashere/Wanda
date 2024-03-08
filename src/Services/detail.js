import axios from './axios';

export const createDetail = (data) => axios.post("/allUser/create_detail", data);
export const listDetail = () => axios.get("/allUser/listdetails");
export const updateDetail = (id) => axios.put(`/updated_detail/${id}`);
export const deleteDetail = (id) => axios.delete(`/allUser/details/${id}`);
   