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
    var RDD = require(EclairJS_Globals.NAMESPACE + '/RDD');

    var FreqItemset = require(EclairJS_Globals.NAMESPACE + '/mllib/fpm/FreqItemset');

    /**
     * Model trained by {@link FPGrowth}, which holds frequent itemsets.
     * @param freqItemsets frequent itemset, which is an RDD of {@link FreqItemset}
     * @classdesc
     */

    /**
     * @param {RDD} freqItemsets
     * @class
     * @memberof module:eclairjs/mllib/fpm
     */
    var FPGrowthModel = function(freqItemsets) {
        this.logger = Logger.getLogger("FPGrowthModel_js");
        var jvmObject;
        if (freqItemsets instanceof org.apache.spark.mllib.fpm.FPGrowthModel) {
            jvmObject = freqItemsets
        } else {
            jvmObject = new org.apache.spark.mllib.fpm.FPGrowthModel(freqItemsets);
        }

         JavaWrapper.call(this, jvmObject);

    };

    FPGrowthModel.prototype = Object.create(JavaWrapper.prototype);

    FPGrowthModel.prototype.constructor = FPGrowthModel;



    /**
     * Generates association rules for the [[Item]]s in {@link freqItemsets}.
     * @param {float} confidence  minimal confidence of the rules produced
     * @returns {RDD} 
     */
    FPGrowthModel.prototype.generateAssociationRules = function(confidence) {
       var javaObject =  this.getJavaObject().generateAssociationRules(confidence);
       return new RDD(javaObject);
    };

    /**
     * Returns RDD of RDD FreqItemset
     * @returns {RDD}
     */
    FPGrowthModel.prototype.freqItemsets = function() {
        var javaObject =  this.getJavaObject().freqItemsets();
        return new RDD(javaObject.toJavaRDD());
    };


    module.exports = FPGrowthModel;

})();
