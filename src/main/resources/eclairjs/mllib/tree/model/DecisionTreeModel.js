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
     * Decision tree model for classification or regression.
     * This model stores the decision tree structure and parameters.
     * @param topNode root node
     * @param algo algorithm type -- classification or regression
     * @classdesc
     */

    /**
     * @param {Node} topNode
     * @param {Algo} algo
     * @returns {??}
     *  @class
     *  @memberof module:eclairjs/mllib/tree/model
     */
    var DecisionTreeModel = function (topNode, algo) {
        var jvmObject;
        if (topNode instanceof org.apache.spark.mllib.tree.model.DecisionTreeModel) {
            jvmObject = topNode;
        }/* if (topeNode instanceof Node {
         jvmObject =  new org.apache.spark.mllib.tree.model.DecisionTreeModel(topNode,algo);
         } */ else {
            throw "DecisionTreeModel invalid constructor parameter"
        }
        this.logger = Logger.getLogger("DecisionTreeModel_js");
        JavaWrapper.call(this, jvmObject);

    };

    DecisionTreeModel.prototype = Object.create(JavaWrapper.prototype);

    DecisionTreeModel.prototype.constructor = DecisionTreeModel;


    /**
     * Predict values for a single data point using the model trained.
     *
     * @param {Vector | RDD} features  Vector or RDD representing a single data point
     * @returns {float | RDD}  float or RDD prediction from the trained model
     */
    DecisionTreeModel.prototype.predict = function (features) {

        var features_uw = Utils.unwrapObject(features);
        return Utils.javaToJs(this.getJavaObject().predict(features_uw));
    };


    /**
     * Get number of nodes in tree, including leaf nodes.
     * @returns {integer}
     */
    DecisionTreeModel.prototype.numNodes = function () {
        return this.getJavaObject().numNodes();
    };


    /**
     * Get depth of tree.
     * E.g.: Depth 0 means 1 leaf node.  Depth 1 means 1 internal node and 2 leaf nodes.
     * @returns {integer}
     */
    DecisionTreeModel.prototype.depth = function () {
        return this.getJavaObject().depth();
    };


    /**
     * Print a summary of the model.
     * @returns {string}
     */
    DecisionTreeModel.prototype.toString = function () {
        return this.getJavaObject().toString();
    };


    /**
     * Print the full model to a string.
     * @returns {string}
     */
    DecisionTreeModel.prototype.toDebugString = function () {
        return this.getJavaObject().toDebugString();
    };


    /**
     * @param {SparkContext} sc   Spark context used to save model data.
     * @param {string} path   Path specifying the directory in which to save this model.
     *              If the directory already exists, this method throws an exception.
     */
    DecisionTreeModel.prototype.save = function (sc, path) {
        var sc_uw = Utils.unwrapObject(sc);
        this.getJavaObject().save(sc_uw.sc(), path);
    };

//
// static methods
//


    /**
     *
     * @param {SparkContext} sc   Spark context used for loading model files.
     * @param {string} path   Path specifying the directory to which the model was saved.
     * @returns {DecisionTreeModel}   Model instance
     */
    DecisionTreeModel.load = function (sc, path) {
        var sc_uw = Utils.unwrapObject(sc);
        var javaObject = org.apache.spark.mllib.tree.model.DecisionTreeModel.load(sc_uw.sc(), path);
        return new DecisionTreeModel(javaObject);
    };

    module.exports = DecisionTreeModel;

})();