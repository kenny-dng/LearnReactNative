import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen() {
  // Initialisation de l'état pour gérer le texte affiché
  const [text, setText] = useState<string>('Welcome!');

  // Fonction pour gérer le clic sur le bouton
  const handleButtonPress = () => {
    // Bascule entre le texte initial et "Hello World!"
    setText((prevText) => (prevText === 'Welcome!' ? 'Hello World!' : 'Welcome!'));
    console.log("Button pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
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
