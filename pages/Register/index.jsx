import React from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Text, Button, Alert, Image } from 'react-native';
import logo from "../../assets/logo5.png";

const Register=({navigation})=>{
    
    const [name, onChangeName] = React.useState("");
    const [email, onChangeEmail] = React.useState("");

    const UserInformation = {
      userName: "",
      userEmail: "",
      place:[]
    };
    

const onButtonClick = () => {

    const UserInformation = {
      userName: 'Corys90',
      userEmail: 'Corys90@hotmail.com',
      place:[]
    };

    if ((UserInformation.userName.trim() === "") || (UserInformation.userEmail.trim() === "")){
      Alert.alert("Se requieren un nombre y un correo electrónico");
    }else{
      navigation.navigate("Entities", UserInformation);
    }
}

return(
    <View style={styles.container}>
        <View style={styles.register}>
            <SafeAreaView>
                <View style={styles.tinyLogoContainer}>
                    <Image style={styles.tinyLogo}  source={logo} resizeMode="stretch" />  
                    <Text style={styles.slogan}>Garantiza tu turno.</Text>
                </View>
                <Text style={styles.encabezado}>Datos personales</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    onChangeText={onChangeName}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <View style={{height: 50}}></View>
                <View style={styles.button} >
                    <Button
                            color="#2b2d42"
                            title="Continuar"
                            onPress={onButtonClick}
                    />                   
                </View>
            </SafeAreaView>
        </View>
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
    register: {
        margin: 3,
        padding: 5
    },
    encabezado:{
      color: "white",
      fontWeight: "bold",
      fontSize: 22,
      textAlign: "center"
    },    
    input: {
        height: 40,
        margin: 15,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: "white",
        backgroundColor: "whitesmoke",
        padding: 5,
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
    tinyLogoContainer: {
      height: "31.5%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },    
    tinyLogo: {
      height: "75%",
      width: "75%",
    },   
    slogan: {
      fontSize: 12,
      color: "yellow",
      height: "75%",
      width: "75%",
      textAlign: "center"
    },       
    
  });

export default Register;