import React, { useState } from 'react';
import './listaPersonas.css';

const ListaPersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [mayoresEdad, setMayoresEdad] = useState(0);
  const [menoresEdad, setMenoresEdad] = useState(0);

  const agregarPersona = (nombre, apellido, edad, cedula) => {
    const persona = { nombre, apellido, edad, cedula };
    setPersonas([...personas, persona]);

    if (edad >= 18) {
      setMayoresEdad(mayoresEdad + 1);
    } else {
      setMenoresEdad(menoresEdad + 1);
    }
  };

  const eliminarPersona = (index) => {
    const persona = personas[index];
    const newPersonas = [...personas];
    newPersonas.splice(index, 1);

    setPersonas(newPersonas);

    if (persona.edad >= 18) {
      setMayoresEdad(mayoresEdad - 1);
    } else {
      setMenoresEdad(menoresEdad - 1);
    }
  };

  return (
    <div className="lista-personas">
      <div className="lista-personas__info">Personas mayores de edad: {mayoresEdad}</div>
      <div className="lista-personas__info">Personas menores de edad: {menoresEdad}</div>

      <table className="lista-personas__table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Cédula</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona, index) => (
            <tr key={index}>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.edad}</td>
              <td>{persona.cedula}</td>
              <td className="lista-personas__acciones">
                <button onClick={() => eliminarPersona(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const nombre = e.target.nombre.value;
          const apellido = e.target.apellido.value;
          const edad = parseInt(e.target.edad.value);
          const cedula = e.target.cedula.value;

          agregarPersona(nombre, apellido, edad, cedula);

          e.target.reset();
        }}
        className="lista-personas__form"
      >
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="text" name="apellido" placeholder="Apellido" required />
        <input type="number" name="edad" placeholder="Edad" required />
        <input type="text" name="cedula" placeholder="Cédula" required />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default ListaPersonas;
