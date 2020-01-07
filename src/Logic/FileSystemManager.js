
var RNFS = require('react-native-fs');


export default class FileSystemManager {

    SAVE_PATH = RNFS.DocumentDirectoryPath+"/";

    testFileName = "test";


    constructor() {
        console.log("File System Manager start check!");
        console.log("Save filepath: "+this.SAVE_PATH);
    }

    async doStuff() {
        // await this.initializeSaveDirectory();
        await this.deleteEffect(this.testFileName);
        await this.saveEffect(this.testFileName, "Message");
        // await this.loadEffects();
        this.readFolder(this.SAVE_PATH);
    }

    // async initializeSaveDirectory() {
    //     if (!RNFS.exists(this.SAVE_PATH)) {
    //         RNFS.mkdir(this.SAVE_PATH);
    //     }

    //     saveDirExists = await RNFS.exists(this.SAVE_PATH);
    //     console.log("Save Dir Exists: "+saveDirExists);
    // }

    /**
     * Reads the contents of a directory and prints it out to console for debugging purposes.
     */
    async readFolder(path) {
        console.log("Doc Dir: ");
        await RNFS.readDir(path).then(files => console.log(files))
        .catch(err => console.log("Failed to read folder! "+err.message));
    }

    /**
     * TODO: Convert to taking an Effect object.
     * Saves an effect to the file system.
     * @param {String} effectName the name of the effect to save.
     * @param {String} effect the PureData effect data
     */
    async saveEffect(effectName, effect) {
        await RNFS.writeFile(this.SAVE_PATH+effectName+".pd", effect, 'utf8')
        .then(success => {
            console.log("Effect "+effectName+" saved!");
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
        await RNFS.readFile(this.SAVE_PATH+this.testFileName+".txt", 'utf8')
        .then(success => {
            console.log("Read file message: "+success);
        })
        .catch(err => {
            console.log("Failed to read test file! "+err.message);
        });
    }

    /**
     * Deletes an effect from the file system.
     * @param {String} effectName the name of the effect to delete.
     */
    async deleteEffect(effectName) {
        await RNFS.unlink(this.SAVE_PATH+effectName+".txt")
        .then(success => {
            console.log("Successfully deleted the file!");
        })
        .catch(err => {
            console.log("Could not delete the file ''"+effectName+"': "+err.message);
        })
    }
}