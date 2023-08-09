import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function AddModalHoras({ isEdit, id, update }) {
  //estados para el fetch
  const [id_e, setid_empleado] = useState('');
  const [horas_laborables, sethoras_laborables] = useState('');
  const [horas_extras, sethoras_extras] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const mutation = useMutation(
    (datos) => {
      const res = fetch('http://localhost:3000/cargarHoras', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        if (data.ok !== true) {
          Swal.fire({
            title: 'Datos incorrectos',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: 'Horas registradas!',
            icon: 'success',
            timer: 3000,
          });
          update();
        }
        setOpenModal(false);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = {
      id_empleado: id_e,
      horas: parseInt(horas_laborables),
      horas_extra: parseInt(horas_extras),
    };
    mutation.mutate(datos);
  };

  const empleados = useQuery('empleados', () => fetch('http://localhost:3000/ListarEmpleados').then((res) => res.json()));

  if (empleados.isLoading) {
    return <span>Cargando...</span>;
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className={
          'flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white'
        }
      >
        {
          <>
            Restar Horas <FaPlus className='text-xl' />
          </>
        }
      </button>
      <div className={`${openModal ? 'grid' : 'hidden'} fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}>
        <div className={`grid fixed bg-DarkBlue right-5 w-3/4 h-3/4 place-items-center z-10 rounded-lg`}>
          <form
            className='flex flex-col items-center h-full justify-between gap-5 p-4'
            action=''
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2 className='text-white text-left w-full border-b-2 border-white p-3'>Ingrese las horas trabajadas</h2>
            <div className='flex flex-col items-center gap-4'>
              {empleados.data && (
                <select value={id_e} className='p-3 rounded w-full' name='' id='' onChange={(e) => setid_empleado(e.target.value)}>
                  <option value='none'> Seleccione empleado</option>
                  {empleados.data.error
                    ? ''
                    : empleados.data &&
                      empleados.data.results.map((id_e) => (
                        <option key={id_e.id_empleado} value={id_e.idEmpleados}>
                          {`${id_e.apellidos} ${id_e.nombres} C.I ${id_e.cedula}`}
                        </option>
                      ))}
                </select>
              )}
              <input
                className='p-3 rounded w-full'
                type='text'
                name=''
                id=''
                value={horas_laborables}
                onChange={(e) => sethoras_laborables(e.target.value)}
                placeholder='Ingrese las horas trabajadas'
              />
              <input
                className='p-3 rounded w-full'
                type='text'
                name=''
                id=''
                value={horas_extras}
                onChange={(e) => sethoras_extras(e.target.value)}
                placeholder='Ingrese las horas extras'
              />
            </div>
            <div className='w-full border-t-2 border-white p-3 flex justify-end gap-3'>
              <input className='bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded' type='submit' value='Enviar' />
              <input
                className='bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded'
                type='button'
                value='Cancelar'
                onClick={() => {
                  setOpenModal(false);
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
