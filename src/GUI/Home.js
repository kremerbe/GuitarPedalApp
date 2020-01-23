import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NetworkManager from '../Logic/NetworkManager';
import FileSystemManager from './../Logic/FileSystemManager';
import PureDataManager from './../Logic/PureDataManager';
import EffectList from './EffectList';

export default class Home extends Component {

    netManager;

    constructor(props){
        super(props);

        this.netManager = new NetworkManager();
        this.fsManager = new FileSystemManager();
        this.fsManager.testStuff();

        this.state = {
            effects: [],
        }
    }

    componentDidMount = async () => {
        effects = await this.fsManager.loadEffects();
        console.log("Loaded Effects!");
        console.log(effects);
        this.setState({
            effects: effects,
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hello!</Text>
                <EffectList effects={this.state.effects}/>
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
