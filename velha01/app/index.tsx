// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Board from '../components/board';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Board />
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
