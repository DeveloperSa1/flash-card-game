import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {clearLocalNotification} from '../helpers/helpers'

class Quiz extends Component {
  state = {
    index: 0,
    isCorrect: 0,
    isInCorrect: 0,
    showAnswer: false,
  };

  componentDidMount() {
    const {index,total} = this.state
    if(index + 1 > total) {
      clearLocalNotification
    }
  }

  handleShowAnswer = () => {
    let showAnswer = this.state.showAnswer;
    this.setState({ showAnswer: !showAnswer });
  };

  resetQuiz = () => {
    this.setState(() => ({
      isCorrect: 0,
      isInCorrect: 0,
      index: 0,
    }));
  };

  handleCorrectAnswer = (correct) => {
    let isCorrect = correct ? this.state.isCorrect + 1 : this.state.isCorrect;
    let index = this.state.index + 1;
    this.setState(() => ({
      isCorrect,
      index,
      showAnswer: false,
    }));
  };

  handleInCorrectAnswer = (correct) => {
    let isInCorrect = correct
      ? this.state.isInCorrect + 1
      : this.state.isInCorrect;
    let index = this.state.index + 1;
    this.setState(() => ({
      isInCorrect,
      index: index,
      showAnswer: false,
    }));
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { index, isCorrect } = this.state;
    const { questions } = this.props.route.params;
    const total = this.props.route.params.cardLength;
    if (!total) {
      return (
        <View style={styles.Square}>
          <Text style={styles.textHeader}>
            {" "}
            Sorry , there's no Cards Please, Create one{" "}
          </Text>
        </View>
      );
    } else if (index + 1 > total) {
      return (
        <View style={styles.Square}>
          <Text style={styles.textHeader}> The Result </Text>
          <Text style={styles.title}>
            Your score: {isCorrect}/{index}
          </Text>

          <Text style={styles.title}>Total Correct {this.state.isCorrect}</Text>
          <TouchableOpacity style={styles.button} onPress={this.resetQuiz}>
            <Text style={styles.buttonText}>Restart the Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goBack}>
            <Text style={styles.buttonText}>Back To deck</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.Square}>
        <Text style={styles.title}>
          {this.state.index + 1}/{total}
        </Text>

        {!this.state.showAnswer ? (
          <View>
            <Text style={styles.textHeader}>{questions[index].question}</Text>
            <TouchableOpacity
              style={styles.correctBtn}
              onPress={this.handleCorrectAnswer}
            >
              <Text style={styles.buttonText}>Correct Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inCorrectBtn}
              onPress={this.handleInCorrectAnswer}
            >
              <Text style={styles.buttonText}>InCorrect Answer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{questions[index].answer}</Text>
            <TouchableOpacity
              onPress={this.handleShowAnswer}
            ></TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={this.handleShowAnswer}>
          <Text style={styles.buttonText}>
            {this.state.showAnswer ? "Back to question" : "Show Answer"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 20,
    color: "#14213d",
    fontWeight: "bold",
    textAlign: "center",
  },
  Square: {
    backgroundColor: "#e5e5e5",
    flex: 1,
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 10,
    // marginBottom: 10,
    marginHorizontal: 12,
  },

  title: {
    fontSize: 25,
    color: "#14213d",
  },
  inCorrectBtn: {
    backgroundColor: "#e63946",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  correctBtn: {
    backgroundColor: "#2d6a4f",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  button: {
    height: 40,
    width: "50%",
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fca311",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
  },
});

export default Quiz;