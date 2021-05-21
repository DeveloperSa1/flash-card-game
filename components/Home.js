import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getDecks } from "../helpers/helpers";
import DeckLists from "./DeckLists";

class Home extends Component {
  state = {
    decks: {},
  };

  getAllDecks = async () => {
    const decks = await getDecks();
    this.setState({
      decks,
    });
  };

  componentDidMount() {
    this.getAllDecks();
  }

  render() {
    let { decks } = this.state;

    if (this.props.route.params) {
      let { newDeck, title } = this.props.route.params;
      decks[title] = newDeck;
    }

    return (
      <ScrollView>
        {Object.keys(decks).map((title) => {
          const cardLength = decks[title].questions.length;
          return (
            <DeckLists
              cardLength={cardLength}
              title={title}
              key={title}
              {...this.props}
            />
          );
        })}
      </ScrollView>
    );
  }
}

export default Home;
