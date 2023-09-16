import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthentication } from "../../hooks/useAuthentication";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  getLocationPermission,
  getUserLocation,
} from "../../services/location.service";
import { sendSMS } from "../../services/sms.service";
import ConversationList from "../Chatting/ConversationList";
import HomeNavbar from "./Navbar/HomeNavbar";
import { AntDesign } from "@expo/vector-icons";

const auth = getAuth();

export default function HomeScreen({ navigation }) {
  const [loudButtonPressed, setLoudButtonPressed] = useState(false);
  const [silentButtonPressed, setSilentButtonPressed] = useState(false);

  const quotes = [
    {
      "quote": "Believe in yourself and all that you are."
    },
    {
      "quote": "You are stronger than you think."
    },
    {
      "quote": "Every day is a fresh start."
    },
    {
      "quote": "Success begins with a single step."
    },
    {
      "quote": "Inhale courage, exhale fear."
    },
    {
      "quote": "You are capable of amazing things."
    },
    {
      "quote": "Stay positive, work hard, make it happen."
    },
    {
      "quote": "Your time is now."
    },
    {
      "quote": "Embrace the journey, not just the destination."
    },
    {
      "quote": "Dream big, work hard."
    },
    {
      "quote": "The only limit is you."
    },
    {
      "quote": "Every moment is a fresh beginning."
    },
    {
      "quote": "You are the author of your story."
    },
    {
      "quote": "Chase your dreams with determination."
    },
    {
      "quote": "Happiness is a choice."
    },
    {
      "quote": "Focus on the good."
    },
    {
      "quote": "You are enough, just as you are."
    },
    {
      "quote": "Keep going, you're getting there."
    },
    {
      "quote": "Hard times may have held you down, but they will not last forever."
    },
    {
      "quote": "Do something today that your future self will thank you for."
    },
    {
      "quote": "The best way to predict the future is to create it."
    },
    {
      "quote": "Be the reason someone smiles today."
    },
    {
      "quote": "Success is not the key to happiness; happiness is the key to success."
    },
    {
      "quote": "You are never too old to set another goal or to dream a new dream."
    },
    {
      "quote": "The only way to do great work is to love what you do."
    }
  ]
  

  useEffect(() => {
    getLocationPermission();
  }, []);

  useEffect(() => {
    if (loudButtonPressed || silentButtonPressed) {
      const interval = setInterval(() => {
        getUserLocation().then((data) => {
          sendSMS({ latitude: data.latitude, longitude: data.longitude });
        });
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [loudButtonPressed, silentButtonPressed]);

  const { user } = useAuthentication();

  function onPressLoudButton() {
    setLoudButtonPressed(!loudButtonPressed);
    setSilentButtonPressed(false);
  }

  function onPressSilentButton() {
    setSilentButtonPressed(!silentButtonPressed);
    setLoudButtonPressed(false);
  }

  return (
    <View style={styles.container}>
      <HomeNavbar navigation={navigation}  />

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.button, styles.loudButton]}
          onPress={onPressLoudButton}
        >
          <Text style={styles.emergency}>Emergency</Text>
          <Text style={styles.emergencyType}>LOUD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.silentButton]}
          onPress={onPressSilentButton}
        >
          <Text style={styles.emergency}>Emergency</Text>
          <Text style={styles.emergencyType}>SILENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b3a4f",
  },
  content: {
    flex: 1, 
    alignItems: "center",
    marginTop:100
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    width: "75%",
  },
  loudButton: {
    backgroundColor: "#b63132",
  },
  silentButton: {
    backgroundColor: "#12438f",
  },
  emergency: {
    color: "white",
    marginRight: 10,
    fontSize: 20,
  },
  emergencyType: {
    color: "#ffba1e",
    fontSize: 20,
  },
});
