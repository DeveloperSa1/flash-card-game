import AsyncStorage from "@react-native-async-storage/async-storage";
import { Notifications, Permissions } from "expo";
const DECK_STORAGE_KEY = "DECK_KEY";
const NOTIFICATION_KEY = "NOTIFICATION";

export let InitialDeck = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces",
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
};

export const getInitialDeck = () => {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(InitialDeck));
  return InitialDeck;
};

export const getDecks = async () => {
  const getItems = await AsyncStorage.getItem(DECK_STORAGE_KEY);
  const items = (await getItems) ? JSON.parse(getItems) : getInitialDeck();

  return items;
};

export const saveNewCard = async (title, question, answer) => {
  const items = await getDecks();
  let decks = items;
  decks[title].questions.push({ question, answer });
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
  return decks[title];
};

export const getDeck = async (title) => {
  const allDecks = await getDecks();
  const deck = allDecks(title);
  return deck;
};

export const saveNewDeck = async (title) => {
  let newDeck = {
    [title]: { title, questions: [] },
  };
  const saveDeck = await AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify(newDeck)
  );
  return (newDeck = newDeck[title]);
};

function createNotification() {
  return {
    title: "Take a Quiz",
    body: " Don't forget to take a quiz today",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: "false",
      vibrate: "true",
    },
  };
}

// Notification - code 

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to log your data today!",
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
