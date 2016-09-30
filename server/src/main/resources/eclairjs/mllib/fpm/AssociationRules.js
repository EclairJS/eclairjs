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
    var RDD = require(EclairJS_Globals.NAMESPACE + '/RDD');

    var FreqItemset = require(EclairJS_Globals.NAMESPACE + '/mllib/fpm/FreqItemset');

    /**
     * :: Experimental ::
     *
     * Generates association rules from a [[RDD[FreqItemset[Item]]]. This method only generates
     * association rules which have a single item as the consequent.
     *
     * @classdesc
     */

    /**
     * Constructs a default instance with default parameters {minConfidence = 0.8}.
     * @class
     * @memberof module:eclairjs/mllib/fpm
     */
    var AssociationRules = function() {
         
        this.logger = Logger.getLogger("AssociationRules_js");
        var jvmObject;
        if (arguments.length < 1) {
            jvmObject = new org.apache.spark.mllib.fpm.AssociationRules();
        } else {
            jvmObject = arguments[0];
        }
         JavaWrapper.call(this, jvmObject);

    };

    AssociationRules.prototype = Object.create(JavaWrapper.prototype);

    AssociationRules.prototype.constructor = AssociationRules;



    /**
     * Sets the minimal confidence (default: `0.8`).
     * @param {float} minConfidence
     * @returns {module:eclairjs/mllib/fpm.AssociationRules}
     */
    AssociationRules.prototype.setMinConfidence = function(minConfidence) {
       var javaObject =  this.getJavaObject().setMinConfidence(minConfidence);
       return new AssociationRules(javaObject);
    };


    /**
     * Computes the association rules with confidence above {@link minConfidence}.
     * @param {module:eclairjs.RDD} freqItemsets  frequent itemset model obtained from {@link FPGrowth}
     *
     * @returns {module:eclairjs.RDD}  a [[Set[Rule[Item]]] containing the assocation rules.
     */
    AssociationRules.prototype.run = function(freqItemsets) {
       var freqItemsets_uw = Utils.unwrapObject(freqItemsets);
       var javaObject =  this.getJavaObject().run(freqItemsets_uw);
       return new RDD(javaObject);
    };

    module.exports = AssociationRules;

})();
