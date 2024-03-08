import React from "react";
import "../../Styles/Products.css"


const Products = () => {
 return(

   <div className="Container">
      <div className="ContainerProductsMajor">
      <div className="TitleProducts">
               <h1>NUESTROS PRODUCTOS</h1><br />
               
      </div>
      <div className="ContainerProductsSecondary">
      <div className="CardsProducts 1">
         <h5>PLANTAS</h5>
      </div>
      <div className="CardsProducts 2">
         <h5>FLORES</h5>
      </div>
      <div className="CardsProducts 3">
         <h5>SEMILLAS</h5>
      </div>
      <div className="CardsProducts 4">
         <h5>OTROS</h5>
      </div>
      </div>
      </div>
      <div className="ContainerSecondary">
         <div className="Up">
            <div className="CardProducts">
               <h3>VOLVER A PRODUCTOS</h3>
            </div>
            <div className="CardPlant">
               <div className="CardPlantTitle">
                  <h4>PLANTAS</h4>
               </div>
               <div className="Content">
                  <p>Encontraras diferentes tipos de plantas.<br/>
                  Para interior, para exterior,acuáticas, medicinales, aromaticas,
                  y entre otras.</p>
               </div>
            </div>
         </div>
         <div className="TitleDown">
               <h3>PLANTAS RECOMENDADAS</h3>
            </div> 
         <div className="Down">       
            <div className="CardsRecomendary">
                  <img src="" alt="" />
                  <h3>Flor de loto</h3>
                  <h6>info</h6>
            </div>
            <div className="CardsRecomendary">
                  <img src="" alt="" />
                  <h3>Girasol</h3>
                  <h6>info</h6>
            </div>
            <div className="CardsRecomendary">
                  <img src="" alt="" />
                  <h3>Tulipan</h3>
                  <h6>info</h6>
            </div>
         </div>

      </div>
   </div>

    
 )
}  
export default Products;