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

    /**
     * @classdesc
     * SparkSessionBuilder for {@link SparkSession}.
     * @class
     * @memberof module:eclairjs/sql
     */
      var SparkSessionBuilder = = Java.type('org.eclairjs.nashorn.wrap.sql.Builder');


    
    /**
     * Sets a name for the application, which will be shown in the Spark web UI.
     * If no application name is set, a randomly generated name will be used.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSessionBuilder#appName
     * @param {string} name
     * @returns {module:eclairjs/sql.SparkSessionBuilder} 
     */
//    SparkSessionBuilder.prototype.appName = function(name) {
//       var javaObject =  this.getJavaObject().appName(name);
//       return new SparkSessionBuilder(javaObject);
//    };
//


    /**
     * Sets a list of config options based on the given {@link SparkConf}.
     * Or sets a config option. Options set using this method are automatically propagated to
     * both {@link SparkConf} and SparkSession's own configuration.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSessionBuilder#config
     * @param {module:eclairjs.SparkConf | string} conf or key
     * @param {boolean | number | String} [value]
     * @returns {module:eclairjs/sql.SparkSessionBuilder}
     */
//    SparkSessionBuilder.prototype.config = function(key,value) {
//      if (arguments.length==1 && key instanceof org.apache.spark.SparkConf)
//      {
//           var conf_uw = Utils.unwrapObject(key);
//           var javaObject =  this.getJavaObject().config(conf_uw);
//           return new SparkSessionBuilder(javaObject);
//
//      }
//      else
//      {
//           var javaObject =  this.getJavaObject().config(key,value);
//           return new SparkSessionBuilder(javaObject);
//      }
//    };
    
    
    /**
     * Sets the Spark master URL to connect to, such as "local" to run locally, "local[4]" to
     * run locally with 4 cores, or "spark://master:7077" to run on a Spark standalone cluster.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSessionBuilder#master
     * @param {string} master
     * @returns {module:eclairjs/sql.SparkSessionBuilder} 
     */
//    SparkSessionBuilder.prototype.master = function(master) {
//       var javaObject =  this.getJavaObject().master(master);
//       return new SparkSessionBuilder(javaObject);
//    };
//
    
    /**
     * Enables Hive support, including connectivity to a persistent Hive metastore, support for
     * Hive serdes, and Hive user-defined functions.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSessionBuilder#enableHiveSupport
     * @returns {module:eclairjs/sql.SparkSessionBuilder}
     */
//    SparkSessionBuilder.prototype.enableHiveSupport = function() {
//       var javaObject =  this.getJavaObject().enableHiveSupport();
//       return new SparkSessionBuilder(javaObject);
//    };
    
    
    /**
     * Gets an existing {@link SparkSession} or, if there is no existing one, creates a new
     * one based on the options set in this SparkSessionBuilder.
     *
     * This method first checks whether there is a valid thread-local SparkSession,
     * and if yes, return that one. It then checks whether there is a valid global
     * default SparkSession, and if yes, return that one. If no valid global default
     * SparkSession exists, the method creates a new SparkSession and assigns the
     * newly created SparkSession as the global default.
     *
     * In case an existing SparkSession is returned, the config options specified in
     * this SparkSessionBuilder will be applied to the existing SparkSession.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @static
     * @name module:eclairjs/sql.SparkSessionBuilder#getOrCreate
     * @returns {module:eclairjs/sql.SparkSession}
     */
//    SparkSessionBuilder.prototype.getOrCreate = function() {
//       var javaObject =  this.getJavaObject().getOrCreate();
//       return Utils.javaToJs(javaObject);
//    };
    
    module.exports = SparkSessionBuilder;
})();