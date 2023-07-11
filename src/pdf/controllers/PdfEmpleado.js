import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';


export const CrearPdfEmpleado = async (data) => {
  const { empresa, fecha, idEmpleados, departamento, cargo, cedula, apellidos, nombres, direccion, telefono, correo, estado } = data;

  const templatePath = path.resolve('src/pdf/plantillas/Empleado_plantilla.pdf');
  const pdfBuffer = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const form = pdfDoc.getForm();

  // Rellenar los campos de formulario con los datos del objeto JSON
  form.getTextField('empresa').setText(empresa);
  form.getTextField('fecha').setText(fecha);
  form.getTextField('id_empleado').setText(id_empleado);
  form.getTextField('departamento').setText(departamento);
  form.getTextField('cargo').setText(cargo);
  form.getTextField('cedula').setText(cedula);
  form.getTextField('apellidos').setText(apellidos);
  form.getTextField('nombres').setText(nombres);
  form.getTextField('direccion').setText(direccion);
  form.getTextField('telefono').setText(telefono);
  form.getTextField('correo').setText(correo);
  form.getTextField('estado').setText(estado);

  // Guardar el resultado en un nuevo archivo PDF
  const pdfRellenado = await pdfDoc.save();
  console.log(os.homedir())
  fs.writeFileSync(path.resolve('src/pdf/pdf_empleado/form.pdf'), pdfRellenado);
  return pdfRellenado;
};