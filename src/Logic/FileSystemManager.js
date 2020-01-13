import Effect from './../EffectsObjects/Effect';
var RNFS = require('react-native-fs');


export default class FileSystemManager {

    SAVE_PATH = RNFS.DocumentDirectoryPath+"/";

    testEffect1 = new Effect(name="test1", components="blah blah blah")
    testEffect2 = new Effect(name="test2", components="bidey blah blidy")


    constructor() {
        console.log("File System Manager start check!");
        console.log("Save filepath: "+this.SAVE_PATH);
    }

    async doStuff() {
        // await this.initializeSaveDirectory();
        this.deleteEffect(this.testEffect1);
        await this.deleteEffect(this.testEffect2);
        this.saveEffect(this.testEffect1);
        await this.saveEffect(this.testEffect2);
        this.readDir(this.SAVE_PATH);
        console.log(await this.loadEffects());
    }

    // async initializeSaveDirectory() {
    //     if (!RNFS.exists(this.SAVE_PATH)) {
    //         RNFS.mkdir(this.SAVE_PATH);
    //     }

    //     saveDirExists = await RNFS.exists(this.SAVE_PATH);
    //     console.log("Save Dir Exists: "+saveDirExists);
    // }

    /**
     * Saves an effect to the file system.
     * @param {Effect} effect the Effect object to save.
     */
    async saveEffect(effect) {
        console.log("Name: "+effect.getName());
        console.log("Components: "+effect.getComponents());
        await RNFS.writeFile(this.SAVE_PATH+effect.getName()+".pd", effect.exportComponents(), 'utf8')
        .then(success => {
            console.log("Effect "+effect.getName()+" saved!");
            return success;
        })
        .catch(err => {
            console.log("ERROR: Effect failed to save. "+err.message);
            return false;
        });
    }

    /**
     * Loads the effect files from the file system.
     */
    async loadEffects() {
        effectsList = [];
        effectFiles = await this.readDir();
        console.log(effectFiles);
        for (i=0; i<effectFiles.size(); i++) {
            await RNFS.readFile(this.SAVE_PATH+effectFiles[i], 'utf8')
            .then(effectData => {
                effect = new Effect(name=effectFiles[i], components=effectData)
                effectsList.push(effect);
                console.log("Read effect "+effectFiles[i]+" data: "+effectData);
            })
            .catch(err => {
                console.log("Failed to read effect "+effectFiles[i]+": "+err.message);
            });
        }
        return effectsList;
    }

    /**
     * Deletes an effect from the file system.
     * @param {String} effectName the name of the effect to delete.
     */
    async deleteEffect(effect) {
        await RNFS.unlink(this.SAVE_PATH+effect.getName()+".txt")
        .then(success => {
            console.log("Successfully deleted the file!");
        })
        .catch(err => {
            console.log("Could not delete the file ''"+effect.getName()+"': "+err.message);
        })
    }

    /**
     * Returns the contents of a directory
     */
    async readDir(path) {
        return await RNFS.readDir(path)
        .then(files => { return files; })
        .catch(err => console.log("Failed to read folder! "+err.message));
    }
}