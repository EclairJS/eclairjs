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
     * Local (non-distributed) model fitted by {@link module:eclairjs/ml/clustering.LDA}.
     *
     * This model stores the inferred topics only; it does not store info about the training dataset.
     * @class
     * @memberof module:eclairjs/ml/clustering
     * @extends module:eclairjs/ml/clustering.LDAModel
     */
    
    
    var LocalLDAModel = function(jvmObject) {
    	 
    	 this.logger = Logger.getLogger("ml_clustering_LocalLDAModel_js");
    	 LDAModel.call(this, jvmObject);
    
    };
    
    LocalLDAModel.prototype = Object.create(LDAModel.prototype);
    
    LocalLDAModel.prototype.constructor = LocalLDAModel;
    
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.LocalLDAModel} 
     */
    LocalLDAModel.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new LocalLDAModel(javaObject);
    };
    
    
    /**
     * @returns {boolean} 
     */
    LocalLDAModel.prototype.isDistributed = function() {
       return  this.getJavaObject().isDistributed();
    };
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    LocalLDAModel.prototype.write = function() {
        var MLWriter = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter');
        var javaObject = this.getJavaObject().write();
        /*
         the object is an inner class so don't use Utils.javaToJs
         to create the MLWriter object.
         */
        return new MLWriter(javaObject);
    };
    
    //
    // static methods
    //
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLReader} 
     */
    LocalLDAModel.read = function() {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject =  org.apache.spark.ml.clustering.LocalLDAModel.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.LocalLDAModel} 
     */
    LocalLDAModel.load = function(path) {
       var javaObject =  org.apache.spark.ml.clustering.LocalLDAModel.load(path);
       return new LocalLDAModel(javaObject);
    };
    
    module.exports = LocalLDAModel;
})();