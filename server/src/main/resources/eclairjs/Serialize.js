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

var Serialize = function(){};
var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
Serialize.logger = Logger.getLogger("Serialize_js");

Serialize.getJavaClass = function (javaObj) {
    try {
        return javaObj.getClass();
    } catch (err) {
        ;
    }

    return null;
};

Serialize.javaArray = function (javaObj) {
    var clz = Serialize.getJavaClass(javaObj);
    if (clz && clz.isArray()) {
        var res = [];
        for (var i = 0; i < javaObj.length; i++) {
            res.push(Serialize.javaToJs(javaObj[i]));
        }
        return res;
    }

    return false;
};

Serialize.javaMap = function (javaObj) {
    if (javaObj instanceof java.util.Map) {
        var map = {};
        var keys = Java.from(javaObj.keySet().toArray());
        keys.forEach(function(k){
            map[k] = Serialize.javaToJs(javaObj.get(k));
        });

        map.toJSON = function (){
            var jsonObj = {};
            for(var k in this) {
                var o = this[k];
                if (typeof o != "function"){
                    var str = JSON.stringify(o);
                    jsonObj[k] = JSON.parse(str); // we are returning object not a string.
                }
            }
            return jsonObj;
        }

        return map;
    }

    return false;
};

Serialize.javaList = function (javaObj) {
    if (javaObj instanceof java.util.List) {
        var res = [];
        for (var i = 0; i < javaObj.size(); i++) {
            res.push(Serialize.javaToJs(javaObj.get(i)));
        }

        return res;
    }

    return false;
};

Serialize.scalaProductClass = Java.type("scala.Product");
Serialize.scalaTuple = function (javaObj) {
    var ret = false;
    if (javaObj instanceof Serialize.scalaProductClass) {
        if (javaObj.getClass().getName().indexOf("scala.Tuple2") > -1) {
            Serialize.logger.debug("Tuple - " , javaObj);
            var Tuple2 = require('eclairjs/Tuple2');
            ret = new Tuple2(javaObj);
        } else if (javaObj.getClass().getName().indexOf("scala.Tuple3") > -1) {
            Serialize.logger.debug("Tuple - " , javaObj);
            var Tuple3 = require('eclairjs/Tuple3');
            ret = new Tuple3(javaObj);
        } else if (javaObj.getClass().getName().indexOf("scala.Tuple4") > -1) {
            Serialize.logger.debug("Tuple - " , javaObj);
            var Tuple4 = require('eclairjs/Tuple4');
            ret = new Tuple4(javaObj);
        } else if (javaObj.getClass().getName().indexOf("scala.Tuple5") > -1) {
            Serialize.logger.debug("Tuple - " , javaObj);
            var Tuple5 = require('eclairjs/Tuple5');
            ret = new Tuple5(javaObj);
        }
    }

    return ret;
}

Serialize.javaIteratorWrapperClass = Java.type("scala.collection.convert.Wrappers.IteratorWrapper");
Serialize.javaIteratorWrapper = function (javaObj) {
    // var IteratorWrapper =
    //   Java.type("scala.collection.convert.Wrappers.IteratorWrapper");
    /*
     NOTE: If we do not use a static variable for the Java.type(...)
     we will incur HUGE performance degradations by invoking
     Java.type(...) every time we invoke the serializer to check the
     instance of the object
     */
    if (javaObj instanceof Serialize.javaIteratorWrapperClass) {
        //print("found an IteratorWrapper");
        var res = [];
        while (javaObj.hasMoreElements()) {
            res.push(Serialize.javaToJs(javaObj.next()));
        }

        return res;
    }

    return false;
};
Serialize.javaIterableWrapperClass = Java.type("scala.collection.convert.Wrappers.IterableWrapper");
Serialize.javaIterableWrapper = function (javaObj) {
    //var IterableWrapper =
    //   Java.type("scala.collection.convert.Wrappers.IterableWrapper");
    /*
     NOTE: If we do not use a static variable for the Java.type(...)
     we will incur HUGE performance degradations by invoking
     Java.type(...) every time we invoke the serializer to check the
     instance of the object
     */
    if (javaObj instanceof Serialize.javaIterableWrapperClass) {
        //print("found an IterableWrapper");
        var res = [];
        var iterator = javaObj.iterator();
        while (iterator.hasNext()) {
            res.push(Serialize.javaToJs(iterator.next()));
        }

        return res;
    }

    return false;
};

