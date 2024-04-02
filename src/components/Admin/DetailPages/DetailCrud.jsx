import React, { useState, useEffect } from 'react';
import { listDetail, deleteDetail, createDetail, updateDetail} from '../../../Services/detail';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles'; 
import "../.././../Styles/Crud.css";

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


const DetailCrud = () => {
    const styles= useStyles();
    const [details, setDetails] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [addedDetails, setAddedDetails] = useState([]);
    const [consoleSelect, setConsoleSelect] = useState({
        amount: '', 
        idProduct:'',
        idSale:''
    });
    const [idSelect, setIdSelect] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsoleSelect(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //Crear Producto
    const handleAgregarDatail = async () => {
        try {
            const res = await createDetail(consoleSelect);
            setAddedDetails(prevAddedDetails => [...prevAddedDetails, consoleSelect]);
            setConsoleSelect({ amount: '', idProduct:'', idSale:'' });
            openCloseModalInsert(); 
            fetchData();
            return res;
        } catch (error) {
            console.error('Error al agregar la categoría: ', error);
        }
    };
    const bodyInsert = (
        <div className={styles.modal}>
            <h3>Agregar nuevo detalle</h3>
            <TextField name="amount" className={styles.inputMaterial} label="Cantidad" onChange={handleChange}/>
            <br />
            <TextField name="idProduct" className={styles.inputMaterial} label="Id Producto" onChange={handleChange}/>
            <br />
            <TextField name="idSale" className={styles.inputMaterial} label="Id Venta" onChange={handleChange}/>
            <div align="right">
                <Button color='primary' onClick={handleAgregarDatail}>Insertar</Button>
                <Button onClick={() => openCloseModalInsert()}>Cancelar</Button>
            </div>
        </div>
    );

    // Listar detalles
    const fetchData = async () => {
        try {
            const response = await listDetail();
            setDetails(response.data);
        } catch (error) {
            console.log('Error al listar los detalle:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    //Eliminar detalle
    const handleDeleteDetail = async (id) => {
        try {
            const res = await deleteDetail(id);
            window.location.reload();
            return res
        } catch (error) {
            console.log('Error al eliminar un producto')
        }
    }

    //Editar Categoria
    const handleModify = async () => {
        try {
            await updateDetail(idSelect, consoleSelect);
            fetchData();
            openCloseModalEdit();
        } catch (error) {
                console.log(error);
        }
        };
    
    const selectconsole=(detail, casee)=>{
        setConsoleSelect({
            ...detail,
            idProduct: detail.product.idProduct,
            idSale: detail.sale.idSale
        });
        setIdSelect(detail.idDetail);
        casee === 'Edit' && setModalEdit(true)
    }
    
    const bodyEdit = (
        <div className={styles.modal}>
            <h3>Editar detalle</h3>
            <TextField name="amount" className={styles.inputMaterial} label="Cantidad" onChange={handleChange} value={consoleSelect && consoleSelect.amount}/>
            <br />
            <TextField name="idProduct" className={styles.inputMaterial} label="Id producto" onChange={handleChange} value={consoleSelect && consoleSelect.idProduct}/>
            <br />
            <TextField name="idSale" className={styles.inputMaterial} label="Id venta" onChange={handleChange} value={consoleSelect && consoleSelect.idSale}/>
            <div align="right">
                <Button color='primary' onClick={handleModify}>Editar</Button>
                <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
            </div>
        </div>
    );

    //Modales
    const openCloseModalInsert = () => {
        setModalInsert(!modalInsert);
    };

    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit);
    };

    return(
    <div className="containerUCMajor">
        <div className="tables">
            <br />
            <Button onClick={openCloseModalInsert}>Insertar</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID DTEALLE</TableCell>
                            <TableCell>CANTIDAD</TableCell>
                            <TableCell>ID PRODUCT</TableCell>
                            <TableCell>ID VENTA</TableCell>
                            <TableCell>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {details?.map(detail => ( 
                            <TableRow key={detail.idDetail}>
                                <TableCell>{detail.idDetail}</TableCell>
                                <TableCell>{detail.amount}</TableCell>
                                <TableCell>{detail.product.idProduct}</TableCell>
                                <TableCell>{detail.sale.idSale}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDeleteDetail(detail.idDetail)}><FontAwesomeIcon icon={faTrash}/></Button>
                                    <Button className={styles.iconos} onClick={() => selectconsole(detail, 'Edit')}><FontAwesomeIcon icon={faPenToSquare}/></Button>
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
    )
}

export default DetailCrud;