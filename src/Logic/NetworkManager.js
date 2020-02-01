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

            console.log("Found device: ", device.name);
    
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.name === 'MSOE-54RW5Q2') { //'GuitarPedal'){
                
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