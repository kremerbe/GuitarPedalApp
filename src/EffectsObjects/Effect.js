
export default class Effect {
    
    connections;

    /**
     * WTF you can only have one constructor........
     * @param {} name 
     * @param {*} components 
     */
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

    /**
     * Returns a list/array of the components
     */
    getComponents() {
        return this._components;
    }

    //Todo: Fix this shit. Private/public/protected
    setName(name) {
        this._name = name;
    }

    //Todo: Fix this shit. Private/public/protected
    setComponents(components) {
        this._components = components;
    }

    setConnections(connections) {
        this.connections = connections;
    }

    AppToPD () {
        let compList = this._components.slice();
        let x = 0; 
        let y = 0; 

       let s = "#N canvas 300 300 450 300 12;\r\n"; 

        for(let i = 0; i < compList.length ; i++) {
            s = s + "#X obj " + x + " " + y + " " + compList[i].getName() + ";\r\n"; 
            y += 30;
        }

        s = s + "#X connect 0 0 1 0;\r\n"; 
        s = s + "#X connect 0 1 1 1;\r\n"; 
        return s;
    }

    printConnections() {
        connections.forEach(connection => {
            console.log("Connection\n\r");
            console.log(connection);
        });
    }
}