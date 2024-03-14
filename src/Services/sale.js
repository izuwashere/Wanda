import axios from './axios';

export const createSale = (data) => axios.post("/allSale//create_sale", data);
export const listSale = () => axios.get("/allSale/list_sales");
export const updateSale = (id, data) => axios.put(`/updated_sale/${id}`, data);
export const deleteSale = (id) => axios.delete(`/delete_sale/${id}`);

   