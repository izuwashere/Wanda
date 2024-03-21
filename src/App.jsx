import React from 'react'
import { AuthProvider } from './Context/AuthContext';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './components/Pages/Home';
import Register from "./components/Pages/Register"
import Products from "./components/Pages/Products"
import Login from "./components/Pages/Login"
import NoFound from './components/Pages/NoFound';

import ProductCrud from './components/Admin/ProductPages/ProductCrud';
import DetailCrud from './components/Admin/DetailPages/DetailCrud';
import SaleCrud from './components/Admin/SalePages/SaleCrud';
import CategoryCrud from './components/Admin/categoryPages/CategoryCrud';
import UserCrud from './components/Admin/UserPages/UserCrud';
import OrdersPage from './components/OrdersPage';
import "./App.css";



function App() {

  return (
    <AuthProvider>
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path='/Register' element={<Register />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Products' element={<Products />} />
              <Route path='/UserCrud' element={<UserCrud />} />
              <Route path='/ProductCrud' element={<ProductCrud />} />
              <Route path='/DetailCrud' element={<DetailCrud />} />
              <Route path='/CategoryCrud' element={<CategoryCrud />} />
              <Route path='/SaleCrud' element={<SaleCrud />} />
              <Route path='/OrdersPage' element={<OrdersPage />}/>
              
              <Route path='*' element={<NoFound />} />
            </Routes>
            <Footer />
    </AuthProvider>
  )
}

export default App
