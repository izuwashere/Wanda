import axios from './axios';

export const createCategory = (data) => axios.post("/allUser/create_category", data);
export const listCategory = () => axios.get("/allUser/list_category");
export const updateCategory = () => axios.put(`/updated_category/${id}`);
export const deleteCategory = (id) => axios.delete(`detele_category/${id}`);

   