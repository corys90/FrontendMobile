import {React, useEffect} from "react";
import { StyleSheet, View } from 'react-native';
import MyStack from "./pages/MyStack";

import { Provider } from "react-redux";
import Store from "./store";

export default function App() {
  return (
    <>
        <Provider store={Store}>
          <MyStack />
        </Provider>
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
