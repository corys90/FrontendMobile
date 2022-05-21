import React, { useEffect, useState }  from 'react';
import { View, TextInput, StyleSheet, Pressable, 
  Text, Button, Alert, ScrollView, FlatList, Modal, TouchableOpacity  } from 'react-native';
import { Router } from 'react-router-dom';

const Place=({navigation, route})=>{

  const [data, setData] = useState(); 

  console.log("lo que viene de param.turno.place: ", route.params.turno.place);
  
  useEffect(() => {
      async function getPlaceApi(parm) {
          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parm)
         }
         await fetch('http://192.168.0.32:65535/api/line/', options)
         .then((res) => res.json())
         .then((json) => {
            if (json.turno.status === 201){
                const turno = {
                  idNit: route.params.turno.idNit,
                  idService:route.params.turno.idService,
                  nameEntity: route.params.turno.name,
                  description: route.params.turno.description,
                  prefix:route.params.turno.prefix,
                  placeNo: json.turno.data.placeNo,
                  date:json.turno.data.date,
                  state:0,
                  laty: route.params.turno.laty,
                  lonx: route.params.turno.lonx,
                  address: route.params.turno.address,
                  nameLine:route.params.turno.nameLine
                };
                route.params.turno.place.push(turno);
            }
            const UserInformation = {
              userName : route.params.turno.userName,
              userEmail: route.params.turno.userEmail,
              place:route.params.turno.place
            }
            delete UserInformation._id;
            delete UserInformation.__v;
            console.log("De UseEffect: ",UserInformation.place);
            setData(UserInformation.place);
            return json;
        });
      }
      // 1 = Screen requerido por botton ve turnos, 0 = Toma un turno a la fila
/*       if (route.params.origin === 0){ */
        getPlaceApi(route.params.turno);
/*       }else{
        setData(UserInformation.place);
      } */

  }, []);

  const Card = ({item}) => {
  return (
    <View >
      <TouchableOpacity 
         style={styles.card}
        >
        <View style={{backgroundColor:'#FD5D5D', borderTopLeftRadius: 6, borderTopRightRadius:6}}>
            <Text style={styles.textoCard} >{item.name}</Text>
        </View>
        <View><Text style={styles.textoCard}  >Prefijo {item.prefix}</Text></View>
        <View><Text style={styles.textoCard}  >Atendido por {item.nAttenders} persona(s)</Text></View>
        <View><Text style={styles.textoCard}  >Turno atendido (pendiente)</Text></View>
        <View><Text style={styles.textoCard}  >Turnos en espera (pendiente)</Text></View>
      </TouchableOpacity>
    </View>
  );
};

return(
    <View style={styles.container}>
           <FlatList  data={data}  renderItem ={Card} />
    </View>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'red', //'#FD5D5D',
    width: "100%"
  },
  card:{
      height: 200,
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
});

export default Place;