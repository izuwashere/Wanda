import React, { useState, useEffect } from "react";
import "../../Styles/Crud.css";
import { useProduct } from "../../Context/ProductContext";
import { useForm } from "react-hook-form";

const ProductCrud = () => {
  const [products, setProducts] = useState([]);
  const [productedit, setProductEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(undefined);
  const {register, handleSubmit, formState: { errors }, reset, } = useForm();
  const { _getProducts, _deleteProduct, _putProduct, _postProduct } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Crear producto
  const handleCreate = async (dataRest) => {
    console.log(dataRest.images);

    try {
      const formData = new FormData();
      formData.append("name", dataRest.name);
      formData.append("idCategory", dataRest.idCategory);
      formData.append("images", dataRest.images[0]);
      formData.append("price", dataRest.price);
      formData.append("description", dataRest.description);

      const res = await _postProduct(formData);
      console.log(res);
      setFormData({});
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // Listar productos
  const fetchData = async () => {
    try {
      const response = await _getProducts();
      setProducts(response.data);
    } catch (error) {
      console.log("Error al listar los productos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //Eliminar
  const handleDeleteProducts = async (productId) => {
    try {
      const res = await _deleteProduct(productId);
      setProducts(res.data);
    } catch (error) {
      console.log("error al eliminar el usuario:", error);
    }
  };

  // Actualizar
  const handleModify = (product) => {
    setProductEdit(product);
    setFormData({
      name: product.name,
      idCategory: product.category.name,
      images: product.images,
      description: product.description,
      price: product.price,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'images'){
      setFormData({...setFormData, images: files[0]});
    }else {
      setFormData({...formData,[name]: value})
    }
  };
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //     images: e.target.files[0],
      
  //   });
  // };
  // const handleUpdateFileChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     images: e.target.files[0], // Guarda el archivo seleccionado en el estado formData
  //   });
  // };
  
  const onSubmit = async () => {
    try {
      const idProduct = productedit.idProduct;
      const res = await _putProduct(idProduct, formData);
      fetchData();
      closeModal();
      window.location.reload();
    } catch (error) {
      console.log("Error al listar los productos:", error);
      // Manejo de errores: mostrar mensaje al usuario
    }
  };

  // Paginación
  const indexOfLastUser = currentPage * productsPerPage;
  const indexOfFirstUser = indexOfLastUser - productsPerPage;
  const currentProducts = products.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="containerUCMajor">
      <div className="TableCrud">
        <div className="containerUCSecondary">
        {/* formulario de crear producto */}
            <form onSubmit={handleSubmit(handleCreate)}>
                <input type="text" name="name" placeholder="Nombre del producto" {...register("name", { required: true })}/>
                <input type="text" name="idCategory" placeholder="Categoría del producto" {...register("idCategory", { required: true })} />
                <input type="file" name="images" {...register("images", { required: true })} />
                <input type="number" name="price" placeholder="Precios" {...register("price", {required: true})}/>
                <input type="text"name="description" placeholder="Descripción" {...register("description", {required: true})}/>
                <button type="submit">Crear Producto </button>
            </form>
            {/* Listar Productos */}
            <div className="title">
                <h2>LISTA DE PRODUCTOS</h2>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th><strong>ID</strong></th>
                            <th><strong>NOMBRE</strong></th>
                            <th><strong>CATEGORIA</strong></th>
                            <th><strong>IMAGEN</strong></th>
                            <th><strong>PRECIO</strong></th>
                            <th><strong>DESCRIPCIÓN</strong></th>
                            <th><strong>ACCIONES</strong></th>
                        </tr>
                    </thead>
                    <tbody>{currentProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.idProduct}</td>
                            <td>{product.name}</td>
                            <td>{product.category.name  }</td>
                            <td><img src={`data:image/jpeg;base64,${product.images}`}style={{ width: "100px" }}alt=""/></td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <button className="dele" onClick={() => handleDeleteProducts(product.idProduct)}>Eliminar</button>
                                <button className="upda" onClick={() => handleModify(product)}>Actualizar</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={nextPage} disabled={indexOfLastUser >= products.length}>Siguiente</button>
            </div>
        </div>
        {/* actualizar productos */}
        {showModal && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Formulario de Actualización</h2>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    <input type="text" name="category" value={formData.idCategory} onChange={handleChange} />
                    <input type="file" name='images' onChange={handleChange}  /> 
                    <input type="number" name="price" value={formData.price} onChange={handleChange} />
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                    <button onClick={onSubmit}>Aceptar</button>
                    <button onClick={closeModal}>Cerrar</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductCrud;

    {/* {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Formulario de Actualización</h2>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="category"
                value={data.idCategory}
                onChange={handleChange}
              />
              <input type="images" name='images' value={data.images} onChange={handleChange} /> 
              <input
                type="text"
                name="price"
                value={data.price}
                onChange={handleChange}
              />
              <input
                type="text"
                name="description"
                value={data.description}
                onChange={handleChange}
              />
              <button onClick={onSubmit}>Aceptar</button>
              <button onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        )} */}