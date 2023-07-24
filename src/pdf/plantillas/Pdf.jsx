import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Font,
} from "@react-pdf/renderer";

export function MyDoc(data) {
  const today = new Date();
  const fecha =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  let [
    apellidos,
    cedula,
    codigo_cargo,
    codigo_departamento,
    codigo_empresa,
    correo,
    direccion,
    estado,
    fecha_nacimiento,
    idEmpleados,
    nombres,
    telefono,
  ] = ["", "", "", "", "", "", "", "", "", "", "", ""];

  if (data != "" && data !== undefined) {
    apellidos = data.apellidos;
    cedula = data.cedula;
    codigo_cargo = data.codigo_cargo;
    codigo_departamento = data.codigo_departamento;
    codigo_empresa = data.codigo_empresa;
    correo = data.correo;
    direccion = data.direccion;
    estado = data.estado;
    let fecha_n = new Date(data.fecha_nacimiento);
    fecha_nacimiento = fecha_n.toISOString().slice(0, 10);
    idEmpleados = data.idEmpleados;
    nombres = data.nombres;
    telefono = data.telefono;
  }

  const styles = StyleSheet.create({
    page: { margin: "2cm", fontFamily: "Helvetica", fontSize: 14 },
    cabecera: {
      backgroundColor: "#000034",
      height: "2cm",
      width: "17.5cm",
      paddingLeft: "1cm",
      paddingRight: "1cm",
      flexDirection: "row",
    },
    empresa: {
      display: "flex",
      fontSize: 12,
      width: "6cm",
      textAlign: "left",
      color: "white",
      justifyContent: "flex-end",
      paddingBottom: "0.3cm",
      fontFamily: "Helvetica-Bold",
    },
    titulo: {
      display: "flex",
      width: "9.5cm",
      textAlign: "right",
      color: "white",
      justifyContent: "flex-end",
      paddingBottom: "0.3cm",
      fontSize: 10,
      fontFamily: "Helvetica-Bold",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      width: "17.5cm",
      height: "21.7cm",
    },
    fecha: {
      display: "flex",
      width: "17.5cm",
      marginTop: "0.15cm",
      textAlign: "right",
      marginBottom: "0.3cm",
      flexDirection: "row",
    },
    group: {
      width: "17.5cm",
      flexDirection: "row",
    },
    dep: {
      display: "flex",
      width: "10cm",
    },
    car: {
      display: "flex",
      width: "7.5cm",
    },
    subtitle: {
      backgroundColor: "#dcdcff",
      height: "1.2cm",
      width: "17.5cm",
      justifyContent: "center",
      textAlign: "center",
      marginBottom: "1cm",
      marginTop: "0.6cm",
      fontFamily: "Helvetica-Bold",
    },
    ape: {
      display: "flex",
      width: "8.75cm",
    },
    nom: {
      display: "flex",
      width: "8.75cm",
    },
    sep: {
      backgroundColor: "#dcdcff",
      height: "0.8cm",
      width: "17.5cm",
      marginBottom: "0.8cm",
      marginTop: "0.8cm",
    },
    txt: { marginBottom: "0.3cm" },
    txt2: { marginTop: "0.3cm", marginBottom: "0.3cm" },
    negrita: { fontFamily: "Helvetica-Bold" },
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.cabecera}>
          <View style={styles.empresa}>
            <Text>{codigo_empresa}</Text>
          </View>
          <View style={styles.titulo}>
            <Text>INFORMACIÓN PERSONAL DEL EMPLEADO</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.fecha}>
            <Text style={styles.fecha}>
              <Text style={styles.negrita}>FECHA </Text>
              {fecha}
            </Text>
          </View>
          <Text style={styles.txt}>
            <Text style={styles.negrita}>ID DEL EMPLEADO </Text>
            {idEmpleados}
          </Text>
          <View style={styles.group}>
            <View style={styles.dep}>
              <Text>
                <Text style={styles.negrita}>DEPARTAMENTO </Text>
                {codigo_departamento}
              </Text>
            </View>
            <View style={styles.car}>
              <Text>
                <Text style={styles.negrita}>CARGO</Text> {codigo_cargo}
              </Text>
            </View>
          </View>
          <View style={styles.subtitle}>
            <Text>INFORMACIÓN PERSONAL</Text>
          </View>
          <Text style={styles.txt}><Text style={styles.negrita}>CÉDULA </Text>{cedula}</Text>
          <View style={styles.group}>
            <View style={styles.ape}>
              <Text><Text style={styles.negrita}>APELLIDOS </Text>{apellidos}</Text>
            </View>
            <View style={styles.nom}>
              <Text><Text style={styles.negrita}>NOMBRES </Text>{nombres}</Text>
            </View>
          </View>
          <Text style={styles.txt2}>
            <Text style={styles.negrita}>FECHA DE NACIMIENTO </Text> {fecha_nacimiento}
          </Text>
          <Text><Text style={styles.negrita}>DIRECCIÓN </Text>{direccion}</Text>
          <View style={styles.subtitle}>
            <Text>INFORMACIÓN DE CONTACTO</Text>
          </View>
          <Text style={styles.txt}><Text style={styles.negrita}>TELÉFONO </Text>{telefono}</Text>
          <Text><Text style={styles.negrita}>CORREO </Text>{correo}</Text>
          <View style={styles.sep}></View>
          <Text><Text style={styles.negrita}>ESTADO </Text>{estado}</Text>
          <View style={styles.sep}></View>
        </View>
      </Page>
    </Document>
  );
}
