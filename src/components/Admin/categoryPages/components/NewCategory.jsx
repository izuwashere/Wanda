import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';


function NewCategory({ agregar, onAgregarCategoria }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleCanel = () => {
    agregar()
  }

  const onSubmit = (data) => {
    onAgregarCategoria(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="name" {...register("name", { required: true })} />
          {errors.name && <span>Es necesario rellenar este campo</span>}
        </div>
        <button type='submit'>Agregar</button>
      </form>
      <button onClick={handleCanel}>Cancelar</button>
    </div>
  );
}
export default NewCategory