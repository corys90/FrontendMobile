import React, { useEffect, useState }  from 'react';
import { View, TextInput, StyleSheet, Pressable, 
  Text, Button, Alert, ScrollView, FlatList, Modal, TouchableOpacity  } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
//import TouchView from "../../component/TouchView";

const Principal=({navigation, route})=>{
    const [data, setData] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [entitySelected, setEntitySelected] = useState("");
    const [infoServices, setInfoServices] = useState();

    let nLines = [];

  async function getEntitiesApi() {
      await fetch("http://192.168.0.32:65535/api/entities/")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          return json;
        });
  }

  useEffect(() => {
    getEntitiesApi();
  }, []);


  async function getEntitiesLineApi() {
    await fetch(`http://192.168.0.32:65535/api/services/${entitySelected.idNit}`)
      .then((res) => res.json())
      .then((json) => {
        setInfoServices(json);
        nLines = json;
        //console.log('filas: ', infoServices);
        return json;
      });
  }

  useEffect(() => {
    getEntitiesLineApi();
  }, [entitySelected]);

  const TouchView = (props) => {

    const onOptionEntitySelected = (pp) => {
      console.log(pp._id, pp.description);
      Alert.alert(pp._id, pp.description);
      setEntitySelected(pp);
      setModalVisible(!modalVisible);
    }

    return (
      <View style={styles.container} >
        <TouchableOpacity 
          onPress={()=>{onOptionEntitySelected(props)}}
          >
          <Text style={styles.button}>{props.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const LinesView = (props) => {

/*     const onOptionEntitySelected = (pp) => {
      console.log(pp._id, pp.description);
      Alert.alert(pp._id, pp.description);
      setEntitySelected(pp);
      setModalVisible(!modalVisible);
    } */

    return (
      <View style={styles.container} >
        <TouchableOpacity 
          //onPress={()=>{onOptionEntitySelected(props)}}
          >
          <Text style={styles.button}>{props.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };

return(
    <View style={styles.container}>
       <View style={{ height: 26 }}></View>
       <View style={{ height: 32 }}>
          <Text style={styles.slogan} >Selección de turnos</Text>
       </View>
        <View style={styles.Header}>
            <TouchableOpacity
              style={styles.entity_Section}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View>
                  <Text  style={styles.texto_seleccion} >Seleccione la entidad aquí</Text>
              </View>
            </TouchableOpacity >
            <View style={styles.infoEntity}>
                  <View style={styles.texto_infoEntity_lines}>
                        <Text style={styles.texto_infoEntity_lines}>Información de la Entidad</Text>
                  </View>
                  <Text style={styles.texto_infoEntity}>{entitySelected.description}</Text>
                  <Text style={styles.texto_infoEntity}>{entitySelected.address}</Text>
                  <Text style={styles.texto_infoEntity}>{entitySelected.idNit}</Text>
                  <View style={styles.texto_infoEntity_lines}>
                        <Text style={styles.texto_infoEntity_lines}>Filas de atención</Text>
                  </View>
                  <View>
                      <FlatList  
                          data={infoServices}
                          renderItem ={({item}) => <LinesView {...item}  />}
                      />
                  </View>

            </View>
        </View>
        <ScrollView >
            <View style={styles.cards}>
                <Text>Name: {route.params.name}</Text>
                <Text>Email: {route.params.email}</Text>
            </View>
            <View style={styles.cards}>
                <Text>Name: {route.params.name}</Text>
                <Text>Email: {route.params.email}</Text>
            </View>
            <View style={styles.cards}>
                <Text>Name: {route.params.name}</Text>
                <Text>Email: {route.params.email}</Text>
            </View>
            <View style={styles.cards}>
                <Text>Name: {route.params.name}</Text>
                <Text>Email: {route.params.email}</Text>
            </View>
        </ScrollView>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible);}}
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
      justifyContent: "center",
      backgroundColor: '#FD5D5D',
      width: "100%"
    },
    Header:{
      height: 270,
      backgroundColor: 'whitesmoke',
      padding: 10,
      alignItems:'center'
    },
    infoEntity:{
        backgroundColor: '#FD5D5D',
        margin: 5,
        width: '100%',
        borderWidth: 3,
        borderColor: 'gray',
        borderRadius: 6
    },
    texto_infoEntity: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center"
    },    
    texto_infoEntity_lines: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      borderWidth: 1,
      backgroundColor: 'red',
      borderColor: 'gray'

    }, 
    entity_Section:{
      height: 45,
      width: '100%',
      backgroundColor: '#FD5D5D',
      borderWidth: 4,
      borderColor: 'gray',
      borderRadius: 10,
      padding: 5,
    },
    cards: {
        height: 200,
        backgroundColor: 'blue',
        borderWidth: 2,
        borderColor: 'whitesmoke',
        borderRadius: 6,
        padding: 5,
        margin: 10

    },
    slogan: {
        color: "white",
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center"
    },
    texto_seleccion: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center"
    },
    button: {
      textAlign:"left",
      backgroundColor: "#DDDDDD",
      padding: 5,
      color:'black',
      borderWidth: 1,
      borderColor: 'gray',
    },
    modal_centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      height:'50%'
    },
    modal_options:{
      height: 300,
      backgroundColor: '#c1121f',
      borderWidth: 2,
      borderColor: 'whitesmoke',
      borderRadius: 6,
      margin: 10
    },
  });

export default Principal;