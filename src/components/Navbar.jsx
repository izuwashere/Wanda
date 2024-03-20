import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Importa el contexto de autenticación
import '../Styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from "@material-ui/core";

const Navbar = () => {
    const { isAuthen, user, logout, removeAuthToken } = useAuth(); // Obtén el método removeAuthToken del contexto
    const navigate = useNavigate();

    const handleLogout = () => {
        removeAuthToken(); // Llama al método removeAuthToken
        logout();
        navigate('/Home');
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <nav className="navbar">
            <img src="/logols.png" alt="" />
            <ul className="left-list">
                <ul className="lista-1">
                    <li><NavLink to="/Products">Productos</NavLink></li>
                    <li><NavLink to="#">Mi carrito</NavLink></li>
                </ul>
            </ul>
            {isAuthen ? (
                <>
                    {user.rol === "ADMIN" && (
                        <ul className="right-list">
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Dashboard
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem><NavLink to="/UserCrud">Crud Usuario</NavLink></MenuItem>
                                <MenuItem><NavLink to="/ProductCrud">Crud producto</NavLink></MenuItem>
                                <MenuItem><NavLink to="/SaleCrud">Crud venta</NavLink></MenuItem>
                                <MenuItem><NavLink to="/CategoryCrud">Crud categoria</NavLink></MenuItem>
                                <MenuItem><NavLink to="/DetailCrud">Crud detalle</NavLink></MenuItem>
                              
                                {/* <NavLink to="/UserCrud">Crud Usuario</NavLink>
                                <NavLink to="/ProductCrud">Crud producto</NavLink>
                                <NavLink to="/SaleCrud">Crud venta</NavLink>
                                <NavLink to="/CategoryCrud">Crud categoria</NavLink>
                                <NavLink to="/DetailCrud">Crud detalle</NavLink> */}
                            </Menu>
                        </ul>
                    )}
                    <ul className="right-list">
                        <li><NavLink to="/" onClick={() => removeAuthToken()}>Cerrar sesión</NavLink></li>
                    </ul>
                </>
            ) : (
                <ul className="right-list">
                    <li><NavLink to="/Login">Inicio de sesión</NavLink></li>
                    <li><NavLink to="/Register">Registrarse</NavLink></li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;

