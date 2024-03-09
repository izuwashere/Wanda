import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Importa el hook useAuth
import '../Styles/Navbar.css'; // Importa el archivo CSS

const Navbar = () => {
    const { isAuthen } = useAuth(); // Obtiene el estado de autenticación del contexto

    return (
        <nav className="navbar">
            <img src="/logols.png" alt="" />
            <ul className="left-list">
                <ul className="lista-1">
                            <li><NavLink to="/">Inicio</NavLink></li>
                            <li><NavLink to="/Products">Productos</NavLink></li>
                            <li><NavLink to="#">Mi carrito</NavLink></li>
                </ul>
            </ul>
            {isAuthen ? (
                            <>
                                {/* Aquí puedes colocar los elementos que deseas mostrar cuando el usuario esté autenticado */}
                                <ul className="right-list">
                                    <NavLink to="/UserCrud">Crud Usuario</NavLink>
                                    <NavLink to="/ProductCrud">Crud producto</NavLink>
                                    <NavLink to="/SaleCrud">Crud venta</NavLink>
                                    <NavLink to="/CategoryCrud">Crud categoria</NavLink>
                                    <NavLink to="/">Cerrar sesión</NavLink>
                                </ul>
                            </>
                        ) : (
                            <>
                                {/* Aquí están los elementos que se muestran cuando el usuario no está autenticado */}
                                <ul className="right-list">
                                    <li><NavLink to="/Login">Inicio de sesión</NavLink></li>
                                    <li><NavLink to="/Register">Registrarse</NavLink></li>
                                </ul>
                            </>
                        )}
        </nav>
         
    );
}

export default Navbar;

