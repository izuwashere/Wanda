import React from 'react'
import '../Styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Fotoer = () => {
  return (
        <footer className="pie-pagina">
          <div className="grupo-1">
            <div className="box"> 
              <figure>
                <a href="#">
                  <img src="/logols.png" alt="Logo" />
                </a>
              </figure>
              </div>
              <div className="box">
                <h2>SOBRE NOSOTROS</h2>
                <p>Sembrando vida en tu hogar</p>
                <p>mamá tierra hay que cuidarla</p>
              </div>
              <div className="box">
                <h2>SIGUENOS</h2>
                <div className="red-social">
                  <a href="#" className='fa fa-facebook'><FontAwesomeIcon icon={faFacebook} /></a>
                  <a href="#" className='fa fa-instagram'><FontAwesomeIcon icon={faInstagram}/></a>
                  <a href="#" className='fa fa-twitter'><FontAwesomeIcon icon={faTwitter}/></a>
                  <a href="#" className='fa fa-youtube'><FontAwesomeIcon icon={faYoutube}/></a>
                </div>
              </div>
          </div>
          <div className="grupo-2">
            <small>&Copy; 2024 <b>Life Seed</b> - Todos los derechos reservados</small>
          </div>
        </footer> 
  )
}

export default Fotoer
