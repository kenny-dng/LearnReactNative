import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';

const HomeScreen: React.FC = () => {
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('0');
  const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>('PORTRAIT');

  useEffect(() => {
    const handleOrientationChange = (event: ScreenOrientation.OrientationChangeEvent) => {
      const newOrientation = event.orientationInfo.orientation;
      console.log('Orientation changed: ', newOrientation);
      if (newOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || newOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
        setOrientation('LANDSCAPE');
      }
      else
        setOrientation('PORTRAIT');
    };

    const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    // Initialisation de l'orientation lors du montage du composant
    ScreenOrientation.getOrientationAsync().then((orientationValue) =>
      handleOrientationChange({ orientationInfo: { orientation: orientationValue }, orientationLock: 0 })
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const handlePress = (value: string) => {
    console.log('Button pressed: ', value);

    if (value === 'C') {
      setExpression(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (value === 'AC') {
      setExpression('0');
      setResult('0');
    } else if (value === '=') {
      try {
        const evalResult = eval(expression.replace('x', '*').replace('÷', '/'));
        setResult(String(evalResult));
      } catch (e) {
        setResult('Error');
      }
    } else {
      setExpression(prev => prev === '0' ? value : prev + value);
    }
  };

  const renderButton = (value: string, index: number, isDoubleWidth = false) => {
    const buttonStyle = [styles.button];
    const buttonTextStyle = [styles.buttonText];

    if (value === 'C' || value === 'AC')
      buttonTextStyle.push(styles.redText);
    if (isDoubleWidth)
      buttonStyle.push(styles.doubleWidthButton);

    return (
      <TouchableOpacity
        key={index}
        style={buttonStyle}
        onPress={() => handlePress(value)}
      >
        <Text style={buttonTextStyle}>{value}</Text>
      </TouchableOpacity>
    );
  };

  const portraitLayout = (
    <View style={styles.buttonContainer}>
      <View style={styles.row}>
        {['7', '8', '9', 'C', 'AC'].map((value, index) => renderButton(value, index))}
      </View>
      <View style={styles.row}>
        {['4', '5', '6', '+', '-'].map((value, index) => renderButton(value, index))}
      </View>
      <View style={styles.row}>
        {['1', '2', '3', 'x', '÷'].map((value, index) => renderButton(value, index))}
      </View>
      <View style={styles.row}>
        {['0', '.', '00'].map((value, index) => renderButton(value, index))}
        {renderButton('=', 3, true)}
      </View>
    </View>
  );

  const landscapeLayout = (
    <View style={styles.buttonContainerLandscape}>
      <View style={styles.rowLandscape}>
        {['7', '8', '9', 'C', 'AC'].map((value, index) => renderButton(value, index))}
      </View>
      <View style={styles.rowLandscape}>
        {['4', '5', '6', '+', '-'].map((value, index) => renderButton(value, index))}
      </View>
      <View style={styles.rowLandscape}>
        {['1', '2', '3', 'x', '÷'].map((value, index) => renderButton(value, index))}
      </View>
      <View style={styles.rowLandscape}>
        {['0', '.', '00'].map((value, index) => renderButton(value, index))}
        {renderButton('=', 3, true)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 28 }} title="Calculator" />
      </Appbar.Header>
      <View style={orientation === 'PORTRAIT' ? styles.portraitDisplayContainer : styles.landscapeDisplayContainer}>
        <Text style={styles.displayText}>{expression}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      {orientation === 'PORTRAIT' ? portraitLayout : landscapeLayout}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBar: {
    backgroundColor: '#1c96dd',
  },
  appBarTitle: {
    color: '#fff',
  },
  portraitDisplayContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  landscapeDisplayContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  displayText: {
    fontSize: 36,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 36,
    color: 'gray',
  },
  buttonContainer: {
    flex: 1.4,
    justifyContent: 'flex-end',
    paddingBottom: 30,
    paddingHorizontal: 5,
  },
  buttonContainerLandscape: {
    flex: 3.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  rowLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 2,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 3,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
  redText: {
    fontSize: 24,
    color: '#ff5c5c',
  },
  doubleWidthButton: {
    flex: 2.05,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
    borderRadius: 10,
  },
});

export default HomeScreen;