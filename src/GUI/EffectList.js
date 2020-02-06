
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';

export default class EffectList extends Component {

    constructor(props){
        super(props);

        this.state = {
            effects: this.props.effects,
        }
    }

    /**
     * Updates the effects state when the props have been updated.
     * @param {Props} nextProps the new props
     */
    componentWillReceiveProps(nextProps) {
        this.setState({ effects: nextProps.effects });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Saved Effects:</Text>
                <FlatList
                    data={this.state.effects}
                    renderItem={({item}) => (
                        <View style={styles.row}>
                            <Text style={styles.text}>{item.getName()}</Text>
                            <View style={styles.spacer}/>
                            <TouchableOpacity>
                                <Text style={styles.button}>{'Edit'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.button}>{'>'}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.getName()}
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
        backgroundColor: '#a7d897',
        margin: 5,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    spacer: {
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 24,
    },
    button: {
        fontFamily: 'sans-serif',
        fontSize: 24,
        marginRight: 10
    },
});