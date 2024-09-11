// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import MemoryGame from '../components/MemoryGame';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MemoryGame />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
