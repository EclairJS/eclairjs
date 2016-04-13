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
     * Frequent itemset. param: items items in this itemset. Java users should call javaItems() instead. param: freq frequency
     * @memberof module:eclairjs/mllib/fpm
     * @classdesc
     * @param {object} items
     * @param {integer} freq
     * @constructor
     */
    var FreqItemset = function() {

        this.logger = Logger.getLogger("FreqItemset_js");
        var jvmObject = arguments[0];
        if (arguments.length > 1) {
            var items = Utils.unwrapObject(arguments[0]);
            if (Array.isArray(items)) {
                var list = new java.util.ArrayList();
                items.forEach(function(item){
                    list.add(Utils.unwrapObject(item));
                });
                items = list.toArray();
            }
            jvmObject = new org.apache.spark.mllib.fpm.FPGrowth.FreqItemset(items, arguments[1]);
        }
        JavaWrapper.call(this, jvmObject);

    };

    FreqItemset.prototype = Object.create(JavaWrapper.prototype);

    FreqItemset.prototype.constructor = FreqItemset;

    /**
     * Returns items in a List.
     * @returns {List}
     */
    FreqItemset.prototype.items = function() {

       var javaObject =  this.getJavaObject().javaItems();
       return new List(javaObject);
    };

    /**
     *
     * @returns {integer}
     */
    FreqItemset.prototype.freq = function() {

        return this.getJavaObject().freq();
    };

    FreqItemset.prototype.toJSON = function() {
        var json = {};
        json.freq = this.freq();
        json.items = this.items();

        return json;
    };

    module.exports = FreqItemset;

})();
