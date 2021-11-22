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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Main");
      }
    });

    return unsubscribe;
  }, []);

  //handle sign up firebase registration
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        const user = userCredential.user;
        firestore.collection("users").doc(uid).set({
          email: user.email,
        });
        // console.log('Sign Up with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  //handle login firebase registration
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log('Log in with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          get
          the
          text
          when
          changes
          on
          the
          input
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          hide
          password
          text
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign up!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#eeeee4",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    backgroundColor: "#2596be",
    width: "100%",
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
