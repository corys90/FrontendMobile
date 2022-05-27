import React, { useEffect, useState }  from 'react';
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity, Button, Alert } from 'react-native';
import busto from "../../assets/busto.png";
import UriBack from "../../config";

const Lines=({navigation, route})=>{
    
    const [data, setData] = useState(); 
    const [service, setService] = useState(); 

   useEffect(() => { 
        async function getLinesApi() {
          await fetch(`${UriBack}/api/services/${route.params.idNit}`,{
              method:'GET',
              headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${route.params.token}`
              }
          })
            .then((res) => res.json())
            .then((json) => {
              if (!json){
                Alert.alert("No hay servicios disponibles para la entidad seleccionada.");
              }else{
                setData(json[0].lines);
                setService(json[0]);
                return (json[0].lines);
              }
            });
        } 
        getLinesApi();
    },[]);
 
    const onButtonClickVer = () => {

      if (route.params.place.length > 0){
        const parametros = {
          origin:1,
          turno:route.params
        }
        navigation.navigate("Place", parametros);  
      }else{
        Alert.alert("No tiene turnos tomados.");
      } 
    }

    const Card = ({item}) => {
          const onPressOpacity = () => {
               const turno = {
                idService: service._id,
                prefix:item.prefix,
                name: route.params.userName,
                idNit: service.idNit,
                nameLine: item.name,
                ...route.params
               }; 
               const origin = 0;
               navigation.navigate("Place", {turno, origin});  
          }

        return (
          <View>
                  <View style={styles.card} >
                      <View style={{backgroundColor:'#8d99ae', borderTopLeftRadius: 6, borderTopRightRadius:6}}>
                          <Text style={styles.textoCard} >{item.name} ({item.prefix})</Text>
                      </View>
                      <View style={{height: 22}}></View>
                      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
                            <View>
                                <Image style={styles.tinyLogo}  source={busto} resizeMode="stretch" />
                            </View>
                      <View>
                            <Text style={styles.textoCard}  >+ {item.nAttenders}</Text>
                      </View>
                      </View>
                      <View style={{height: 22}}></View>
                      <TouchableOpacity 
                      style={styles.card}
                      onPress={onPressOpacity}
                      >
                            <View style={{backgroundColor:'#F55353', 
                                          borderRadius: 6, 
                                          height : 45,
                                          justifyContent: 'center'
                                          }}>
                                <Text style={styles.textoCard} >Pulse aquí para tomar un turno</Text>
                            </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{height:20}}></View>
          </View>
        );
    };

  return(
      <View style={styles.container}>
            <FlatList  data={data}  renderItem ={Card} />
            <View style={{height: 20}}>
            </View>
            {
              // Zona de ventana modal
            }
            <View style={styles.button} >
                        <Button
                                color="#2b2d42"
                                title="Ver mis turnos"
                                onPress={onButtonClickVer}
                        />                   
            </View>
            <View style={{height: 20}}>
            </View>
      </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: '#FD5D5D', //'#FD5D5D',
      width: "100%"
    },
    card:{
        flex: 1,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#2b2d42',
        padding: 15,
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
      width: 40,
      height: 40,
  },
      button: {
      borderWidth: 10,
      backgroundColor: "#2b2d42",
      borderColor: "#2b2d42",
      width: "100%",
      padding: 2,
      margin: "auto",
      borderRadius: 10,
    }
  });

export default Lines;