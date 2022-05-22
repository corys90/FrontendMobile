import React, { useState, useEffect }  from 'react';
import { View, Image, TouchableOpacity, Alert, Text, StyleSheet  } from 'react-native';
import logo from "../../assets/recycle-bin.png";

const PlaceCard = ({item}) => {

  function pad(n, width) {
      n = n + '';
      return n.length >= width ? n : 
          new Array(width - n.length + 1).join('0') + n;
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
            <View style={{flex:1, 
                        flexDirection: 'row', 
                        justifyContent:'space-around',
                        alignItems: 'center',
                        backgroundColor: '#2b2d42',
                        borderWidth: 1,
                        borderColor: '#FD5D5D',
                        borderRadius: 15
                        }}>
                  <Image style={styles.tinyLogo}  source={logo} resizeMode="stretch" />
                  <Text style={{color: "white", fontSize: 16, textAlign: "center", height: 32,}}>Cancelar</Text>  
            </View>

            <TouchableOpacity style={{flex:1, 
                              flexDirection: 'row-reverse', 
                              justifyContent:'space-around',
                              alignItems: 'center',
                              backgroundColor: '#2b2d42',
                              borderWidth: 1,
                              borderColor: '#FD5D5D',
                              borderRadius: 15
                              }}
                              >
                  <View>
                      <Text style={{color: "white", fontSize: 16, textAlign: "center", height: 32,}}>Ceder</Text>
                  </View>
            </TouchableOpacity>      
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  }, 
  });

export default PlaceCard;