import {BleManager} from 'react-native-ble-plx';

export default class NetworkManager {

    // netManager;

    constructor() {
        this.netManager = new BleManager();
        console.log("Network Manager start check!");
        console.log("Buggar off!");
    }
}