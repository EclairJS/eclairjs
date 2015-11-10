/*
 * Copyright 2015 IBM Corp.
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

load("nashorn:mozilla_compat.js");

var imported = new JavaImporter(
    org.apache.spark.api.java,
    org.apache.log4j.Logger,
    org.apache.log4j.Level
);

with (imported) {

    Logger.getLogger("org").setLevel(Level.WARN);
    Logger.getLogger("akka").setLevel(Level.WARN);

    var initSparkContext = function(conf) {
        if(kernel) {
            if(kernel.javaSparkContext() != null) {
                return kernel.javaSparkContext();
            } else {
                kernel.createSparkContext(conf.jvmConf);
                return kernel.javaSparkContext();
            }
        }

        /*
         * Create a new JavaSparkContext from a conf
         * 
         */
        var jvmSC = new JavaSparkContext(conf.jvmConf);
        /*
         * add the jar for the cluster
         */
        var decodedPath = org.eclairjs.nashorn.Utils.jarLoc();
        var devEnvPath = "/target/classes/";
        var jarEnvPath = ".jar";
        print("jar decodedPath = " + decodedPath);
        if (decodedPath.indexOf(devEnvPath, 
                                decodedPath.length - devEnvPath.length) !== -1) 
        {
            /*
             * we are in the dev environment I hope...
             */
            jvmSC.addJar(decodedPath + "../eclairjs-nashorn-0.1.jar");
        } else if (decodedPath.indexOf(jarEnvPath, 
                                       decodedPath.length - jarEnvPath.length) !== -1) {
            /*
             * We are running from a jar
             */
            jvmSC.addJar(decodedPath);
        }

        return jvmSC
    };

    var SparkContext = function() {
        if(arguments.length == 2) {
            var conf = new SparkConf()
            conf.setMaster(arguments[0])
            conf.setAppName(arguments[1])
            this.jvmSC = initSparkContext(conf)
        } else {
            this.jvmSC = initSparkContext(arguments[0])
        }
    };

    SparkContext.prototype.getJavaObject = function() {
        return this.jvmSC;
    };

    SparkContext.prototype.parallelize = function(seq) {
        return new RDD(this.jvmSC.parallelize(seq));
    };

    SparkContext.prototype.textFile = function(path) {
        return new RDD(this.jvmSC.textFile(path));
    };

    SparkContext.prototype.addJar = function(path) {
        this.jvmSC.addJar(path);
    };

    SparkContext.prototype.addFile = function(path) {
        this.jvmSC.addFile(path);
    };

    SparkContext.prototype.broadcast = function(o) {
        return this.jvmSC.broadcast(o);
    };

    SparkContext.prototype.stop = function() {
        this.jvmSC.stop();
    }
}
