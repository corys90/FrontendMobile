import React, { useEffect, useState }  from 'react';
import { View, TextInput, StyleSheet, Pressable, 
  Text, Button, Alert, ScrollView, FlatList, Image, TouchableOpacity, Switch  } from 'react-native';
import PlaceCard from "../../component/PlaceCard";

const Place = ({navigation, route})=>{

  const [data, setData] = useState(); 

  console.log("Place : ", route.params);

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
            //console.log("De UseEffect: ",UserInformation.place);
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

  }, []);

return(
        <View style={styles.container}>
            <FlatList  data={data}  renderItem ={PlaceCard} />
        </View>
)
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'red', //'#FD5D5D',
    width: "100%"
  }
});

export default Place;