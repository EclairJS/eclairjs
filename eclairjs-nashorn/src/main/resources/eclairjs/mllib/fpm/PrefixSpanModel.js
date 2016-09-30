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
    //var RDD = require(EclairJS_Globals.NAMESPACE + '/RDD');

    /**
     * Model fitted by {@link module:eclairjs/mllib/fpm.PrefixSpan}
     * @memberof module:eclairjs/mllib/fpm
     * @classdesc
     * @param {module:eclairjs.RDD} freqSequences
     * @class
     */
    var PrefixSpanModel = function(freqSequences) {
        var jvmObject;
        this.logger = Logger.getLogger("PrefixSpanModel_js");
        if(freqSequences instanceof org.apache.spark.mllib.fpm.PrefixSpanModel) {
            jvmObject = freqSequences;
        } else {
            jvmObject = new org.apache.spark.mllib.fpm.PrefixSpanModel(Utils.unwrapObject(freqSequences));
        }


         JavaWrapper.call(this, jvmObject);

    };

    PrefixSpanModel.prototype = Object.create(JavaWrapper.prototype);

    PrefixSpanModel.prototype.constructor = PrefixSpanModel;

    PrefixSpanModel.prototype.freqSequences = function() {
        var javaObject =  this.getJavaObject().freqSequences();
        return Utils.javaToJs(javaObject.toJavaRDD());
    };

    module.exports = PrefixSpanModel;

})();
