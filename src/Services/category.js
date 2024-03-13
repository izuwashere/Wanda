import axios from './axios';

export const createCategory = (data) => axios.post("/allUser/create_category", data);
export const listCategory = () => axios.get("/allUser/list_category");
export const updateCategory = (idCategory,data) => axios.put(`/allUser/updated_category/${idCategory}`,data);
export const deleteCategoryId = (id) => axios.delete(`/allUser/detele_category/${id}`);

   