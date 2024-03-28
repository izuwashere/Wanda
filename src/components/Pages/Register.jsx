import React from "react";
import { NavLink, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';
import { RegisterRequest } from '../../Services/user';
import { useAuth} from '../../Context/AuthContext';
import "../../Styles/Register.css";
import { useState } from "react";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  //Validar user y setear
    const { setIsAuthen, isAuthen,setUser } = useAuth();
    //Validar user y setear
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await RegisterRequest(data);
            Cookies.set("token", res.data?.token);
            console.log(res.data?.token);
            //Vericar al user y setar al user
            setIsAuthen(true);
            setUser(res.data?.user);
            //Vericar al user y setar al user
            setRedirect(true);
        } catch (error) {
            console.error(error);
        }
    }
    if (redirect) {
      navigate('/Products')
    }

    return (
      <div className="ContainerRegisterMajor">
        <div className="ContainerRegisterSecondary">
          <div className="TitleRegister">
            <h5>LIFE SEED</h5>
            <h1>REGISTRARSE</h1>
          </div>
          <div className="FormRegister">
          <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="NOMBRE" {...register("name", { required: true })}/><br />
          <input type="text" placeholder="TELEFONO" {...register("phone", { required: true })}  minlength="10"/><br />
          <input type="text" placeholder="CORREO" {...register("username", { required: true })}/><br />
          <input type="text" placeholder="DIRECCIÓN"  {...register("address", { required: true })}/><br />
          <input type="password" placeholder="CONTRASEÑA" {...register("password", { required: true })} minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial" /><br />
          <button>REGISTRAR</button>
            {
              isAuthen && (
              <h5>¡Registro exitoso! Ya estás autenticado.</h5>
              )
            }
            <br />
            <NavLink to="/Login">
              <h5>¿YA TIENES CUENTA? INICIA SESIÓN AQUÍ </h5>
            </NavLink>
            </form>              
          </div>
        </div>
      </div>
    )
  };
  
  export default Register