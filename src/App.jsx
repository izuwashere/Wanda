import React from 'react'
import { AuthProvider } from './Context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Pages/Home';
import Register from "./components/Pages/Register"
import Products from "./components/Pages/Products"
import Login from "./components/Pages/Login"
import Footer from './components/Footer';
import NoFound from './components/Pages/NoFound';
import ProductCrud from './components/Admin/ProductCrud';
import DetailCrud from './components/Admin/DetailCrud';
import SaleCrud from './components/Admin/SaleCrud';
import CategoryCrud from './components/Admin/categoryPages/CategoryCrud';
import { UserProvider } from './Context/UserContext';
import UserCrud from './components/Admin/UserCrud';
import "./App.css";
import { CategoryProvider } from './Context/CategoryContext';
function App() {

  return (
    <AuthProvider>
      <UserProvider>
        <CategoryProvider>
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
            <Route path='*' element={<NoFound />} />
          </Routes>
          <Footer />
        </CategoryProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
