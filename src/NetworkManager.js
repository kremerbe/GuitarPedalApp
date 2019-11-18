import {BleManager} from 'react-native-ble-plx';

export default class NetworkManager {

    device; // the pedal connected to the app

    constructor() {
        this.netManager = new BleManager();
        console.log("Network Manager start check!");
    }

    scanAndConnect() {

    }

    disconnect() {

    }

    sendEffect() {

    }
}