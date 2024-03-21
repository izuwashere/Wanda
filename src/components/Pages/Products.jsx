import React, { useEffect, useState } from "react";
import "../../Styles/Products.css";
import { listProduct } from "../../Services/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
import { ventaMercado } from "../../Services/mercado";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPDF from "../OrderPDF";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Estado para el carrito de compras
  const [total, setTotal] = useState(0); // Estado para el total a pagar
  const [showCart, setShowCart] = useState(false); // Estado para controlar la visibilidad del carrito

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

  // // Función para procesar el pago con MercadoPago
  // const processPayment = () => {
  //   // Crear un nuevo array con la información necesaria para MercadoPago (nombre y precio)
  //   const itemsToPay = cart.map((item) => ({
  //     idProduct: item.idProduct,
  //     name: item.name,
  //     idCategory: item.category.idCategory,
  //     price: item.price,
  //     description: item.description
  //   }));

  //   console.log(itemsToPay);
  // };
  const processPayment = async () => {
    try {
      if (cart.length > 0) {
        const itemsToPay = cart.map((item) => ({
          idProduct: item.idProduct,
          name: item.name,
          idCategory: item.category.idCategory,
          price: item.price,
          description: item.description,
        }));
        const response = await ventaMercado(itemsToPay);
        window.location.href = response.data;
      } else {
        console.error("Error: El carrito está vacío");
      }
    } catch (error) {
      console.error("Error procesando el pago:", error);
    }
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
              <button onClick={() => addToCart(product)}>
                Agregar al carrito
              </button>
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
                    style={{ width: "30%" }}
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
            Pagar con MercadoPago
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
                  Mostrar productos en pdf
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default Products;

// import React, { useEffect, useState } from "react";
// import "../../Styles/Products.css"
// import { listProduct } from "../../Services/product";

// const Products = () => {
//    const [products, setProducts] = useState([]);
//    const [allProducts, setAllProducts] =useState([])
//    useEffect (()=>{
//       async function fetchProduct() {
//          try{
//             const response = await listProduct();
//             setProducts(response.data);
//          } catch (error){
//             console.error("Error al listar productos", error)
//          }
//       }
//       fetchProduct();
//    },[]);

//  return(

//    <div className="ContainerProductsMajor">
//       <div className="ContainerProduct">
//          {products.map((product) => (
//             <div className="card">
//             <div className="photo">
//                <img src={`data:image/jpeg;base64,${product.images}`} alt={product.name}/>
//             </div>
//             <div className="description">
//                <h2>{product.name}</h2>
//                <h3>{product.category.name}</h3>
//                <p>{product.description}.</p>
//                <h1>${product.price}</h1>
//                <button>Agregar al carrito</button>
//             </div>
//          </div>
//          ))}
//       </div>
//    </div>

//  )
// }
// export default Products;

{
  /* <div className="Cards">
<div className="img">
   <img src={`data:image/jpeg;base64,${product.images}`} alt={product.name} style={{ width:100}}/>
</div>
<div className="Information">
   <h2>{product.name}</h2>
   <h1>{product.prices}</h1>
   <h4>{product.category.name}</h4>
   <p>{product.description}</p>
</div>
</div> */
}
