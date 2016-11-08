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




module.exports = function(kernelP) {
  return (function() {
    var Utils = require('./utils.js');

    var gKernelP = kernelP;

    /**
     * @constructor
     * @classdesc The base type of all Spark SQL data types.
     * @memberof module:eclairjs/sql/types
     */
    function SparkFiles() {
    }


    /**
     * Get the absolute path of a file added through `SparkContext.addFile()`.
     * @param {string} filename
     * @returns {Promise.<string>} 
     */
    SparkFiles.get = function(filename) {
     
     function _resolve(result, resolve, reject) {
     	try {
     		var returnValue=result;
     		resolve(returnValue);
     	} catch (e) {
     		var err = new Error("Parse Error: "+ e.message);
     		reject(err);
     	}
     };
       var args ={
         target: SparkFiles, 
         method: 'get', 
         args: Utils.wrapArguments(arguments),
         static: true,
         resolver: _resolve,
         returnType: String
     
       };
     
       return Utils.generate(args);
    };
    
    /**
     * Get the root directory that contains files added through `SparkContext.addFile()`.
     * @returns {Promise.<string>} 
     */
    SparkFiles.getRootDirectory = function() {
     
     function _resolve(result, resolve, reject) {
     	try {
     		var returnValue=result;
     		resolve(returnValue);
     	} catch (e) {
     		var err = new Error("Parse Error: "+ e.message);
     		reject(err);
     	}
     };
       var args ={
         target: SparkFiles, 
         method: 'getRootDirectory', 
         static: true,
         resolver: _resolve,
         returnType: String
     
       };
     
       return Utils.generate(args);
    };


    SparkFiles.moduleLocation = '/SparkFiles';

    return SparkFiles;
  })();
};
