import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TouchView = (props) => {

  const onPress = () => setModalVisible(true);

  return (
    <View style={styles.container} >
      <TouchableOpacity tt="onPress={onPress">
        <Text style={styles.button}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 0,
    borderColor: "white",
    backgroundColor: "white",
  },
  button: {
    textAlign:"left",
    backgroundColor: "#DDDDDD",
    padding: 5,
    color:'black',
    borderWidth: 1,
    borderColor: 'gray',
  }
});

export default TouchView;