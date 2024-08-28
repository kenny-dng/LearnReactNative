import React from 'react';
import { View, Text, Button, StyleSheet, Platform, Alert } from 'react-native';

export default function HomeScreen() {
  // Fonction pour gérer le clic sur le bouton
  const handleButtonPress = () => {
    console.log("Button pressed");
    Alert.alert("Button pressed"); // Juste pour visualiser sur l'écran
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <Button title="Press me" onPress={handleButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    marginBottom: 16,
    fontSize: 24,
  }
});