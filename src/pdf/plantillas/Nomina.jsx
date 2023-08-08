import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Font,
} from "@react-pdf/renderer";

export function PDFNomina() {
  let monto_nomina = 0;
  let cont_emp = 1;
  const array = [
    {
      id: 1,
      monto: 100,
    },
    {
      id: 2,
      monto: 200,
    },
  ];
  // data, dataPago
  // const today = new Date();
  // const fecha =
  //   today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  // let [
  //   codigo_empresa,
  //   rif,
  //   idEmpleado,
  //   cedula,
  //   nombre,
  //   departamento,
  //   cargo,
  //   cuenta,
  //   correo,
  //   dias,
  //   dias_descanso,
  //   fechas,
  //   horas_trabajadas,
  //   monto_base,
  //   horas_extras,
  //   monto_extra,
  //   monto_deduccion,
  //   monto_bonificacion,
  //   pagoTotal,
  //   fecha_pago,
  // ] = [
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  // ];

  // if (data != "" && data !== undefined) {
  //   codigo_empresa = data.codigo_empresa;
  //   rif = data.rif;
  //   idEmpleado = dataPago.dataPago.idEmpleado;
  //   cedula = dataPago.dataPago.cedula;
  //   nombre = dataPago.dataPago.nombre;
  //   departamento = dataPago.dataPago.departamento;
  //   cargo = dataPago.dataPago.cargo;
  //   cuenta = dataPago.dataPago.cuenta;
  //   correo = dataPago.dataPago.correo;
  //   dias = dataPago.dataPago.dias;
  //   dias_descanso = dataPago.dataPago.dias_descanso;
  //   fechas = dataPago.dataPago.fechas;
  //   horas_trabajadas = dataPago.dataPago.horas_trabajadas;
  //   monto_base = dataPago.dataPago.monto_base;
  //   horas_extras = dataPago.dataPago.horas_extras;
  //   monto_extra = dataPago.dataPago.monto_extra;
  //   monto_deduccion = dataPago.dataPago.monto_deduccion;
  //   monto_bonificacion = dataPago.dataPago.monto_bonificacion;
  //   pagoTotal = dataPago.dataPago.pagoTotal;

  //   let fecha_n = new Date(dataPago.dataPago.fecha_pago);
  //   fecha_pago =
  //     `${fecha_n.getDate()}-` +
  //     `${fecha_n.getMonth() + 1}-` +
  //     `${fecha_n.getFullYear()}`;
  // }

  const styles = StyleSheet.create({
    page: { margin: "1cm", fontFamily: "Helvetica", fontSize: 14 },
    cabecera: {
      backgroundColor: "#000034",
      height: "2cm",
      width: "26cm",
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
      width: "24.1cm",
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
      flexDirection: "row",
      width: "26cm",
      alignItems:"center"
    },
    txt: {
      display: "flex",
      width: "2cm",
      marginTop: "0.15cm",
      marginBottom: "0.3cm",
      flexDirection: "row",
    },
    negrita: { 
      fontFamily: "Helvetica-Bold",
      fontSize: "9px",
    },
    content2: {
      display: "flex",
      flexDirection: "row",
      width: "26cm",
    },
    tabla: {
      border: "1px",
      borderColor: "#000000",
      paddingLeft: "0.2cm",
      paddingRight: "0.2cm",
      alignItems: "center"
    },
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page} orientation="landscape">
        <View style={styles.cabecera}>
          <View style={styles.logo}></View>
          <View style={styles.head}>
            <View style={styles.empresa}>
              <Text>
                {"codigo_empresa"} {" - " + "rif"}
              </Text>
            </View>
            <View style={styles.titulo}>
              <Text>Nomina 01-05-2023 al 15-05-2023</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.tabla}>
              <Text style={styles.negrita}>Nº</Text>
          </View>

          <View style={styles.tabla}>
              <Text style={styles.negrita}>CEDULA</Text>
          </View>

          <View style={styles.tabla}>
            
              <Text style={styles.negrita}>NOMBRE_EMPLEADO</Text>
          </View>
          <View style={styles.tabla}>
            
              <Text style={styles.negrita}>HORAS_TRABAJADAS</Text>
            
          </View>

          <View style={styles.tabla}>
            
              <Text style={styles.negrita}>PAGO_H_T</Text>
            
          </View>

          <View style={styles.tabla}>
            
              <Text style={styles.negrita}>HORAS_EXTRAS</Text>
            
          </View>

          <View style={styles.tabla}>
            
              <Text style={styles.negrita}>PAGO_H_E</Text>
            
          </View>

          <View style={styles.tabla}>
            
              <Text style={styles.negrita}>DEDUCCIÓN</Text>
            
          </View>

          <View style={styles.tabla}>
            
              <Text style={styles.negrita}>BONIFICACIÓN</Text>
            
          </View>

          <View style={styles.tabla}>
            
              <Text style={styles.negrita}>PAGO_TOTAL</Text>
            
          </View>
        </View>
        {array.forEach((element, index) => {
          <View style={styles.content2}>
            <View style={styles.tabla}>
              <Text style={styles.negrita}>{element.id}</Text>
            </View>
          </View>
          monto_nomina += element.monto
          if (index == array.length - 1) {
            <View style={styles.tabla}>
              <Text style={styles.txt}>
                <Text style={styles.negrita}>Monto Total: </Text>
                {monto_nomina}
              </Text>
            </View>
          }
        })}
      </Page>
    </Document>
  );
}
