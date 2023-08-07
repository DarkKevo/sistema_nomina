import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Font,
} from "@react-pdf/renderer";

export function MyDoc(data, dataPago) {
  const today = new Date();
  const fecha =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  let [
    codigo_empresa,
    rif,
    idEmpleado,
    cedula,
    nombre,
    departamento,
    cargo,
    cuenta,
    correo,
    dias,
    dias_descanso,
    fechas,
    horas_trabajadas,
    monto_base,
    horas_extras,
    monto_extra,
    monto_deduccion,
    monto_bonificacion,
    pagoTotal,
    fecha_pago,
  ] = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];

  if (data != "" && data !== undefined) {
    codigo_empresa = data.codigo_empresa;
    rif = data.rif;
    idEmpleado = dataPago.dataPago.idEmpleado;
    cedula = dataPago.dataPago.cedula;
    nombre = dataPago.dataPago.nombre;
    departamento = dataPago.dataPago.departamento;
    cargo = dataPago.dataPago.cargo;
    cuenta = dataPago.dataPago.cuenta;
    correo = dataPago.dataPago.correo;
    dias = dataPago.dataPago.dias;
    dias_descanso = dataPago.dataPago.dias_descanso;
    fechas = dataPago.dataPago.fechas;
    horas_trabajadas = dataPago.dataPago.horas_trabajadas;
    monto_base = dataPago.dataPago.monto_base;
    horas_extras = dataPago.dataPago.horas_extras;
    monto_extra = dataPago.dataPago.monto_extra;
    monto_deduccion = dataPago.dataPago.monto_deduccion;
    monto_bonificacion = dataPago.dataPago.monto_bonificacion;
    pagoTotal = dataPago.dataPago.pagoTotal;

    let fecha_n = new Date(dataPago.dataPago.fecha_pago);
    fecha_pago =
      `${fecha_n.getDate()}-` +
      `${fecha_n.getMonth() + 1}-` +
      `${fecha_n.getFullYear()}`;
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
    logo: {
      display: "flex",
      width: "1.9cm",
      height: "1.9cm",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.1cm",
      border: "1px",
      borderColor: "#FFFFFF",
    },
    image: {
      width: "1.9cm",
      height: "1.9cm",
    },
    head: {
      height: "2cm",
      width: "15.6cm",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    empresa: {
      display: "flex",
      fontSize: 12,
      textAlign: "center",
      color: "white",
      justifyContent: "flex-end",
      paddingBottom: "0.3cm",
      fontFamily: "Helvetica-Bold",
    },
    titulo: {
      display: "flex",
      textAlign: "center",
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
    txt: {
      display: "flex",
      width: "17.5cm",
      marginTop: "0.15cm",
      marginBottom: "0.3cm",
      flexDirection: "row",
    },
    negrita: { fontFamily: "Helvetica-Bold" },
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.cabecera}>
          <View style={styles.logo}></View>
          <View style={styles.head}>
            <View style={styles.empresa}>
              <Text>
                {codigo_empresa} {" - " + rif}
              </Text>
            </View>
            <View style={styles.titulo}>
              <Text>RECIBO DEL EMPLEADO</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.fecha}>
            <Text style={styles.fecha}>
              <Text style={styles.negrita}>FECHA </Text>
              {"" + fecha_pago}
            </Text>
          </View>
          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>ID DEL EMPLEADO</Text>
              {" " + idEmpleado}
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>CEDULA</Text>
              {" " + cedula}
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>NOMBRE DEL EMPLEADO</Text>
              {" " + nombre}
            </Text>
          </View>
          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>DEPARTAMENTO</Text>
              {" " + departamento}
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>CARGO</Text>
              {" " + cargo}
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>CUENTA</Text>
              {cuenta}
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>CORREO</Text>
              {" " + correo}
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>DIAS</Text>
              {" " + dias}
            </Text>
          </View>
          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>DIAS DE DESCANSO</Text>
              {" " + dias_descanso}
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>FECHAS DEL PAGO</Text>
              {" " + fechas}
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>HORAS TRABAJADAS</Text>
              {" " + horas_trabajadas}
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>PAGO DE HORAS TRABAJADAS</Text>
              {" " + monto_base}Bf.S
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>HORAS EXTRAS</Text>
              {" " + horas_extras}
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>PAGO DE HORAS EXTRAS</Text>
              {" " + monto_extra}Bf.S
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>MONTO DE DEDUCCIONES</Text>
              {" " + monto_deduccion}Bf.S
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>MONTO DE BONIFICACIONES</Text>
              {" " + monto_bonificacion}Bf.S
            </Text>
          </View>

          <View>
            <Text style={styles.txt}>
              <Text style={styles.negrita}>PAGO TOTAL</Text>
              {" " + pagoTotal}Bf.S
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
