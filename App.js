import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const App = () => {
  const [tasks, setTasks] = React.useState([
    { id: 1, task: 'First task', completed: true },
    { id: 2, task: 'Second task', completed: false },

  ]);

  const ListItem = ({ taskToDo }) => {
    return (
      //this view will hold the task list
      <View style={styles.listItem}>
        <View>
          <Text style={{
            fontWeight: '700', fontSize: 20, color: colours.white,
            textDecorationLine: taskToDo?.completed ? 'line-through' : 'none'
          }}>
            {taskToDo?.task}
          </Text>
        </View>
        <TouchableOpacity><MaterialIcons name="done-outline" size={24} color="white" /></TouchableOpacity>
        <TouchableOpacity><MaterialCommunityIcons name="delete-circle" size={24} color="red" /></TouchableOpacity>
      </View>

    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colours.white }}>
      <View style={styles.header}>
        <Text style={{ fontWeight: '700', fontSize: 25, color: colours.textColour }}>Xhefri's To Do List</Text>
        <Ionicons name="trash-bin" size={24} color="#2596be" />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={tasks}
        renderItem={({ item }) => <ListItem tasks={item} />}>

      </FlatList>
      <View style={styles.footer}>
        <View style={styles.inputTab}>
          <TextInput placeholder="Add Task"></TextInput></View>
        <TouchableOpacity>
          <Ionicons name="md-add-circle" size={50} color="#2596be" />
        </TouchableOpacity>
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
  footer: {
    position: 'absolute',
    bottom: 50,
    color: colours.backColour,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputTab: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colours.white,
    borderRadius: 60,
    borderColor: colours.textColour,
    borderWidth: 1,
    width: 250,
  },
  listItem: {
    padding: 20,
    backgroundColor: colours.textColour,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
});


export default App;