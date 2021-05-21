import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { saveNewCard } from "../helpers/helpers";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };
  onChangeText(name) {
    return (text) => {
      this.setState({ [name]: text });
    };
  }
  handleSubmit = async () => {
    const { question, answer } = this.state;
    const { title } = this.props.route.params;
    let deck;
    question === "" || answer === ""
      ? console.log("error")
      : (deck = await saveNewCard(title, question, answer));
    const { questions } = deck;
    const cardLength = questions.length;
    try {
      this.props.navigation.navigate("DeckDetails", {
        title,
        cardLength,
        newQuestion: deck,
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textHeader}> Add new card </Text>
          <TextInput
            style={styles.input}
            value={this.state.question}
            placeholder="Please Enter The Question"
            onChangeText={this.onChangeText("question")}
          />
          <TextInput
            style={styles.input}
            value={this.state.answer}
            placeholder="Please Enter The Answer"
            onChangeText={this.onChangeText("answer")}
          />

          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
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
export default AddCard;
