import React, { useState, useEffect } from 'react';
import { listUsers, deleteUser} from '../../Services/user';
import "../../Styles/Crud.css";


const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;
    //Listar los usuarios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listUsers();
                setUsers(response.data);
            } catch (error) {
                console.log('Error al listar los usuarios:', error);
            }
        };
        fetchData();
    }, []);
    //eliminar los usuarios
    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            const updatedUser = users.filter(user => user.idUser !== userId)
            setUsers(updatedUser);
        } catch (error) {
            console.log('Error al eliminar el usuario:', error);
        }
    };
    //actualizar usuario
    


    // Calcula el índice del primer y último usuario de la página actual
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Cambia a la página siguiente
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Cambia a la página anterior
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    

    return (
        <div className="containerUCMajor">
            <div className="TableCrud">
                <div className="containerUCSecondary">
                    <div className="title">
                        <h2>LISTA DE USUARIOS</h2>
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRE</th>
                                    <th>TELEFONO</th>
                                    <th>CORREO</th>
                                    <th>DIRECCION</th>
                                    <th>CONTRASEÑA</th>
                                    <th>ROL</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.idUser}</td>
                                        <td>{user.name}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.username}</td>
                                        <td>{user.address}</td>
                                        <td>{user.password}</td>
                                        <td>{user.rol}</td>
                                        <td>
                                            <button className='dele' onClick={() => handleDeleteUser(user.idUser)}>Eliminar</button>
                                            <button className='upda' >Actualizar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                        <button onClick={nextPage} disabled={indexOfLastUser >= users.length}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCrud;