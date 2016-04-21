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

    var PrefixSpanModel = require(EclairJS_Globals.NAMESPACE + '/mllib/fpm/PrefixSpanModel');

    /**
     * :: Experimental ::
     *
     * A parallel PrefixSpan algorithm to mine frequent sequential patterns.
     * The PrefixSpan algorithm is described in J. Pei, et al., PrefixSpan: Mining Sequential Patterns
     * Efficiently by Prefix-Projected Pattern Growth ([[http://doi.org/10.1109/ICDE.2001.914830]]).
     *
     *
     * @see [[https://en.wikipedia.org/wiki/Sequential_Pattern_Mining Sequential Pattern Mining
     *       (Wikipedia)]]
     * @memberof module:eclairjs/mllib/fpm
     * @classdesc
     * Constructs a default instance with default parameters
     * {minSupport: `0.1`, maxPatternLength: `10`, maxLocalProjDBSize: `32000000L`}.
     * @class
     */
    var PrefixSpan = function(jvmObject) {
         
         this.logger = Logger.getLogger("PrefixSpan_js");
        if (!jvmObject) {
            jvmObject = new org.apache.spark.mllib.fpm.PrefixSpan();
        }
         JavaWrapper.call(this, jvmObject);

    };

    PrefixSpan.prototype = Object.create(JavaWrapper.prototype);

    PrefixSpan.prototype.constructor = PrefixSpan;



    /**
     * Get the minimal support (i.e. the frequency of occurrence before a pattern is considered
     * frequent).
     * @returns {float}
     */
    PrefixSpan.prototype.getMinSupport = function() {
        return  this.getJavaObject().getMinSupport();
    };


    /**
     * Sets the minimal support level (default: `0.1`).
     * @param {float} minSupport
     * @returns {PrefixSpan}
     */
    PrefixSpan.prototype.setMinSupport = function(minSupport) {
       var javaObject =  this.getJavaObject().setMinSupport(minSupport);
       return new PrefixSpan(javaObject);
    };


    /**
     * Gets the maximal pattern length (i.e. the length of the longest sequential pattern to consider.
     * @returns {integer}
     */
    PrefixSpan.prototype.getMaxPatternLength = function() {
        return  this.getJavaObject().getMaxPatternLength();
    };


    /**
     * Sets maximal pattern length (default: `10`).
     * @param {integer} maxPatternLength
     * @returns {PrefixSpan}
     */
    PrefixSpan.prototype.setMaxPatternLength = function(maxPatternLength) {
       var javaObject =  this.getJavaObject().setMaxPatternLength(maxPatternLength);
       return new PrefixSpan(javaObject);
    };


    /**
     * Gets the maximum number of items allowed in a projected database before local processing.
     * @returns {integer}
     */
    PrefixSpan.prototype.getMaxLocalProjDBSize = function() {
        return  this.getJavaObject().getMaxLocalProjDBSize();
    };


    /**
     * Sets the maximum number of items (including delimiters used in the internal storage format)
     * allowed in a projected database before local processing (default: `32000000L`).
     * @param {integer} maxLocalProjDBSize
     * @returns {PrefixSpan}
     */
    PrefixSpan.prototype.setMaxLocalProjDBSize = function(maxLocalProjDBSize) {
       var javaObject =  this.getJavaObject().setMaxLocalProjDBSize(maxLocalProjDBSize);
       return new PrefixSpan(javaObject);
    };


    /**
     * Finds the complete set of frequent sequential patterns in the input sequences of itemsets.
     * @param {module:eclairjs.RDD} data  sequences of itemsets.
     * @returns {PrefixSpanModel}  a [[PrefixSpanModel]] that contains the frequent patterns
     */
    PrefixSpan.prototype.run = function(data) {
       var data_uw = Utils.unwrapObject(data);
       var javaObject =  this.getJavaObject().run(data_uw);
       return new PrefixSpanModel(javaObject);
    };

    module.exports = PrefixSpan;

})();
