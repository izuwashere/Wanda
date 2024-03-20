import React, { useState, useEffect } from "react";
import {
  createProduct,
  listProduct,
  updateProduct,
  deleteProduct,
} from "../../../Services/product";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import "../../../Styles/Crud.css";

import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    with: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    with: "100%",
  },
}));

const CategoryCrud = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const styles = useStyles();
  const [products, setProducts] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [consoleSelect, setConsoleSelect] = useState({
    name: "",
    idCategory: "",
    images: "",
    description: "",
    price: "",
  });
  const [idSelect, setIdSelect] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsoleSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Listar productos
  const fetchData = async () => {
    try {
      const response = await listProduct();
      setProducts(response.data);
    } catch (error) {
      console.log("Error al listar productos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Eliminar Producto
  const handleDeleteProducts = async (id) => {
    try {
      const res = await deleteProduct(id);
      return res;
    } catch (error) {
      console.log("Error al eliminar un producto");
    }
  };

  //Crear Producto
  const handleAgregarProduct = async (data) => {
    try {
      const formData = new FormData();

      formData.append("images", data.images[0]);
      formData.append("name", data.name);
      formData.append("idCategory", data.idCategory);
      formData.append("description", data.description);
      formData.append("price", data.price);

      const res = await createProduct(formData);
      setAddedProducts((prevAddedProducts) => [
        ...prevAddedProducts,
        consoleSelect,
      ]);
      setConsoleSelect({ name: "",
      idCategory: "",
      images: "",
      description: "",
      price: "", });
      openCloseModalInsert();
      fetchData();
      return res;
    } catch (error) {
      console.error("Error al agregar la categoría: ", error);
    }
  };
  const bodyInsert = (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit(handleAgregarProduct)}>
        <h3>Agregar nuevo producto</h3>
        <TextField
          name="name"
          className={styles.inputMaterial}
          label="Nombre de Producto"
          {...register("name", { required: true })}
        />
        <br />
        <TextField
          name="idCategory"
          className={styles.inputMaterial}
          label="Id de la categoria"
          {...register("idCategory", { required: true })}
        />
        <br />
        <br />
        <input
          type="file"
          name="images"
          className={styles.inputMaterial}
          {...register("images", { required: true })}
        />
        <br />
        <TextField
          name="description"
          className={styles.inputMaterial}
          label="description"
          {...register("description", { required: true })}
        />
        <br />
        <TextField
          name="price"
          className={styles.inputMaterial}
          label="Precio del producto"
          {...register("price", { required: true })}
        />
        <br />
        <div align="right">
          <Button color="primary" type="submit">
            Insertar
          </Button>
          <Button onClick={() => openCloseModalInsert()}>Cancelar</Button>
        </div>
      </form>
    </div>
  );

  //     useEffect(() => {
  //         fetchData();
  //     }, []);

  //     //Editar Categoria
  // const handleModify = async () => {
  //    try {
  //        await updateCategory(idSelect, consoleSelect);
  //        fetchData();
  //    } catch (error) {
  //         console.log(error);
  //    }
  // };

  // const selectconsole=(category, casee)=>{
  //     setConsoleSelect(category);
  //     setIdSelect(category.idCategory);
  //     casee === 'Edit' && setModalEdit(true)
  // }

  // const bodyEdit = (
  //     <div className={styles.modal}>
  //         <h3>Editar categoría</h3>
  //         <TextField name="name" className={styles.inputMaterial} label="Nombre de Categoría" onChange={handleChange} value={consoleSelect && consoleSelect.name}/>
  //         <br />
  //         <div align="right">
  //             <Button color='primary' onClick={handleModify}>Editar</Button>
  //             <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
  //         </div>
  //     </div>
  // );

  const openCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };

  // const openCloseModalEdit = () => {
  //     setModalEdit(!modalEdit);
  // };

  return (
    <div className="containerUCMajor">
      <div className="tables">
        <br />
        <Button onClick={openCloseModalInsert}>Insertar</Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID PRODUCT</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>ID CATEGORIA</TableCell>
                <TableCell>IMAGEN</TableCell>
                <TableCell>DESCRIPCION</TableCell>
                <TableCell>PRECIO</TableCell>
                <TableCell>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.idProduct}>
                  <TableCell>{product.idProduct}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>
                    <img
                      src={`data:image/jpeg;base64,${product.images}`}
                      style={{ width: "50px" }}
                      alt={product.name}
                    />
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteProducts(product.idProduct)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                      className={styles.iconos}
                      onClick={() => selectconsole(category, "Edit")}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={modalInsert} onClose={openCloseModalInsert}>
          {bodyInsert}
        </Modal>
        {/*
                <Modal
                open={modalEdit}
                onClose={openCloseModalEdit}>
                    {bodyEdit}      
                </Modal> */}
      </div>
    </div>
  );
};

export default CategoryCrud;

// import React, { useState, useEffect } from 'react';
// import { createProduct, deleteProduct, listProduct, updateProduct } from '../../../Services/product';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
// import NewProduct from './NewProduct'
// import "../../../Styles/Crud.css";
// import { createProduct } from './../../../Services/product';
// import Products from './../../Pages/Products';

