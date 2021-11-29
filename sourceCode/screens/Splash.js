import React, { Component } from "react";
import { View, Image } from "react-native";
import LogoImage from "../../assets/splash1.png";

export default class Splash extends Component {
  componentDidMount() {
    //method that gets called after a component is mounted
    setTimeout(() => {
      this.props.navigation.navigate("Login");
    }, 3000); //3 seconds
  }
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={LogoImage}
        ></Image>
      </View>
    );
  }
}
