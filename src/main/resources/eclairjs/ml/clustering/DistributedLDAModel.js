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

    var LDAModel = require(EclairJS_Globals.NAMESPACE + '/ml/clustering/LDAModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     *
     * Distributed model fitted by {@link module:eclairjs/mllib/clustering.LDA}.
     * This type of model is currently only produced by Expectation-Maximization (EM).
     *
     * This model stores the inferred topics, the full training dataset, and the topic distribution
     * for each training document.
     *
     * @class
     * @memberof module:eclairjs/ml/clustering
     * @extends module:eclairjs/mllib/clustering.LDAModel
     */
    
    
    var DistributedLDAModel = function() {
    	 
    	 this.logger = Logger.getLogger("ml_clustering_DistributedLDAModel_js");
    	 LDAModel.call(this, jvmObject);
    
    };
    
    DistributedLDAModel.prototype = Object.create(LDAModel.prototype);
    
    DistributedLDAModel.prototype.constructor = DistributedLDAModel;
    
    
    
    /**
     * Convert this distributed model to a local representation.  This discards info about the
     * training dataset.
     *
     * WARNING: This involves collecting a large {@link topicsMatrix} to the driver.
     * @returns {module:eclairjs/mllib/clustering.LocalLDAModel} 
     */
    DistributedLDAModel.prototype.toLocal = function() {
       var javaObject =  this.getJavaObject().toLocal();
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.DistributedLDAModel} 
     */
    DistributedLDAModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new DistributedLDAModel(javaObject);
    };
    
    
    /**
     * @returns {boolean} 
     */
    DistributedLDAModel.prototype.isDistributed = function() {
       return  this.getJavaObject().isDistributed();
    };
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    DistributedLDAModel.prototype.write = function() {
       var javaObject =  this.getJavaObject().write();
       return Utils.javaToJs(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     */
    DistributedLDAModel.read = function() {
       var javaObject =  org.apache.spark.ml.clustering.DistributedLDAModel.read();
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.DistributedLDAModel} 
     */
    DistributedLDAModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.clustering.DistributedLDAModel.load(path);
       return new DistributedLDAModel(javaObject);
    };
    
    module.exports = DistributedLDAModel;
})();