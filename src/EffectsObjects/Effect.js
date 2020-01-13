import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PropTypes } from 'prop-types';

export default class Effect extends Component {

    constructor(props, name, components){
        super(props);

        this.state = {
            name: name,
            components: components,
        }
    }

    // TODO: Create effect GUI
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hello!</Text>
            </View>
        );
    }

    /**
     * Turns the list of components into a string for export to a file.
     */
    exportComponents() {
        return "stuff...";
    }

    getName() {
        return this.state.name;
    }

    getComponents() {
        return this.state.components;
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