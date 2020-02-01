import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
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
            effects: [this.createTestEffect()],
        }
    }

    createTestEffect = () => {
        audioIn = new AppComponent("adc~", 2, 2);
        audioOut = new AppComponent("dac~", 2, 2);
        extra = new AppComponent("extra~", 2, 2);
        compList1 = [];
        compList1.push(audioIn);
        compList1.push(audioOut);
        compList1.push(extra);
        return new Effect("passthrough", compList1);
    }

    componentDidMount = async () => {
        effects = await this.fsManager.loadEffects();
        console.log("Loaded Effects!");
        console.log(effects);
        this.setState({
            effects: effects,
        });

        await this.fsManager.testStuff();
    }


    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={styles.text}>Hello!</Text> */}
                <Text style={styles.text}>Test Text!</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.netManager.scanAndConnect();
                        console.log("Trying to connect...");
                    }}
                >
                    <Text style={styles.text}>BlueTooth</Text>
                </TouchableOpacity>
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
