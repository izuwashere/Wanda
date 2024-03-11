import React, { createContext, useContext, useState } from 'react'
import { deleteProduct, listProduct, updateProduct } from '../Services/product';

export const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error("El ProductContext deberia estar dentro de un AuthProvider")
    }
    return context;
}

export const ProductProvider = ({ children }) => {
    const [products, setProduct] = useState([]);

    const _getProducts = async () => {
        try {
            const resProduct = await listProduct();
            setProduct(resProduct.data)
            return resProduct
        } catch (error) {
            console.log(error)
        }
    }

    // const _getProduct = async (id) =>{
    //     try {
    //         const product = await getProduct(id);

    //         return product.data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const _putProduct = async (product) => {
        try {
            const res = await updateProduct(product);
            await listProduct();
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    const _deleteProduct = async () => {
        try {
            const res = await deleteProduct()
            await listProduct()
            if (res.status === 200) setProduct(products.filter((product) => product.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProductContext.Provider value={{ _getProducts, _putProduct, _deleteProduct, products }}>
            {children}
        </ProductContext.Provider>
    )
}