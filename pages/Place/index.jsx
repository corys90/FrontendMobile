import React, { useEffect, useState }  from 'react';
import { View, TextInput, StyleSheet, Pressable, 
  Text, Button, Alert, ScrollView, FlatList, Modal, TouchableOpacity  } from 'react-native';
import { Router } from 'react-router-dom';

const Place=({navigation, route})=>{

  const [data, setData] = useState(); 
  const [service, setService] = useState(); 

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
            setData(json);
            delete route.params._id;
            delete route.params.__v;
            const turno = {
              idNit: route.params.idNit,
              idService:route.params.idService,
              nameEntity: route.params.name,
              description: route.params.description,
              prefix:route.params.prefix,
              placeNo: json.turno.data.placeNo,
              date:json.turno.data.date,
              state:0,
              laty: route.params.laty,
              lonx: route.params.lonx,
              address: route.params.address,
              nameLine:route.params.nameLine
            };
            route.params.place.push(turno);
            const UserInformation = {
              userName : route.params.userName,
              userEmail: route.params.userEmail,
              place:route.params.place
            }
/*             UserInformation.place.forEach((item)=>{
              console.log("Turnos solicitados: ", item);
            }) */
            console.log("Turno confirmado.place: ", UserInformation);
            return json;
        });
      }

    getPlaceApi(route.params);
  }, []);

  const Card = ({item}) => {

/*     const onPressOpacity = () => {
         const turno = {
          idService: service._id,
          prefix:item.prefix,
          name: route.params.nameUser,
          idNit: service.idNit
         }; 
      
        console.log("Turno: ", turno);
        navigation.navigate("Place", turno);  
    } */

  return (
    <View >
      <TouchableOpacity 
         style={styles.card}
        onPress={onPressOpacity}
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