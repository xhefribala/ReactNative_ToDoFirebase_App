import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



function Main() {
    //hold text input, by default it will be an empty string
    const [textInput, setTextInput] = React.useState('');
    const [tasks, setTasks] = React.useState([]);
    React.useEffect(() => { getTasksPhone(); }, []);
    React.useEffect(() => { storeTasksPhone(tasks); }, [tasks]);



    const ListItem = ({ tasks }) => {
        return (
            //this view will hold the task list
            <View style={styles.listItem}>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        fontWeight: '700', fontSize: 20, color: colours.white,
                        textDecorationLine: tasks?.completed ? 'line-through' : 'none'
                    }}>
                        {tasks?.task}
                    </Text>
                </View>
                {
                    //check if the task is not completed
                    !tasks?.completed &&
                    <TouchableOpacity onPress={() => taskCompleted(tasks?.id)}>
                        <MaterialIcons name="done-outline" size={24} color="white" />
                    </TouchableOpacity>}
                <TouchableOpacity onPress={() => deleteTask(tasks?.id)}>
                    <Ionicons name="trash-bin" size={24} color="red" />
                </TouchableOpacity>
            </View>

        );
    };

    //add task
    const addTask = () => {
        //if textInput is empty throw an error
        if (textInput == "") {
            Alert.alert("Attention", "Please input your task :)");
        } else {
            const newTask = {
                //generate a random unique ID for the newTask
                id: Math.random().toString(),
                task: textInput,
                completed: false,
            };
            //array that hold the tasks
            setTasks([...tasks, newTask]);
            setTextInput('');
        }
    };

    // mark task as 'completed'
    const taskCompleted = (taskID) => {
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
    };

    // delete task from list
    const deleteTask = (taskID) => {
        Alert.alert("Attention", "Delete Task?", [{
            text: "Yes", onPress: () => {
                const newTask = tasks.filter(item => item.id != taskID);
                setTasks(newTask);
            }
        },
        {
            text: "No"
        },
        ]);

    };

    // delete all tasks
    const deleteAllTasks = () => {
        Alert.alert("Are you sure?", "Delete all", [{
            text: "Yes", onPress: () => setTasks([])
        },
        {
            text: "No, I was joking! :)"
        },
        ]);
    };

    // store the data in the mobile device
    const storeTasksPhone = async (tasks) => {
        //retrieved from https://react-native-async-storage.github.io/async-storage/docs/usage
        try {
            const stringifyTasks = JSON.stringify(tasks);
            await AsyncStorage.setItem('tasks', stringifyTasks);
        } catch (error) {
            console.log(error);
            // saving error
        }
    };

    const getTasksPhone = async () => {
        try {
            const tasks = await AsyncStorage.getItem("tasks");
            if (tasks != null) {
                setTasks(JSON.parse(tasks));
            }
        } catch (error) {
            console.log(error);

        }
    };



    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: colours.white }}>
            <View style={styles.header}>
                <Text style={{ fontWeight: '700', fontSize: 25, color: colours.textColour }}>Xhefri's To Do List</Text>
                <TouchableOpacity onPress={deleteAllTasks}>
                    <Ionicons name="trash-bin" size={30} color="#2596be" />
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                data={tasks}
                keyExtractor={(item, index) => { return item.id; }}
                renderItem={({ item }) => <ListItem tasks={item} />}>


            </FlatList>
            <View style={styles.footer}>
                <View style={styles.inputTab}>
                    <TextInput placeholder="Add Task"
                        value={textInput}
                        onChangeText={text => setTextInput(text)}>
                    </TextInput>
                </View>
                <TouchableOpacity onPress={addTask}>
                    <Ionicons name="md-add-circle" size={50} color="#2596be" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>);
}

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
        backgroundColor: colours.backColour,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
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
        flexDirection: 'row',
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,
    },
});


export default Main;