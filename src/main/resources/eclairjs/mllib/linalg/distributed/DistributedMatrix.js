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

{
    /**
     * Represents a distributively stored matrix backed by one or more RDDs.
     * @memberof module:eclairjs/mllib/linalg/distributed
     * @classdesc
     * @class
     * @abstract
     * @example
     * var DistributedMatrix = require('eclairjs/mllib/linalg/distributed/DistributedMatrix');
     */


    var DistributedMatrix = function(jvmObject) {
        this.logger = Logger.getLogger("DistributedMatrix_js");
        JavaWrapper.call(this, jvmObject);

    };

    DistributedMatrix.prototype = Object.create(JavaWrapper.prototype);

    DistributedMatrix.prototype.constructor = DistributedMatrix;



    /**
     * Gets or computes the number of rows.
     * @returns {integer}
     */
    DistributedMatrix.prototype.numRows = function() {
        return  this.getJavaObject().numRows();
    };


    /**
     * Gets or computes the number of rows.
     * @returns {integer}
     */
    DistributedMatrix.prototype.numCols = function() {
        return  this.getJavaObject().numCols();
    };

    module.exports = DistributedMatrix;
}
