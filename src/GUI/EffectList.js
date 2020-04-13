
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

    /**
     * Activates send effect method from parent given in props, if present.
     */
    handleSendPress = () => {
        if (this.props.onSendPress) {
            this.props.onSendPress();
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text}>Saved Effects:</Text>
                </View>
                <FlatList
                    style={styles.list}
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={this.state.effects}
                    renderItem={({item}) => (
                        <View style={styles.row}>
                            <Text style={styles.text}>{item.getName()}</Text>
                            <View style={styles.spacer}/>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.buttonText}>{'Edit'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.handleSendPress}>
                                <Text style={styles.buttonText}>{'>'}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.getName()}
                    ItemSeparatorComponent={this.divider}
                    ListFooterComponent={this.addEffectButton}
                />
            </View>
        );
    }

    addEffectButton = () => {
        return (
            <TouchableOpacity style={styles.newEffectButton}>
                <Text style={styles.newEffectText}>Add Effect</Text>
            </TouchableOpacity>
        )
    }

    divider = () => {
        return (<View style={styles.divider}/>);
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
        flexGrow: 1,
    },
    list: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#000000',
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },
    spacer: {
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 24,
    },
    editButton: {
        backgroundColor: '#e0e0e0',
        padding: 5,
        borderRadius: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#e0e0e0',
        padding: 5,
        borderRadius: 10,
    },
    newEffectButton: {
        backgroundColor: '#013220',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
    },
    newEffectText: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: '#ffffff',
    },
    buttonText: {
        fontFamily: 'sans-serif',
        fontSize: 20,
    },
});