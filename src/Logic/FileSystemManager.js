import Effect from './../EffectsObjects/Effect';
var RNFS = require('react-native-fs');


export default class FileSystemManager {

    SAVE_PATH = RNFS.DocumentDirectoryPath+"/";

    testEffect1 = new Effect("test1", "blah blah blah");
    testEffect2 = new Effect("test2", "blippity bloppity");


    constructor() {
        console.log("File System Manager start check!");
        console.log("Save filepath: "+this.SAVE_PATH);
    }

    async testStuff() {
        console.log(await this.readDir(this.SAVE_PATH));
        await this.deleteEffect(this.testEffect1);
        await this.deleteEffect(this.testEffect2);
        console.log(await this.readDir(this.SAVE_PATH));
        await this.saveEffect(this.testEffect1);
        await this.saveEffect(this.testEffect2);
        console.log("Load Effects:");
        console.log(await this.loadEffects());
    }

    /**
     * Saves an effect to the file system.
     * @param {Effect} effect the Effect object to save.
     */
    async saveEffect(effect) {
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
        effectFiles = await this.readDirPdFilenames(this.SAVE_PATH);
        for (i=0; i<effectFiles.length; i++) {
            await RNFS.readFile(this.SAVE_PATH+effectFiles[i]+".pd", 'utf8')
            .then(effectData => {
                effect = new Effect(effectFiles[i], effectData);
                effectsList.push(effect);
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
        await RNFS.unlink(this.SAVE_PATH+effect.getName()+".pd")
        .then(success => {
            console.log("Successfully deleted the file!");
        })
        .catch(err => {
            console.log("Could not delete the file ''"+effect.getName()+"': "+err.message);
        })
    }

    async readDirPdFilenames(path) {
        return await RNFS.readDir(path)
        .then(pdFiles => {
            return pdFiles.map(f => f.name).filter(f => f.endsWith(".pd")).map(f => f.substring(0, f.length-3));
        })
        .catch(err => console.log("Failed to read folder! "+err.message));
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