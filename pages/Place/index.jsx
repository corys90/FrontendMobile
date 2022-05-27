import React, { useEffect, useState }  from 'react';
import { View, TextInput, StyleSheet, Pressable, 
  Text, Button, Alert, ScrollView, FlatList, Image, TouchableOpacity, Switch  } from 'react-native';
import Tarjeta from "../../component/Tarjeta";
import UriBack from "../../config";

const Place = ({navigation, route})=>{

    const [ceder, setCeder] = useState(false);
    const [data, setData] = useState([]); 
    const [cancel, setCancel] = useState(false);

      useEffect(() => {
          async function getPlaceApi(parm) {
              const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${route.params.turno.token}`
                },
                body: JSON.stringify(parm)
              }
              await fetch(`${UriBack}/api/line/`, options)
              .then((res) => res.json())
              .then((json) => {
                 if (json.turno.status === 201){
                    //setExtradata({aveDelay: json.turno.data.averageDelay, inAtt:json.turno.data.inAttention});
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
                  place: route.params.turno.place
                }
                delete UserInformation._id;
                delete UserInformation.__v;
                setData(UserInformation.place);
                return json; 
            });
          } 

          // 1 = Screen requerido por botton ve turnos, 0 = Toma un turno a la fila
            if (route.params.origin === 0){ 
            getPlaceApi(route.params.turno);
          }else{
            setData(route.params.turno.place);
          }

      },[]);

      function cederTurno(newData){
        setData(newData);
        setCeder(!ceder);
      }

      function cancelTruno(newData){
        setData(newData);
        setCancel(!cancel);
      }

      return(
              <ScrollView  style={styles.container}>
                  {
                    data.map((item, idx)=>{
                      return (
                            <Tarjeta item={item} key={idx} 
                            onClickCeder={cederTurno} 
                            onClickDelete={cancelTruno} 
                            datas={data} 
                            token={route.params.turno.token} />
                      );
                    })
                  }
              </ScrollView >
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

export default Place;
