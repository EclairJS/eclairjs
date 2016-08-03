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

var EclairJS_Globals = {
    NAMESPACE: 'eclairjs'
};

/**
 *  We need to replace the Nashorn's implementation of parseInt becouse it returns
 *  a java.lang.Double. Why you ask, that is a good question!
 *  Any way this really mess up spark as we need a parseInt to be a java.lang.Integer
 *  so we will replace it globally with an implementation that works for spark
 * @param string
 * @param radix
 * @returns {Number}
 * @private
 */
parseInt = function(string, radix) {

    var val = NaN;
    try{
        if (radix) {
            val = java.lang.Integer.parseInt(string, radix);
        } else {
            val = java.lang.Integer.parseInt(string);
        }
    } catch (e) {
        // bad parseInt value
    }

    return val;
};


function Utils_invoke(func) {
    var fn = func;
    var a = Array.prototype.slice.call(arguments);
    var args = (arguments.length > 1)
        ? a.slice(1).map(function (arg) {
        return Serialize.javaToJs(arg);
    })
        : [];

    var ret = null;
    try {
        ret = Serialize.jsToJava(fn.apply(this, args));
    } catch (err) {
        print("error invoking function");
        print(func);
        print(err);
        throw err;
    }

    return ret;
};

function createJavaScriptSparkObject(javaObj) {
    return Serialize.javaToJs(javaObj);
}

function objectToJsonString(obj) {
    return JSON.stringify(obj);
}

function createLambdaFunction(func, clazz, sc, bindArgs) {
    var Utils = require('eclairjs/Utils');
    var c = Java.type(clazz);
    return Utils.createLambdaFunction(func, c, sc, bindArgs);
}


if (typeof nativeJSON === "undefined") {
    nativeJSON = JSON;

    JSON = {
        stringify: function (v, replacer, space) {
            var jsonObj = v;
            if (Array.isArray(v)) {
                jsonObj = [];
                for (var i = 0; i < v.length; i++) {
                    var s = JSON.stringify(v[i], replacer, space);
                    var o = nativeJSON.parse(s);
                    jsonObj.push(o)
                }
            } else if (v instanceof org.eclairjs.nashorn.wrap.WrappedClass) {
                var jsonStr =  v.toJSON();
                //print("jsonStr " + jsonStr)
                jsonObj = nativeJSON.parse(jsonStr);
            } else if (  typeof v === 'object') {
                if (v.toJSON) {
                    jsonObj = v.toJSON();
                    var s = JSON.stringify(jsonObj,  replacer, space);
                    jsonObj = JSON.parse(s);
                } else {
                    //print("v " + v)
                    var str = '{';
                    var sep = '';
                    //print("v " + v)
                    for (var p in v) {
                        if ((v[p] != null) && (typeof v[p] != 'function')) {
                             //print("type " + typeof v[p]);
                            var x;
                            if (v[p] instanceof java.lang.Long) {
                                x = Number(v[p]);
                            } else {
                                x = v[p];
                            }
                            var val = JSON.stringify(x, replacer, space);
                            //print('val ' + val)
                            if (val != '{}') {
                                str += sep + '"' + p + '"' + ':' + val;
                                sep = ',';
                            }
                        }
                    }
                    str += '}'
                    //print("json " + str)

                    jsonObj = nativeJSON.parse(str);
                }
            }
            return nativeJSON.stringify(jsonObj, replacer, space);
        },
        parse: function (text, reviver) {
            // FIXME need to handle all arguments passed to JSON.parse to match standard
            return nativeJSON.parse(text, reviver);
        }
    }
}

function createJavaHashMap(obj) {
    return Utils.createJavaHashMap(obj);
}