import React, { useState, useEffect } from 'react';
import { listSale, deleteSale} from '../../Services/sale';
import "../../Styles/Crud.css";

const SaleCrud = () => {
    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const salesPerPage = 5;

    // Listar ventas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listSale();
                setSales(response.data);
            } catch (error) {
                console.log('Error al listar las ventas:', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteSale = async (Id) => {
        try {
            await deleteSale(Id);
            const refreshedSales = sales.filter(sale => sale.idSale !== Id);
            setSales(refreshedSales);
        } catch (error) {
            console.log('Error al eliminar la venta:', error);
        }
    };

    // Paginación
    const indexOfLastSale = currentPage * salesPerPage;
    const indexOfFirstSale = indexOfLastSale - salesPerPage;
    const currentSales = sales.slice(indexOfFirstSale, indexOfLastSale);

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
                        <h2>LISTA DE VENTAS</h2>
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th><strong>ID</strong></th>
                                    <th><strong>NOMBRE</strong></th>
                                    <th><strong>FECHA</strong></th>
                                    <th><strong>TOTAL</strong></th>
                                    <th><strong>ID DEL USUARIO</strong></th>
                                    <th><strong>ACCIONES</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSales.map(sale => (
                                    <tr key={sale.id}>
                                        <td>{sale.idSale}</td>
                                        <td>{sale.name}</td>
                                        <td>{sale.date}</td>
                                        <td>{sale.total}</td>
                                        <td>{sale.userIduser}</td>
                                        <td>
                                            <button className='dele' onClick={() => handleDeleteSale(sale.idSale)}>Eliminar</button>
                                            <button className='upda' onClick={() => { }}>Actualizar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                        <button onClick={nextPage} disabled={indexOfLastSale >= sales.length}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaleCrud;
