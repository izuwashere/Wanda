import axios from './axios';

export const createProduct = (data) => axios.post("/allUser/create_product", data);
export const listProduct = () => axios.get("/allUser/listproducts");
export const updateProduct = (product) => axios.put("/allUser/updatedUser", product);
export const deleteProduct = (id) => axios.delete(`/allUser/product/${id}`);

   