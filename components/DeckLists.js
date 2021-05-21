import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

class DeckLists extends Component {
  render() {
    const { title, navigation, cardLength } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("DeckDetails", {
              title: title,
              cardLength: cardLength,
            });
          }}
        >
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 20, color: "#14213d" }}>{title}</Text>
            <Text style={{ color: "#14213d" }}>{cardLength} cards</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 45,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e5e5e5",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#fca311",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

export default DeckLists;