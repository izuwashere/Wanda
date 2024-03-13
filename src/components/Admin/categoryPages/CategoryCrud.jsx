import React, { useState, useEffect } from 'react';
import { listCategory } from '../../../Services/category';
import { useCategory } from '../../../Context/CategoryContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../../../Styles/Crud.css";
import NewCategory from './components/NewCategory';

const CategoryCrud = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [categoryEdit, setCategoryEdit] = useState();
    const [formData, setFormData] = useState(undefined);
    const [agregarForm, setAgregarForm] = useState(false);
    const { _postCategory, _deleteCategory, _putCategory } = useCategory();

    //Listar categorias
    const fetchData = async () => {
        try {
            const response = await listCategory();
            setCategories(response.data);
        } catch (error) {
            console.log('Error al listar los detalle:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //Agregar nueva categoria
    const handleAgregarCategoria = async (data) => {
        try {
            const res = await _postCategory(data);
            setAgregarForm(false)
            fetchData();
            return res
        } catch (error) {
            console.error('Error al agregar la categoría: ', error)
        }
    };

    // Eliminar categoria
    const handleDeleteCategories = async (id) => {
        try {
            const res = await _deleteCategory(id);
            fetchData();
            return res
        } catch (error) {
            console.log('Error al eliminar la categoria:', error);
        }
    };

    //
    const handleModify = (category) => {
        setCategoryEdit(category)
        setFormData({
            name: category.name
        })
        setShowModal(true)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleModifySubmit = async (category) => {
        try {
            const idCategory = categoryEdit.idCategory;
            const res = await _putCategory(
                idCategory,
                formData
            );
            fetchData();
            closeModal();

        } catch (error) {
            console.log(error);
        }
    };

    //Agregar 
    const agregar = () => {
        if (agregarForm == false)
            setAgregarForm(true);
        else
            setAgregarForm(false)
    }

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div className="containerUCMajor">
            <div className="TableCrud">
                <div className="containerUCSecondary">
                    <div className="title">
                        <h2>LISTA DE CATEGORIA</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>Nombre</td>
                                <td>Acciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category.idCategory}>
                                    <td>{category.name}</td>
                                    <td className='acciones'>
                                        <button className='dele' onClick={() => handleDeleteCategories(category.idCategory)}><FontAwesomeIcon icon={faTrash} className='papelera' /></button>
                                        <button className='upda' onClick={() => handleModify(category)}><FontAwesomeIcon icon={faPenToSquare} className='edit' /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className='agregar' onClick={() => agregar()}>Agregar</button>
                </div>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Formulario de Actualización</h2>
                            <input type="text" name='name' value={formData.name} onChange={handleChange} />
                            <button onClick={handleModifySubmit}>Aceptar</button>
                            <button onClick={closeModal}>Cerrar</button>
                        </div>
                    </div>
                )}
                {agregarForm && <NewCategory agregarForm={agregarForm} agregar={agregar} onAgregarCategoria={handleAgregarCategoria}></NewCategory>}
            </div>
        </div>
    )
}

export default CategoryCrud;