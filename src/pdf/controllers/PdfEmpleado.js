export const CrearPdfEmpleado = async (i) => {
  let res = await  fetch('http://localhost:3000/BuscarEmpleado',{
    method: 'POST',
    body: JSON.stringify(i),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  let data = await res.json()

  return data;
};