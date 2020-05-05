
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
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
    handleSendPress = (effect) => {
        if (this.props.onSendPress) {
            this.props.onSendPress(effect);
        }
    }

    handleAddEffectPress = () => {
        if (this.props.onAddEffectPress) {
            this.props.onAddEffectPress();
        }
    }

    handleDeletePress = (effect) => {
        if (this.props.onDelPress) {
            this.props.onDelPress(effect);
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
                            <TouchableOpacity
                                onPress={() => this.handleDeletePress(item)}
                            >
                                <View style={styles.trashContainer}>
                                    <Image
                                        source={require('../../TrashBinIcon.png')}
                                        style={styles.trashImg}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.buttonText}>{'Edit'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.handleSendPress(item)}>
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
            <TouchableOpacity 
                style={styles.newEffectButton}
                onPress={this.handleAddEffectPress}
            >
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
    trashContainer: {
        // flex: 1,
    },
    trashImg: {
        flex: 1,
        width: 40,
        height: 40,
        resizeMode: 'contain',
        //...StyleSheet.absoluteFillObject,
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