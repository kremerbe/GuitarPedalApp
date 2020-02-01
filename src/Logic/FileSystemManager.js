import Effect from './../EffectsObjects/Effect';
import AppComponent from '../EffectsObjects/AppComponent';
var RNFS = require('react-native-fs');


export default class FileSystemManager {

    SAVE_PATH = RNFS.ExternalDirectoryPath+"/";


    constructor() {
        // console.log("File System Manager start check!");
        // console.log("Save filepath: "+this.SAVE_PATH);
    }

    async testStuff() {
        audioIn = new AppComponent("adc~", 2, 2);
        audioOut = new AppComponent("dac~", 2, 2);
        extra = new AppComponent("extra~", 2, 2);
        compList1 = [];
        compList1.push(audioIn);
        compList1.push(audioOut);
        compList1.push(extra);
        testEffect1 = new Effect("passthrough", compList1);
        testEffect2 = new Effect("otherShit", compList1);
        console.log("Initial files:");
        console.log(await this.readDir(this.SAVE_PATH));
        
        console.log("Deleting both existing files...");
        await this.deleteEffect(testEffect1);
        await this.deleteEffect(testEffect2);
        console.log("Current save folder:")
        console.log(await this.readDir(this.SAVE_PATH));
        console.log("Saving both effects again...");
        await this.saveEffect(testEffect1);
        await this.saveEffect(testEffect2);
        console.log("Load Effects:");
        console.log(await this.loadEffects());
        console.log("AppToPD Tests:");
        console.log(testEffect1.AppToPD());
        console.log(testEffect2.AppToPD());
    }

    /**
     * Saves an effect to the file system.
     * @param {Effect} effect the Effect object to save.
     * @returns {Boolean} whether or not the Effect was saved successfully.
     */
    async saveEffect(effect) {
        await RNFS.writeFile(this.SAVE_PATH+effect.getName()+".pd", effect.AppToPD(), 'utf8')
        .then(success => {
            // console.log("Effect "+effect.getName()+" saved!");
            return success;

        })
        .catch(err => {
            console.log("ERROR: Effect failed to save. "+err.message);
            return false;
        });
    }

    /**
     * Loads the effect files from the file system.
     * @returns {Array{Effect}} an array of Effect objects created from the saved PD files.
     */
    async loadEffects() {
        effectFiles = await this.readDirPdFilenames(this.SAVE_PATH);

        const effectsList = Promise.all(effectFiles.map(async (filename) => {
            effectData = await RNFS.readFile(this.SAVE_PATH+filename+".pd", 'utf8')
            .then(effectData => {
                return effectData.split("\r\n");
            })
            .catch(err => {
                console.log("ERROR: Failed to read effect "+filename+": "+err.message);
            });

            return {
                'name': filename,
                'components': effectData
            };
        }));

        return effectsList;
    }

    /**
     * Deletes an effect from the file system.
     * @param {String} effectName the name of the effect to delete.
     * @returns {Boolean} whether or not deleting the Effect was successful.
     */
    async deleteEffect(effect) {
        await RNFS.unlink(this.SAVE_PATH+effect.getName()+".pd")
        .then(success => {
            // console.log("Successfully deleted the file!");
            return success;
        })
        .catch(err => {
            console.log("ERROR: Could not delete the file ''"+effect.getName()+"': "+err.message);
            return false;
        })
    }

    /**
     * Returns an array of the names of the PureData files in a specified directory.
     * @param {String} path the directory path to read the PD files from.
     * @returns {Array{String}} the array of PD file names.
     */
    async readDirPdFilenames(path) {
        return await RNFS.readDir(path)
        .then(pdFiles => {
            return pdFiles.map(f => f.name).filter(f => f.endsWith(".pd")).map(f => f.substring(0, f.length-3));
        })
        .catch(err => console.log("ERROR: Failed to read folder! "+err.message));
    }

    /**
     * Returns the contents of a directory for testing purposes.
     * @param {String} path the directory path to read files from.
     * @returns {Promise} a promise containing the directory contents.
     */
    async readDir(path) {
        return await RNFS.readDir(path)
        .then(files => { return files; })
        .catch(err => console.log("ERROR: Failed to read folder! "+err.message));
    }
}