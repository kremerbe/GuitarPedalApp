
export default class Effect {

    constructor(name, components) {
        this._name = name;
        this._components = components;
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