Serialize.javaSeqWrapperClass = Java.type("scala.collection.convert.Wrappers.SeqWrapper");
Serialize.javaSeqWrapper = function (javaObj) {
    // var SeqWrapper =
    //   Java.type("scala.collection.convert.Wrappers.SeqWrapper");
    /*
     NOTE: If we do not use a static variable for the Java.type(...)
     we will incur HUGE performance degradations by invoking
     Java.type(...) every time we invoke the serializer to check the
     instance of the object
     */
    if (javaObj instanceof Serialize.javaSeqWrapperClass) {
        //print("found a SeqWrapper");
        var res = [];
        var iterator = javaObj.iterator();
        while (iterator.hasNext()) {
            res.push(Serialize.javaToJs(iterator.next()));
        }

        return res;
    }

    return false;
};

Serialize.javaWrappedClass = Java.type("scala.collection.mutable.WrappedArray");
Serialize.javaWrappedArray = function (javaObj) {
    /*
     NOTE: If we do not use a static variable for the Java.type(...)
     we will incur HUGE performance degradations by invoking
     Java.type(...) every time we invoke the serializer to check the
     instance of the object
     */
    if (javaObj instanceof Serialize.javaWrappedClass) {
        var res = [];
        var iterator = javaObj.iterator();
        while (iterator.hasNext()) {
            res.push(Serialize.javaToJs(iterator.next()));
        }

        return res;
    }

    return false;
};

// Map java class name to wrapper class name
var java2wrapper = {
    "JavaRDD": "RDD",
    "JavaDoubleRDD": "FloatRDD",
    "JavaPairRDD": "PairRDD",
    "JavaDStream": "DStream",
    "JavaInputDStream": "DStream",
    "KafkaInputDStream": "DStream",
    "JavaReceiverInputDStream": "DStream",
    "JavaMapWithStateDStream": "DStream",
    "JavaPairDStream": "PairDStream",
    "JavaPairInputDStream": "PairDStream",
    "JavaPairReceiverInputDStream": "PairDStream",
    "JavaFutureActionWrapper": "FutureAction",
    "Assignment": "PowerIterationClusteringAssignment", // PowerIterationClustering$Assignment
    "FreqSequence": "PrefixSpanFreqSequence", // PrefixSpan$FreqSequence
    "GenericRowWithSchema": "Row",
    "GenericRow": "Row",
    "StreamExecution": "StreamingQuery",
    "last_place_holder": ""
};
var javaPackageMap = {
    "eclairjs/sql/catalyst/expressions": "eclairjs/sql",
    "eclairjs/api/java": "eclairjs",
    "eclairjs/streaming/api/java": "eclairjs/streaming",
    "eclairjs/sql/execution/streaming": "eclairjs/sql/streaming"
};
Serialize.javaSparkObject = function (javaObj) {
    if (javaObj == null) {
        return false;
    }

    var clz = Serialize.getJavaClass(javaObj);
    if (!clz) {
        return false;
    }

    var pack = javaObj.getClass().getPackage();
    var packageName = pack ? pack.getName() : null;

    if (packageName == null ||
        packageName.indexOf("org.apache.spark") == -1 ) {
        return false;
    }

    var className = javaObj.getClass().getSimpleName();

    if (className.endsWith("$")) {
        className = javaObj.getClass().getSuperclass().getSimpleName();
    }
    if (className === "MapPartitionsRDD") {
        className = "RDD";
        javaObj = javaObj.toJavaRDD();
        var pack = javaObj.getClass().getPackage();
        packageName = pack ? pack.getName() : null;

    } else if (java2wrapper[className]) {
        className = java2wrapper[className]
    }

    Serialize.logger.debug("javaSparkObject we have a className = ",className);

    packageName = packageName.replace(/org.apache.spark/i, EclairJS_Globals.NAMESPACE );
    packageName = packageName.replace(/\./g, "/");

    Serialize.logger.debug("javaSparkObject we have a packageName = " , packageName);

    packageName = (javaPackageMap[packageName]) ? javaPackageMap[packageName] : packageName;

    print("className = " + className);
    if (className === "DStream" || className === "PairDStream" || className == "KafkaInputDStream") {
        /*
        Java dstream objects are not in the dstream package so we have to force the correct
        module path for us.
         */
        packageName = EclairJS_Globals.NAMESPACE+"/streaming/dstream";
    }

    var req = 'var ' + className + ' = require("'+packageName+'/'+className+'");'

    var ret = false;
    try {
        // If TypeError exception is thrown catch it and try loading
        // module before giving up - this could be on worker node
        var cmd = req + " return new " + className + "(javaObj)";
        Serialize.logger.debug(cmd);
        print(cmd);
        var wrapperObjectFunction = new Function("javaObj", cmd); // better closer, keep require out of the global space
        ret = wrapperObjectFunction(javaObj);
    } catch(se) {
        Serialize.logger.error("Exception in trying to create SparkObject: " + req);
        Serialize.logger.error(se);
    }

    return ret;
};

