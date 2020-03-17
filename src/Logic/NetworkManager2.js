import RNBluetoothClassic, { BTEvents, BTCharsets } from 'react-native-bluetooth-classic';

export default class NetworkManager2 {

    device; // the pedal connected to the app
    

    constructor() {
        
    }

    

    async initialize() {
        // let enabled = await RNBluetoothClassic.isEnabled();
        try {
            let pairedDevices = await RNBluetoothClassic.list();
            console.log(pairedDevices);
            isConnected = await RNBluetoothClassic.isConnected();
            console.log(isConnected);
            if (true) {
                connectedDevice = await RNBluetoothClassic.getConnectedDevice();
                console.log("Connected device: ", connectedDevice);
            } else {
                console.log("Please connect to the guitar pedal using your phone's Bluetooth settings.");
            }
        } catch (err) {
            console.log("ERROR: ");
            console.log(err);
        }
    }

    /**
     * Scans and connects to a device depending on the device name. In the future
     * I would like for it to accept regardless of the device name.
     */
    async scanAndConnect() {
        
    }

    /**
     * Connects to the previously scanned device
     */
    async connect() {
        
    }
    
    /**
     * Disconnects the device
     */
    async disconnect() {

    }


    sendEffect() {
        
    }
}