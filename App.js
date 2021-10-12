import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';

const App = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colours.white }}>
      <View style={styles.header}>
        <Text style={{ fontWeight: '700', fontSize: 25, color: colours.textColour }}>Xhefri's To Do List</Text>
      </View>
    </SafeAreaView>);
};

const colours = {
  textColour: '#2596be', white: '#fff', backColour: '#eeeee4'
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});


export default App;