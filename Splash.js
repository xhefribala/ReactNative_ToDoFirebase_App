import React, { Component } from 'react';
import LS from './assets/LaunchScreen.png'
import { View, Image, ImageBackground, StyleSheet } from 'react-native'

export default class Splash extends Component {
    componentDidMount() {
        //method that gets called after a component is mounted
        setTimeout(() => {
            this.props.navigation.navigate("Main");
        }, 3000);
    }
    render() {
        return (

            <View style={styles.splash}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={LS}></Image>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
})