Serialize.JSModule = function(obj) {
  if (ModuleUtils.isModule(obj)) {
    var mod = ModuleUtils.getRequiredFile(obj);

    Serialize.logger.debug("Serialize.JSModule found a lambda required module: ",mod);

    return (mod && mod.exportname) ? mod.exports[mod.exportname] : (mod ? mod.exports : false);
  }

  return false;
};

Serialize.JSONObject = function (javaObj) {
    if (javaObj instanceof org.json.simple.JSONObject) {
        var jsonStr = javaObj.toJSONString();
        Serialize.logger.debug("JSONObject " , jsonStr)
        return JSON.parse(jsonStr);
    }
    return false;
};

Serialize.javaSqlTimestamp = function (javaObj) {
    if (javaObj instanceof java.sql.Timestamp) {
        var ret = false;
        try {
            // Make sure module is required before attempting new.
            var req = "var SqlTimestamp = require('" + EclairJS_Globals.NAMESPACE + "/sql/SqlTimestamp');";
            var cmd = req + " return new SqlTimestamp(javaObj)";
            Serialize.logger.debug(cmd);
            var wrapperObjectFunction = new Function("javaObj", cmd); // better closer, keep require our of the global space
            ret = wrapperObjectFunction(javaObj);
        } catch(se) {
            Serialize.logger.error("Exception in trying to create SqlTimestamp.");
            Serialize.logger.error(se);
        }
        return ret;
    }
    return false;
};

Serialize.javaSqlDate = function (javaObj) {
    if (javaObj instanceof java.sql.Date) {
        var ret = false;
        try {
            // Make sure module is required before attempting new.
            var req = "var SqlDate = require('" + EclairJS_Globals.NAMESPACE + "/sql/SqlDate');";
            var cmd = req + " return new SqlDate(javaObj)";
            Serialize.logger.debug(cmd);
            var wrapperObjectFunction = new Function("javaObj", cmd); // better closer, keep require our of the global space
            ret = wrapperObjectFunction(javaObj);
        } catch(se) {
            Serialize.logger.error("Exception in trying to create SqlDate.");
            Serialize.logger.error(se);
        }
        return ret;
    }
    return false;
};

/**
 * To send a JavaScript object to a spark worker we need to convert it to a Java object that implements java.io.Serializable.
 * JSONSerializer is that object, this object has a string properties that is the JSON representation of the JavaScript object
 * to be sent to the workers. Once it arrives at the workers it must be converted back to a JavaScript object for use in the
 * LAMBDA function. THat is what we are doing here.
 * @private
 * @param javaObj Java object to convert to a JavaScript object
 * @returns {boolean | module:eclairjs.Serializable}
 * @constructor
 */
Serialize.JSONSerializer = function (javaObj) {
    if (javaObj instanceof org.eclairjs.nashorn.JSONSerializer) {
        var ret = false;
        try {
            // Make sure module is required before attempting new.
            var req = "var Serializable = require('" + EclairJS_Globals.NAMESPACE + "/Serializable');";
            var cmd = req + " return new Serializable(JSON.parse(javaObj.getJson()));";
            //var cmd = "return JSON.parse(javaObj.getJson());"
            Serialize.logger.debug(cmd);
            var wrapperObjectFunction = new Function("javaObj", cmd); // better closer, keep require our of the global space
            ret = wrapperObjectFunction(javaObj);
        } catch(se) {
            Serialize.logger.error("Exception in trying to create SqlDate.");
            Serialize.logger.error(se);
        }
        return ret;
    }
    return false;
};

