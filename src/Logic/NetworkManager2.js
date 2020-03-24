import RNBluetoothClassic, { BTEvents, BTCharsets } from 'react-native-bluetooth-classic';

export default class NetworkManager2 {

    device; // the pedal connected to the app
    

    constructor() {
        
    }

    

    async initialize() {
        // let enabled = await RNBluetoothClassic.isEnabled();
        try {
            let enabled = await RNBluetoothClassic.isEnabled();
            console.log("Bluetooth Enabled: ", enabled);
            let pairedDevices = await RNBluetoothClassic.list();
            console.log(pairedDevices);
            // pairSuccess = await RNBluetoothClassic.pairDevice("38:30:F9:F6:6C:DF");
            // console.log("Successful pairing: ", pairSuccess);

            isConnected = await RNBluetoothClassic.isConnected();
            // console.log(isConnected);

            if (isConnected) {
                connectedDevice = await RNBluetoothClassic.getConnectedDevice();
                console.log("Connected device: ", connectedDevice);
            } else {
                console.log("Attempting to connect...");
                device = await RNBluetoothClassic.connect("90:32:4B:78:03:18");
                console.log("Connected to device: ");
                console.log(device);
                connectedDevice = await RNBluetoothClassic.isConnected();
                console.log("Connected device: ", connectedDevice);
                // console.log("Please connect to the guitar pedal using your phone's Bluetooth settings.");

                console.log("Sending message...");
                await RNBluetoothClassic.write("Hello, this is from the guitar pedal app you noob.");

                console.log("Disconnecting...");
                disconnected = await RNBluetoothClassic.disconnect();
                if (disconnected) console.log("Disconnected successfully");
                else console.log("Failed to disconnect.");
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