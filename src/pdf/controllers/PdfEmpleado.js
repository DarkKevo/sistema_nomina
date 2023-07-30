export const CrearPdfEmpleado = async (i) => {
  let res1 = await fetch("http://localhost:3000/BuscarEmpleado", {
    method: "POST",
    body: JSON.stringify(i),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  let data1 = await res1.json();

  const dato = {
    codigo_cargo: data1.codigo_cargo,
  };

  let res2 = await fetch("http://localhost:3000/BuscarCargo", {
    method: "POST",
    body: JSON.stringify(dato),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  let data2 = await res2.json();

  let res3 = await fetch("http://localhost:3000/ListarEmpresa", {
  });
  let data3 = await res3.json();

  const data = {
    idEmpleados: data1.idEmpleados,
    cedula: data1.cedula,
    nombres: data1.nombres,
    apellidos: data1.apellidos,
    fecha_nacimiento: data1.fecha_nacimiento,
    direccion: data1.direccion,
    correo: data1.correo,
    telefono: data1.telefono,
    codigo_cargo: data1.codigo_cargo,
    codigo_departamento: data1.codigo_departamento,
    codigo_empresa: data1.codigo_empresa,
    estado: data1.estado,
    numero_cuenta: data1.numero_cuenta,
    antiguedad: data1.antiguedad,
    salario: data2.salario,
    rif: data3[0].rif,
    nombre: data3[0].nombre,
    direccion_e: data3[0].direccion,
    telefono_e: data3[0].telefono,
    correo_e: data3[0].correo
  };

  return data;
};
