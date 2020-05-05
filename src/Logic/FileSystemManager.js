import Effect from './../EffectsObjects/Effect';
import AppComponent from '../EffectsObjects/AppComponent';
import DocumentPicker from 'react-native-document-picker';
var RNFS = require('react-native-fs');


export default class FileSystemManager {

    SAVE_PATH = RNFS.ExternalDirectoryPath+"/";


    constructor() {
        console.log("File System Manager start check!");
        //console.log("Save filepath: "+this.SAVE_PATH);
    }

    async testStuff() {
        audioIn = new AppComponent("adc~", 2, 2);
        audioOut = new AppComponent("dac~", 2, 2);
        extra = new AppComponent("extra~", 2, 2);
        compList1 = [];
        compList1.push(audioIn);
        compList1.push(audioOut);
        testEffect1 = new Effect("passthrough", compList1);
        testEffect2 = new Effect("helloWorld", compList1);
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

    async testLoadEffects() {
         return this.loadEffects();
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
     * @returns {Array{Effect}} an array of tuples containing the information of the saved PD files.
     * Each tuple has the following format: {'name': {String}, 'components': {String}}
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
     * Opens a file chooser and moves the chosen .pd file to the SAVE_PATH
     */
    async importEffect() {
        console.log("Attempting to import effect..");
        let file = await this.fileChooser();
        console.log("Filename: ",file.name);

        if (file === null) {
            return false;
        } else if (file !== undefined && file.name.includes('.pd')) {
            let destPath = this.SAVE_PATH+file.name;
            console.log("Destination path: ",destPath);
            let moved = await this.moveFile(file.uri, destPath);
            console.log("Moved: ",moved);
            return moved;
        }
        return true;
    }

    /**
     * Opens a file chooser for choosing a .pd file.
     */
    async fileChooser() {
        return await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        })
        .then(file => {
            console.log("File found! ",file.uri, file.type, file.name, file.size);
            return file;
        })
        .catch(err => {
            if (DocumentPicker.isCancel(err)) {
                // User exited dialog - do nothing
                return undefined;
            } else {
                console.log("ERROR trying to use file chooser: ",err);
                return null;
            }
        });
    }

    /**
     * Moves a file from one location to another.
     * @param {String} filepath uri path of the file to move.
     * @param {String} destPath uri path of the destination of the file.
     */
    async moveFile(filepath, destPath) {
        console.log("Attempting to move file from ", filepath," to ",destPath);
        await RNFS.moveFile(filepath, destPath)
        .then(success => {
            console.log("Successfully moved file!");
            return true;
        })
        .catch(err => {
            console.log("Error: failed to move file!", err);
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