// const ProductCrud = () => {
//     const [products, setProducts] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [productEdit, setProductEdit] = useState();
//     const [formData, setFormData] = useState(undefined);
//     const [agregarForm, setAgregarForm] = useState(false);

// //Listar productos
// const fetchData = async () => {
//     try{
//         const response = await listProduct();
//         setProducts(response.data);
//     } catch (error) {
//         console.log('Error al listar productos:', error);
//     }
// };

// useEffect(() => {
//     fetchData();
// }, []);

//     //Agregar Nuevo Producto
//     const handleAgregarProducto = async (data) => {
//         try {
//             const res = await createProduct(data);
//             setAgregarForm(false)
//             return res
//         } catch (error) {
//             console.log('Error al agregar un producto', error)
//         }
//     };

//     // Eliminar Producto
//     const handleDeleteProducts = async (id) => {
//         try {
//             const res = await deleteProduct(id);
//             return res
//         } catch (error) {
//             console.log('Error al eliminar un producto')
//         }
//     }

//     //Actualizar un producto
//     const handleModify = (product) => {
//         setProductEdit(product)
//         setFormData({
//             name: product.name,
//             description: product.description,
//             images: product.images,
//             idCategory: product.idCategory,
//             prices: product.prices
//         })
//         setShowModal(true)
//     }

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if(name === 'images'){
//           setFormData({ ...products, images: files[0] });
//         } else {
//           setFormData({...products, [name]: value});
//         }
//       };

//     const handleModifySubmit = async (product) => {
//         try{
//             const idProduct = productEdit.idProduct;
//             console.log(idProduct)
//             const res = await updateProduct(
//                 idProduct,
//                 formData
//             );
//             fetchData();
//             closeModal();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // Agregar
//     const agregar = () => {
//         if (agregarForm == false)
//             setAgregarForm(true);
//         else
//             setAgregarForm(false);
//     }

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     // Paginación
//     const [currentPage, setCurrentPage] = useState(1);
//     const productsPerPage = 4;
//     const indexOfLastUser = currentPage * productsPerPage;
//     const indexOfFirstUser = indexOfLastUser - productsPerPage;
//     const currentProducts = products.slice(indexOfFirstUser, indexOfLastUser);

//     const nextPage = () => {
//         setCurrentPage(currentPage + 1);
//     };

//     const prevPage = () => {
//         setCurrentPage(currentPage - 1);
//     };

//     return(
//         <div className="containerUCMajor">
//             <div className="TableCrud">
//             {showModal && (
//                     <div className="modal">
//                         <div className="modal-content">
//                             <h2>Formulario de Actualización</h2>
//                             <input type="text" name='name' value={formData.name} onChange={handleChange} />
//                             <input type="text" name='description' value={formData.description} onChange={handleChange} />
//                             <input type="file" name='images'  onChange={handleChange} />
//                             <input type="text" name='idCategory' value={formData.idCategory} onChange={handleChange} />
//                             <input type="number" name='prices' value={formData.prices} onChange={handleChange} />
//                             <button onClick={handleModifySubmit}>Aceptar</button>
//                             <button onClick={closeModal}>Cerrar</button>
//                         </div>
//                     </div>
//                 )}
//             {agregarForm && <NewProduct agregarForm={agregarForm} agregar={agregar} onAgregarProduct={handleAgregarProducto}></NewProduct>}
//             <button className='agregar' onClick={() => agregar()}>Agregar</button>
//                 <div className="containerUCSecondary">
//                     <div className="title">
//                         <h2>LISTA DE PRODUCTOS</h2>
//                     </div>
//                     <div className="table">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th><strong>ID</strong></th>
//                                     <th><strong>NOMBRE</strong></th>
//                                     <th><strong>DECRIPCIÓN</strong></th>
//                                     <th><strong>IMAGEN</strong></th>
//                                     <th><strong>CATEGORIA</strong></th>
//                                     <th><strong>PRECIO</strong></th>
//                                     <th><strong>ACCIONES</strong></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentProducts.map(product => (
//                                     <tr key={product.id}>
//                                         <td>{product.idProduct}</td>
//                                         <td>{product.name}</td>
//                                         <td>{product.description}</td>
//                                         <td>{product.category.name}</td>
//                                         <td><img src={`data:image/jpeg;base64,${product.images}`}style={{ width: "50px" }} alt="" /></td>
//                                         <td>{product.price}</td>
//                                         <td>
//                                             <button className='dele' onClick={() => handleDeleteProducts(product.idProduct)}><FontAwesomeIcon icon={faTrash} className='papelera' /></button>
//                                             <button className='upda' onClick={() => {handleModify(product)}}><FontAwesomeIcon icon={faPenToSquare} className='edit' /></button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     <div>
//                         <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
//                         <button onClick={nextPage} disabled={indexOfLastUser >= products.length}>Siguiente</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductCrud;
