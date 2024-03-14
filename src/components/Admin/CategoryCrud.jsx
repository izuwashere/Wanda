import React, { useState, useEffect } from 'react';
import { listCategory, deleteCategory} from '../../Services/category';
import "../../Styles/Crud.css";

const CategoryCrud = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 5;

    // Listar productos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listCategory();
                setCategories(response.data);
            } catch (error) {
                console.log('Error al listar los detalle:', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteCategories = async (categoriesId) => {
        try {
            await deleteCategory (categoriesId);
            const refreshProduct = categories.filter(categories => categories.idCategory !== categoriesId);
            setCategories(refreshProduct);
        } catch (error) {
            console.log('Error al eliminar el detalle:', error);
        }
    };

    // Paginación
    const indexOfLastUser = currentPage * categoriesPerPage;
    const indexOfFirstUser = indexOfLastUser - categoriesPerPage;
    const currentCategories= categories.slice(indexOfFirstUser, indexOfLastUser);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };


    return(
        <div className="containerUCMajor">
            <div className="TableCrud">
                <div className="containerUCSecondary">
                    <div className="title">
                        <h2>LISTA DE CATEGORIA</h2>
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th><strong>ID</strong></th>
                                    <th><strong>NAME</strong></th>
                                    <th><strong>PRODUCTO ID</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCategories.map(categories => (
                                    <tr key={categories.id}>
                                        <td>{categories.idCategory}</td>
                                        <td>{categories.name}</td>
                                        <td>{categories.productIdProduct}</td>
                                        <td>
                                            <button className='dele' onClick={() => handleDeleteCategories(categories.idCategory)}>Eliminar</button>
                                            <button className='upda' onClick={() => { }}>Actualizar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                        <button onClick={nextPage} disabled={indexOfLastUser >= currentCategories.length}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryCrud;
