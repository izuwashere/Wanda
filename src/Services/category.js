import axios from './axios';

export const createCategory = (data) => axios.post("/allUser/create_category", data);
export const listCategory = () => axios.get("/allUser/list_category");
export const updateCategory = (id, data) => {return axios.put(`/allUser/update_category/${id}`, data);};
export const deleteCategory = async(id) => await axios.delete(`/allUser/detele_category/${id}`);

   