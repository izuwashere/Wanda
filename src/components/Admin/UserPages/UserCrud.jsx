import React, { useState, useEffect } from 'react';
import { RegisterRequest, deleteUser, listUsers } from '../../../Services/user';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles'; 
import "../../../Styles/Crud.css";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        with: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos:{
        cursor:'pointer'
    },
    inputMaterial:{
        with:'100%'
    }
}));

const UserCrud = () => {
    const styles= useStyles();
    const [users, setUsers] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [useredit, setUserEdit] = useState(null);
    // const [consoleSelect, setConsoleSelect] = useState({
    //     name: '',
    //     username:'',
    //     addrres:'',

    // });



    // Listar los usuarios
    const fetchData = async () => {
        try {
            const response = await listUsers();
            setUsers(response.data);
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
            const res = await deleteUser(userId);
            fetchData();
        } catch (error) {
            console.log('Error al eliminar el usuario:', error);
        }
    };

    


    return (
        <div className="containerUCMajor">
            <div className="tables">
                <br />
                {/* <Button onClick={openCloseModalInsert}>Insertar</Button> */}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>NOMBRES</TableCell>
                                <TableCell>CORREO</TableCell>
                                <TableCell>TELEFONO</TableCell>
                                <TableCell>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map(user => ( 
                                <TableRow key={user.idUser}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        <Button onClick={() =>handleDeleteUser(user.idUser)}><FontAwesomeIcon icon={faTrash}/></Button>
                                        <Button className={styles.iconos} onClick={() => selectconsole(category, 'Edit')}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* <Modal
                open={modalInsert}
                onClose={openCloseModalInsert}>
                    {bodyInsert}
                </Modal>

                <Modal
                open={modalEdit}
                onClose={openCloseModalEdit}>
                    {bodyEdit}      
                </Modal> */}

            </div>
        </div>
    );
}

export default UserCrud;

