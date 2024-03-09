import React, { useState, useEffect } from 'react';
import "../../../Styles/Crud.css";
import { useUser } from '../../../Context/UserContext';

const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const [useredit, setUserEdit] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(undefined);
    const { _getUsers, _deleteUser, _putUser } = useUser()

    // Listar los usuarios
    const fetchData = async () => {
        try {
            const res = await _getUsers();
            setUsers(res.data);
        } catch (error) {
            console.log('Error al listar los usuarios:', error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);

    // Eliminar los usuarios
    const handleDeleteUser = async (userId) => {
        try {
            const res = await _deleteUser(userId);
            setUsers(res.data);
        } catch (error) {
            console.log('Error al eliminar el usuario:', error);
        }
    };

    // Actualizar
    const handleModify = (user) => {
        setUserEdit(user);
        setFormData({
            name: user.name,
            phone: user.phone,
            username: user.username,
            address: user.address
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async () => {
        try {
            console.log(useredit.idUser, formData);
            const idUser = useredit.idUser
            const res = await _putUser(
                idUser,
                formData
            );
            fetchData();
            closeModal();
        } catch (error) {
            console.log(error);
            // Manejo de errores: mostrar mensaje al usuario
        }
    };
    if (formData !== undefined)
        console.log(formData)
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
                                    <th>TELEFONO</th>
                                    <th>CORREO</th>
                                    <th>DIRECCION</th>
                                    <th>ROL</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map(user => (
                                    <tr key={user.idUser}>
                                        <td>{user.name}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.username}</td>
                                        <td>{user.address}</td>
                                        <td>{user.rol}</td>
                                        <td>
                                            <button className='dele' onClick={() => handleDeleteUser(user.idUser)}>Eliminar</button>
                                            <button className='upda' onClick={() => handleModify(user)}>Actualizar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                    </div>
                </div>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Formulario de Actualización</h2>
                            <input type="text" name='name' value={formData.name} onChange={handleChange} />
                            <input type="text" name='phone' value={formData.phone} onChange={handleChange} />
                            <input type="text" name='username' value={formData.username} onChange={handleChange} />
                            <input type="text" name='address' value={formData.address} onChange={handleChange} />
                            <button onClick={onSubmit}>Aceptar</button>
                            <button onClick={closeModal}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserCrud;
