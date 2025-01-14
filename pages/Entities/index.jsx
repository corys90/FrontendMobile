import React, { useEffect, useState }  from 'react';
import { View, TextInput, StyleSheet, Pressable, 
  Text, Button, Alert, ScrollView, FlatList, Modal, TouchableOpacity  } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import UriBack from "../../config";

const Principal=({navigation, route})=>{

  const [data, setData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [entitySelected, setEntitySelected] = useState("");
  const [origin, setOrigin] = useState(
    {latitude: 10.423394, 
      longitude:-75.548792,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03
    });

  async function getEntitiesApi() {
      
      await fetch(`${UriBack}/api/entities/`, {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${route.params.token}`
        }
      })
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          return json;
        });
  }

  useEffect(() => {
    getEntitiesApi();
  }, []);

  const TouchView = (props) => {

    const onOptionEntitySelected = (pp) => {

      setModalVisible(!modalVisible);
      const corrd = {
        latitude: pp.laty,
        longitude: pp.lonx,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      }
      setOrigin(corrd);
      setEntitySelected(pp);
    }

    return (
      <View >
        <TouchableOpacity 
          onPress={()=>{onOptionEntitySelected(props)}}
          >
          <Text style={styles.modal_options_text}>{props.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onButtonClick = () => {

    if (entitySelected === ""){
        Alert.alert("Seleccione una entidad antes de avanzar");
    }else{
      const parametros = {
        ...entitySelected,
        ...route.params
      }
      navigation.navigate("Lines", parametros);      
    }
  }

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

return(
    <View style={styles.container}>
        {
          // zona de sección
        }
        <View style={styles.button}>
            <View >
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
              >
                <View>
                    <Text style={styles.texto_seleccion} >Seleccione la entidad aquí</Text>
                </View>
              </TouchableOpacity >
            </View>
        </View>
        {
          // zona de sección
        }
        <View style={styles.infoEntity}>
              <Text style={styles.texto_infoEntity}>{entitySelected.description}</Text>
              <Text style={styles.texto_infoEntity}>{entitySelected.address}</Text>
              <Text style={styles.texto_infoEntity}>{entitySelected.phone}</Text>
        </View>
        {
          // zona de mapas
        }
        <View style={styles.map}>
            <MapView
              style={{width: '100%', height: '100%'}}
              provider={PROVIDER_GOOGLE}
              mapType='hybrid'
              initialRegion={{
                longitude: origin.longitude,
                latitude: origin.latitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03
              }}
              region={
                {
                  longitude: origin.longitude, 
                  latitude: origin.latitude,                 
                  latitudeDelta: 0.0092,
                  longitudeDelta: 0.0092
                }
              }
            >
              <Marker 
                coordinate={origin}
              />
            </MapView>
        </View>
        {
          // Zona de ventana modal
        }
        <View style={styles.button} >
                    <Button
                            color="#2b2d42"
                            title="Continuar"
                            onPress={onButtonClick}
                    />                   
        </View>
        {
          // Zona de ventana modal
        }
        <View style={styles.button} >
                    <Button
                            color="#2b2d42"
                            title="Ver mis turnos "
                            onPress={onButtonClickVer}
                    />                   
        </View>
        {
          // Zona de ventana modal
        }
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible);}}
            onShow={getEntitiesApi}
        >
          <View style={styles.modal_centeredView}>
            <View style={styles.modal_options}>
                <Text style={{color: 'white', textAlign:'center', fontSize: 18, padding:10}} >Seleccione entidad</Text>
                <FlatList  
                      data={data}
                      renderItem ={({item}) => <TouchView {...item}  />}
                />
            </View>            
          </View>
        </Modal>
    </View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'space-evenly',
      width: "100%",
      alignContent: 'center',
      backgroundColor: '#FD5D5D'
    },
    Header:{
      padding: 10,
    },
    infoEntity:{
        backgroundColor: "#2b2d42",
        margin: 'auto',
        width: '100%',
        borderWidth: 3,
        borderColor: 'gray',
        borderRadius: 12,
        padding: 20 
    },
    map:{
      width: '100%',
      height: 210,
      borderWidth: 3,
      borderRadius: 12,
      alignContent: 'center',
      padding: 2

    },
    texto_infoEntity: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
      padding: 10
    },    
    texto_seleccion: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
      width: '100%',
      height: 32,
    },
    button: {
      borderWidth: 10,
      backgroundColor: "#2b2d42",
      borderColor: "#2b2d42",
      width: "100%",
      padding: 2,
      margin: "auto",
      borderRadius: 10,
    },
    modal_centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      height:'50%'
    },
    modal_options:{
      height: '60%',
      width: '80%',
      backgroundColor: '#c1121f',
      borderWidth: 2,
      borderColor: 'whitesmoke',
      borderRadius: 6,
      margin: 10
    },
    modal_options_text:{
      textAlign:"left",
      backgroundColor: "#DDDDDD",
      padding: 5,
      color:'black',
      borderWidth: 1,
      borderColor: 'gray'
    }
  });

export default Principal;