import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, Dimensions, Animated } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const App = () => {
  const [activePlayer, setActivePlayer] = useState('X');
  const [markers, setMarkers] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const markPosition = (position) => {
    if (!markers[position] && !winner) {
      const newMarkers = [...markers];
      newMarkers[position] = activePlayer;
      setMarkers(newMarkers);
      setActivePlayer(activePlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetMarkers = () => {
    setMarkers(Array(9).fill(null));
    setWinner(null);
  };

  const calculateWinner = (squares) => {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const winner = calculateWinner(markers);
    if (winner) {
      setWinner(winner);
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }
      ).start();
    }
  }, [markers]);

  return (
    <SafeAreaView style={styles.body}>
      <View style={[styles.playerInfo, { backgroundColor: activePlayer === 'X' ? '#007FF4' : '#F40075' }]}>
        <Text style={styles.playerTxt}>Player {activePlayer}'s turn</Text>
      </View>
      <View style={styles.mainContainer}>
        {markers.map((value, index) => (
          <Pressable key={index} style={styles.cell} onPress={() => markPosition(index)}>
            {value === 'X' && <Image source={require('./assets/cross.png')} style={styles.icon} />}
            {value === 'O' && <Image source={require('./assets/zero.png')} style={styles.icon} />}
          </Pressable>
        ))}
      </View>
      {winner && (
        <Animated.View style={[styles.winnerOverlay, { opacity: fadeAnim }]}>
          <Text style={styles.winnerText}>Player {winner} Won!</Text>
        </Animated.View>
      )}
      <Pressable style={styles.replayBtn} onPress={resetMarkers}>
        <Image source={require('./assets/replay.png')} style={styles.replayIcon}/>
      </Pressable>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30
  },
  playerTxt: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#fff'
  },
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 60
  },
  cell: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
    borderBottomWidth: 6
  },
  icon: {
    height: 62,
    width: 62
  },
  winnerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  replayBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  replayIcon: {
    height: 80,
    width: 80
  }
});
