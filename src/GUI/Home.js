import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NetworkManager from '../Logic/NetworkManager';
import FileSystemManager from './../Logic/FileSystemManager';

export default class Home extends Component {

    netManager;

    constructor(props){
        super(props);

        this.netManager = new NetworkManager();
        this.fsManager = new FileSystemManager();
        this.fsManager.doStuff();
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hello!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 20,
    },
});