import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, PermissionsAndroid, ClippingRectangle, Image } from 'react-native';
import NetworkManager2 from '../Logic/NetworkManager2';
import FileSystemManager from './../Logic/FileSystemManager';
import PureDataManager from './../Logic/PureDataManager';
import EffectList from './EffectList';
import Effect from './../EffectsObjects/Effect';
import AppComponent from '../EffectsObjects/AppComponent';
import { RNBluetoothClassic } from 'react-native-bluetooth-classic';


// enums for bluetooth status
const BTStatus = {
    OFF: "Bluetooth Off",
    NOT_PAIRED: "Not paired to Pi",
    NOT_CONNECTED: "Not connected",
    CONNECTED: "Connected!"
}

export default class Home extends Component {

    netManager;

    constructor(props){
        super(props);

        this.netManager = new NetworkManager2();
        this.fsManager = new FileSystemManager();
        this.pdManager = new PureDataManager();

        this.state = {
            bTStatus: BTStatus.OFF,
            effects: [],
        }
        
        newEffects = new Array();
        sEffects = this.fsManager.loadEffects().then((obj) => {
            // console.log("Shit's Loaded!");
            // console.log(obj);
            obj.forEach(x => {
                // console.log(x.name);
                // console.log(x.components);          
                newEffects.push(this.pdManager.pdToApp(x));
            });
            this.setState({
                effects: newEffects,
            });

            /** Not working newEffects and effects undefined.... */
            // for(i = 0; i < newEffects.length; i++)
            // {
            //     console.log("Effect: " + newEffects[i].name);
            // }
        });

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
        // effects = await this.fsManager.loadEffects();
        // console.log("Loaded Effects!");
        // console.log(effects);
		
        this.setState({
            effects: this.createTestEffects(),
        });

        let enabled = await this.netManager.enable();
        if (enabled) {
            this.setState({ bTStatus: BTStatus.NOT_PAIRED })
        }

        // await this.fsManager.testStuff();
        
        /**
         * This should be used to find the effect the user wants to 
         * display on the gui and then convert it
         */
        // effects.forEach(effect => {
        //     this.pdManager.pdToApp(effect);
        // });
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
                {/* {this.renderHeader()} */}
                <View style={styles.horizontalCont}>
                    {this.renderEffectList()}
                    {this.renderPedalDisplay()}
                </View>
            </View>
        );
    }

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={styles.spacer}/>
                <Text style={styles.text}>Guitar Pedal App</Text>
                <View style={[styles.spacer, {justifyContent: 'flex-end'}]}>
                    <TouchableOpacity 
                        style={styles.bTButton}
                        onPress={() => {
                            console.log("Trying to connect...");
                            this.netManager.testBT();
                        }}
                    >
                        <Text style={styles.buttonText}>Bluetooth</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderEffectList = () => {
        return (
            <View style={styles.effectList}>
                <EffectList effects={this.state.effects}/>
            </View>
        );
    }

    renderPedalDisplay = () => {
        return (
            <View style={styles.pedalDisplay}>
                <View style={styles.header}>
                    <Text style={styles.text}>{"Status: "+this.state.bTStatus}</Text>
                    <View style={[styles.spacer, {justifyContent: 'flex-end'}]}>
                        <TouchableOpacity 
                            style={styles.bTButton}
                            onPress={() => {
                                console.log("Trying to connect...");
                                this.netManager.testBT();
                            }}
                        >
                            <Text style={styles.buttonText}>Bluetooth</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Image 
                    source={require('../../PedalImage.png')}
                    style={styles.pedalImg}
                />
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
    header: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        alignItems: 'center',
        padding: 5,
    },
    horizontalCont: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000000',
    },
    bTButton: {
        backgroundColor: '#0000ff',
        padding: 7,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'sans-serif',
        color: '#ffffff',
        fontSize: 18,
    },
    text: {
        fontFamily: 'sans-serif',
        color: '#ffffff',
        fontSize: 20,
    },
    effectList: {
        flex: 2,
        flexDirection: 'row'
    },
    pedalDisplay: {
        flex: 3,
        backgroundColor: '#9a7d89',
        margin: 5,
        flexDirection: 'column',
    },
    pedalImg: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        //...StyleSheet.absoluteFillObject,
    },
    spacer: {
        flex: 1,
        flexDirection: 'row',
    },
});
