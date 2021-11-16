import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import firebase, { auth, firestore } from "../../firebase";

function Main() {
  //hold text input, by default it will be an empty string

  const navigation = useNavigation();
  const [textInput, setTextInput] = React.useState("");
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    // load task again when view is focused
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      console.log("View focused");
      getTasksPhone();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    storeTasksPhone(tasks);
  }, [tasks]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const ListItem = ({ tasks }) => {
    const handleTaskPressed = () => {
      navigation.navigate("Edit", tasks);
    };

    return (
      //this view will hold the task list
      <TouchableOpacity style={styles.listItem} onPress={handleTaskPressed}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              color: colours.white,
              textDecorationLine: tasks?.completed ? "line-through" : "none",
            }}
          >
            {tasks?.task}
          </Text>
        </View>
        {
          //check if the task is not completed
          !tasks?.completed && (
            <TouchableOpacity onPress={() => taskCompleted(tasks?.id)}>
              <MaterialIcons name="done-outline" size={24} color="white" />
            </TouchableOpacity>
          )
        }
        <TouchableOpacity onPress={() => deleteTask(tasks?.id)}>
          <Ionicons name="trash-bin" size={24} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  //add task
  const addTask = () => {
    //if textInput is empty throw an error
    if (textInput == "") {
      Alert.alert("Attention", "Please input your task :)");
    } else {
      let newTask = {
        //generate a random unique ID for the newTask
        task: textInput,
        completed: false,
      };

      const uid = auth.currentUser.uid;
      firestore
        .collection("tasks")
        .add(newTask)
        .then((response) => {
          console.log("Task added:" + response.id);

          // save to user's tasks
          firestore
            .collection("users")
            .doc(uid)
            .update({
              tasks: firebase.firestore.FieldValue.arrayUnion(response.id),
            })
            .then(() => {
              newTask = { id: response.id, ...newTask };
              //array that hold the tasks
              setTasks([...tasks, newTask]);
              setTextInput("");
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // mark task as 'completed'
  const taskCompleted = (taskID) => {
    firestore
      .collection("tasks")
      .doc(taskID)
      .update({
        completed: true,
      })
      .then(() => {
        const newTaskItem = tasks.map((item) => {
          if (item.id == taskID) {
            //if true create new object and set completed to true
            return { ...item, completed: true };
          }
          //return rest of items
          return item;
        });
        //pass the new tasks completed
        setTasks(newTaskItem);
      });
  };

  // delete task from list
  const deleteTask = (taskID) => {
    Alert.alert("Attention", "Delete Task?", [
      { text: "Yes", onPress: () => handleDeleteTask(taskID) },
      { text: "No" },
    ]);
  };

  const handleDeleteTask = (taskID) => {
    const uid = auth.currentUser.uid;

    firestore.collection("tasks").doc(taskID).delete();
    firestore
      .collection("users")
      .doc(uid)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(taskID),
      })
      .then(() => {
        const newTask = tasks.filter((item) => item.id != taskID);
        setTasks(newTask);
      });
  };

  // delete all tasks
  const deleteAllTasks = () => {
    Alert.alert("Are you sure?", "Delete all", [
      {
        text: "Yes",
        onPress: () => setTasks([]),
      },
      {
        text: "No, I was joking! :)",
      },
    ]);
  };

  // store the data in the mobile device
  const storeTasksPhone = async (tasks) => {
    //retrieved from https://react-native-async-storage.github.io/async-storage/docs/usage
    try {
      const stringifyTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", stringifyTasks);
    } catch (error) {
      console.log(error);
      // saving error
    }
  };

  const getTasksPhone = async () => {
    const uid = auth.currentUser.uid;
    let userRef = await firestore.collection("users").doc(uid).get();
    let taskIds = userRef.data().tasks || [];

    if (taskIds.length > 0) {
      let taskDocs = await firestore
        .collection("tasks")
        .where(firebase.firestore.FieldPath.documentId(), "in", taskIds)
        .get();

      let tasks = [];
      taskDocs.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });

      console.log("fetchtasks" + JSON.stringify(tasks, null, 4));

      // get all tasks successfully
      setTasks(tasks);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colours.white }}>
      <View style={styles.header}>
        <View style={styles.container}>
          <Text>Email: {auth.currentUser?.email}</Text>
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{ fontWeight: "700", fontSize: 25, color: colours.textColour }}
        >
          To Do List
        </Text>
        <TouchableOpacity onPress={deleteAllTasks}>
          <Ionicons name="trash-bin" size={30} color="#2596be" />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={tasks}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        renderItem={({ item }) => <ListItem tasks={item} />}
      ></FlatList>
      <View style={styles.footer}>
        <View style={styles.inputTab}>
          <TextInput
            placeholder="Add Task"
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={addTask}>
          <Ionicons name="md-add-circle" size={50} color="#2596be" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const colours = {
  textColour: "#2596be",
  white: "#fff",
  backColour: "#eeeee4",
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    backgroundColor: colours.backColour,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    flex: 1,
  },
  inputTab: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colours.white,
    borderRadius: 60,
    borderColor: colours.textColour,
    borderWidth: 1,
    width: 250,
    flex: 1,
  },
  listItem: {
    padding: 20,
    backgroundColor: colours.textColour,
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#2596be",
    width: "40%",
    padding: 15,
    borderRadius: 30,
    //align text
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 4,
    borderColor: "#2596be",
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: "#2596be",
    fontWeight: "600",
    fontSize: 18,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default Main;
