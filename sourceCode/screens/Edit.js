import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, firestore } from "../../firebase";

const EditScreen = ({ route, navigation }) => {
  const data = route.params;
  const [newTaskContent, setNewTaskContent] = useState(data.task);

  const updateTask = () => {
    if (newTaskContent === "") {
      alert("Please enter a task");
      return;
    }

    firestore
      .collection("tasks")
      .doc(data.id)
      .update({
        task: newTaskContent,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>EDIT SCREEN</Text>

      <TextInput
        placeholder="New task"
        value={newTaskContent}
        onChangeText={(text) => setNewTaskContent(text)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.buttonSave} onPress={updateTask}>
        <Text>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 20,
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonSave: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  buttonBack: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red",
  },
});
