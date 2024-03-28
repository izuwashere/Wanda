import React, { useState, useEffect, useRef } from 'react';
import { createSale, listSale, updateSale, deleteSale } from '../../../Services/sale';
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

const SaleCrud = () => {
    const styles= useStyles();
    const [sales, setSales] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [addedSales, setAddedSales] = useState([]);
    const [consoleSelect, setConsoleSelect] = useState({
        name: '',
        total:'',
        date:'',
        idUser:''
    });
    const [idSelect, setIdSelect] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsoleSelect(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
   

    //Crear Venta
    const handleAgregarSales = async () => {
        try {
            const res = await createSale(consoleSelect);
            setAddedSales(prevAddedSales => [...prevAddedSales, consoleSelect]);
            setConsoleSelect({ name: '',total:'',date:'',idUser:'' });
            openCloseModalInsert();
            fetchData();
            return res;
        } catch (error) {
            console.error('Error al agregar la venta: ', error);
        }
    };

    const bodyInsert = (
        <div className={styles.modal}>
            <h3>Agregar nueva venta</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre  de la venta" onChange={handleChange}/>
            <br />
            <TextField name="total" className={styles.inputMaterial} label="Total de la venta" onChange={handleChange}/>
            <br />
            <TextField name="date" className={styles.inputMaterial} label="Fecha de venta" onChange={handleChange}/>
            <br />
            <TextField name="idUser" className={styles.inputMaterial} label="Id usuario" onChange={handleChange}/>
            <br />
            <div align="right">
                <Button color='primary' onClick={handleAgregarSales}>Agregar</Button>
                <Button onClick={() => openCloseModalInsert()}>Cancelar</Button>
            </div>
        </div>
    );

    //ListarCategoria 
    const fetchData = async () => {
        try {
            const response = await listSale();
            setSales(response.data);
        } catch (error) {
            console.log('Error al listar los ventas:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    //Eliminar categoria
    const handleDeleteSales = async (id) => {
        try {
            const res = await deleteSale(id);
            fetchData();
            return res;
        } catch (error) {
            console.log('Error al eliminar la Venta:', error);
        }
    };
    
    //Editar Categoria
    const handleModify = async () => {
    try {
        await updateSale(idSelect, consoleSelect);
        fetchData();
        openCloseModalEdit();
    } catch (error) {
            console.log(error);
    }
    };


    const selectconsole=(sale, casee)=>{
        setConsoleSelect({
            ...sale,
            idUser: sale.user.idUser
        });
        setIdSelect(sale.idSale);
        casee === 'Edit' && setModalEdit(true)
    }
   
    const bodyEdit = (
        <div className={styles.modal}>
            <h3>Editar categoría</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre de la venta" onChange={handleChange} value={consoleSelect && consoleSelect.name}/>
            <br/>
            <TextField name="date" className={styles.inputMaterial} label="Fecha de venta" onChange={handleChange} value={consoleSelect && consoleSelect.date}/>
            <br/>
            <TextField name="total" className={styles.inputMaterial} label="Total" onChange={handleChange} value={consoleSelect && consoleSelect.total}/>
            <br />
            <TextField name="total" className={styles.inputMaterial} label="Id del usuario" onChange={handleChange} value={consoleSelect && consoleSelect.idUser}/>
            <br />
                <Button color='primary' onClick={handleModify}>Editar</Button>
                <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
            </div>
    );

    //modales
    const openCloseModalInsert = () => {
        setModalInsert(!modalInsert);
    };

    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit);
    };

    return (
        <div className="containerUCMajor">
            <div className="tables">
                <br />
                <Button onClick={openCloseModalInsert}>Insertar</Button>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID VENTA</TableCell>
                                <TableCell>NOMBRE</TableCell>
                                <TableCell>TOTAL</TableCell>
                                <TableCell>FECHA</TableCell>
                                <TableCell>ID USUARIO</TableCell>
                                <TableCell>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sales.map(sale => ( 
                                <TableRow key={sale.idSale}>
                                    <TableCell>{sale.idSale}</TableCell>
                                    <TableCell>{sale.name}</TableCell>
                                    <TableCell>{sale.total}</TableCell>
                                    <TableCell>{sale.date}</TableCell>
                                    <TableCell>{sale.user?.idUser}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleDeleteSales(sale.idSale)}><FontAwesomeIcon icon={faTrash}/></Button>
                                        <Button className={styles.iconos} onClick={() => selectconsole(sale, 'Edit')}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                open={modalInsert}
                onClose={openCloseModalInsert}>
                    {bodyInsert}
                </Modal>

                <Modal
                open={modalEdit}
                onClose={openCloseModalEdit}>
                    {bodyEdit}      
                </Modal>

            </div>
        </div>
    );
};

export default SaleCrud;
