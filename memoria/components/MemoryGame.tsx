// src/components/MemoryGame.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Função para gerar um baralho de cartas
const generateCards = () => {
  const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
  const cards = [...numbers, ...numbers]; // duplicar as cartas
  return cards.sort(() => Math.random() - 0.5); // embaralhar as cartas
};

// Componente para uma carta
const Card: React.FC<{
  id: number;
  value: number;
  isFlipped: boolean;
  onPress: (id: number) => void;
}> = ({ id, value, isFlipped, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(id)}>
    <Text style={styles.text}>{isFlipped ? value : '?'}</Text>
  </TouchableOpacity>
);

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<number[]>(generateCards());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedIndices([]), 1000); // atraso para a animação
    }
  }, [flippedIndices]);

  const handleCardPress = (index: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIndices.includes(index)) return;
    setFlippedIndices((prev) => [...prev, index]);
  };

  const renderCard = (index: number) => (
    <Card
      key={index}
      id={index}
      value={cards[index]}
      isFlipped={flippedIndices.includes(index) || matchedIndices.includes(index)}
      onPress={handleCardPress}
    />
  );

  return (
    <View style={styles.board}>
      {cards.map((_, index) => renderCard(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '25%',
    justifyContent: 'center',
    margin: '10%',
  },
  card: {
    width: 80,
    height: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8DE7E',
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MemoryGame;
