import React, { Component } from 'react';
import { View, ImageBackround, Image, ImageBackground } from 'react-native'

var bg = require('./assets/LaunchScreen.png')
export default class Splash extends Component {
    render();
{
    return (
        <ImageBackground source={ls} style={{ height: '100%', width: '100%' }}>
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <image source={ls} style={{ height: 100, width: 100 }}></image>

            </View>
        </ImageBackground>
    );
}
}