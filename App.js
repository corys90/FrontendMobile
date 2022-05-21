import {React, useEffect} from "react";
import { StyleSheet, View } from 'react-native';
import MyStack from "./pages/MyStack";

export default function App() {
  return (
    <>
          <MyStack />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FD5D5D'
  },
  head:{
    height: 25
  }
});
