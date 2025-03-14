import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const CrearUsuario = () => {
  const valorInicial = {
    nombre: '',
    apellido: '',
    edad: 18,
    telefono: 6,
    correo: '',
    foto: ''
  };
 
  let { id } = useParams(); // Capturar el id de la URL


  const [usuario, setUsuario] = useState(valorInicial); // Estado para los datos del usuario
  const [foto, setFoto] = useState(null); // Estado para la foto del socio
  const [subId, setSubId] = useState(id); // Estado para el id del socio


  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };


  const capturarFoto = (e) => {
    setFoto(e.target.files[0]); // Guardar la foto seleccionada
  };


  const guardarDatos = async (e) => {
    e.preventDefault(); // Evita recargar la página


    // Crear un objeto FormData para enviar los datos del usuario y la foto
    const formData = new FormData();
    formData.append('nombre', usuario.nombre);
    formData.append('apellido', usuario.apellido);
    formData.append('edad', usuario.edad);
    formData.append('telefono', usuario.telefono);
    formData.append('correo', usuario.correo);
    if (foto) {
      formData.append('foto', foto); // Añadir la foto al formulario
    }


    try {
      // Enviar datos al backend
      await axios.post('http://localhost:4000/api/usuarios', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido
        }
      });


      // Reiniciar el formulario
      setUsuario({ ...valorInicial });
      setFoto(null); // Vaciar la foto seleccionada
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };


  // Función para actualizar un usuario
  const actualizarUser = async (e) => {
    e.preventDefault(); // Evita recargar la página


    // Crear un objeto FormData para enviar los datos del usuario y la foto
    const formData = new FormData();
    formData.append('nombre', usuario.nombre);
    formData.append('apellido', usuario.apellido);
    formData.append('edad', usuario.edad);
    formData.append('telefono', usuario.telefono);
    formData.append('correo', usuario.correo);
    if (foto) {
      formData.append('foto', foto); // Añadir la foto al formulario si se ha seleccionado una nueva
    }


    try {
      // Enviar datos al backend
      await axios.put(`http://localhost:4000/api/usuarios/${subId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido
        }
      });


      // Reiniciar el formulario
      setUsuario({ ...valorInicial });
      setFoto(null); // Vaciar la foto seleccionada
      setSubId('');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };


  const obtUno = async (id) => { // Función para obtener un usuario y mostrar la información en el formulario
    try {
      const res = await axios.get(`http://localhost:4000/api/usuarios/${id}`);
      setUsuario({
        nombre: res.data.nombre,
        apellido: res.data.apellido,
        edad: res.data.edad,
        telefono: res.data.telefono,
        correo: res.data.correo,
      });
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  };


  // Si se está editando un usuario, cargar los datos del usuario
  useEffect(() => {
    if (subId) {
      obtUno(subId);
    }
  }, [subId]);


  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          <h2 className="text-center mb-3">Crear Socio</h2>
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre del socio"
              required
              name="nombre"
              value={usuario.nombre}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Apellido:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el apellido del socio"
              required
              name="apellido"
              value={usuario.apellido}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Edad:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa la edad del socio"
              required
              name="edad"
              value={usuario.edad}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Teléfono:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa el teléfono del socio"
              required
              name="telefono"
              value={usuario.telefono}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Correo:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el correo del socio"
              required
              name="correo"
              value={usuario.correo}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Foto del socio:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*" // Aceptar solo imágenes
              onChange={capturarFoto}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-dark">Guardar</button>
          </div>
        </form>


        <form onSubmit={actualizarUser} className='text-center'>
          <button className="btn btn-dark mt-2">
            Actualizar
          </button>
        </form>


      </div>
    </div>
  );
};


export default CrearUsuario;