import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgramScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Program (in tabs layout)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101010', justifyContent: 'center', alignItems: 'center' },
  title: { color: 'white', fontSize: 20 },
});
