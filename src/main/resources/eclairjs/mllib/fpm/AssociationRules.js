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
 *  @class
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
 * @returns {AssociationRules}
 */
AssociationRules.prototype.setMinConfidence = function(minConfidence) {
   var javaObject =  this.getJavaObject().setMinConfidence(minConfidence);
   return new AssociationRules(javaObject);
};


/**
 * Computes the association rules with confidence above {@link minConfidence}.
 * @param {RDD} freqItemsets  frequent itemset model obtained from {@link FPGrowth}
 *
 * @returns {RDD}  a [[Set[Rule[Item]]] containing the assocation rules.
 */
AssociationRules.prototype.run = function(freqItemsets) {
   var freqItemsets_uw = Utils.unwrapObject(freqItemsets);
   var javaObject =  this.getJavaObject().run(freqItemsets_uw);
   return new RDD(javaObject);
};


/**
 * An association rule between sets of items.
 *
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
 * @returns {object}
 */
Rule.prototype.antecedent = function() {
    /*
    public java.util.List<Item> javaAntecedent()
    Returns antecedent in a Java List.
    */
   return this.getJavaObject().javaAntecedent();
};

/**
 * Returns consequent
 * @returns {object}
 */
Rule.prototype.consequent = function() {
    /*
     public java.util.List<Item> javaConsequent()
     Returns consequent in a Java List.
     */
    return this.getJavaObject().javaConsequent();
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