import Effect from './../EffectsObjects/Effect';
import AppComponent from '../EffectsObjects/AppComponent';
import { completeHandlerIOS } from 'react-native-fs';

export default class PureDataManager {

    constructor() {
        //this.testNewEffect();
    }

    testNewEffect() {
        console.log("Pure Data Manager start check!");
        audioIn = new AppComponent("adc~", 2, 2);
        audioOut = new AppComponent("dac~", 2, 2);
        list = [audioIn, audioOut];
        testEffect1 = new Effect("SimpleEfect", list);
        console.log(testEffect1.getComponents());
        this.AppToPD(testEffect1);
    }

    testLoadInFile() {

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

    /**
     * PdToApp - Converts .pd files for use within our phone application
     * 
     * @param {Object} s - s is an js object whose component is an array of strings
     *                     that make up the pd file. Each element is a different line.
     */
    pdToApp(s)
    {
        appCompList = new Array;
        s.components.forEach(line => {
            console.log(line);
            subLine = line.split(" ");
            connectMap = new Map;
            if(subLine[0] == "#X") {
                // If the current line is a connection
                if(subLine[1] == "connect") {
                    /**
                     * Example: 
                     *  Key(Source Obj.Port): 1.1
                     *  Value(Dest Obj.Port): 2.1
                     */
                    console.log("Connect object #" + subLine[2]+ " Output Port#: " + subLine[3] + 
                        ".\r\nTo object #" + subLine[4] + ". Input Port#: " + subLine[5]);
                    connectMap.set(subLine[2] + "." + subLine[3], subLine[4] + "." + subLine[5]);

                // If the current line is an object
                } else if(subLine[1] == "obj") {
                    appCompName = subLine[4];
                    console.log("Name: " + appCompName);
                    /**
                     * TODO: Need to make sure that we support the incomming component  
                     * Also here we need to check to see how many inpus/outputs the comp has
                     * TODO: How do we deal with parameters
                     */ 
                    tempAppComp = new AppComponent(appCompName, 2, 2);  // Assuming 2 for inputs and outputs
                    if(subLine.length <= 5) {    // If the component has any parameters
                        console.log("No Parameters");
                    } else {
                        params = [];
                        for(x = 5; x < subLine.length; x++) {       // Parameter loop
                            params[x-5] = subLine[x];
                        }
                        tempAppComp.setParam(params);
                    }
                    appCompList.push(tempAppComp);
                } else return;
            } else return;
        });
        newEffect = new Effect(s.name, appCompList);
        newEffect.setConnections = connectMap;
        return newEffect;
    }
}