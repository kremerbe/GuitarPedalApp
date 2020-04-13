import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class EffectCreator extends Component {

    constructor(props) {
        super(props);

        this.fsManager = new FileSystemManager();
    }

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
        // justifyContent: 'center',
    },
});