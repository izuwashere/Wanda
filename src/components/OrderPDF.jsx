import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Define la fuente a utilizar (opcional)
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  table: {
    width: "100%",
    border: "1px solid #000000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000000",
  },
  tableCellHeader: {
    padding: 8,
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
    textAlign: "center",
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    textAlign: "center",
  },
});

const OrderPDF = ({ cart }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Tu carrito</Text>
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Index</Text>
            <Text style={styles.tableCellHeader}>Nombre</Text>
            <Text style={styles.tableCellHeader}>Categoría</Text>
            <Text style={styles.tableCellHeader}>Descripción</Text>
            <Text style={styles.tableCellHeader}>Precio</Text>
          </View>
          {cart.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.category.name}</Text>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default OrderPDF;

