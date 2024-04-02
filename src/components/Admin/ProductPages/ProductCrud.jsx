// @ts-nocheck
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
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Listar productos
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
      fetchData();
    } catch (error) {
      console.log("Error al eliminar un producto");
    }
  };

  // Crear Producto
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
      setConsoleSelect({
        name: "",
        idCategory: "",
        images: "",
        description: "",
        price: "",
      });
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

  const handleModify = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("idCategory", data.idCategory);
      formData.append("description", data.description);
      formData.append("price", data.price);
      if(data.images.length > 0){
        formData.append("images", data.images[0]); // Agregar el archivo correctamente
      }
      const rest = await updateProduct(idSelect, formData);
      console.log(rest);
      fetchData();
      openCloseModalEdit();
    } catch (error) {
      console.log(error);
    }
  };

  const selectconsole=(product, casee)=>{
    setConsoleSelect(product);
    setIdSelect(product.idProduct);
    casee === 'Edit' && setModalEdit(true)
}

const bodyEdit = (
    <div className={styles.modal}>
          <form onSubmit={handleSubmit(handleModify)}>
      <h3>Editar Producto</h3>
      <TextField
        name="name"
        className={styles.inputMaterial}
        label="Nombre de Producto"
        {...register("name", { required: false })}
        defaultValue={consoleSelect && consoleSelect.name}
      />
      <br />
      <TextField
        name="idCategory"
        className={styles.inputMaterial}
        label="Id de la categoria"
        {...register("idCategory", { required: false })}
        defaultValue={consoleSelect && consoleSelect.idCategory}
      />
      <br />
      <br />
      <input
        type="file"
        name="images"
        className={styles.inputMaterial}
        {...register("images", { required: false })}

      />
      <br />
      <TextField
        name="description"
        className={styles.inputMaterial}
        label="description"
        {...register("description", { required: false })}
        defaultValue={consoleSelect && consoleSelect.description}
      />
      <br />
      <TextField
        name="price"
        className={styles.inputMaterial}
        label="Precio del producto"
        {...register("price", { required: false })}
        defaultValue={consoleSelect && consoleSelect.price}
      />
      <br />
      <div align="right">
        <Button color="primary" type="submit">
          Actualizar
        </Button>
        <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
      </div>
    </form>
  </div>
  );

  const openCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
    reset();
  };


  return (
    <div className="containerUCMajor">
      <div className="tables">
        <br />
        <Button onClick={openCloseModalInsert}>Insertar</Button>
        <TextField
          label="Buscar producto"
          value={searchTerm}
          onChange={handleChange}
        />
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
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => (
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
                        onClick={() =>handleDeleteProducts(product.idProduct)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      <Button
                        className={styles.iconos}
                        onClick={() => selectconsole(product, "Edit")}
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

        <Modal open={modalEdit} onClose={openCloseModalEdit}>
          {bodyEdit}
        </Modal>

      </div>
    </div>
  );
};

export default CategoryCrud;