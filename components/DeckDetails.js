import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet,ScrollView } from "react-native";
import {getDeck} from '../helpers/helpers'
class DeckDetails extends Component {
  
  state = {
    questions : null,
  }
  async componentDidMount() {
    const { title, newQuestion } = this.props.route.params;
    const deck = await getDeck(title);
    try {
      this.setState({
        questions : newQuestion ? deck.questions.push(newQuestion) : deck.questions
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
 let {title,cardLength,newQuestion} = this.props.route.params
let {questions} = this.state;
newQuestion ? questions = newQuestion.questions : questions


    return (
        <ScrollView style={styles.container}>
                <View style={styles.Square}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>Has {cardLength} cards</Text>
                    
                
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
                    'AddCard',{title})}>
                    <Text style={styles.buttonText}>Add Card To Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
               onPress={() => this.props.navigation.navigate(
                    'Quiz',{questions,cardLength})}
                >
                    <Text style={styles.buttonText}>Take a Quiz</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
    Square: { 
        backgroundColor: '#e5e5e5' ,
        width: 300 ,
         height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 12,
    },
    
    title: {
        fontSize: 25,
        color: '#14213d',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 15,
        color: '#14213d',
    },
    container : {
      backgroundColor : 'white',
     

    },
    button: {
        backgroundColor: '#fca311',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width : 100,
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
    },
    buttonText: {
        fontSize: 10,
        color: '#14213d',
        fontWeight: '900',
    },
})

export default DeckDetails
