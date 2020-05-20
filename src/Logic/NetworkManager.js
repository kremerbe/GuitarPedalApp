
import {BleManager, Service, Characteristic, RefreshGattMoment} from 'react-native-ble-plx';

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

    manualConnect() {
        console.log("Manually connecting to RPi...");
        id = 'B8:27:EB:50:B4:BB'
        
        this.manager.connectToDevice(id)
        .then((device) => {
            console.log("Discovering services and characteristics...");
            return device.discoverAllServicesAndCharacteristics();
        })
        .then(() => {
            console.log("Listening...");
        },
        (error) => {
            console.log("Connection error: ");
            console.log(JSON.stringify(error));
        });
    }

    /**
     * Scans and connects to a device depending on the device name. In the future
     * I would like for it to accept regardless of the device name.
     */
    async scanAndConnect() {
        console.log("Scan and connect check");
        // console.log("Connected devices:");
        // devices = this.manager.connectedDevices()
        // .then((devices) => {
        //     console.log("Connected devices:");
        //     console.log(devices);
        // }, (error) => {
        //     console.log("Find devices error: ");
        //     console.log(error);
        // });

        /**
         * Bluetooth Scanning must be done before we can connect to the device. Once the 
         * device is saved and all servies and characteristics are discovered
         * the device can be connected to.
         */
        this.manager.startDeviceScan(null, null, async (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                console.log("ERROR",error);
                return false;
            }

            console.log("Found device: ", device.name, ", ", device.id);
    
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.id === 'B8:27:EB:50:B4:BB') { //'GuitarPedal'){
                console.log("FOUND RPi!!!");
                await this.disconnectionListener(device);
                
                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan();

                connected = await device.isConnected();
                this.device = device;
                if (connected) {
                    console.log("Already connected.");
                    await this.disconnect();
                    nowConnected = await device.isConnected();
                    console.log("Connected now?? ", nowConnected);

                } else {
                    console.log("Connecting...");
                    await this.connect();

                    await this.disconnect();
                }
            }
        });
    }

    async disconnectionListener(device) {
        console.log("Adding listener...");
        await device.onDisconnected((error, device) => {
            console.log("Device disconnected...", error);
        });
    }

    /**
     * Connects to the previously scanned device
     */
    async connect() {
        await this.device.connect({refreshGatt: RefreshGattMoment, allowDuplicates: true, timeout: 10000})
        .then((device) => {
            console.log("Discovering services and characteristics...");
            // this.info("Discovering services and characteristics");
            return device.discoverAllServicesAndCharacteristics();
        })
        .then(() => {
            // this.info("Listening...");
            console.log("Listening...");
        }, 
        // (rejected) => {
        //     console.log("Connection rejected: ", rejected.message);
        // }, 
        (error) => {
            console.log("Connection error: ");
            console.log(JSON.stringify(error));
            // this.error(error.message);
        });
    }
    
    /**
     * Disconnects the device
     */
    async disconnect() {
        await this.manager.cancelDeviceConnection(this.device.id);
    }


    sendEffect() {
        
    }
}
/**
 * Given via https://github.com/Polidea/react-native-ble-plx/issues/273
export default class App extends Component {
    constructor() {
      super();
      this.manager = new BleManager();
  }
  
  componentWillMount() {
      console.log("in componentWillMount")
      const subscription = this.manager.onStateChange((state) => {
          if (state === 'PoweredOn') {
              this.scanAndConnect();
              subscription.remove();
          }
      }, true);
  }
  
  scanAndConnect() {
    console.log("in scanAndConnect")
      this.manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
              // Handle error (scanning will be stopped automatically)
              console.log("ERROR : ", error);
              return
          }
  
          console.log("Device Detected", device);
          // Check if it is a device you are looking for based on advertisement data
          // or other criteria.
          if (device.name === 'TI BLE Sensor Tag' ||
              device.name === 'SensorTag') {
  
              // Stop scanning as it's not necessary if you are scanning for one device.
              this.manager.stopDeviceScan();
  
              // Proceed with connection.
          }
      });
  }
  
  render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        </View>
      );
    }
  }
  */