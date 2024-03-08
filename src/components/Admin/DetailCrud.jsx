import React, { useState, useEffect } from 'react';
import { listDetail, deleteDetail} from '../../Services/detail';
import "../../Styles/Crud.css";

const DetailCrud = () => {
    const [details, setDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const detailsPerPage = 5;

    // Listar productos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listDetail();
                setDetails(response.data);
            } catch (error) {
                console.log('Error al listar los detalle:', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteDetail = async (detailId) => {
        try {
            await deleteDetail(detailId);
            const refreshProduct = details.filter(details => details.idDetail !== detailId);
            setDetails(refreshProduct);
        } catch (error) {
            console.log('Error al eliminar el detalle:', error);
        }
    };

    // Paginación
    const indexOfLastUser = currentPage * detailsPerPage;
    const indexOfFirstUser = indexOfLastUser - detailsPerPage;
    const currentDetails = details.slice(indexOfFirstUser, indexOfLastUser);

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
                        <h2>LISTA DE DETALLES</h2>
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th><strong>ID</strong></th>
                                    <th><strong>CANTIDAD</strong></th>
                                    <th><strong>PRODUCTO ID</strong></th>
                                    <th><strong>SALE ID</strong></th>
                                    <th><strong>ACCIONES</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentDetails.map(detail => (
                                    <tr key={detail.id}>
                                        <td>{detail.idDetail}</td>
                                        <td>{detail.amount}</td>
                                        <td>{detail.productIdProduct}</td>
                                        <td>{detail.saleIdSale}</td>
                                        <td>
                                            <button className='dele' onClick={() => handleDeleteDetail(detail.idDetail)}>Eliminar</button>
                                            <button className='upda' onClick={() => { }}>Actualizar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                        <button onClick={nextPage} disabled={indexOfLastUser >= details.length}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCrud;
