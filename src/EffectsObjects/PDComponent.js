
export default class PDComponent {
    numInputs;
    numOutputs;

    constructor(name, inputs, outputs) {
        this._name = name;
        this.numInputs = inputs;
        this.numOutputs = outputs;
    }

    getName() {
        return this._name;
    }
}