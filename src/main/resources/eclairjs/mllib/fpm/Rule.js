/*                                                                         
* Copyright 2016 IBM Corp.                                                 
*                                                                          
* Licensed under the Apache License, Version 2.0 (the "License");          
* you may not use this file except in compliance with the License.         
* You may obtain a copy of the License at                                  
*                                                                          
*      http://www.apache.org/licenses/LICENSE-2.0                          
*                                                                          
* Unless required by applicable law or agreed to in writing, software      
* distributed under the License is distributed on an "AS IS" BASIS,        
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
* See the License for the specific language governing permissions and      
* limitations under the License.                                           
*/ 
(function () {

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    /**
     * An association rule between sets of items.
     *
     * @memberof module:eclairjs/mllib/fpm
     * @classdesc
     * @class
     */
    var Rule = function(jvmObject) {

        this.logger = Logger.getLogger("Rule_js");
        this.logger.debug("constructor");
        JavaWrapper.call(this, jvmObject);

    };

    Rule.prototype = Object.create(JavaWrapper.prototype);

    Rule.prototype.constructor = Rule;

    /**
     * Returns antecedent
     * @returns {Object[]}
     */
    Rule.prototype.antecedent = function() {
        /*
        public java.util.List<Item> javaAntecedent()
        Returns antecedent in a Java List.
        */
       return Utils.javaToJs(this.getJavaObject().javaAntecedent());
    };

    /**
     * Returns consequent
     * @returns {Object[]}
     */
    Rule.prototype.consequent = function() {
        /*
         public java.util.List<Item> javaConsequent()
         Returns consequent in a Java List.
         */
        return Utils.javaToJs(this.getJavaObject().javaConsequent());
    };

    /**
     * Returns the confidence of the rule.
     * @returns {float}
     */
    Rule.prototype.confidence = function() {
        /*
         public double confidence()
         Returns the confidence of the rule.
         */
        return this.getJavaObject().confidence();
    };

    /**
     *
     * @returns {string}
     */
    Rule.prototype.toString = function() {

       return this.getJavaObject().toString();
    };

    Rule.prototype.toJSON = function() {
        var jsonObj = {};
        jsonObj.antecedent = this.antecedent();
        jsonObj.consequent = this.consequent();
        jsonObj.confidence = this.confidence();
        return jsonObj;
    };

    module.exports = Rule;

})();
