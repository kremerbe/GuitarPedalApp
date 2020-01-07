import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PropTypes } from 'prop-types';

export default class Effect extends Component {

    constructor(props){
        super(props);

        this.state = {
            effect: this.props.effect,
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
}

LoanView.propTypes = {
    effect: PropTypes.object.isRequired,
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