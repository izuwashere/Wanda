import axios from './axios';

export const createDetail = (data) => axios.post("/allUser/create_detail", data);
export const listDetail = () => axios.get("/allUser/listdetails");
export const updateDetail = async (id,data) => { await axios.put(`allUser/updated_detail/${id}`, data);};
export const deleteDetail = async (id) => axios.delete(`/allUser/details/${id}`);
   