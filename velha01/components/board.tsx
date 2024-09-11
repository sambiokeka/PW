import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type SquareProps = {
  value: string | null;
  onPress: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onPress }) => (
  <TouchableOpacity style={styles.square} onPress={onPress}>
    <Text style={styles.text}>{value}</Text>
  </TouchableOpacity>
);

const Board: React.FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const handlePress = (index: number) => {
    const newSquares = squares.slice();
    if (newSquares[index] || calculateWinner(newSquares)) return;
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      Alert.alert('Game Over', `${winner} Wins!`);
    } else if (!newSquares.includes(null)) {
      Alert.alert('Game Over', 'It\'s a Draw!');
    }
  };

  const renderSquare = (index: number) => (
    <Square value={squares[index]} onPress={() => handlePress(index)} />
  );

  const calculateWinner = (squares: Array<string | null>): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <View style={styles.board}>
      <Text style={styles.status}>{status}</Text>
      {[0, 1, 2].map(row => (
        <View key={row} style={styles.row}>
          {[0, 1, 2].map(col => (
            <View key={col} style={styles.cell}>
              {renderSquare(row * 3 + col)}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
  },
  square: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  status: {
    marginBottom: 20,
    fontSize: 24,
  },
});

export default Board;