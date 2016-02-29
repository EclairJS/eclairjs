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

Serialize.getJavaClass = function(javaObj) {
    try {
        return javaObj.getClass();
    } catch(err) { ; }

    return null;
};

Serialize.javaArray = function(javaObj) {
  var clz = Serialize.getJavaClass(javaObj);
  if(clz  && clz.isArray()) {
    var res = [];
    for(var i=0; i<javaObj.length; i++) {
      res.push(Serialize.javaToJs(javaObj[i]));
    }
    return res;
  }

  return false;
};

Serialize.javaList = function(javaObj) {
  if(javaObj instanceof java.util.List) {
    var res = [];
    for(var i=0; i<javaObj.size(); i++) {
      res.push(javaObj.get(i));
    }

    return res;
  }

  return false;
};

Serialize.javaTuple = function(javaObj) {
  var Product = Java.type("scala.Product");
  if(javaObj instanceof Product && javaObj.getClass().getName().indexOf("scala.Tuple") > -1) {
      return new Tuple(javaObj);
  }

  return false;
};

Serialize.javaIteratorWrapper = function(javaObj) {
  var IteratorWrapper = 
      Java.type("scala.collection.convert.Wrappers.IteratorWrapper");
  if(javaObj instanceof IteratorWrapper) {
    var res = [];
    while(javaObj.hasMoreElements()) {
      res.push(Serialize.javaToJs(javaObj.next()));
    }

    return res;
  }

  return false;
};

Serialize.javaIterableWrapper = function(javaObj) {
  var IterableWrapper = 
      Java.type("scala.collection.convert.Wrappers.IterableWrapper");
  if(javaObj instanceof IterableWrapper) {
    var res = [];
    var iterator = javaObj.iterator();
    while(iterator.hasNext()) {
      res.push(Serialize.javaToJs(iterator.next()));
    }

    return res;
  }

  return false;
};

Serialize.javaSeqWrapper = function(javaObj) {
  var SeqWrapper = 
      Java.type("scala.collection.convert.Wrappers.SeqWrapper");
  if(javaObj instanceof SeqWrapper) {
    var res = [];
    var iterator = javaObj.iterator();
    while(iterator.hasNext()) {
      res.push(Serialize.javaToJs(iterator.next()));
    }

    return res;
  }

  return false;
};

Serialize.javaSparkObject = function(javaObj) {
  if(javaObj == null) {
    return false;
  }

  var clz = Serialize.getJavaClass(javaObj);
  if(!clz) {
    return false;
  }

  var pack = javaObj.getClass().getPackage();
  var packageName = pack ? pack.getName() : null;

  if(packageName == null || packageName.indexOf("org.apache.spark") == -1) {
    return false;
  }

  var className = javaObj.getClass().getSimpleName();

  if (className.endsWith("$")) {
    className = javaObj.getClass().getSuperclass().getSimpleName();
  }

  if (className === "JavaRDD" || className === "JavaPairRDD") {
    //Map JavaRDD to RDD for JavaScript
    className = "RDD"; //o.getClass().getSimpleName();
  } else if (className === "Word2Vec" || className === "Word2VecModel") {
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
  Serialize.javaTuple,
  Serialize.javaIteratorWrapper,
  Serialize.javaIterableWrapper,
  Serialize.javaSeqWrapper
];

Serialize.javaToJs = function(javaObj) {
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


Serialize.jsToJava = function(obj) {
    if(!obj) {
        return obj;
    }

    if(obj.getJavaObject) {
        return obj.getJavaObject();
    }

    if(Array.isArray(obj)) {
        var l = new java.util.ArrayList();
        obj.forEach(function(item) {
            l.add(Serialize.jsToJava(item));
        });

        return l;
    }

    return obj;
};
