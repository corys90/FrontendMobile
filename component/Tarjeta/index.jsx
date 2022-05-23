import React, { useEffect, useState }  from 'react';
import { View, TextInput, StyleSheet, Pressable, 
    Text, Button, Alert, ScrollView, FlatList, Image, TouchableOpacity, Switch  } from 'react-native';
import logo from "../../assets/recycle-bin-red.png";


  const Tarjeta = ({item}) =>{

    const [ceder, setCeder] = useState(item.state === 3);

    function pad(n, width) {
      n = n + '';
      return n.length >= width ? n : 
          new Array(width - n.length + 1).join('0') + n;
    } 

    function cederOnoff() {

        function cedePlace(){
                async function getPlaceApi(parm) {
                        await fetch('http://192.168.0.32:65535/api/line/state', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(parm)
                        })
                        .then((res) => res.json())
                        .then((json) => {
                                if (json.status === 200){
                                    // actualiza el estado a cedido
                                    const position = (element) => element.placeNo === item.placeNo;
                                    const idx = data.findIndex(position);
                                    const newData = data
                                    newData[idx].state = parm.state;
                                    setData(newData);
                                    setCeder(newData[idx].state === 3)
                                    console.log("Ceder ? : ", (newData[idx].state === 3));
                                }
                                return json;
                            });
                }

                const pno = (item.placeNo - 1);
                const nit = item.idNit;
                const st = ((item.state === 0 )? 3 : 0);
                const param = {
                idService: item.idService,
                placeNo: pno,
                state: st,
                idNit: nit,
                prefix: item.prefix
                }

                console.log("estado y envio: ", ceder, param );
                getPlaceApi(param);
        }

        cedePlace();
    }  

    function cancelPlace({idNit, prefix, placeNo}) {

      function deletePlace(){}

      Alert.alert("Eliminar turno", "Está usted seguro de hacerlo?",
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        { text: 'OK', onPress: () => console.log('Ok Pressed') }
      ]
      ) ;

    }  

    return (
          <View style={styles.card} >
              <View style={{backgroundColor:'#FD5D5D', borderTopLeftRadius: 6, borderTopRightRadius:6}}>
                  <Text style={styles.textoCard} >{item.nameEntity}</Text>
              </View>
              <View><Text style={styles.textoCard}  > {item.nameLine}</Text></View>
              <View><Text style={styles.textoCard}  > {item.prefix + " "  + pad(item.placeNo, 3)}</Text></View>
              <View><Text style={styles.textoCard}  > {item.nAttenders} Puntos de atención (pendiente)</Text></View>
              <View><Text style={styles.textoCard}  >Tiempo de espera (pendiente)</Text></View>
              <View><Text style={styles.textoCard}  >Turno atendido (pendiente)</Text></View>
              <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity style={{flex:1, 
                                    flexDirection: 'row-reverse', 
                                    justifyContent:'space-around',
                                    alignItems: 'center',
                                    backgroundColor: '#2b2d42',
                                    borderWidth: 1,
                                    borderColor: '#FD5D5D',
                                    borderRadius: 15
                                    }}
                                    onPress={cancelPlace}
                                    >
                        <Image style={styles.tinyLogo}  source={logo} resizeMode="stretch" />
                        <Text style={{color: "white", fontSize: 16, textAlign: "center", height: 32,}}>Cancelar</Text>  
                  </TouchableOpacity>
                  <View style={{width: '25%'}}></View>
                  <TouchableOpacity style={{flex:1, 
                                    flexDirection: 'row-reverse', 
                                    justifyContent:'space-around',
                                    alignItems: 'center',
                                    backgroundColor: ceder ? 'green':'#2b2d42',
                                    borderWidth: 1,
                                    borderColor: ceder ? 'green':'#FD5D5D',
                                    borderRadius: 15
                                    }}
                                    onPress={() =>{cederOnoff()}}
                                    >
                        <View >
                            <Text style={{color: "white", fontSize: 16, textAlign: "center", height: 32,}}>Ceder</Text>
                        </View>
                  </TouchableOpacity>      
              </View>
          </View>
    )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red', //'#FD5D5D',
      width: "100%"
    },
    card:{
      flex: 1,
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor: '#2b2d42',
      padding: 5,
      borderRadius: 10,
      margin: 3
  },
  line:{
      height: 32,
      width: '100%',
      backgroundColor: '#FD5D5D', //'whitesmoke',
      padding: 5,
  
  },
  textoCard:{
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
      width: '100%',
      height: 32,
  },    
  tinyLogo:{
    width: 28,
    height: 28,
  }  
  });

  export default Tarjeta;