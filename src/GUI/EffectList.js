
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';

export default class EffectList extends Component {

    constructor(props){
        super(props);

        this.state = {
            effects: this.props.effect,
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.effects}
                    renderItem={({item}) => (
                        <View style={styles.row}>
                            <Text style={styles.text}>{item.getName()}</Text>
                            <View style={styles.spacer}/>
                            <TouchableOpacity>
                                <Text style={styles.text}>{'>'}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }
}

EffectList.propTypes = {
    effects: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
    },
    spacer: {
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 20,
    },
});