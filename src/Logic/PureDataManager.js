import Effect from './../EffectsObjects/Effect';
import AppComponent from '../EffectsObjects/AppComponent';
import { completeHandlerIOS } from 'react-native-fs';

export default class PureDataManager {

    constructor() {
    }

    testNewEffect() {
        console.log("Pure Data Manager start check!");
        audioIn = new AppComponent("adc~", 2, 2);
        audioOut = new AppComponent("dac~", 2, 2);
        list = [audioIn, audioOut];
        testEffect1 = new Effect("SimpleEfect", list);
        //this.AppToPD(testEffect1);
        console.log(testEffect1.getComponents());
        this.AppToPD(testEffect1);
    }

    AppToPD (Effect) {
        let compList = Effect.getComponents();
        let x = 0; 
        let y = 0; 

       let s = "#N canvas 300 300 450 300 12;" 
       console.log(s);

        for(let i = 0; i < compList.length ; i++) {
            s = "#X obj " + x + " " + y + " " + compList[i].getName() + ";";
            console.log(s);
            y += 30;
        }

        s = "#X connect 0 0 1 0;"
        console.log(s);
        s = "#X connect 0 1 1 1;"
        console.log(s);
    }

    pdToApp(effect)
    {
        effect.components.forEach(line => {
            subLine = line.split(" ");
            connectMap = new Map;
            if(subLine[0] == "#X") {
                if(subLine[1] == "connect") {
                    console.log("Connect object #" + subLine[2]+ " Output Port#: " + subLine[3] + ".\r\nTo object #" + subLine[4] + ". Input Port#: " + subLine[5]);
                    connectMap.set(subLine[2] + "." + subLine[3], subLine[4] + "." + subLine[5])
                } else if(subLine[1] == "obj") {
                    console.log("Name: " + subLine[4]);
                    // Need to make sure that we support the incomming component
                        if(subLine.length <= 5)     // If the component has any parameters
                        {
                            console.log("No Parameters");
                        } else {
                            params = [];
                            for(x = 5; x < subLine.length; x++) {       // Parameter loop
                                params[x-5] = subLine[x];
                            }
                            console.log(params);
                        }
                    
                } else {
                    return;
                }
            } else {
                return;
            }
        });
        connectMap.forEach(connection => {
            console.log("Connection\n\r");
            console.log(connection);
        });
    }
}