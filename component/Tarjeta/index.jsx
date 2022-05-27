import React, { useEffect, useState }  from 'react';
import { View, TextInput, StyleSheet, Pressable, 
  Text, Button, Alert, ScrollView, FlatList, Image, TouchableOpacity, Switch  } from 'react-native';
import logo from "../../assets/recycle-bin-red.png";
import UriBack from "../../config";

const Tarjeta = ({item, onClickCeder, onClickDelete, datas, token}) =>{

  const [ceder, setCeder] = useState(item.state === 3);
  const [extradata, setExtradata] = useState({});
  const [estado, setEstado] = useState(0);

  useEffect(() => {

    async function getApiData(){
      const options = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
      }
      await fetch(`${UriBack}/api/line/` + item.idService + "?" + "idNit=" + 
      item.idNit + "&prefix=" + item.prefix + "&place=" + item.placeNo, options)
      .then((res) => res.json())
      .then((json) => {
        const rest = {
          idService: item.idService,
          idNit: item.idNit,
          prefix: item.prefix,
          ...json
        }
        setExtradata(json.data);
        console.log("turno atendido: ", rest.data.inAttention, extradata.inAttention, json, item.placeNo);
        if (rest.data.inAttention >= item.placeNo){
            if (rest.data.inAttention === item.placeNo){
              setEstado(1);
              if (rest.data.state === 4){
                  Alert.alert("Ustéd está siendo solicitado para atención!!!");
              }
            }else if ((rest.data.state === 1) || (rest.data.state === 2)) {
                setEstado(2);
            }
            clearTimeout(timer);
        }
      })
    }

    const timer = setTimeout( async () => {
      getApiData();
    }, 5000);

    return () => clearTimeout(timer);
  }, [extradata]);


  function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : 
        new Array(width - n.length + 1).join('0') + n;
  } 

  function cederOnoff() {
      function cedePlace(){
              async function getPlaceApi(parm) {
                      await fetch(`${UriBack}/api/line/state`, {
                              method: 'PUT',
                              headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify(parm)
                      })
                      .then((res) => res.json())
                      .then((json) => {
                              if (json.status === 200){
                                  // actualiza el estado a cedido
                                  const position = (element) => element.placeNo === item.placeNo;
                                  const idx = datas.findIndex(position);
                                  const newData = datas
                                  newData[idx].state = parm.state;
                                  //setData(newData);
                                  setCeder(newData[idx].state === 3);
                                  onClickCeder(newData);
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

              getPlaceApi(param);
      }
      cedePlace();
  }  

  function cancelPlace({idNit, prefix, placeNo}) {

    Alert.alert("Eliminar turno", "Está usted seguro de hacerlo?",
    [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      { text: 'OK', onPress: () => {
          function cedePlace(){
              async function getPlaceApi(parm) {
                      await fetch(`${UriBack}/api/line/state`, {
                              method: 'PUT',
                              headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify(parm)
                      })
                      .then((res) => res.json())
                      .then((json) => {

                              if (json.status === 200){
                                  // actualiza el estado a cedido
                                  const position = (element) => {
                                    return (element.placeNo === item.placeNo);
                                  };
                                  const idx = datas.findIndex(position);
                                  const newData = datas
                                  newData.splice(idx, 1);
                                  onClickDelete(newData);
                              }
                              return json;
                      });
              }

              const pno = (item.placeNo - 1);
              const nit = item.idNit;
              const st = 2;
              const param = {
                  idService: item.idService,
                  placeNo: pno,
                  state: st,
                  idNit: nit,
                  prefix: item.prefix
              }
              getPlaceApi(param);
          }
          cedePlace();
      }}
    ]
    ) ;

  }  

  return (
      <View>
        <View style={estado === 0 ? styles.card : ( estado ===1 ? styles.card2: styles.card3)} >
            <View style={{backgroundColor:'#FD5D5D', borderTopLeftRadius: 6, borderTopRightRadius:6}}>
                <Text style={styles.textoCard} >{item.nameEntity}</Text>
            </View>
            <View><Text style={styles.textoCard}  > {item.nameLine}</Text></View>
            <View><Text style={styles.textoCard}  > {item.prefix + " "  + pad(item.placeNo, 3)}</Text></View>
            <View><Text style={styles.textoCard}  >Tiempo de espera {extradata.averageDelay} min</Text></View>
            <View><Text style={styles.textoCard}  >Turno atendido {extradata.inAttention}</Text></View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{flex:1, 
                                  flexDirection: 'row-reverse', 
                                  justifyContent:'space-around',
                                  alignItems: 'center',
                                  backgroundColor:  '#2b2d42',
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
                                  borderColor: '#FD5D5D',
                                  borderRadius: 15
                                  }}
                                  onPress={cederOnoff}
                                  >
                      <View >
                          <Text style={{color: "white", fontSize: 16, textAlign: "center", height: 32,}}>Ceder</Text>
                      </View>
                </TouchableOpacity>      
            </View>
        </View>
        <View style={{height: 20}}></View>
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FD5D5D', //'#FD5D5D',
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
card2:{
  flex: 1,
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: 'white',
  backgroundColor: 'green',
  padding: 5,
  borderRadius: 10,
  margin: 3
},
card3:{
  flex: 1,
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: 'white',
  backgroundColor: 'gray',
  padding: 5,
  borderRadius: 10,
  margin: 3
},
disabled:{
  flex: 1,
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: 'gray',
  backgroundColor: 'gray',
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