Serialize.handlers = [
    Serialize.JSONSerializer,
    Serialize.javaArray,
    Serialize.javaSqlTimestamp,
    Serialize.javaSqlDate,
    Serialize.javaList,
    Serialize.scalaTuple,
    Serialize.javaIteratorWrapper,
    Serialize.javaIterableWrapper,
    Serialize.javaSeqWrapper,
    Serialize.javaWrappedArray,
    Serialize.JSModule, // test for module before JSONObject since techinically it is an instance of org.json.simple.JSONObject
    Serialize.JSONObject,
    Serialize.javaMap, // keep this before javaSparkObject to handle org.apache.api.java.JavaUtils$SerializableWrapper
    Serialize.javaSparkObject,
];

Serialize.javaToJs = function (javaObj) {
    if (javaObj == null) {
        Serialize.logger.debug("Serialize.javaToJs - NOT going to serialize a null java object!!");
        // Don't throw the exception - some methods may actually return null - let caller decide what to do.
        //throw("Serialize.javaToJs - CANNOT serialize a null java object!!");
    }

    var t = (typeof javaObj);
    if (t == 'number' || t == 'string') {
        return javaObj;
    }

    if (javaObj instanceof org.eclairjs.nashorn.wrap.WrappedClass) {
        /*
        This is one of our AbstractJSObject Java/JavaScript objects
         */
        return javaObj;
    }

    var res = null;
    for (var i = 0; i < Serialize.handlers.length; i++) {
        var fn = Serialize.handlers[i];
        var ret = fn(javaObj);
        if (ret) {
            res = ret;
            break;
        }
    }
    return res ? res : javaObj;
};

Serialize.JavaScriptObjectMirrorClass = Java.type('jdk.nashorn.api.scripting.ScriptObjectMirror');
Serialize.jsToJava = function (obj) {
    if (obj) {
        var className = obj.getClass ? obj.getClass().getSimpleName() : obj;
        Serialize.logger.debug("jsToJava ",className);
        //return org.eclairjs.nashorn.Utils.jsToJava(obj);

        if (obj.getJavaObject) {
            Serialize.logger.debug("Wrapped ",obj);
            return obj.getJavaObject();
        }

        if (Array.isArray(obj)) {
            if (obj.length < 1) {
                return;
            }
            var l = [];
            //var l = new java.util.ArrayList();
            obj.forEach(function (item) {
                //l.add(Serialize.jsToJava(item));
                l.push(Serialize.jsToJava(item));
            });
            Serialize.logger.debug("Array " , l);
            //return l.toArray();
            /*
             run through the array
             */
            var type = l[0].class.name; //"java.lang.Object";
            for (var x = 0; x < l.length - 1; x++) {
                if (l[x].class.name !== l[x + 1].class.name) {
                    type = "java.lang.Object";
                    //x = l.length;
                    break;
                }
                type = l[x].class.name;
            }
            var ret;
            if (type == "java.lang.Double") {
                ret = Java.to(l, "double[]");
                Serialize.logger.debug("double[] " , ret);
            } else if (type == "java.lang.Integer") {
                ret = Java.to(l, "int[]");
                Serialize.logger.debug("int[] " , ret);
            } else {
                ret = Java.to(l);
                Serialize.logger.debug("Object[] " , ret);
            }
            return ret
        }
        if (typeof obj === 'object') {
            // The module will have already been converted from export function into
            // metadata object by createLambdaFunction before it gets here but we still
            // need it's JSON form.
            if (ModuleUtils.isModule(obj)) {
                obj = obj.toJSON();
            }
            var o = Serialize.JavaScriptObjectMirrorClass.wrapAsJSONCompatible(obj, null);
            var j = org.json.simple.JSONValue.toJSONString(o);
            return org.json.simple.JSONValue.parse(j);
        }
    } else {
        Serialize.logger.debug("Serialize.jsToJava - JS object is null or undefined obj: ",obj);
        //throw("Serialize.jsToJava - JS object is null or undefined");
    }

    return obj;
};
