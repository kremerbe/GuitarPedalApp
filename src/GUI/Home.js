import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, PermissionsAndroid, Image, Alert, ClippingRectangle } from 'react-native';
import NetworkManager2 from '../Logic/NetworkManager2';
import FileSystemManager from './../Logic/FileSystemManager';
import PureDataManager from './../Logic/PureDataManager';
import EffectList from './EffectList';
import Effect from './../EffectsObjects/Effect';
import AppComponent from '../EffectsObjects/AppComponent';


// enums for bluetooth status
const BTStatus = {
    OFF: "Bluetooth Off",
    NOT_CONNECTED: "Not connected",
    CONNECTING: "Connecting...",
    CONNECTED: "Connected"
}

const rPiName = "patchbox"; //"MSOE-H4L36Q2";

export default class Home extends Component {

    constructor(props){
        super(props);

        this.netManager = new NetworkManager2();
        this.fsManager = new FileSystemManager();
        this.pdManager = new PureDataManager();

        this.state = {
            bTStatus: BTStatus.OFF,
            effects: [],
        }
    }

    componentDidMount = async () => {

		// Load the effects from the filesystem
        this.setState({
            effects: await this.loadEffects(),
        });

        // Bluetooth start-up sequence
        this.enableBT();
        this.netManager.addBTOnOffListeners(this.onBTOff,this.onBTOn);
    }

    componentWillUnmount() {
        this.netManager.deleteListeners();
        // TODO: disconnect if connected
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

    /**
     * Loads the effects saved in the filesystem into the app and returns them.
     * @returns the list of effects as Effect objects that have been loaded.
     */
    loadEffects = async () => {
        newEffects = new Array();
        sEffects = await this.fsManager.loadEffects().then((obj) => {
            // console.log(obj);
            obj.forEach(x => {
                // console.log(x.name);
                // console.log(x.components);          
                newEffects.push(this.pdManager.pdToApp(x));
            });

            /** Not working newEffects and effects undefined.... */
            // for(i = 0; i < newEffects.length; i++)
            // {
            //     console.log("Effect: " + newEffects[i].name);
            // }
        });
        return newEffects;
    }

    importEffect = async () => {
        success = await this.fsManager.importEffect();
        console.log("Imported effect: ", success);
        newEffects = await this.loadEffects();
        this.setState({ effects: newEffects });
    }

    deleteEffect = async (effect) => {
        success = await this.fsManager.deleteEffect(effect);
        newEffects = await this.loadEffects();
        this.setState({ effects: newEffects });
    }

    onBTOff = () => {
        this.setState({ bTStatus: BTStatus.OFF });
        this.netManager.deleteDevice();
    }

    onBTOn = () => {
        this.enableBT();
    }

    enableBT = async () => {
        let enabled = await this.netManager.enable();
        if (enabled) {
            this.setState({ bTStatus: BTStatus.NOT_CONNECTED });
        }
    }

    connectToPi = async () => {
        // check paired
        let pairedToPi = await this.netManager.checkPaired(rPiName);
        if (!pairedToPi) {
            this.showPairToPiAlert();
        } else {
            this.setState({ bTStatus: BTStatus.CONNECTING });
            // attempt to connect
            connected = await this.netManager.connectToDevice(rPiName);
            if (connected) {
                this.setState({ bTStatus: BTStatus.CONNECTED });
            } else {
                this.showFailToConnectAlert();
                this.setState({ bTStatus: BTStatus.NOT_CONNECTED });
            }
        }
    }

    sendEffectData = async () => {
        testSendData = "Hey, it works hopefully...";
        this.netManager.sendData(testSendData);
    }

    disconnectFromPi = async () => {
        disconnected = await this.netManager.disconnectFromDevice();
        if (disconnected) {
            this.setState({ bTStatus: BTStatus.NOT_CONNECTED });
        } else {
            this.showFailToDisconnectAlert();
        }
    }

    showPairToPiAlert = () => {
        Alert.alert(
            'Pair to Pedal',
            "Make sure to pair your phone with the guitar pedal named '"+rPiName+"' using your phone's bluetooth interface before connecting.",
            [{text: "OK"}]
        );
    }

    showFailToConnectAlert = () => {
        Alert.alert(
            "Failed to Connect!",
            "Failed to connect to the guitar pedal. Try restarting Bluetooth.",
            [{text: "OK"}]
        );
    }

    showFailToDisconnectAlert = () => {
        Alert.alert(
            'Failed to Disconnect',
            "Failed to disconnect from the guitar pedal. Try restarting Bluetooth.",
            [{text: "OK"}]
        );
    }


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
        let btButtonText = this.state.bTStatus === BTStatus.CONNECTED? "Disconnect": "Connect";
        return (
            <View style={styles.header}>
                <View style={styles.spacer}/>
                <Text style={styles.text}>Guitar Pedal App</Text>
                <View style={[styles.spacer, {justifyContent: 'flex-end'}]}>
                    <TouchableOpacity 
                        style={styles.bTButton}
                        onPress={() => {
                            this.netManager.testBT();
                        }}
                    >
                        <Text style={styles.buttonText}>{btButtonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderEffectList = () => {
        return (
            <View style={styles.effectList}>
                <EffectList 
                    effects={this.state.effects}
                    onSendPress={this.sendEffectData}
                    onAddEffectPress={this.importEffect}
                    onDelPress={this.deleteEffect}
                />
            </View>
        );
    }

    renderPedalDisplay = () => {
        let btButtonDisabled = this.state.bTStatus === BTStatus.OFF || this.state.bTStatus === BTStatus.CONNECTING;
        let btButtonText = this.state.bTStatus === BTStatus.CONNECTED? "Disconnect": "Connect";

        return (
            <View style={styles.pedalDisplay}>
                <View style={styles.header}>
                    <Text style={styles.text}>{"Status: "+this.state.bTStatus}</Text>
                    <View style={[styles.spacer, {justifyContent: 'flex-end'}]}>
                        <TouchableOpacity 
                            disabled={btButtonDisabled}
                            style={[styles.bTButton,{opacity: btButtonDisabled? 0.5: 1}]}
                            onPress={() => {
                                if (this.state.bTStatus === BTStatus.CONNECTED) {
                                    this.disconnectFromPi();
                                } else {
                                    this.connectToPi();
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>{btButtonText}</Text>
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
