import React from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function AcueillScrenn({ navigation }) {
  const handleSinglePlayer = () => {
    navigation.navigate("Game");
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={"#F40075"}
      />
      <ImageBackground
        source={require("../../assets/bg_acceuil.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>TIC</Text>
          <Text style={styles.titleText}>TAC</Text>
          <Text style={styles.titleText}>TOE</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSinglePlayer} style={styles.button}>
            <Text style={styles.buttonText}>Single Player</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Multiplayer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 60,
    letterSpacing: 5,
    fontWeight: "bold",
    color: "#fff"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    // backgroundColor: "#F40075",
    backgroundColor: "rgba(244, 0, 117, 0.7)",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.2
  }
});
