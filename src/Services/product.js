import axios from './axios';

export const createProduct = (data) => axios.post("/allUser/create_product", data);
export const listProduct = () => axios.get("/allUser/listproducts");
export const updateProduct = async (id,data) => {await axios.put(`/allUser/updated_product/${id}`, data);
}
export const deleteProduct = async(id) => axios.delete(`/allUser/product/${id}`);

   