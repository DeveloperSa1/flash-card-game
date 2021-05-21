import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { saveNewDeck } from "../helpers/helpers";
class AddDeck extends Component {
  state = {
    title: "",
  };
  onChangeText = (title) => {
    this.setState({
      title,
    });
  };

  handleNewDeck = async () => {
    const { title } = this.state;
    const { navigation } = this.props;
    const newDeck = await saveNewDeck(title);
    const { questions } = await newDeck;
    try {
      navigation.navigate("DECKS", {
        title,
        cardLength: questions.length,
        newDeck,
      });
      this.setState({ title: "" });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { title } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textHeader}> Add new deck </Text>
          <TextInput
            style={styles.input}
            value={this.state.title}
            placeholder="Please Enter The Title"
            onChangeText={this.onChangeText}
          />

          <TouchableOpacity style={styles.button} onPress={this.handleNewDeck}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  textHeader: {
    fontSize: 20,
    color: "#14213d",
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    height: 30,
    width: 280,
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 10,
  },
  button: {
    height: 30,
    width: "100%",
    padding: 8,
    marginTop: 10,
    backgroundColor: "#fca311",
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#14213d",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default AddDeck;
