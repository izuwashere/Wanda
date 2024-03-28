import React from 'react'
import { useEffect, useState } from 'react';
import '../../Styles/Nosotros.css'

function Nosotros() {
    const [current, setCurrent] = useState(1); // Keeps track of the current div
  const [height, setHeight] = useState(0); // The height of the roles div
  const [numberDivs, setNumberDivs] = useState(0); // The number of children of the roles div

  useEffect(() => {
    const rolesDiv = document.querySelector('.roles');
    const firstDiv = document.querySelector('.roles div:nth-child(1)');
    setHeight(rolesDiv.clientHeight); // Setting initial height
    setNumberDivs(rolesDiv.children.length); // Setting initial number of children

    const interval = setInterval(() => {
      const number = current * -height;
      firstDiv.style.marginTop = `${number}px`;
      if (current === numberDivs) {
        firstDiv.style.marginTop = '0px';
        setCurrent(1);
      } else setCurrent(current + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [current, height, numberDivs]);

  return (
    <div className="MajorNosotros">
       <div className="wrapper">
            <div className="roles">
                <div>Somos expertos en crear espacios verdes que inspiran a las personas a conectar con la naturaleza, promoviendo así el bienestar físico, mental y emocional.</div>
                <div>Nuestro compromiso es ofrecer plantas de calidad y una experiencia personalizada que transforme tus espacios y enriquezca tu vida con el poder de la naturaleza.</div>
                <div>Nuestra visión es liderar un movimiento hacia un estilo de vida más consciente y sostenible, donde cada individuo reconozca el valor terapéutico de la naturaleza.</div>
                <div>En Life Seed, trabajamos incansablemente para crear refugios verdes que inviten a la calma, la reflexión y la conexión con nuestro entorno natural, promoviendo así un mundo más verde y saludable.</div>
            </div>
        </div>
    </div>
    
  );
}

export default Nosotros