import RNBluetoothClassic, { BTEvents, BTCharsets } from 'react-native-bluetooth-classic';

export default class NetworkManager2 {

    device; // the pedal connected to the app

    constructor() {
        this.events = [];
    }

    /**
     * Creates listeners for when bluetooth is turned on or off and handles it with the given functions.
     * @param {Function} bTOffFunc what to do when bluetooth is turned off.
     * @param {Function} bTOnFunc what to do when bluetooth is turned on.
     */
    addBTOnOffListeners(bTOffFunc, bTOnFunc) {
        this.events.push(
            RNBluetoothClassic.addListener(
                BTEvents.BLUETOOTH_DISABLED,
                bTOffFunc,
                this
            )
        );
        this.events.push(
            RNBluetoothClassic.addListener(
                BTEvents.BLUETOOTH_ENABLED,
                bTOnFunc,
                this
            )
        );
    }

    /**
     * Deletes any active bluetooth listeners.
     */
    deleteListeners() {
        this.events.forEach(event => event.remove());
    }

    /**
     * Checks if bluetooth is enabled and if not, requests it to be enabled.
     * @returns whether bluetooth is on or off once the function concludes.
     */
    async enable() {
        let enabled = await RNBluetoothClassic.isEnabled();
        if (!enabled) {
            try {
                enabled = await RNBluetoothClassic.requestEnable();
            } catch (err) {
                console.log(err);
                enabled = false;
            }
        }
        return enabled;
    }

    /**
     * Checks if paired with the given device.
     * @param {String} deviceName the device name of the device to check pairing for.
     * @returns whether or not the given device is paired.
     */
    async checkPaired(deviceName) {
        let pairedDevices = await RNBluetoothClassic.list();
        console.log("Paired Devices: ",pairedDevices);
        // checks if a device with the name piName exists in the list
        return pairedDevices.some(device => device.name === deviceName);
    }

    /**
     * Attempts to connect to the device with the given device name.
     * @param {String} deviceName the device name of the device to try to connect to.
     * @returns whether or not it connected successfully.
     */
    async connectToDevice(deviceName) {
        deviceId = await this._getPairedDeviceId(deviceName);
        if (deviceId === null) {
            return false;
        } else {

            console.log("Attempting to connect...");
            try {
                newDevice = await RNBluetoothClassic.connect(deviceId);
                connected = await RNBluetoothClassic.isConnected();
                if (connected) {
                    console.log("Connected successfully to device: ", newDevice);
                    this.device = newDevice;
                    return true;
                }
                return false;
            } catch(err) {
                console.log(err);
                return false;
            }
        }
    }

    /**
     * Gets the device ID of the currently paired device with the given device name.
     * @param {String} deviceName the name of the device to get the device ID for.
     * @returns null if no device is found with that name, or else returns the found device.
     */
    async _getPairedDeviceId(deviceName) {
        let pairedDevices = await RNBluetoothClassic.list();
        foundDevices = pairedDevices.filter(device => device.name === deviceName);
        if (foundDevices.length < 1) return null;
        else if (foundDevices.length == 1) return foundDevices[0].id;
        else {  // multiple devices with that name found (unlikely)
            // TODO: handle this situation better
            console.log("Warning: multiple devices found (returning the first...): ",foundDevices);
            return foundDevices[0].id;
        }
    }

    /**
     * Sends the given data to the connected device.
     * @param {String} data the data to send.
     */
    async sendData(data) {
        console.log("Sending data...");
        await RNBluetoothClassic.write(data);
    }

    /**
     * Sets the saved device to null. Only to be used when bluetooth is manually turned off.
     */
    deleteDevice() {
        this.device = null;
    }

    /**
     * Attempts to disconnect from the currently connected device.
     * @returns whether or not it successfully disconnected.
     */
    async disconnectFromDevice() {
        console.log("Disconnecting...");
        disconnected = await RNBluetoothClassic.disconnect();
        if (disconnected) {
            this.device = null;
            return true;
        }
        return false;
    }

    /**
     * Tests the following RNBluetoothClassic methods in sequence: enable bluetooth,
     * listing paired devices, checking is connected, getting the connection, connecting,
     * writing to the device, then disconnecting. Prints out encountered errors.
     */
    async testBT() {
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
}