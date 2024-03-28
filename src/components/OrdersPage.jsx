import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderPDF from './OrderPDF';
import '../Styles/OrderPages.css' 

const OrdersPage = ({ orders }) => {
  
  const [ordersData] = useState(orders);

  return (
    <div className='ContainerLoginMajor'>
      {/* Botón para descargar el PDF */}
      <PDFDownloadLink document={<OrderPDF orders={ordersData} />} fileName="lista_ordenes.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Cargando documento...' : 'Descargar PDF'
        }
      </PDFDownloadLink>
      
      {/* Componente OrderPDF para visualizar el PDF en la página (opcional) */}
      <OrderPDF orders={ordersData} />
    </div>
  );
};

export default OrdersPage;
