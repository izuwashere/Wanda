import React from 'react'
import '../Styles/Footer.css';

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
                  <a href="#" className='fa fa-facebook'>f</a>
                  <a href="#" className='fa fa-instagram'>i</a>
                  <a href="#" className='fa fa-twitter'>t</a>
                  <a href="#" className='fa fa-youtube'>y</a>
                </div>
              </div>
          </div>
          <div className="grupo-2">
            <small>&Copy; 2024 <b>Slee Dv</b> - Todos los derechos reservados</small>
          </div>
        </footer> 
  )
}

export default Fotoer
