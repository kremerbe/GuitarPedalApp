
export default class AppComponent {

    constructor(name, numInputs, numOutputs) {
        this._name = name;
        this.numInputs = numInputs;
        this.numOutputs = numOutputs;
    }

    /**
     * Turns the list of components into a string for export to a file.
     */
    exportComponents() {
        return this._components;
    }

    getName() {
        return this._name;
    }

    getComponents() {
        return this._components;
    }
}