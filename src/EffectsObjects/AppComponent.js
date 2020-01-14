
export default class AppComponent {

    PDComponents = new componentList;
    constructor(name) {
        this.name = name;
    }
    
    getName() {
        return this._name;
    }

    getComponentList() {
        return this._components;
    }

    // How do we know what the appcomponent is made of?
}