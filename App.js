import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Navigation from "./components/Navigation";
import { setLocalNotification } from "./helpers/helpers";

export default class App extends Component {
    componentDidMount() {
        setLocalNotification();
    }
  render() {
      
    return (
      <View style={styles.container}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
