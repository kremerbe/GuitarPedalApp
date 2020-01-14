import Effect from './../EffectsObjects/Effect';

/**
 * PureData manager handles the functionality for creating an app to/from 
 * pureData from/to the App
 */
export default class pureDataManager {
    effect;

    /**
     * 
     * @param {Effect} effect - Effect to be either used to populate a .pd file or used to 
     * populate a new Effect with contents from the .pd file
     */
    constructor(effect){
        this.Effect = effect;
    }

    /**
     *  Takes the pureData input from the file system manager and generates a list of components
     */
    pureDataToApp(){
        
        return componentList;
    }

    /**
     * Takes in an effect and renders the effect on the GUI
     */
    appToPureData(){
        /**
         * For every appComponent create a new line with proper formatting
         * "#[X/N/A]?['name']?[param1]?[param2]?[param_n]?;\r\n"
         * 
         * Wiring Connections:  
         * #X connect 'source#' 'outlet#' 'dest#' 'inlet#;'
         * example: 
         * #X connect 0 0 1 0;
         * /Todo Wiring is not yet implemented
         */
        for(let i = 0; i < this.effect.componentList.length; i++){
            s = "#[X]?[" + name + "]?";
                /* Add on additional Parameters */
                for(let i = 0; i < param.length ; i++)
                {
                  s = s + "[" + param[i] + "]?";
                }
                s = s + ";\\r\\n";
        }
      }        
}
