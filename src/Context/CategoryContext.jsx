import React, { createContext, useContext, useState } from "react";
import { createCategory, deleteCategoryId, listCategory, updateCategory } from "../Services/category";

export const CategoryContext = createContext();

export const useCategory = () => {
    const context = useContext(CategoryContext)
    if (!context)
        throw new Error("El CategoryContext deberia estar dentro de un AuthProvider")
    return context
}

export const CategoryProvider = ({ children }) => {
    const [categorys, setCategorys] = useState([]);

    const _getCategorys = async () => {
        try {
            const resCategorys = await listCategory();
            setCategorys(resCategorys.data);
            return resCategorys;
        } catch (error) {
            console.log(error);
        }
    }
    // const _getCategory = async (id) =>{
    //     try {
    //         const res = await listCategoryId(id)
    //         return res.data
    //     } catch (error) {

    //     }
    // }

    const _postCategory = async (data) => {
        try {
            const res = await createCategory(data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const _putCategory = async (idCategory,data) => {
        try {
            const res = await updateCategory(idCategory,data);
            await listCategory();
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const _deleteCategory = async (id) => {
        try {
            const res = await deleteCategoryId(id)
            if (res.status === 200)setCategorys(categorys.filter((category) => category.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CategoryContext.Provider value={{ _getCategorys, _postCategory, _putCategory, _deleteCategory, categorys }}>
            {children}
        </CategoryContext.Provider>
    )
}