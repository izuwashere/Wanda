import React, { createContext, useContext, useState } from 'react'
import { deleteProduct, listProduct, updateProduct, createProduct } from '../Services/product';

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

    const _postProduct = async (data) => {
        console.log("Desde context", data)
        try {
            const res = await createProduct(data);
            await _getProducts();
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
    

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
    //         const product = await createProduct(id);

    //         return product.data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const _putProduct = async (productId, data) => {
        try {
            const res = await updateProduct(productId, data);
            await listProduct();
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    const _deleteProduct = async (productId) => {
        try {
            const res = await deleteProduct(productId)
            await listProduct()
            if (res.status === 200) setProduct(products.filter((product) => product.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProductContext.Provider value={{ _getProducts, _putProduct, _deleteProduct, _postProduct, products }}>
            {children}
        </ProductContext.Provider>
    )
}