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

    var ClassificationModel = require(EclairJS_Globals.NAMESPACE + '/mllib/classification/ClassificationModel');

    /**
     * Model for Naive Bayes Classifiers.
     *
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     *
     * @constructor
     * @implements {module:eclairjs/mllib/classification.ClassificationModel}
     */
    var NaiveBayesModel = function(jvmObject) {
         
         this.logger = Logger.getLogger("NaiveBayesModel_js");
         ClassificationModel.call(this, jvmObject);

    };

    NaiveBayesModel.prototype = Object.create(ClassificationModel.prototype);

    NaiveBayesModel.prototype.constructor = NaiveBayesModel;



    // inherits the documentation from `ClassificationModel#predict`
    NaiveBayesModel.prototype.predict = function() {
        return ClassificationModel.prototype.predict.apply(this, arguments);
    };


    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     */
    NaiveBayesModel.prototype.save = function(sc,path) {
       var sc_uw = Utils.unwrapObject(sc);
        this.getJavaObject().save(sc_uw.sc(),path);
    };


    //
    // static methods
    //


    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {module:eclairjs/mllib/classification.NaiveBayesModel}
     */
    NaiveBayesModel.load = function(sc,path) {
       var sc_uw = Utils.unwrapObject(sc);
       var javaObject =  org.apache.spark.mllib.classification.NaiveBayesModel.load(sc_uw.sc(),path);
       return new NaiveBayesModel(javaObject);
    };

    module.exports = NaiveBayesModel;

})();
