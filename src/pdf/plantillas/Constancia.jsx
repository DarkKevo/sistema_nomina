import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Font,
  Image,
} from "@react-pdf/renderer";

export function MyConst(data) {
  const today = new Date();
  const fecha =
    `${today.getFullYear()}-` +
    `${today.getMonth() + 1}-` +
    `${today.getDate()}`;
  let [
    apellidos,
    cedula,
    codigo_cargo,
    codigo_departamento,
    codigo_empresa,
    nombres,
    antiguedad,
    salario,
  ] = ["", "", "", "", "", "", "", "", "",""];

  if (data != "" && data !== undefined) {
    apellidos = data.apellidos;
    cedula = data.cedula;
    codigo_cargo = data.codigo_cargo;
    codigo_departamento = data.codigo_departamento;
    codigo_empresa = data.codigo_empresa;
    nombres = data.nombres;
    antiguedad = data.antiguedad;
    salario = data.salario;
  }

  function f_letra(fecha) {
    const newfecha = new Date(fecha);
    const dia = newfecha.getDate();
    const mes = newfecha.getMonth();
    const year = newfecha.getFullYear();
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    return `${dia} dias del mes de ${meses[mes]} del año ${year}`;
  }

  const styles = StyleSheet.create({
    page: { margin: "2cm", fontFamily: "Helvetica", fontSize: 14 },
    cabecera: {
      backgroundColor: "#000034",
      height: "2.5cm",
      width: "17.5cm",
      paddingLeft: "1cm",
      paddingRight: "1cm",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      display: "flex",
      width: "2.3cm",
      height: "2.3cm",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.1cm",
      border: "1px",
      borderColor: "#FFFFFF",
    },
    empresa: {
      display: "flex",
      fontSize: 12,
      width: "15.2cm",
      textAlign: "center",
      color: "white",
      justifyContent: "center",
      paddingBottom: "0.3cm",
      fontFamily: "Helvetica-Bold",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      width: "17.5cm",
      height: "21.7cm",
    },
    title: {
      display: "flex",
      flexDirection: "column",
      width: "17.5cm",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Helvetica-Bold",
      marginTop: "1cm",
    },
    carta: {
      display: "flex",
      flexDirection: "column",
      width: "17.5cm",
    },
    txt: {
      marginTop: "1cm",
      textAlign: "justify",
      fontFamily: "Helvetica",
      textIndent: "1.5cm",
    },
    firma: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      fontFamily: "Helvetica",
      alignItems: "center",
      justifyContent: "flex-end",
      height:"12cm",
    },
    linea: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      fontFamily: "Helvetica",
      alignItems: "center",
      justifyContent: "center",
      width: "8cm",
      borderBottom: "1px",
      borderBottomColor: "black",
    },
    adress: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      fontFamily: "Helvetica",
      alignItems: "center",
    },
    txt2: { marginBottom: "0.3cm" },
    txt3: { marginBottom: "0.3cm", marginTop: "0.3cm" },
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.cabecera}>
          <View style={styles.logo}></View>
          <View style={styles.empresa}>
            <Text>{codigo_empresa}</Text>
            <Text>Rif</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text>CONSTANCIA DE TRABAJO</Text>
          </View>
          <View style={styles.carta}>
            <Text style={styles.txt}>
              {" "}
              Por medio de la presente, hago constar que el ciudadano {
                nombres
              }{" "}
              {apellidos}, titular de la cédula de identidad {cedula}, presta
              sus servicios para la entidad con nombre de
              {" " + codigo_empresa}. Desde los{" " + f_letra(antiguedad)},
              desempeñando el cargo de{" " + codigo_cargo} en el departamento de
              {" " + codigo_departamento} con remuneración mensual de {" "+ salario + "bs.S"}.
            </Text>
            <Text style={styles.txt}>
              Constancia que se expide a petición de la parte interesada, a los{" "}
              {f_letra(fecha)}.
            </Text>
          </View>
          <View style={styles.firma}>
            <View style={styles.linea}></View>
            <Text style={styles.txt2}>{codigo_empresa}</Text>
            <Text style={styles.txt2}>{"RIF"}</Text>
            <Text style={styles.txt2}>{"Telefono"}</Text>
            <Text style={styles.txt3}>{"correo"}</Text>
            <Text style={styles.adress}>{"Direccion"}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
