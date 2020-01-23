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
}