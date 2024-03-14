import axios from './axios';

export const createProduct = (data) => axios.post("/allUser/create_product", data);
export const listProduct = () => axios.get("/allUser/listproducts");
export const updateProduct = async (productId, data) => axios.put(`/allUser/updatedUser/${productId}`, data);
export const deleteProduct = (productId) => axios.delete(`/allUser/product/${productId}`);

   