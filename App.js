import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const App = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colours.white }}></SafeAreaView>);
};

const colours = {
  primary: '#2596be', white: '#fff'
}

const styles = StyleSheet.create({});
export default App;