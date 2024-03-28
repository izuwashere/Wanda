import React, { useState, useEffect, useRef } from 'react';
import { createCategory, listCategory, updateCategory, deleteCategory} from '../../../Services/category';
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

const CategoryCrud = () => {
    const styles= useStyles();
    const [categories, setCategories] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [addedCategories, setAddedCategories] = useState([]);
    const [consoleSelect, setConsoleSelect] = useState({
        name: ''
    });
    const [idSelect, setIdSelect] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsoleSelect(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
   

    //Crear Categoria
    const handleAgregarCategoria = async () => {
        try {
            const res = await createCategory(consoleSelect);
            setAddedCategories(prevAddedCategories => [...prevAddedCategories, consoleSelect]);
            setConsoleSelect({ name: '' });
            openCloseModalInsert();
            fetchData();
            return res;
        } catch (error) {
            console.error('Error al agregar la categoría: ', error);
        }
    };

    const bodyInsert = (
        <div className={styles.modal}>
            <h3>Agregar nueva categoría</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre de Categoría" onChange={handleChange}/>
            <br />
            <div align="right">
                <Button color='primary' onClick={handleAgregarCategoria}>Insertar</Button>
                <Button onClick={() => openCloseModalInsert()}>Cancelar</Button>
            </div>
        </div>
    );

    //ListarCategoria 
    const fetchData = async () => {
        try {
            const response = await listCategory();
            setCategories(response.data);
        } catch (error) {
            console.log('Error al listar los Categoría:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    //Eliminar categoria
    const handleDeleteCategories = async (id) => {
        try {
            const res = await deleteCategory(id);
            fetchData();
            console.log(id)
            return res;
        } catch (error) {
            console.log('Error al eliminar la categoria:', error);
        }
    };
    
    //Editar Categoria
    const handleModify = async () => {
    try {
        await updateCategory(idSelect, consoleSelect);
        fetchData();
        openCloseModalEdit();
    } catch (error) {
            console.log(error);
    }
    };


    const selectconsole=(category, casee)=>{
        setConsoleSelect({
            ...category
        });
        setIdSelect(category.idCategory);
        casee === 'Edit' && setModalEdit(true)
    }
   
    const bodyEdit = (
        <div className={styles.modal}>
            <h3>Editar categoría</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre de Categoría" onChange={handleChange} value={consoleSelect && consoleSelect.name}/>
            <br />
            <div align="right">
                <Button color='primary' onClick={handleModify}>Editar</Button>
                <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
            </div>
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
                                <TableCell>ID CATEGORÍA</TableCell>
                                <TableCell>NOMBRE DE CATEGORÍA</TableCell>
                                <TableCell>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map(category => ( 
                                <TableRow key={category.idCategory}>
                                    <TableCell>{category.idCategory}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleDeleteCategories(category.idCategory)}><FontAwesomeIcon icon={faTrash}/></Button>
                                        <Button className={styles.iconos} onClick={() => selectconsole(category, 'Edit')}><FontAwesomeIcon icon={faPenToSquare}/></Button>
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

export default CategoryCrud;

