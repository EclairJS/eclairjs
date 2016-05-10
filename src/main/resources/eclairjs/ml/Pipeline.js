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
     * @classdesc
     * A simple pipeline, which acts as an estimator. A Pipeline consists of a sequence of stages, each
     * of which is either an {@link module:eclairjs/ml.Estimator} or a {@link module:eclairjs/ml.Transformer}.
     * When {@link module:eclairjs/ml.Pipeline#fit} is called, the
     * stages are executed in order. If a stage is an {@link module:eclairjs/ml.Estimator}, its {@link module:eclairjs/ml.Estimator#fit} method will
     * be called on the input dataset to fit a model. Then the model, which is a transformer, will be
     * used to transform the dataset as the input to the next stage. If a stage is a {@link Transformer},
     * its {@link module:eclairjs/ml.Transformer#transform} method will be called to produce the dataset for the next stage.
     * The fitted model from a {@link Pipeline} is an {@link module:eclairjs/ml.PipelineModel}, which consists of fitted models and
     * transformers, corresponding to the pipeline stages. If there are no stages, the pipeline acts as
     * an identity transformer.
     * @class
     * @memberof module:eclairjs/ml
     * @param {string} [uid]
     */
    var Pipeline = function(uid) {
    	 this.logger = Logger.getLogger("ml.Pipeline_js");
        var jvmObject;
        if (uid) {
            if (uid instanceof org.apache.spark.ml.Pipeline) {
                jvmObject = uid;
            } else {
                jvmObject = new org.apache.spark.ml.Pipeline(uid);
            }
        } else {
            jvmObject = new org.apache.spark.ml.Pipeline();
        }
        JavaWrapper.call(this, jvmObject);
    
    };
    
    Pipeline.prototype = Object.create(JavaWrapper.prototype);
    
    Pipeline.prototype.constructor = Pipeline;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {string}
     */
    Pipeline.prototype.uid = function () {
        return this.getJavaObject().uid();
    };
    /**
     * @param {PipelineStage[]} value
     * @returns {module:eclairjs/ml/param.Param} Param<{@link module:eclairjs/ml.PipelineStage}[]>
     */
    Pipeline.prototype.stages = function() {
           var value_uw = Utils.unwrapObject(value);
           var javaObject =  this.getJavaObject().stages(value_uw);
           return Utils.javaToJs(javaObject);
    };

    /**
     * @param {module:eclairjs/ml.PipelineStage[]} value
     * @returns {module:eclairjs/ml.Pipeline} 
     */
    Pipeline.prototype.setStages = function(value) {
       var value_uw = Utils.unwrapObject(value);
       var javaObject =  this.getJavaObject().setStages(value_uw);
       return new Pipeline(javaObject);
    };
    
    
    /**
     * @returns {module:eclairjs/ml.PipelineStage[]}
     */
    Pipeline.prototype.getStages = function() {
       var javaObject =  this.getJavaObject().getStages();
       return Utils.javaToJs(javaObject);
    };


    /**
     * validateParams
     */
    Pipeline.prototype.validateParams = function() {
        this.getJavaObject().validateParams();
    };
    
    
    /**
     * Fits the pipeline to the input dataset with additional parameters. If a stage is an
     * {@link Estimator}, its [[Estimator#fit]] method will be called on the input dataset to fit a model.
     * Then the model, which is a transformer, will be used to transform the dataset as the input to
     * the next stage. If a stage is a {@link Transformer}, its [[Transformer#transform]] method will be
     * called to produce the dataset for the next stage. The fitted model from a {@link Pipeline} is an
     * {@link PipelineModel}, which consists of fitted models and transformers, corresponding to the
     * pipeline stages. If there are no stages, the output model acts as an identity transformer.
     *
     * @param {module:eclairjs/sql.DataFrame} dataset  input dataset
     * @returns {module:eclairjs/ml.PipelineModel}  fitted pipeline
     */
    Pipeline.prototype.fit = function(dataset) {
       var dataset_uw = Utils.unwrapObject(dataset);
       var javaObject =  this.getJavaObject().fit(dataset_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.Pipeline} 
     */
    Pipeline.prototype.copy = function(extra) {
       var extra_uw = Utils.unwrapObject(extra);
       var javaObject =  this.getJavaObject().copy(extra_uw);
       return new Pipeline(javaObject);
    };
    
    
    /**
     * Derives the output schema from the input schema.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Pipeline.prototype.transformSchema = function(schema) {
       var schema_uw = Utils.unwrapObject(schema);
       var javaObject =  this.getJavaObject().transformSchema(schema_uw);
       return Utils.javaToJs(javaObject);
    };
    
    
    /**
     * @returns {module:eclairjs/ml/util.MLWriter} 
     */
    Pipeline.prototype.write = function() {
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
    Pipeline.read = function() {
        var MLReader = require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader');
        var javaObject = org.apache.spark.ml.Pipeline.read();
        /*
         The object is and inner class so don't user Utils.javaToJs
         to create th MLReader.
         */
        return new MLReader(javaObject);
    };
    
    
    /**
     * @param {string} path
     * @returns {module:eclairjs/ml.Pipeline} 
     */
    Pipeline.load = function(path) {
       var javaObject =  org.apache.spark.ml.Pipeline.load(path);
       return new Pipeline(javaObject);
    };
    
    module.exports = Pipeline;
})();