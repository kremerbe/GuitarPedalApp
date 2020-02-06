import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, PermissionsAndroid } from 'react-native';
import NetworkManager from '../Logic/NetworkManager';
import FileSystemManager from './../Logic/FileSystemManager';
import PureDataManager from './../Logic/PureDataManager';
import EffectList from './EffectList';
import Effect from './../EffectsObjects/Effect';
import AppComponent from '../EffectsObjects/AppComponent';

export default class Home extends Component {

    netManager;

    constructor(props){
        super(props);

        this.netManager = new NetworkManager();
        this.fsManager = new FileSystemManager();

        this.state = {
            effects: [],
        }
    }

    createTestEffects = () => {
        audioIn = new AppComponent("adc~", 2, 2);
        audioOut = new AppComponent("dac~", 2, 2);
        extra = new AppComponent("extra~", 2, 2);
        compList = [];
        compList.push(audioIn);
        compList.push(audioOut);
        compList.push(extra);
        return [new Effect("passthrough", compList), new Effect("pass2", compList)];
    }

    componentDidMount = async () => {
        // This effects is a list of tuples not a list of Effects yet
        effects = await this.fsManager.loadEffects();
        // console.log("Loaded Effects!");
        // console.log(effects);
        this.setState({
            effects: this.createTestEffects(),
        });

        // await this.fsManager.testStuff();
    }

    // askPermissions = async () => {
    //     try {
    //         const granted = PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.BLUETOOTH,
    //             {

    //             }
    //         )
    //     }
    // }


    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={styles.text}>Hello!</Text> */}
                {/* {this.renderHeader()} */}
                <TouchableOpacity
                    onPress={() => {
                        this.netManager.scanAndConnect();
                        console.log("Trying to connect...");
                    }}
                >
                    <Text style={styles.text}>Bluetooth</Text>
                </TouchableOpacity>
                <View style={styles.horizontalCont}>
                    <View style={styles.effectList}>
                        <EffectList effects={this.state.effects}/>
                    </View>
                    <View style={styles.pedalDisplay}></View>
                </View>
            </View>
        );
    }

    renderHeader = () => {
        return (
            <View style={styles.horizontalCont}>
                <Text style={styles.text}>Guitar Pedal App</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.netManager.scanAndConnect();
                        console.log("Trying to connect...");
                    }}
                >
                    <Text style={styles.text}>Bluetooth</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    text: {
        fontFamily: 'sans-serif',
        color: '#a8c87c',
        fontSize: 20,
    },
    horizontalCont: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000000',
    },
    effectList: {
        flex: 2,
        flexDirection: 'row'
    },
    pedalDisplay: {
        flex: 3,
        backgroundColor: '#9a7d89',
        margin: 5,
        flexDirection: 'row'
    },
    spacer: {
        flex: 1,
        flexDirection: 'row',
    },
});
