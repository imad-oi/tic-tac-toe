import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
  Animated,
  ImageBackground,
  StatusBar
} from "react-native";
import useTimer from "../hooks/use-timer";

const windowWidth = Dimensions.get("window").width;

const GameScreen = () => {
  const [activePlayer, setActivePlayer] = useState("X");
  const [markers, setMarkers] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [seconds,setSeconds] = useTimer()

  const markPosition = position => {
    if (!markers[position] && !winner) {
      const newMarkers = [...markers];
      newMarkers[position] = activePlayer;
      setMarkers(newMarkers);
      setActivePlayer(activePlayer === "X" ? "O" : "X");
    }
  };

  const resetMarkers = () => {
    setMarkers(Array(9).fill(null));
    setWinner(null);
    setSeconds(30); // reset the timer
  };

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // if the timer reaches 0, the game is over
  useEffect(() => {
    if (seconds === 0) {
      setWinner(activePlayer === "X" ? "O" : "X");
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
    }
  }, [seconds]);

  useEffect(() => {
    const winner = calculateWinner(markers);
    if (winner) {
      setWinner(winner);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();

      // stop the timer
      setSeconds(0);
    }
  }, [markers]);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar
        backgroundColor={activePlayer === "X" ? "#007FF4" : "#F40075"}
      />
      <ImageBackground
        source={require("../../assets/bg.png")}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <Text style={styles.pageTtile}>Tic Tac Toe</Text>
      <View
        style={[
          styles.playerInfo,
          { backgroundColor: activePlayer === "X" ? "#007FF4" : "#F40075" }
        ]}
      >
        <Text style={styles.playerTxt}>
          Player
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
            {" " + activePlayer + " "}
          </Text>
          's turn
        </Text>
      </View>
      <Text style={styles.timer}>Timer: {seconds}</Text>

      <View style={styles.mainContainer}>
        {markers.map((value, index) => (
          <Pressable
            key={index}
            style={styles.cell}
            onPress={() => markPosition(index)}
          >
            {value === "X" && (
              <Image
                source={require("../../assets/cross.png")}
                style={styles.icon}
              />
            )}
            {value === "O" && (
              <Image
                source={require("../../assets/zero.png")}
                style={styles.icon}
              />
            )}
          </Pressable>
        ))}
      </View>
      {winner && (
        <Animated.View style={[styles.winnerOverlay, { opacity: fadeAnim }]}>
          <Text style={styles.winnerText}>Player {winner} Won!</Text>
        </Animated.View>
      )}
      <Pressable style={styles.replayBtn} onPress={resetMarkers}>
        <Image
          source={require("../../assets/replay.png")}
          style={styles.replayIcon}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
    // position: "relative" // for replay button
  },
  pageTtile: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    padding: 10,
    color: "white",
    shadowColor: "#000",
    borderRadius: 10,
    backgroundColor: "#000000a0"
  },
  playerInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  playerTxt: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1.2,
    padding: 10,
    color: "#fff",
    shadowColor: "#000"
  },
  mainContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: windowWidth,
    justifyContent: "center",
    marginTop: 20
  },
  cell: {
    width: windowWidth / 3.1,
    height: windowWidth / 3.1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5
  },
  icon: {
    height: 62,
    width: 62
  },
  winnerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  winnerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff"
  },
  replayBtn: {
    marginTop: 20,
    backgroundColor: "#000000a0",
    borderRadius: 50
  },
  replayIcon: {
    height: 80,
    width: 80
  },
  timer: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 15,
    padding: 10,
    color: "white",
    shadowColor: "#000",
    borderRadius: 10,
    backgroundColor: "#000000a0"
  }
});
