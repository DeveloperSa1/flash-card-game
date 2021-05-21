import * as React from "react";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Home";
import AddDeck from "./AddDeck";
import DeckLists from "./DeckLists";
import DeckDetails from "./DeckDetails";
import AddCard from "./AddCard";
import Quiz from "./Quiz";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
    //   screenOptions={{
    //   headerShown: false
    // }}
    >
      <HomeStack.Screen name="DECKS" component={Home} />
      <HomeStack.Screen name="DeckLists" component={DeckLists} />
      <HomeStack.Screen name="DeckDetails" component={DeckDetails} />
      <HomeStack.Screen name="AddCard" component={AddCard} />
      <HomeStack.Screen name="Quiz" component={Quiz} />
      <HomeStack.Screen name="AddDeck" component={AddDeck} />
    </HomeStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "AddDeck") {
              iconName = "create-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="AddDeck" component={AddDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
