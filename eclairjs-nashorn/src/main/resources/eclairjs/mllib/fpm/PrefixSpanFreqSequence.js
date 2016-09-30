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
     * Represents a frequence sequence. param: sequence a sequence of itemsets stored as an Array of Arrays param: freq frequency
     * @param {object[]} sequence
     * @param {integer} freq
     * @memberof module:eclairjs/mllib/fpm
     * @constructor
     */
    var PrefixSpanFreqSequence = function() {
        var jvmObject;
        this.logger = Logger.getLogger("PrefixSpanModelFreqSequence_js");
        if(arguments[0] instanceof org.apache.spark.mllib.fpm.PrefixSpan.FreqSequence) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.mllib.fpm.PrefixSpan.FreqSequence(Utils.unwrapObject(arguments[0]), arguments[1]);
        }


        JavaWrapper.call(this, jvmObject);

    };

    PrefixSpanFreqSequence.prototype = Object.create(JavaWrapper.prototype);

    PrefixSpanFreqSequence.prototype.constructor = PrefixSpanFreqSequence;

    /**
     * @returns {object[]}
     */
    PrefixSpanFreqSequence.prototype.sequence = function() {
        var javaObject =  this.getJavaObject().javaSequence();
        return Utils.javaToJs(javaObject);
    };

    /**
     * @returns {integer}
     */
    PrefixSpanFreqSequence.prototype.freq = function() {
        return this.getJavaObject().freq();
    };

    PrefixSpanFreqSequence.prototype.toJSON = function() {
        var jsonObj = {};
        jsonObj.freq = this.freq();
        jsonObj.sequence = this.sequence();
        return jsonObj;

    };

    module.exports = PrefixSpanFreqSequence;

})();
