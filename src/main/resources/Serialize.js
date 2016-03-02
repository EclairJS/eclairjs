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

var Serialize = {};

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

Serialize.javaList = function (javaObj) {
    if (javaObj instanceof java.util.List) {
        var res = [];
        for (var i = 0; i < javaObj.size(); i++) {
            res.push(javaObj.get(i));
        }

        return res;
    }

    return false;
};

Serialize.javaTuple2Class = Java.type("scala.Tuple2");
Serialize.javaTuple2 = function (javaObj) {
    //var Tuple2 = Java.type("scala.Tuple2");
    /*
     NOTE: If we do not use a static variable for the Java.type(...)
     we will incur HUGE performance degradations by invoking
     Java.type(...) every time we invoke the serializer to check the
     instance of the object
     */
    if (javaObj instanceof Serialize.javaTuple2Class) {
        //print("found a Tuple2");
        return new Tuple(Serialize.javaToJs(javaObj._1()),
            Serialize.javaToJs(javaObj._2()));
    }

    return false;
};

Serialize.javaTuple3Class = Java.type("scala.Tuple3");
Serialize.javaTuple3 = function (javaObj) {
    //var Tuple3 = Java.type("scala.Tuple3");
    if (javaObj instanceof Serialize.javaTuple3Class) {
        //print("found a Tuple3");
        return new Tuple(Serialize.javaToJs(javaObj._1()),
            Serialize.javaToJs(javaObj._2()),
            Serialize.javaToJs(javaObj._3()));
    }

    return false;
}

Serialize.scalaProductClass = Java.type("scala.Product");
Serialize.scalaTuple = function (javaObj) {
    if ((javaObj instanceof Serialize.scalaProductClass) && (javaObj.getClass().getName().indexOf("scala.Tuple") > -1))  {
        Serialize.logger.debug("Tuple - " + javaObj.toString());
        try {
            return eval("new Tuple(javaObj)");
        } catch  (e) {
            Serialize.logger.error(" Tuple conversion " + e);
        }
        return false;
    }

    return false;
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

    if (packageName == null || packageName.indexOf("org.apache.spark") == -1) {
        return false;
    }

    var className = javaObj.getClass().getSimpleName();

    if (className.endsWith("$")) {
        className = javaObj.getClass().getSuperclass().getSimpleName();
    }

    if (className === "JavaRDD") {
        //Map JavaRDD to RDD for JavaScript
        className = "RDD"; //o.getClass().getSimpleName();
    } else if (className == "JavaPairRDD") {
        className = "PairRDD";
    }
    else if (className === "Word2Vec" || className === "Word2VecModel") {
        if (packageName.indexOf("org.apache.spark.ml") > -1) {
            //ML
            className = "ML" + o.getClass().getSimpleName();
        } else {
            // MLLIB
            //className = "MLLIB" + o.getClass().getSimpleName(); FIXME not implmented yet
        }
    }

    //print("we have a className = " + className);
    return eval("new " + className + "(javaObj)");
};

Serialize.handlers = [
    Serialize.javaSparkObject,
    Serialize.javaArray,
    Serialize.javaList,
    Serialize.scalaTuple,
    Serialize.javaIteratorWrapper,
    Serialize.javaIterableWrapper,
    Serialize.javaSeqWrapper
];

Serialize.javaToJs = function(javaObj) {
  var t = (typeof javaObj);
  if(t == 'number' || t == 'string') {
      return javaObj;
  }

  var res = null;
  for(var i=0; i<Serialize.handlers.length; i++) {
    var fn = Serialize.handlers[i];
    var ret = fn(javaObj);
    if(ret) {
        res = ret;
        break;
    }
  }

  return res ? res : javaObj;
};

Serialize.JavaScriptObjectMirrorClass = Java.type('jdk.nashorn.api.scripting.ScriptObjectMirror');
Serialize.jsToJava = function (obj) {
    if (obj) {
        Serialize.logger.debug("jsToJava " + obj);
        //return org.eclairjs.nashorn.Utils.jsToJava(obj);

        if (obj.getJavaObject) {
            Serialize.logger.debug("Wrapped " + obj);
            return obj.getJavaObject();
        }

        if (Array.isArray(obj)) {
            var l = new java.util.ArrayList();
            obj.forEach(function (item) {
                l.add(Serialize.jsToJava(item));
            });
            Serialize.logger.debug("Array " + l);
            return l;
        }
        if (typeof obj === 'object') {
            var o = Serialize.JavaScriptObjectMirrorClass.wrapAsJSONCompatible(obj, null);
            var j = org.json.simple.JSONValue.toJSONString(o);
            return org.json.simple.JSONValue.parse(j);
        }
    }

    return obj;
};
