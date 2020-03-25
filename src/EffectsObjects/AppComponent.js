
export default class AppComponent {
    parameters;

    constructor(name, numInputs, numOutputs) {
        this._name = name;
        this.numInputs = numInputs;
        this.numOutputs = numOutputs;
        this.parameters = null;
    }

    /**
     * TODO: Duplicate method.
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

    setParam(param) {
        this.parameters = param.slice(); 
    }
}