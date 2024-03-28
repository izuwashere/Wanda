import axios from './axios';

export const createSale = (data) => axios.post("/allUser/create_sale", data);
export const listSale = () => axios.get("/allUser/list_sales");
export const updateSale = (id, data) => axios.put(`/allUser/updated_sale/${id}`, data);
export const deleteSale = async(id) => axios.delete(`/allUser/delete_sale/${id}`);

   