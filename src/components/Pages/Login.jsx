import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { NavLink, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginRequest } from '../../Services/user';
import { useAuth } from '../../Context/AuthContext';
import "../../Styles/Login.css";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    //Para verificar al user y setear al user
    const { setIsAuthen, setUser } = useAuth();
    //Para verificar al user y setear al user
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await LoginRequest(data);
            Cookies.set("token", res.data?.token);
            //Para mantener al user con su token logeado
            setIsAuthen(true);
            setUser(res.data?.user);
             //Para mantener al user con su token logeado
            setRedirect(true);
        } catch (error) {
            console.error(error);
        }
    }

    if (redirect) {
        navigate('/Products')
    }

    return (

        <div className='ContainerLoginMajor'>
            <div className="ContainerLoginSecondary">
                <div className="TitleLogin">
                    <h5>LIFE SEED</h5>
                    <h1>INICIAR SESIÓN</h1>
                </div>
                <div className="FormLogin">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder='CORREO' {...register("username", { required: true })} /> <br />
                        <input type="password" placeholder='CONTRASEÑA' {...register("password", { required: true })} /> <br />
                        <button>ENTRAR</button> <br />
                        <NavLink to="/Register">
                          <h5>¿NA TIENES CUENTA? REGISTRATE AQUÍ </h5>
                        </NavLink>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default Login;
