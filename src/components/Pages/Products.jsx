import React, { useEffect, useState } from "react";
import "../../Styles/Products.css";
import { listProduct } from "../../Services/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
import { ventaMercado } from "../../Services/mercado";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrderPDF from "../OrderPDF";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Estado para el carrito de compras
  const [total, setTotal] = useState(0); // Estado para el total a pagar
  const [showCart, setShowCart] = useState(false); // Estado para controlar la visibilidad del carrito
  const { isAuthen } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await listProduct();
        setProducts(response.data);
      } catch (error) {
        console.error("Error al listar productos", error);
      }
    }
    fetchProduct();
  }, []);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    // Calcular el nuevo total sumando el precio del producto agregado al total existente
    const newTotal = total + product.price;
    setTotal(newTotal);
    // Mostrar automáticamente el carrito al agregar un producto
    setShowCart(true);
  };

  // Función para cancelar la compra y restablecer el carrito
  const cancelPurchase = () => {
    setCart([]);
    setTotal(0);
    // Ocultar el carrito al cancelar la compra
    setShowCart(false);
  };

  const processPayment = async () => {
    try {
      if (cart.length > 0) {
            const itemsToPay = cart.map((item) => ({
              idProduct: item.idProduct,
              name: item.name,
              idCategory: item.category.idCategory,
              price: item.price,
              description: item.description
            }));
        const response = await ventaMercado(itemsToPay);
        window.location.href = response.data; // Redirecciona a la página de pago de Mercado Pago
      } else {
        console.error('Error: El carrito está vacío');
      }
    } catch (error) {
      console.error('Error procesando el pago:', error);
    }
    };

  const redirectToLogin = () => {
    navigate('/login');
  };


  return (
    <div className="ContainerProductsMajor">
      <div className="ContainerProduct">
        {products.map((product) => (
          <div className="card" key={product.idProduct}>
            <div className="photo">
              <img
                src={`data:image/jpeg;base64,${product.images}`}
                alt={product.name}
              />
            </div>
            <div className="description">
              <h2>{product.name}</h2>
              <h3>{product.category.name}</h3>
              <p>{product.description}.</p>
              <h1>${product.price}</h1>
              {/* Al hacer clic en el botón, se llama a la función addToCart con el producto como argumento */}
              {
                isAuthen ? (
                  <button onClick={() => addToCart(product)}>
                    Agregar al carrito
                  </button>
                ) : (
                  <button onClick={redirectToLogin}>
                    Iniciar sesión para comprar
                  </button>
                )
              }
            </div>
          </div>
        ))}
      </div>

      {/* Elemento de carrito */}
      {showCart && (
        <div className="cart">
          <h2>
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ color: "#27902e" }}
            />
          </h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <div>
                  <img
                    src={`data:image/jpeg;base64,${item.images}`}
                    alt={item.name}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>{item.name}</div>
                <div>${item.price}</div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          {/* Botón para cancelar la compra */}
          <Button
            variant="contained"
            color="secondary"
            onClick={cancelPurchase}
          >
            Cancelar
          </Button>
          {/* Botón para procesar el pago */}
          <Button variant="contained" color="primary" onClick={processPayment}>
            PAGAR CON MERCADO PAGO
          </Button>
          <PDFDownloadLink
            document={<OrderPDF cart={cart}/>}
            fileName="carrito.pdf"
          >
            {({ loading, url, error, blob }) =>
              loading ? (
                <button className="pdf-download bg-morado2">
                  Carrito ...
                </button>
              ) : (
                <button className="pdf-download bg-morado2">
                  MOSTRAR PRODUCTOS <br /> DE FACTURA PDF
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default Products