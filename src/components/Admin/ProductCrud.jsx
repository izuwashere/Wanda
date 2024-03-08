import React, { useState, useEffect } from 'react';
import { listProduct, deleteProduct} from '../../Services/product';
import "../../Styles/Crud.css";

const ProductCrud = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    // Listar productos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listProduct();
                setProducts(response.data);
            } catch (error) {
                console.log('Error al listar los productos:', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteProducts = async (productId) => {
        try {
            await deleteProduct(productId);
            const refreshProduct = products.filter(product => product.idProduct !== productId);
            setProducts(refreshProduct);
        } catch (error) {
            console.log('Error al eliminar el producto:', error);
        }
    };

    // Paginación
    const indexOfLastUser = currentPage * productsPerPage;
    const indexOfFirstUser = indexOfLastUser - productsPerPage;
    const currentProducts = products.slice(indexOfFirstUser, indexOfLastUser);

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
                        <h2>LISTA DE PRODUCTOS</h2>
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th><strong>ID</strong></th>
                                    <th><strong>NOMBRE</strong></th>
                                    <th><strong>IMAGEN</strong></th>
                                    <th><strong>DESCRIPCIÓN</strong></th>
                                    <th><strong>PRECIO</strong></th>
                                    <th><strong>ACCIONES</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.idProduct}</td>
                                        <td>{product.name}</td>
                                        <td>{product.image}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <button className='dele' onClick={() => handleDeleteProducts(product.idProduct)}>Eliminar</button>
                                            <button className='upda' onClick={() => { }}>Actualizar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                        <button onClick={nextPage} disabled={indexOfLastUser >= products.length}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCrud;
