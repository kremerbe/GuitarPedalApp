import {BleManager, Service, Characteristic} from 'react-native-ble-plx';

export default class NetworkManager {

    device; // the pedal connected to the app

    constructor() {
        this.manager = new BleManager();
        console.log("Network Manager start check!");
        this.pedalCommSetup();
    }


    /**
     * Creates the mechanism that will send data to the pedal
     */
    pedalCommSetup()
    {
        //new Characteristic()
        //new Service() 
        // IDK
    }

    /**
     * Scans and connects to a device depending on the device name. In the future
     * I would like for it to accept regardless of the device name.
     */
    scanAndConnect() {

        /**
         * Bluetooth Scanning must be done before we can connect to the device. Once the 
         * device is saved and all servies and characteristics are discovered
         * the device can be connected to.
         */
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                return
            }
    
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.name === 'GuitarPedal'){
                
                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan(); 
                // Proceed with connection.
            }
        });
    }

    /**
     * Connects to the previously scanned device
     */
    connect(){
        device.connect()
            .then((device) => {
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
                // Do work on device with services and characteristics
            })
            .catch((error) => {
                // Handle errors
            });
    }
    
    /**
     * Disconnects the device
     */
    disconnect() {
        this.manager.cancelDeviceConnection(device.id);
    }


    sendEffect() {
        
    }
}